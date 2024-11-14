import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FormScreen from '../screens/Form/FormScreen';
import FormListScreen from '../screens/Form/FormListScreen';
import FormDetailScreen from '../screens/Form/FormDetailScreen';
import { RootStackParamList } from './types';
import PollListScreen from '../screens/Poll/PollListScreen';
import PollDetailScreen from '../screens/Poll/PollDetailScreen';
import PollSummaryScreen from '../screens/Poll/PollSummaryScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"

                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#fff', // Background color of the header

                    },
                    headerTintColor: '#4682B4', // Color of the back button and title text
                    headerTitleStyle: {
                        fontWeight: 'bold', // Title text style
                    },

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