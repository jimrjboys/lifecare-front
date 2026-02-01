import React from 'react';
import { View } from 'react-native';
import { useLifeCareTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const { styles } = useLifeCareTheme();
  return <View style={[styles.card, style]}>{children}</View>;
};
