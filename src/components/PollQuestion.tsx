// components/PollQuestion.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnswerChoice from './AnswerChoice';

interface PollQuestionProps {
    questionId: number;
    questionText: string;
    questionType: string;
    options: { id: number; text: string }[];
    onVote: (questionId: number, answerId: number) => void;
    selectedAnswerId: number | null;
}

const PollQuestion: React.FC<PollQuestionProps> = ({ questionId, questionText, questionType, options, onVote, selectedAnswerId }) => {
    return (
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{questionText}</Text>
            {options.map(option => (
                <AnswerChoice
                    key={option.id}
                    option={option}
                    questionId={questionId}
                    onSelect={onVote}
                    selected={selectedAnswerId === option.id}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    questionContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default PollQuestion;