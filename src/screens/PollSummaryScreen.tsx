// screens/PollSummaryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearVotes } from '../store/pollSlice';
import { PieChart } from 'react-native-chart-kit';
import { RouteProp, useRoute } from '@react-navigation/native';
import pollData from '../data/polls.json';
import CustomButton from '../components/CustomButton';

type PollSummaryRouteProp = RouteProp<{ params: { pollId: number } }, 'params'>;

const PollSummaryScreen: React.FC = () => {
    const votes = useSelector((state: RootState) => state.poll.votes);
    const dispatch = useDispatch();
    const route = useRoute<PollSummaryRouteProp>();
    const pollId = route.params.pollId;

    const poll = pollData.find(p => p.id === pollId);
    if (!poll) {
        return <Text style={styles.errorText}>Poll not found.</Text>;
    }

    const getQuestionText = (questionId: number) => {
        const question = poll.questions.find(q => q.id === questionId);
        return question ? question.text : "Question not found";
    };

    const getAnswerText = (questionId: number, answerId: number) => {
        const question = poll.questions.find(q => q.id === questionId);
        const answer = question?.options.find(option => option.id === answerId);
        return answer ? answer.text : "Answer not found";
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

    const preparePieChartData = (questionId: number, questionVotes: Record<number, number>) => {
        const totalVotes = Object.values(questionVotes).reduce((sum, count) => sum + count, 0);
        return Object.entries(questionVotes).map(([answerId, count]) => ({
            name: getAnswerText(questionId, parseInt(answerId)),
            population: totalVotes > 0 ? (count / totalVotes) * 100 : 0,
            color: getRandomColor(),
            legendFontColor: "#000",
            legendFontSize: 12,
        }));
    };

    const getRandomColor = () => {
        const colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const renderVoteSummary = () => {
        const voteCounts = calculateVoteCounts();
        return poll.questions.map(question => {
            const questionVotes = voteCounts[question.id] || {};
            const chartData = preparePieChartData(question.id, questionVotes);
            return (
                <View key={question.id} style={styles.card}>
                    <Text style={styles.questionTitle}>{getQuestionText(question.id)}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <PieChart
                            data={chartData}
                            width={Dimensions.get('window').width - 30} // Adjust width to fit within screen
                            height={150}
                            paddingLeft={"1"} // Added paddingLeft to fix the error
                            chartConfig={{

                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                        />
                    </ScrollView>
                    {Object.entries(questionVotes).map(([answerId, count]) => (
                        <View key={answerId} style={styles.answerContainer}>
                            <Text style={styles.answerText}>{getAnswerText(question.id, parseInt(answerId))}: {count} votes</Text>
                        </View>
                    ))}
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

const styles = StyleSheet.create({
    container: { padding: 15, paddingBottom: 100, backgroundColor: 'white' },
    successText: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#1e847f', textAlign: 'center', marginTop: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    card: {
        marginVertical: 10, padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1, elevation: 3,

    },
    questionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    answerContainer: { marginVertical: 5 },
    answerText: { fontSize: 16 },
    errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default PollSummaryScreen;