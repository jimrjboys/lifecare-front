import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function DashboardScreen() {
  console.log('DashboardScreen rendering...');
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  
  return (
    <Container scrollable>
      <View style={styles.header}>
        <View>
          <Text variant="title">Bonjour, Dr. Martin</Text>
          <Text variant="secondary">Lundi 1 Février 2026</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text>Dashboard is working!</Text>
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
