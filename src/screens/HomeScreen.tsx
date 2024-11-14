// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

    const navigateToPoll = () => {
        navigation.navigate('PollList'); // Navigate to Poll screen
    };
    const navigateToForm = () => {
        navigation.navigate('FormScreen'); // Navigate to Form screen
    };
    const navigateToFormList = () => {
        navigation.navigate('FormList'); // Navigate to Form screen
    };
    const navigateToPollList = () => {
        navigation.navigate('PollSummary', { pollId: 1 })
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollStyle} showsVerticalScrollIndicator={false} >
                <Text style={styles.title}>Welcome to the App</Text>
                <Text style={styles.subtitle}>Choose an option to get started:</Text>

                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.card} onPress={navigateToPoll}>
                        <Text style={styles.cardTitle}>Poll</Text>
                        <Text style={styles.cardDescription}>Participate in polls and share your opinion.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={navigateToPollList}>
                        <Text style={styles.cardTitle}>Poll summary</Text>
                        <Text style={styles.cardDescription}>View Poll Summary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={navigateToForm}>
                        <Text style={styles.cardTitle}>Form</Text>
                        <Text style={styles.cardDescription}>Fill out forms and provide your feedback.</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.card} onPress={navigateToFormList}>
                        <Text style={styles.cardTitle}>Form List</Text>
                        <Text style={styles.cardDescription}>View Submitted Forms</Text>
                    </TouchableOpacity>



                </View>
            </ScrollView>
        </View>
    );
};

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
        backgroundColor: '#2a9d8f', // Card background color
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
});

export default HomeScreen;