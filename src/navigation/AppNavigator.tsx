import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FormScreen from '../screens/FormScreen';
import FormListScreen from '../screens/FormListScreen';
import FormDetailScreen from '../screens/FormDetailScreen';
import { RootStackParamList } from './types';
import PollListScreen from '../screens/PollListScreen';
import PollDetailScreen from '../screens/PollDetailScreen';
import PollSummaryScreen from '../screens/PollSummaryScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"

                screenOptions={{
                    // headerStyle: {
                    //     backgroundColor: '#2a9d8f', // Background color of the header

                    // },
                    headerTintColor: '#2a9d8f', // Color of the back button and title text
                    // headerTitleStyle: {
                    //     fontWeight: 'bold', // Title text style
                    // },

                }
                }
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

                <Stack.Screen
                    name="PollList"
                    component={PollListScreen}
                    options={{ title: 'Polls' }}
                />
                <Stack.Screen
                    name="PollDetail"
                    component={PollDetailScreen}
                    options={{ title: 'Poll Details' }}
                />
                <Stack.Screen name="PollSummary" component={PollSummaryScreen}
                    options={{ title: 'Poll Summary' }}
                />
                <Stack.Screen
                    name="FormScreen"
                    component={FormScreen}
                    options={{ title: 'Dynamic Form' }}
                />
                <Stack.Screen
                    name="FormList"
                    component={FormListScreen}
                    options={{ title: 'Submitted Forms' }}
                />
                <Stack.Screen
                    name="FormDetail"
                    component={FormDetailScreen}
                    options={{ title: 'Form Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default AppNavigator; 