import { useColorScheme } from 'react-native';
import { LifeCareTheme } from './lifecare-theme';
import { LifeCareStyles, LifeCareDarkStyles } from './lifecare-styles';
import { useUIStore } from '@/src/application/stores/ui-store';

export const useLifeCareTheme = () => {
  const systemColorScheme = useColorScheme();
  const themeMode = useUIStore((state) => state.themeMode);
  
  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';
  
  const theme = isDark ? LifeCareTheme.dark : LifeCareTheme.light;
  const styles = isDark ? LifeCareDarkStyles : LifeCareStyles;
  
  return { theme, styles, isDark, themeMode };
};

export { LifeCareTheme, LifeCareStyles, LifeCareDarkStyles };
