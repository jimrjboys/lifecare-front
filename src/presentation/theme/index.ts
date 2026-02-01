import { useColorScheme } from '@/hooks/use-color-scheme';
import { LifeCareTheme } from './lifecare-theme';
import { LifeCareStyles, LifeCareDarkStyles } from './lifecare-styles';

export const useLifeCareTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const theme = isDark ? LifeCareTheme.dark : LifeCareTheme.light;
  const styles = isDark ? LifeCareDarkStyles : LifeCareStyles;
  
  return { theme, styles, isDark };
};

export { LifeCareTheme, LifeCareStyles, LifeCareDarkStyles };
