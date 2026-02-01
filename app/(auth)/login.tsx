import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useLifeCareTheme();
  const router = useRouter();

  const handleLogin = () => {
    // Statis logic: navigate to dashboard
    router.replace('/(tabs)');
  };

  return (
    <Container style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={[styles.logoPlaceholder, { backgroundColor: theme.primary }]}>
          <Text variant="title" style={{ color: '#fff', fontSize: 40 }}>LC</Text>
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
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  }
});
