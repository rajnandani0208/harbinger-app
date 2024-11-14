import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, setErrors, submitForm, resetForm } from '../store/formSlice';
import { RootState } from '../store/store';
import FormField from './FormField';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

interface FormFieldConfig {
    id: string;
    label: string;
    fieldType: string;
    placeholder?: string;
    validation?: ValidationRule;
    options?: Array<{ label: string; value: string }>;
}

interface DynamicFormProps {
    config: {
        fields: FormFieldConfig[];
    };
    onSubmitSuccess?: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmitSuccess }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { formData, errors, submittedForms } = useSelector((state: RootState) => state.form);

    const navigation = useNavigation();
    useEffect(() => {
        dispatch(resetForm());
    }, [])


    const validateField = (field: FormFieldConfig, value: any): string | null => {
        const validation = field.validation;
        if (!validation) return null;

        if (validation.required && (!value || (Array.isArray(value) && value.length === 0))) {
            return `${field.label} is required`;
        }

        if (typeof value === 'string') {
            if (validation.minLength && value.length < validation.minLength) {
                return `${field.label} must be at least ${validation.minLength} characters`;
            }

            if (validation.maxLength && value.length > validation.maxLength) {
                return `${field.label} must be no more than ${validation.maxLength} characters`;
            }

            if (validation.pattern) {
                const regex = new RegExp(validation.pattern);
                if (!regex.test(value)) {
                    return `${field.label} is invalid`;
                }
            }
        }

        return null;
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        config.fields.forEach((field) => {
            const error = validateField(field, formData[field.id]);
            if (error) {
                newErrors[field.id] = error;
                isValid = false;
            }
        });

        dispatch(setErrors(newErrors));
        return isValid;
    };

    const handleSubmit = () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        if (validateForm()) {
            const isAlreadySubmitted = submittedForms.some(submittedForm =>
                JSON.stringify(submittedForm) === JSON.stringify(formData)
            );

            if (isAlreadySubmitted) {
                Alert.alert('Error', 'This form has already been submitted.');
                setIsSubmitting(false);
                return;
            }

            dispatch(submitForm());
            Alert.alert(
                'Success',
                'Form submitted successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            onSubmitSuccess?.();
                        },
                    },
                ]
            );
        }
        setIsSubmitting(false);
    };

    const handleFieldChange = (fieldId: string, value: any) => {
        dispatch(updateFormField({ field: fieldId, value }));
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                {config.fields.map((field) => (
                    <FormField
                        key={field.id}
                        field={field}
                        value={formData[field.id]}
                        error={errors[field.id]}
                        onChange={(value: any) => handleFieldChange(field.id, value)}
                    />
                ))}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={isSubmitting ? 'Submitting...' : 'Submit'}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        type="primary"
                    />

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    buttonContainer: {
        marginTop: 24,
        marginBottom: Platform.OS === 'ios' ? 24 : 16,
    },
});

export default DynamicForm;