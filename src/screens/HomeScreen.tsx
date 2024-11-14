// screens/HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './HomeScreenStyle';
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
                <TouchableOpacity style={styles.card} onPress={navigateToForm}>
                    <Text style={styles.cardTitle}>Form</Text>
                    <Text style={styles.cardDescription}>Fill out forms and provide your feedback.</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.card} onPress={navigateToFormList}>
                    <Text style={styles.cardTitle}>Form List</Text>
                    <Text style={styles.cardDescription}>View Submitted Forms</Text>
                </TouchableOpacity>


                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.card} onPress={navigateToPoll}>
                        <Text style={styles.cardTitle}>Poll</Text>
                        <Text style={styles.cardDescription}>Participate in polls and share your opinion.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={navigateToPollList}>
                        <Text style={styles.cardTitle}>Poll summary</Text>
                        <Text style={styles.cardDescription}>View Poll Summary</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </View>
    );
};



export default HomeScreen;