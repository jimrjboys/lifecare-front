import React from 'react';
import { View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { useUIStore } from '@/src/application/stores/ui-store';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, isDark } = useLifeCareTheme();
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const styles = StyleSheet.create({
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      marginBottom: 12,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    }
  });

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Paramètres</Text>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Application</Text>
        <Card>
          <View style={styles.settingRow}>
            <Text>Mode Sombre</Text>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.primary }}
              thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text>Notifications Push</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
          <View style={styles.settingRow}>
            <Text>Mode Hors-ligne</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Sécurité</Text>
        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Changer le mot de passe</Text>
            <Text variant="caption">></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Authentification Biométrique</Text>
            <Text variant="caption">Configuré</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Text>Journal d'activité</Text>
            <Text variant="caption">></Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Support</Text>
        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Centre d'aide</Text>
            <Text variant="caption">></Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Text>À propos de LifeCare</Text>
            <Text variant="caption">v1.0.0</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <Button 
        title="Déconnexion" 
        variant="outline" 
        onPress={() => router.replace('/(auth)/login')} 
        style={{ marginTop: 20, marginBottom: 40, borderColor: theme.error }}
      />
    </Container>
  );
}
