import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const patients = usePatientStore((state) => state.patients);
  
  const stats = [
    { label: 'Patients', value: patients.length.toString(), icon: '👥' },
    { label: 'Alertes', value: '1', icon: '⚠️', color: '#e74c3c' },
    { label: 'Soins dus', value: '8', icon: '📋' },
  ];

  // Données simulées pour le graphique d'activité
  const activityData = [10, 25, 18, 40, 32, 55, 45];
  const contentInset = { top: 20, bottom: 20 };

  return (
    <Container scrollable>
      <View style={styles.header}>
        <View>
          <Text variant="title">Bonjour, Dr. Martin</Text>
          <Text variant="secondary">Lundi 1 Février 2026</Text>
        </View>
        <TouchableOpacity 
          style={[styles.profileButton, { backgroundColor: theme.primary + '20' }]}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <Text style={{ fontSize: 20 }}>👨‍⚕️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Text style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</Text>
            <Text style={[styles.statValue, stat.color ? { color: stat.color } : {}]}>{stat.value}</Text>
            <Text variant="caption">{stat.label}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="subtitle">Alertes Urgentes</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: theme.primary }}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        
        <Card style={[styles.alertCard, { borderLeftColor: theme.error }]}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>Robert Martin (Ch. 312)</Text>
            <Text variant="caption">Tension critique : 180/110 mmHg</Text>
          </View>
          <Button 
            title="Agir" 
            onPress={() => router.push('/(tabs)/patients/3')} 
            style={{ paddingVertical: 6, paddingHorizontal: 12 }}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Accès Rapide</Text>
        <View style={styles.quickActions}>
          <QuickActionButton 
            label="Patients" 
            icon="👥" 
            onPress={() => router.push('/(tabs)/patients')} 
          />
          <QuickActionButton 
            label="Scanner" 
            icon="📸" 
            onPress={() => router.push('/(tabs)/medication/admin')} 
          />
          <QuickActionButton 
            label="IA" 
            icon="🧠" 
            onPress={() => router.push('/(tabs)/medical/ai-evaluation')} 
          />
          <QuickActionButton 
            label="Factures" 
            icon="💳" 
            onPress={() => router.push('/(tabs)/finance/invoice-new')} 
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Évolution du Service</Text>
        <Card style={styles.chartCard}>
          <Text variant="secondary" style={{ marginBottom: 15 }}>Activité de la semaine</Text>
          <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundSecondary, borderRadius: 8 }}>
            <Text variant="secondary">Graphique d'activité temporairement désactivé</Text>
          </View>
        </Card>
      </View>
    </Container>
  );
}

const QuickActionButton = ({ label, icon, onPress }: any) => {
  const { theme } = useLifeCareTheme();
  return (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: theme.primary + '10' }]}>
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </View>
      <Text variant="caption" style={{ marginTop: 4 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    padding: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '22%',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCard: {
    padding: 16,
    minHeight: 250,
  }
});
