import { StyleSheet } from 'react-native';

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
export default styles; 