import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Button, Logo } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme } = useLifeCareTheme();

  return (
    <Container scrollable={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo size={120} />
        </View>
        
        <View style={styles.textContainer}>
          <Text variant="title" style={styles.title}>LifeCare</Text>
          <Text variant="subtitle" style={styles.subtitle}>
            Intelligence Artificielle & Gestion Médicale
          </Text>
          <Text variant="body" style={styles.description}>
            La plateforme de santé nouvelle génération pour les professionnels.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button 
            title="DÉMARRER" 
            onPress={() => router.push('/(auth)/login')} 
            style={styles.button}
          />
          <Text variant="caption" style={styles.version}>v1.0.0 Premium</Text>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 450,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0077B6',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#00B4D8',
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 30,
  },
  version: {
    marginTop: 20,
    color: '#999',
  }
});
