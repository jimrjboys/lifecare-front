import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button, AlertBanner } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';
import { apiClient } from '@/src/infrastructure/api/api-client';

export default function MedicalDashboardScreen() {
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const { patients, tasks, fetchTasks, isLoading, updateTaskStatus, fetchPatients } = usePatientStore();
  const [aiAlerts, setAiAlerts] = React.useState<any[]>([]);

  useEffect(() => {
    fetchTasks();
    if (patients.length === 0) {
      fetchPatients();
    }
  }, []);

  // Fetch AI diagnostics for all patients to detect risks
  useEffect(() => {
    const fetchAiAlerts = async () => {
      if (patients.length === 0) return;
      
      const alerts: any[] = [];
      // Pour éviter de saturer l'API, on ne prend que les 3 premiers patients actifs
      const activePatients = patients.slice(0, 3);
      
      for (const p of activePatients) {
        try {
          // On utilise un cache local ou on vérifie si on a déjà des alertes
          const diagnostic = await apiClient.get(`/medical/ai-diagnostic/${p.id}`);
          if (diagnostic && diagnostic.score < 60) {
            alerts.push({
              id: `ai-alert-${p.id}`,
              title: `Alerte IA : ${p.firstName} ${p.lastName}`,
              message: diagnostic.summary,
              patientId: p.id,
              type: diagnostic.score < 40 ? 'error' : 'warning'
            });
          }
        } catch (e) {
          console.error(`Error fetching AI alert for ${p.id}:`, e);
        }
      }
      setAiAlerts(alerts);
    };

    fetchAiAlerts();
  }, [patients]);

  // Simulation d'alertes critiques basées sur les données réelles
  const criticalAlerts = [
    ...aiAlerts,
    ...patients.flatMap(p => {
    const alerts = [];
    const lastVitals = p.vitals?.[0]; // Les vitals sont triés par desc dans le store généralement
    if (lastVitals) {
      if (lastVitals.oxygenSaturation < 92) {
        alerts.push({
          id: `alert-spo2-${p.id}`,
          title: 'Désaturation Critique',
          message: `${p.firstName} ${p.lastName} présente une SpO2 de ${lastVitals.oxygenSaturation}%`,
          patientId: p.id,
          type: 'error' as const
        });
      }
      if (lastVitals.heartRate > 120 || lastVitals.heartRate < 45) {
        alerts.push({
          id: `alert-hr-${p.id}`,
          title: 'Alerte Fréquence Cardiaque',
          message: `${p.firstName} ${p.lastName} : Pouls anormal (${lastVitals.heartRate} bpm)`,
          patientId: p.id,
          type: 'warning' as const
        });
      }
    }
    return alerts;
  });

  const taskStats = [
    { 
      id: 'vitals', 
      title: 'Constantes à prendre', 
      count: tasks.filter(t => t.type === 'vitals' && t.status === 'pending').length, 
      icon: '🌡️', 
      color: theme.medical.temperature 
    },
    { 
      id: 'meds', 
      title: 'Médicaments', 
      count: tasks.filter(t => t.type === 'medication' && t.status === 'pending').length, 
      icon: '💊', 
      color: theme.primary 
    },
    { 
      id: 'care', 
      title: 'Soins infirmiers', 
      count: tasks.filter(t => t.type === 'care' && t.status === 'pending').length, 
      icon: '🩹', 
      color: theme.secondary 
    },
  ];

  const pendingTasks = tasks.filter(t => t.status === 'pending').slice(0, 5);

  if (isLoading && tasks.length === 0) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }} scrollable={false}>
        <ActivityIndicator size="large" color={theme.primary} />
      </Container>
    );
  }

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="title">Suivi Médical</Text>
        <Text variant="secondary">Vue d'ensemble des soins - {new Date().toLocaleDateString('fr-FR')}</Text>
      </View>

      {criticalAlerts.length > 0 && (
        <View style={{ marginBottom: 15 }}>
          {criticalAlerts.map(alert => (
            <AlertBanner 
              key={alert.id}
              title={alert.title}
              message={alert.message}
              type={alert.type}
              onPress={() => router.push(`/(tabs)/patients/${alert.patientId}`)}
            />
          ))}
        </View>
      )}

      <View style={styles.tasksGrid}>
        {taskStats.map((stat) => (
          <Card key={stat.id} style={styles.taskStatCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <Text style={{ fontSize: 24 }}>{stat.icon}</Text>
            </View>
            <View style={styles.taskInfo}>
              <Text style={{ fontWeight: 'bold' }}>{stat.title}</Text>
              <Text variant="caption" style={{ color: theme.textSecondary }}>{stat.count} tâches en attente</Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text variant="subtitle">Tâches prioritaires</Text>
        <Button title="Voir tout" variant="outline" style={{ paddingVertical: 4, paddingHorizontal: 12 }} />
      </View>

      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => {
          const patient = patients.find(p => p.id === task.patientId);
          return (
            <Card key={task.id} style={styles.taskListItem}>
              <View style={styles.taskMainInfo}>
                <Text style={{ fontWeight: 'bold' }}>{task.title}</Text>
                <Text variant="caption">{patient ? `${patient.firstName} ${patient.lastName} - Ch. ${patient.room}` : 'Patient inconnu'}</Text>
              </View>
              <Button 
                title="Fait" 
                onPress={() => updateTaskStatus(task.id, 'completed')}
                style={{ paddingVertical: 6, paddingHorizontal: 12 }}
              />
            </Card>
          );
        })
      ) : (
        <Card style={{ padding: 20, alignItems: 'center' }}>
          <Text variant="secondary">Aucune tâche en attente pour le moment.</Text>
        </Card>
      )}

      <Text variant="subtitle" style={{ marginVertical: 15, marginTop: 25 }}>Patients Récents</Text>
      
      {patients.slice(0, 5).map((item) => (
        <TouchableOpacity 
          key={item.id}
          onPress={() => router.push(`/(tabs)/patients/${item.id}`)}
        >
          <Card style={styles.patientCard}>
            <View style={styles.patientInfo}>
              <Text style={{ fontWeight: 'bold' }}>{item.firstName} {item.lastName}</Text>
              <Text variant="caption">Chambre {item.room || 'N/A'}</Text>
            </View>
            <Button 
              title="Soins" 
              onPress={() => router.push(`/(tabs)/patients/${item.id}`)}
              style={{ paddingVertical: 6, paddingHorizontal: 12 }}
            />
          </Card>
        </TouchableOpacity>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
  },
  tasksGrid: {
    gap: 12,
    marginBottom: 25,
  },
  taskStatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0077B6',
  },
  taskMainInfo: {
    flex: 1,
  },
  patientCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  patientInfo: {
    flex: 1,
  }
});
