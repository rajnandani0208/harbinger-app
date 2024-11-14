import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/types';
import styles from './FormDetailScreenStyle';
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



export default FormDetailScreen; 