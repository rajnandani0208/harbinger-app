// components/AnswerChoice.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Option } from '../types/pollTypes';

interface AnswerChoiceProps {
    option: { id: number; text: string };
    questionId: number;
    onSelect: (questionId: number, optionId: number) => void;
    selected: boolean; // New prop to indicate if this option is selected
}

const AnswerChoice: React.FC<AnswerChoiceProps> = ({ option, questionId, onSelect, selected }) => {
    return (
        <TouchableOpacity
            style={[styles.choiceContainer, selected && styles.selectedChoice]} // Change style if selected
            onPress={() => onSelect(questionId, option?.id)}
        >
            <Text style={[styles.choiceText, selected && styles.selectedText]}>{option.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    choiceContainer: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 5,
    },
    selectedChoice: {
        backgroundColor: '#4682B4', // Change to your desired selected color
    },
    selectedText: {
        color: '#ffffff',
    },
    choiceText: {
        fontSize: 16,
        color: '#000000',
    },
});

export default AnswerChoice;