import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLifeCareTheme } from '../../theme';

interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

export const Container: React.FC<ContainerProps> = ({ children, scrollable = false, style }) => {
  const { styles, theme, isDark } = useLifeCareTheme();
  
  const Content = scrollable ? ScrollView : View;
  
  return (
    <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: theme.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Content 
        style={[styles.container, style]}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
};
