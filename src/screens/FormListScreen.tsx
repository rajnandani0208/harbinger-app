import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    cardPreview: {
        fontSize: 16,
        marginBottom: 8,
    },
    viewMore: {
        color: '#007AFF',
        fontSize: 14,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
    },
});

export default FormListScreen; 