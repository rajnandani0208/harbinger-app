// src/screens/PollSummaryScreen.tsx
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Import BarChart
import { useDispatch, useSelector } from 'react-redux';
import pollData from '../../data/polls.json';
import { RootState } from '../../store/store';

import CustomButton from '../../components/CustomButton';
import { clearVotes } from '../../store/pollSlice';
import styles from './PollSummaryScreenStyle';

const PollSummaryScreen: React.FC<{ route: any }> = ({ route }) => {
    const { pollId } = route.params;
    const dispatch = useDispatch();

    const votes = useSelector((state: RootState) => state.poll.votes);
    const poll: any = pollData.find(p => p.id === pollId);
    const getQuestionText = (questionId: number) => {
        const question: any = poll.questions.find(q => q.id === questionId);
        return question ? question.text : "Not found";
    };


    const calculateVoteCounts = () => {
        const voteCounts: Record<number, Record<number, number>> = {};
        votes.forEach(vote => {
            if (!voteCounts[vote.questionId]) {
                voteCounts[vote.questionId] = {};
            }
            voteCounts[vote.questionId][vote.answerId] = (voteCounts[vote.questionId][vote.answerId] || 0) + 1;
        });
        return voteCounts;
    };

    const renderVoteSummary = () => {
        const voteCounts = calculateVoteCounts();
        return poll.questions.map((question: any) => {
            const questionVotes = voteCounts[question.id] || {};
            const chartData = {
                labels: question.options.map((option: any) => option.text), // Use option text as labels
                datasets: [
                    {
                        data: question.options.map((option: any) => questionVotes[option.id] || 0), // Count of votes for each option
                    },
                ],
            };

            return (
                <View key={question.id} style={styles.card}>
                    <Text style={styles.questionTitle}>{getQuestionText(question.id)}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={chartData}
                            width={Dimensions.get('window').width * 0.9} // Dynamic width based on screen size
                            height={220}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(42, 157, 143, ${opacity})`, // Bar color
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={styles.chartStyle}
                        />
                    </ScrollView>
                </View>
            );
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderVoteSummary()}
            {pollId !== 0 &&


                <CustomButton
                    title="Reset Poll Data" onPress={() => dispatch(clearVotes())}
                    type="outline"

                />}
        </ScrollView>
    );
};

export default PollSummaryScreen;