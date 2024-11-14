import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import DynamicForm from '../../components/DynamicForm';
import { formConfig } from '../../config/formConfig'; // Your form configuration
import styles from './FormScreenStyle';
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


export default FormScreen; 