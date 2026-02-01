/**
 * LifeCare UI Components
 * Composants React Native stylisés pour l'application médicale LifeCare
 */

import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LifeCareTheme } from '@/constants/lifecare-theme';
import { LifeCareStyles, LifeCareDarkStyles } from '@/constants/lifecare-styles';

// Hook pour obtenir les styles en fonction du thème
export const useLifeCareTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const theme = isDark ? LifeCareTheme.dark : LifeCareTheme.light;
  const styles = isDark ? LifeCareDarkStyles : LifeCareStyles;
  
  return { theme, styles, isDark };
};

// Composant de conteneur principal
export const LifeCareContainer: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
  const { styles } = useLifeCareTheme();
  return <View style={[styles.container, style]}>{children}</View>;
};

// Composant de carte
export const LifeCareCard: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
  const { styles } = useLifeCareTheme();
  return <View style={[styles.card, style]}>{children}</View>;
};

// Composant de bouton principal
export const LifeCareButton: React.FC<{
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: any;
}> = ({ title, onPress, variant = 'primary', disabled = false, style }) => {
  const { styles, theme } = useLifeCareTheme();
  
  const buttonStyles = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    outline: styles.buttonOutline,
  };
  
  const textStyles = {
    primary: styles.textButton,
    secondary: styles.textButton,
    outline: styles.textButtonOutline,
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

// Composant de texte
export const LifeCareText: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'title' | 'subtitle';
  style?: any;
}> = ({ children, variant = 'primary', style }) => {
  const { styles } = useLifeCareTheme();
  
  const textStyles = {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
    title: styles.titleMedium,
    subtitle: styles.titleSmall,
  };
  
  return <Text style={[textStyles[variant], style]}>{children}</Text>;
};

// Composant de champ de saisie
export const LifeCareInput: React.FC<{
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  style?: any;
}> = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, style }) => {
  const { styles } = useLifeCareTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused, style]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

// Composant de carte de signes vitaux
export const VitalSignCard: React.FC<{
  type: 'heartRate' | 'bloodPressure' | 'temperature' | 'oxygen' | 'glucose';
  value: string;
  unit: string;
  label: string;
  status?: 'normal' | 'warning' | 'critical';
}> = ({ type, value, unit, label, status = 'normal' }) => {
  const { styles, theme } = useLifeCareTheme();
  
  const cardStyles = {
    heartRate: styles.heartRateCard,
    bloodPressure: styles.bloodPressureCard,
    temperature: styles.temperatureCard,
    oxygen: styles.oxygenCard,
    glucose: styles.glucoseCard,
  };
  
  const statusColors = {
    normal: theme.success,
    warning: theme.warning,
    critical: theme.error,
  };
  
  return (
    <View style={[styles.vitalSignCard, cardStyles[type]]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={[styles.textSecondary, { marginBottom: 4 }]}>{label}</Text>
          <Text style={[styles.titleSmall, { color: theme.textPrimary }]}>
            {value} <Text style={{ fontSize: 14, color: theme.textSecondary }}>{unit}</Text>
          </Text>
        </View>
        <View style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: statusColors[status],
        }} />
      </View>
    </View>
  );
};

// Composant d'alerte
export const LifeCareAlert: React.FC<{
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  style?: any;
}> = ({ type, title, message, style }) => {
  const { styles } = useLifeCareTheme();
  
  const alertStyles = {
    success: styles.alertSuccess,
    warning: styles.alertWarning,
    error: styles.alertError,
    info: styles.alertInfo,
  };
  
  return (
    <View style={[alertStyles[type], style]}>
      <Text style={{ fontWeight: '600', marginBottom: 4 }}>{title}</Text>
      <Text style={{ fontSize: 14 }}>{message}</Text>
    </View>
  );
};

// Composant de grille pour les signes vitaux
export const VitalSignsGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -8,
    }}>
      {React.Children.map(children, (child, index) => (
        <View style={{
          width: '50%',
          paddingHorizontal: 8,
          marginBottom: 16,
        }} key={index}>
          {child}
        </View>
      ))}
    </View>
  );
};

// Composant de défilement avec style LifeCare
export const LifeCareScrollView: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
  const { styles } = useLifeCareTheme();
  
  return (
    <ScrollView
      style={[styles.container, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export {
  LifeCareTheme,
  LifeCareStyles,
  LifeCareDarkStyles,
  useLifeCareTheme,
};