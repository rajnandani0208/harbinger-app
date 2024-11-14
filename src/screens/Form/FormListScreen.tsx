import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './FormListScreenStyle';

const FormListScreen = () => {
    const navigation = useNavigation();
    const submittedForms = useSelector((state: RootState) => state.form.submittedForms);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FormDetail', { formId: item.id })}
        >
            <Text style={styles.cardTitle}>Form Submission</Text>
            <Text style={styles.cardSubtitle}>
                Submitted: {new Date(item.submittedAt).toLocaleString()}
            </Text>
            <Text style={styles.cardPreview}>
                Name: {item.name || 'N/A'}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {submittedForms.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No forms submitted yet</Text>
                </View>
            ) : (
                <FlatList
                    data={submittedForms}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};



export default FormListScreen; 