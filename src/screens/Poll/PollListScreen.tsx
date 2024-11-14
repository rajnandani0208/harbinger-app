import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import polls from '../../data/polls.json'; // Import the mock poll data
import styles from './PollListScreenStyles'; // Import the styles

const PollListScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PollDetail', { pollId: item.id })}
        >
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={polls}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />

        </View>
    );
};



export default PollListScreen; 