import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLifeCareTheme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
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
  
  return (
    <TouchableOpacity
      style={[buttonStyles[variant], style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyles[variant]}>{title}</Text>
    </TouchableOpacity>
  );
};
