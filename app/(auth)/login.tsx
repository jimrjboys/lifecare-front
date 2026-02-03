import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button, Logo } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('andryjimmyras@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { theme } = useLifeCareTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      if (Platform.OS === 'web') alert('Veuillez remplir tous les champs');
      else Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    console.log('Tentative de connexion...');
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.token) {
        if (Platform.OS === 'web') {
          localStorage.setItem('auth-storage', JSON.stringify({
            state: { user: data.user, token: data.token }
          }));
          window.location.href = '/(tabs)';
        } else {
          // Pour mobile, on utiliserait le store Zustand
          // Mais pour l'instant on garde la redirection web-first
          router.replace('/(tabs)');
        }
      } else {
        const errorMsg = data.message || 'Identifiants invalides';
        if (Platform.OS === 'web') alert('Erreur: ' + errorMsg);
        else Alert.alert('Erreur', errorMsg);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (Platform.OS === 'web') alert('Erreur de connexion au serveur');
      else Alert.alert('Erreur', 'Impossible de contacter le serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container scrollable={false} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%', justifyContent: 'center' }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Logo size={80} />
            <Text variant="title" style={styles.title}>Connexion</Text>
            <Text variant="body" style={styles.subtitle}>Accédez à votre espace professionnel LifeCare</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="votre@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text variant="caption" style={{ color: theme.primary, fontWeight: 'bold' }}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            <Button 
              title={isLoading ? "Connexion en cours..." : "SE CONNECTER"} 
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    color: '#777',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    marginTop: 10,
  }
});
