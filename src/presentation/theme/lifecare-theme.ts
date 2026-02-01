/**
 * LifeCare Theme - Thème médical professionnel
 * Couleurs inspirées du secteur médical : Bleu (Confiance) & Teal (Soin)
 */

// Palette de couleurs LifeCare (Blue & Teal)
const LifeCareColors = {
  // Couleurs principales - Bleu médical (Confiance, Technologie)
  primary: {
    50: '#E1F5FE',
    100: '#B3E5FC',
    500: '#0077B6',  // Bleu principal
    600: '#023E8A',
    700: '#03045E',
    900: '#001233',
  },
  
  // Couleurs secondaires - Teal (Apaisement, Soin)
  secondary: {
    50: '#E0F7FA',
    100: '#B2EBF2',
    500: '#00B4D8',  // Teal principal
    600: '#0096C7',
    700: '#0077B6',
    900: '#023E8A',
  },
  
  // Couleurs d'accent - Corail (Vitalité, Urgence contrôlée)
  accent: {
    50: '#FBE9E7',
    100: '#FFCCBC',
    500: '#E76F51',
    600: '#D84315',
    700: '#BF360C',
  },
  
  // Couleurs de fond
  background: {
    light: '#F8F9FA',
    dark: '#121212',
    card: '#FFFFFF',
    cardDark: '#1E1E1E',
  },
  
  // Couleurs de texte
  text: {
    primary: '#1A1A1A',
    secondary: '#6C757D',
    disabled: '#ADB5BD',
    light: '#FFFFFF',
    dark: '#000000',
  },
  
  // Couleurs d'état
  status: {
    success: '#2A9D8F', // Teal sombre
    warning: '#E9C46A', // Ambre doux
    error: '#E76F51',   // Corail rouge
    info: '#0077B6',    // Bleu primaire
  },
  
  // Couleurs médicales spécifiques
  medical: {
    heartRate: '#E76F51',    // Rouge/Corail
    bloodPressure: '#9C27B0', // Violet standard
    temperature: '#E9C46A',   // Ambre/Orange
    oxygen: '#00B4D8',        // Bleu cyan
    glucose: '#2A9D8F',       // Vert/Teal
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
    backgroundSecondary: '#F1F3F5',
    surface: LifeCareColors.background.card,
    card: LifeCareColors.background.card,
    
    // Texte
    textPrimary: LifeCareColors.text.primary,
    textSecondary: LifeCareColors.text.secondary,
    textOnPrimary: LifeCareColors.text.light,
    textOnSecondary: LifeCareColors.text.light,
    
    // États
    success: LifeCareColors.status.success,
    warning: LifeCareColors.status.warning,
    error: LifeCareColors.status.error,
    info: LifeCareColors.status.info,
    
    // Médical
    medical: LifeCareColors.medical,
  },
  
  dark: {
    // Couleurs principales (ajustées pour dark mode)
    primary: '#48CAE4', // Plus lumineux
    primaryDark: LifeCareColors.primary[600],
    primaryLight: LifeCareColors.primary[900],
    
    secondary: '#90E0EF',
    secondaryDark: LifeCareColors.secondary[600],
    secondaryLight: LifeCareColors.secondary[900],
    
    accent: '#F4A261',
    accentDark: LifeCareColors.accent[600],
    accentLight: LifeCareColors.accent[900],
    
    // Fonds
    background: LifeCareColors.background.dark,
    backgroundSecondary: '#2C2C2C',
    surface: LifeCareColors.background.cardDark,
    card: LifeCareColors.background.cardDark,
    
    // Texte
    textPrimary: '#E0E0E0',
    textSecondary: '#A0A0A0',
    textOnPrimary: LifeCareColors.text.dark,
    textOnSecondary: LifeCareColors.text.dark,
    
    // États
    success: '#2A9D8F',
    warning: '#E9C46A',
    error: '#E76F51',
    info: '#48CAE4',
    
    // Médical
    medical: LifeCareColors.medical,
  },
};

// Espacement standard
export const LifeCareSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Rayons de bordure
export const LifeCareBorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Ombres
export const LifeCareShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};
