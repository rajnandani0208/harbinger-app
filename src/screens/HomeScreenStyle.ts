
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',

    },
    scrollStyle: {
        flexGrow: 1, justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    cardContainer: {
        width: '100%',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#4682B4', // Card background color
        elevation: 3, // Shadow effect for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 4, // Shadow radius for iOS
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // Text color for card title
    },
    cardDescription: {
        fontSize: 16,
        color: '#ffffff', // Text color for card description
    },
}); export default styles; 