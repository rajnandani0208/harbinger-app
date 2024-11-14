import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MultiSelect from './MultiSelect';

const FormField = ({ field, value, error, onChange }: { field: any, value: any, error: any, onChange: any }) => {
    const renderField = () => {
        switch (field.fieldType) {
            case 'text':
            case 'email':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder={field.placeholder}
                        value={value}
                        onChangeText={onChange}
                        keyboardType={field.fieldType === 'email' ? 'email-address' : 'default'}
                    />
                );
            case 'dropdown':
            case 'singleSelect':
                return (
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={field.options || []}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={field.placeholder || `Select ${field.label}...`}
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => onChange(item.value)}
                        renderLeftIcon={() => null}
                    />
                );
            case 'multiSelect':
                return (
                    <MultiSelect
                        options={field.options || []}
                        value={value || []}
                        onChange={onChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            {renderField()}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    // Dropdown styles
    dropdown: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: 'white',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 8,
    },
});

export default FormField;