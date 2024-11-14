// screens/PollDetailScreen.tsx
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import PollQuestion from '../../components/PollQuestion';
import pollData from '../../data/polls.json';
import { submitVote } from '../../store/pollSlice';
import styles from './PollDetailScreenStyle';

type PollDetailRouteProp = RouteProp<{ params: { pollId: number } }, 'params'>;

const PollDetailScreen: React.FC = () => {
    const route = useRoute<PollDetailRouteProp>();
    const pollId = route.params.pollId;
    const poll: any = pollData.find((p) => p.id === pollId);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [responses, setResponses] = useState<{ [key: number]: number | null }>({});
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    const handleVote = (questionId: number, answerId: number, questionType: string) => {
        setResponses((prev) => ({ ...prev, [questionId]: answerId }));
        dispatch(submitVote({ pollId, questionId, answerId }));

        // Show or hide additional questions based on the response
        if (questionType === 'yes-no' && answerId === 2) {
            setShowAllQuestions(false);
        } else {
            setShowAllQuestions(true);
        }
    };

    const handleSubmitPoll = () => {
        const unansweredQuestions = poll.questions.filter((q) => !(q.id in responses));

        // Check if the last selected answer is "No" (assuming "No" has an ID of 2)
        const lastSelectedAnswer = Object.values(responses).slice(-1)[0];
        if (unansweredQuestions.length > 0 && lastSelectedAnswer !== 2) {
            Alert.alert("Alert", "Please select options.");
            return;
        }


        // Navigate to the summary screen if all questions are answered
        // Reset the navigation state and navigate to PollSummary
        navigation.dispatch(
            CommonActions.reset({
                index: 2,
                routes: [{ name: 'Home' }, { name: 'PollList' }, { name: 'PollSummary', params: { pollId } }], // Navigate back to the TabNavigator
            })
        );

        // After resetting, navigate to PollSummary
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{poll.title}</Text>
            <FlatList
                data={showAllQuestions ? poll.questions : [poll.questions[0]]}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <PollQuestion
                        questionId={item.id}
                        questionText={item.text}
                        questionType={item.type}
                        options={item.options}
                        onVote={(qId, answerId) => handleVote(item.id, answerId, item.type)}
                        selectedAnswerId={responses[item.id] || null} // Pass the selected answer ID
                    />
                )}
            />
            <CustomButton
                title="Submit Vote"
                onPress={handleSubmitPoll}

            />
        </View>
    );
};

export default PollDetailScreen;