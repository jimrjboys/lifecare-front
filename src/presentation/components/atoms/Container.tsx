import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { useLifeCareTheme } from '../../theme';

interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

export const Container: React.FC<ContainerProps> = ({ children, scrollable = true, style }) => {
  const { styles: themeStyles, theme, isDark } = useLifeCareTheme();
  
  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView 
        style={[themeStyles.container, style]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 20,
  }
});
