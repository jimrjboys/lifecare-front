import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button, Logo } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { apiClient } from '@/src/infrastructure/api/api-client';
import { useAuthStore } from '@/src/application/stores/auth-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useLifeCareTheme();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      setAuth(response.user, response.token);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur de connexion', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Logo size={120} />
        </View>
        <Text variant="title" style={styles.title}>LifeCare</Text>
        <Text variant="secondary">Solution Médicale Intégrée</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email Professionnel"
          placeholder="nom@hopital.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          label="Mot de passe"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Button 
          title="Se connecter" 
          onPress={handleLogin} 
          loading={isLoading}
          style={{ marginTop: 10 }}
        />
        
        <Button 
          title="Authentification Biométrique" 
          variant="outline" 
          onPress={() => {}} 
          style={{ marginTop: 16 }}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="caption">Version 1.0.0 • Mode Hors-ligne disponible</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  }
});
