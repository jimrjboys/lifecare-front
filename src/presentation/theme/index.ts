import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { LifeCareTheme } from './lifecare-theme';
import { LifeCareStyles, LifeCareDarkStyles } from './lifecare-styles';
import { useUIStore } from '@/src/application/stores/ui-store';

export const useLifeCareTheme = () => {
  const systemColorScheme = useColorScheme();
  const themeMode = useUIStore((state) => state.themeMode);
  
  const isDark = useMemo(() => {
    return themeMode === 'system' 
      ? systemColorScheme === 'dark' 
      : themeMode === 'dark';
  }, [themeMode, systemColorScheme]);
  
  const theme = useMemo(() => {
    const t = isDark ? LifeCareTheme.dark : LifeCareTheme.light;
    return t || LifeCareTheme.light; // Fallback to light theme
  }, [isDark]);
  
  const styles = useMemo(() => {
    const s = isDark ? LifeCareDarkStyles : LifeCareStyles;
    return s || LifeCareStyles; // Fallback to light styles
  }, [isDark]);
  
  return { theme, styles, isDark, themeMode };
};

export { LifeCareTheme, LifeCareStyles, LifeCareDarkStyles };
