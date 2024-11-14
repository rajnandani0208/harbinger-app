import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    type = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
}) => {
    const getButtonStyle = () => {
        switch (type) {
            case 'secondary':
                return styles.secondaryButton;
            case 'outline':
                return styles.outlineButton;
            default:
                return styles.primaryButton;
        }
    };

    const getTextStyle = () => {
        switch (type) {
            case 'outline':
                return styles.outlineButtonText;
            default:
                return styles.buttonText;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                disabled && styles.disabledButton,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={type === 'outline' ? '#007AFF' : 'white'}
                    size="small"
                />
            ) : (
                <Text
                    style={[
                        getTextStyle(),
                        disabled && styles.disabledText,
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginVertical: 8,
    },
    primaryButton: {
        backgroundColor: '#4682B4',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#4682B4',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    outlineButtonText: {
        color: '#4682B4',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        elevation: 0,
        shadowOpacity: 0,
    },
    disabledText: {
        color: '#666666',
    },
});

export default CustomButton;