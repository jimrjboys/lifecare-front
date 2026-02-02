import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLifeCareTheme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  style 
}) => {
  const { styles, theme } = useLifeCareTheme();
  
  const buttonStyles = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    outline: styles.buttonOutline,
    danger: [styles.buttonPrimary, { backgroundColor: theme.error }],
  };
  
  const textStyles = {
    primary: styles.textButton,
    secondary: styles.textButton,
    outline: styles.textButtonOutline,
    danger: styles.textButton,
  };
  
  const activityColor = variant === 'outline' ? theme.primary : '#FFFFFF';
  
  return (
    <TouchableOpacity
      style={[buttonStyles[variant], style, (disabled || loading) && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={activityColor} />
      ) : (
        <Text style={textStyles[variant]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
