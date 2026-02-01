import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { useLifeCareTheme } from '../../theme';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  label?: string;
  error?: string;
  style?: any;
}

export const Input: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  keyboardType, 
  label,
  error,
  style 
}) => {
  const { styles, theme, isDark } = useLifeCareTheme();
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && <Text style={[styles.textSecondary, { marginBottom: 4, fontSize: 14 }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input, 
          isFocused && styles.inputFocused,
          error && { borderColor: theme.error }
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#777' : '#999'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={{ color: theme.error, fontSize: 12, marginTop: 4 }}>{error}</Text>}
    </View>
  );
};
