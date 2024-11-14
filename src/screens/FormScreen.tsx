import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import DynamicForm from '../components/DynamicForm';
import { formConfig } from '../config/formConfig'; // Your form configuration

const FormScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSubmitSuccess = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <DynamicForm
                config={formConfig}
                onSubmitSuccess={handleSubmitSuccess}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewButton: {
        margin: 16,
        marginVertical: 20
    },
});

export default FormScreen; 