/**
 * LifeCare UI Components - Thème médical professionnel
 * Composants stylisés pour une application médicale moderne
 */

import { StyleSheet } from 'react-native';
import { LifeCareTheme, LifeCareSpacing, LifeCareBorderRadius, LifeCareShadows } from '../constants/lifecare-theme';

// Styles de base pour les composants LifeCare
export const LifeCareStyles = StyleSheet.create({
  // Conteneurs
  container: {
    flex: 1,
    padding: LifeCareSpacing.md,
    backgroundColor: LifeCareTheme.light.background,
  },
  
  card: {
    backgroundColor: LifeCareTheme.light.surface,
    borderRadius: LifeCareBorderRadius.lg,
    padding: LifeCareSpacing.lg,
    marginBottom: LifeCareSpacing.md,
    ...LifeCareShadows.md,
  },
  
  // Boutons
  buttonPrimary: {
    backgroundColor: LifeCareTheme.light.primary,
    borderRadius: LifeCareBorderRadius.xl,
    paddingVertical: LifeCareSpacing.md,
    paddingHorizontal: LifeCareSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...LifeCareShadows.sm,
  },
  
  buttonSecondary: {
    backgroundColor: LifeCareTheme.light.secondary,
    borderRadius: LifeCareBorderRadius.xl,
    paddingVertical: LifeCareSpacing.md,
    paddingHorizontal: LifeCareSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...LifeCareShadows.sm,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: LifeCareTheme.light.primary,
    borderRadius: LifeCareBorderRadius.xl,
    paddingVertical: LifeCareSpacing.md,
    paddingHorizontal: LifeCareSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Texte
  textPrimary: {
    color: LifeCareTheme.light.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  
  textSecondary: {
    color: LifeCareTheme.light.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  
  textButton: {
    color: LifeCareTheme.light.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  textButtonOutline: {
    color: LifeCareTheme.light.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Titres
  titleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LifeCareTheme.light.textPrimary,
    marginBottom: LifeCareSpacing.sm,
  },
  
  titleMedium: {
    fontSize: 20,
    fontWeight: '600',
    color: LifeCareTheme.light.textPrimary,
    marginBottom: LifeCareSpacing.sm,
  },
  
  titleSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: LifeCareTheme.light.textPrimary,
    marginBottom: LifeCareSpacing.xs,
  },
  
  // Indicateurs médicaux
  vitalSignCard: {
    backgroundColor: LifeCareTheme.light.surface,
    borderRadius: LifeCareBorderRadius.lg,
    padding: LifeCareSpacing.md,
    marginBottom: LifeCareSpacing.sm,
    borderLeftWidth: 4,
    ...LifeCareShadows.sm,
  },
  
  heartRateCard: {
    borderLeftColor: LifeCareTheme.light.heartRate,
  },
  
  bloodPressureCard: {
    borderLeftColor: LifeCareTheme.light.bloodPressure,
  },
  
  temperatureCard: {
    borderLeftColor: LifeCareTheme.light.temperature,
  },
  
  oxygenCard: {
    borderLeftColor: LifeCareTheme.light.oxygen,
  },
  
  glucoseCard: {
    borderLeftColor: LifeCareTheme.light.glucose,
  },
  
  // Barre de navigation
  tabBar: {
    backgroundColor: LifeCareTheme.light.tabBar,
    borderTopWidth: 1,
    borderTopColor: LifeCareTheme.light.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
  
  // Champs de saisie
  input: {
    backgroundColor: LifeCareTheme.light.surface,
    borderWidth: 1,
    borderColor: LifeCareTheme.light.border,
    borderRadius: LifeCareBorderRadius.md,
    paddingHorizontal: LifeCareSpacing.md,
    paddingVertical: LifeCareSpacing.sm,
    fontSize: 16,
    color: LifeCareTheme.light.textPrimary,
  },
  
  inputFocused: {
    borderColor: LifeCareTheme.light.primary,
    borderWidth: 2,
  },
  
  // Alertes et notifications
  alertSuccess: {
    backgroundColor: LifeCareTheme.light.success + '20',
    borderWidth: 1,
    borderColor: LifeCareTheme.light.success,
    borderRadius: LifeCareBorderRadius.md,
    padding: LifeCareSpacing.md,
    marginBottom: LifeCareSpacing.md,
  },
  
  alertWarning: {
    backgroundColor: LifeCareTheme.light.warning + '20',
    borderWidth: 1,
    borderColor: LifeCareTheme.light.warning,
    borderRadius: LifeCareBorderRadius.md,
    padding: LifeCareSpacing.md,
    marginBottom: LifeCareSpacing.md,
  },
  
  alertError: {
    backgroundColor: LifeCareTheme.light.error + '20',
    borderWidth: 1,
    borderColor: LifeCareTheme.light.error,
    borderRadius: LifeCareBorderRadius.md,
    padding: LifeCareSpacing.md,
    marginBottom: LifeCareSpacing.md,
  },
  
  alertInfo: {
    backgroundColor: LifeCareTheme.light.info + '20',
    borderWidth: 1,
    borderColor: LifeCareTheme.light.info,
    borderRadius: LifeCareBorderRadius.md,
    padding: LifeCareSpacing.md,
    marginBottom: LifeCareSpacing.md,
  },
});

// Styles pour le mode sombre
export const LifeCareDarkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: LifeCareSpacing.md,
    backgroundColor: LifeCareTheme.dark.background,
  },
  
  card: {
    backgroundColor: LifeCareTheme.dark.surface,
    borderRadius: LifeCareBorderRadius.lg,
    padding: LifeCareSpacing.lg,
    marginBottom: LifeCareSpacing.md,
    ...LifeCareShadows.md,
  },
  
  buttonPrimary: {
    backgroundColor: LifeCareTheme.dark.primary,
    borderRadius: LifeCareBorderRadius.xl,
    paddingVertical: LifeCareSpacing.md,
    paddingHorizontal: LifeCareSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...LifeCareShadows.sm,
  },
  
  textPrimary: {
    color: LifeCareTheme.dark.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  
  textSecondary: {
    color: LifeCareTheme.dark.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  
  input: {
    backgroundColor: LifeCareTheme.dark.surface,
    borderWidth: 1,
    borderColor: LifeCareTheme.dark.border,
    borderRadius: LifeCareBorderRadius.md,
    paddingHorizontal: LifeCareSpacing.md,
    paddingVertical: LifeCareSpacing.sm,
    fontSize: 16,
    color: LifeCareTheme.dark.textPrimary,
  },
  
  tabBar: {
    backgroundColor: LifeCareTheme.dark.tabBar,
    borderTopWidth: 1,
    borderTopColor: LifeCareTheme.dark.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export default {
  light: LifeCareStyles,
  dark: LifeCareDarkStyles,
};