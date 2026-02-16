import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { useLifeCareTheme } from '../../theme';

interface AlertBannerProps {
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
  onPress?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ 
  title, 
  message, 
  type = 'error', 
  onPress 
}) => {
  const { theme } = useLifeCareTheme();
  
  const bgColor = type === 'error' ? theme.error : (type === 'warning' ? theme.warning : theme.primary);
  
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress}
      style={[styles.container, { backgroundColor: bgColor + '15', borderColor: bgColor }]}
    >
      <View style={[styles.iconBar, { backgroundColor: bgColor }]} />
      <View style={styles.content}>
        <Text style={{ fontWeight: 'bold', color: bgColor, fontSize: 14 }}>{title.toUpperCase()}</Text>
        <Text variant="secondary" style={{ fontSize: 13, marginTop: 2 }}>{message}</Text>
      </View>
      <Text style={{ fontSize: 20, marginRight: 10 }}>⚠️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 10,
    overflow: 'hidden',
  },
  iconBar: {
    width: 6,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
});
