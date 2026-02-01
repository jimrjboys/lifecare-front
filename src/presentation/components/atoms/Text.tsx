import React from 'react';
import { Text as RNText } from 'react-native';
import { useLifeCareTheme } from '../../theme';

interface TextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'title' | 'subtitle' | 'caption' | 'error';
  style?: any;
}

export const Text: React.FC<TextProps> = ({ children, variant = 'primary', style }) => {
  const { styles, theme } = useLifeCareTheme();
  
  const textStyles = {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
    title: styles.titleMedium,
    subtitle: styles.titleSmall,
    caption: [styles.textSecondary, { fontSize: 12 }],
    error: { color: theme.error, fontSize: 12 },
  };
  
  return <RNText style={[textStyles[variant], style]}>{children}</RNText>;
};
