import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';
import { useAuthStore } from '@/src/application/stores/auth-store';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function DashboardScreen() {
  const router = useRouter();
  const { styles: themeStyles, theme } = useLifeCareTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { patients, fetchPatients, isLoading } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleLogout = () => {
    logout();
    if (Platform.OS === 'web') {
      window.location.href = '/(auth)/login';
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={themeStyles.textSecondary}>Bonjour,</Text>
          <Text style={themeStyles.titleLarge}>
            {user ? `${user.firstName} ${user.lastName}` : 'Utilisateur'}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={handleLogout}
          style={[styles.profileButton, { backgroundColor: theme.primary + '15' }]}
        >
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Sortir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: theme.primary }]}>{patients.length}</Text>
          <Text style={themeStyles.textSecondary}>Patients</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: theme.accent }]}>3</Text>
          <Text style={themeStyles.textSecondary}>Alertes</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: theme.success }]}>12</Text>
          <Text style={themeStyles.textSecondary}>Visites</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[themeStyles.titleMedium, styles.sectionTitle]}>Patients Récents</Text>
        {isLoading ? (
          <Text>Chargement...</Text>
        ) : (
          patients.slice(0, 3).map((patient) => (
            <Card key={patient.id} style={styles.patientCard}>
              <View>
                <Text style={{ fontWeight: '600' }}>{patient.firstName} {patient.lastName}</Text>
                <Text style={themeStyles.textSecondary}>{patient.condition || 'Suivi général'}</Text>
              </View>
              <Text style={{ color: theme.primary }}>Détails</Text>
            </Card>
          ))
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '30%',
    alignItems: 'center',
    padding: 15,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  patientCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  }
});
