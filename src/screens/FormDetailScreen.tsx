import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootState } from '../store/store';
import { RootStackParamList } from '../navigation/types';

type FormDetailRouteProp = RouteProp<RootStackParamList, 'FormDetail'>;

const FormDetailScreen = () => {
    const route = useRoute<FormDetailRouteProp>();
    const { formId } = route.params;

    const formData = useSelector((state: RootState) =>
        state.form.submittedForms.find(form => form.id === formId)
    );

    if (!formData) {
        return (
            <View style={styles.container}>
                <Text>Form not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.submissionDate}>
                    Submitted: {new Date(formData.submittedAt).toLocaleString()}
                </Text>
                {Object.entries(formData).map(([key, value]) => {
                    if (key === 'id' || key === 'submittedAt') return null;
                    return (
                        <View key={key} style={styles.field}>
                            <Text style={styles.fieldLabel}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </Text>
                            <Text style={styles.fieldValue}>
                                {Array.isArray(value) ? value.join(', ') : value.toString()}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    submissionDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    field: {
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    fieldValue: {
        fontSize: 16,
        color: '#333',
    },
});

export default FormDetailScreen; 