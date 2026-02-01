/**
 * LifeCare Theme - Thème médical professionnel
 * Couleurs inspirées du secteur médical avec une approche moderne et rassurante
 */

import { Platform } from 'react-native';

// Palette de couleurs LifeCare
const LifeCareColors = {
  // Couleurs principales - vert médical
  primary: {
    50: '#E8F5E8',   // Très clair
    100: '#C8E6C9',  // Clair
    500: '#4CAF50',  // Principal
    600: '#43A047',  // Moyen
    700: '#388E3C',  // Sombre
    900: '#1B5E20',  // Très sombre
  },
  
  // Couleurs secondaires - bleu médical
  secondary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    500: '#2196F3',
    600: '#1976D2',
    700: '#1565C0',
    900: '#0D47A1',
  },
  
  // Couleurs d'accent - orange chaleureux
  accent: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    500: '#FF9800',
    600: '#F57C00',
    700: '#EF6C00',
  },
  
  // Couleurs de fond
  background: {
    light: '#FAFAFA',
    dark: '#121212',
    card: '#FFFFFF',
    cardDark: '#1E1E1E',
  },
  
  // Couleurs de texte
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    light: '#FFFFFF',
    dark: '#000000',
  },
  
  // Couleurs d'état
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // Couleurs médicales spécifiques
  medical: {
    heartRate: '#E91E63',
    bloodPressure: '#9C27B0',
    temperature: '#FF5722',
    oxygen: '#00BCD4',
    glucose: '#FFC107',
  },
};

// Thème LifeCare complet
export const LifeCareTheme = {
  light: {
    // Couleurs principales
    primary: LifeCareColors.primary[500],
    primaryDark: LifeCareColors.primary[700],
    primaryLight: LifeCareColors.primary[100],
    
    secondary: LifeCareColors.secondary[500],
    secondaryDark: LifeCareColors.secondary[700],
    secondaryLight: LifeCareColors.secondary[100],
    
    accent: LifeCareColors.accent[500],
    accentDark: LifeCareColors.accent[700],
    accentLight: LifeCareColors.accent[100],
    
    // Fonds
    background: LifeCareColors.background.light,
    backgroundSecondary: LifeCareColors.background.card,
    surface: LifeCareColors.background.card,
    
    // Texte
    textPrimary: LifeCareColors.text.primary,
    textSecondary: LifeCareColors.text.secondary,
    textOnPrimary: LifeCareColors.text.light,
    textOnSecondary: LifeCareColors.text.light,
    
    // État
    success: LifeCareColors.status.success,
    warning: LifeCareColors.status.warning,
    error: LifeCareColors.status.error,
    info: LifeCareColors.status.info,
    
    // Médical
    heartRate: LifeCareColors.medical.heartRate,
    bloodPressure: LifeCareColors.medical.bloodPressure,
    temperature: LifeCareColors.medical.temperature,
    oxygen: LifeCareColors.medical.oxygen,
    glucose: LifeCareColors.medical.glucose,
    
 // Onglets et navigation
    tabBar: LifeCareColors.background.card,
    tabBarInactive: LifeCareColors.text.secondary,
    tabBarActive: LifeCareColors.primary[500],
    
    // Bordures et séparateurs
    border: '#E0E0E0',
    divider: '#F5F5F5',
    
    // Ombres
    shadow: '#000000',
    shadowOpacity: 0.1,
  },
  
  dark: {
    // Couleurs principales
    primary: LifeCareColors.primary[500],
    primaryDark: LifeCareColors.primary[300],
    primaryLight: LifeCareColors.primary[700],
    
    secondary: LifeCareColors.secondary[500],
    secondaryDark: LifeCareColors.secondary[300],
    secondaryLight: LifeCareColors.secondary[700],
    
    accent: LifeCareColors.accent[500],
    accentDark: LifeCareColors.accent[300],
    accentLight: LifeCareColors.accent[700],
    
    // Fonds
    background: LifeCareColors.background.dark,
    backgroundSecondary: LifeCareColors.background.cardDark,
    surface: LifeCareColors.background.cardDark,
    
    // Texte
    textPrimary: LifeCareColors.text.light,
    textSecondary: '#BDBDBD',
    textOnPrimary: LifeCareColors.text.light,
    textOnSecondary: LifeCareColors.text.light,
    
    // État
    success: LifeCareColors.status.success,
    warning: LifeCareColors.status.warning,
    error: LifeCareColors.status.error,
    info: LifeCareColors.status.info,
    
    // Médical
    heartRate: LifeCareColors.medical.heartRate,
    bloodPressure: LifeCareColors.medical.bloodPressure,
    temperature: LifeCareColors.medical.temperature,
    oxygen: LifeCareColors.medical.oxygen,
    glucose: LifeCareColors.medical.glucose,
    
    // Onglets et navigation
    tabBar: LifeCareColors.background.cardDark,
    tabBarInactive: '#BDBDBD',
    tabBarActive: LifeCareColors.primary[400],
    
    // Bordures et séparateurs
    border: '#333333',
    divider: '#2C2C2C',
    
    // Ombres
    shadow: '#000000',
    shadowOpacity: 0.3,
  },
};

// Typographie LifeCare
export const LifeCareFonts = {
  ...Platform.select({
    ios: {
      sans: 'SF Pro Display',
      serif: 'New York',
      rounded: 'SF Pro Rounded',
      mono: 'SF Mono',
    },
    android: {
      sans: 'Roboto',
      serif: 'Noto Serif',
      rounded: 'Roboto',
      mono: 'Roboto Mono',
    },
    web: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Georgia, "Times New Roman", serif',
      rounded: '"SF Pro Rounded", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace',
    },
  }),
};

// Tailles de police
export const LifeCareFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

// Espacements
export const LifeCareSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Rayons de bordure
export const LifeCareBorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Ombres
export const LifeCareShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Export par défaut
export default {
  colors: LifeCareTheme,
  fonts: LifeCareFonts,
  fontSizes: LifeCareFontSizes,
  spacing: LifeCareSpacing,
  borderRadius: LifeCareBorderRadius,
  shadows: LifeCareShadows,
};