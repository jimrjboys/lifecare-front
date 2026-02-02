import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function MedicalDashboardScreen() {
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const patients = usePatientStore((state) => state.patients);

  const medicalTasks = [
    { id: '1', title: 'Constantes à prendre', count: 5, icon: '🌡️', color: theme.medical.temperature },
    { id: '2', title: 'Médicaments à administrer', count: 12, icon: '💊', color: theme.primary },
    { id: '3', title: 'Évaluations IA', count: 2, icon: '🧠', color: theme.secondary },
  ];

  return (
    <Container>
      <View style={styles.header}>
        <Text variant="title">Suivi Médical</Text>
        <Text variant="secondary">Vue d'ensemble des soins</Text>
      </View>

      <View style={styles.tasksGrid}>
        {medicalTasks.map((task) => (
          <Card key={task.id} style={styles.taskCard}>
            <View style={[styles.iconContainer, { backgroundColor: task.color + '20' }]}>
              <Text style={{ fontSize: 24 }}>{task.icon}</Text>
            </View>
            <View style={styles.taskInfo}>
              <Text style={{ fontWeight: 'bold' }}>{task.title}</Text>
              <Text variant="caption" style={{ color: theme.textSecondary }}>{task.count} tâches en attente</Text>
            </View>
          </Card>
        ))}
      </View>

      <Text variant="subtitle" style={{ marginVertical: 15 }}>Patients Récents</Text>
      
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => router.push(`/(tabs)/patients/${item.id}`)}
          >
            <Card style={styles.patientCard}>
              <View style={styles.patientInfo}>
                <Text style={{ fontWeight: 'bold' }}>{item.firstName} {item.lastName}</Text>
                <Text variant="caption">Chambre {item.room || 'N/A'}</Text>
              </View>
              <Button 
                title="Constantes" 
                onPress={() => router.push({ pathname: '/(tabs)/medical/vitals/index', params: { id: item.id } })}
                style={{ paddingVertical: 6, paddingHorizontal: 12 }}
              />
            </Card>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
  },
  tasksGrid: {
    gap: 12,
    marginBottom: 20,
  },
  taskCard: {
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
