import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function PatientProfileScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useLifeCareTheme();
  const router = useRouter();

  // Mock data for a single patient
  const patient = {
    id,
    name: 'Jean Dupont',
    age: 65,
    gender: 'Masculin',
    room: '204',
    bloodType: 'A+',
    allergies: 'Pénicilline',
    conditions: 'Hypertension, Diabète Type 2',
    lastVitals: {
      bp: '130/85',
      hr: '72 bpm',
      temp: '37.1°C',
      spo2: '98%'
    }
  };

  return (
    <Container scrollable>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold' }}>JD</Text>
        </View>
        <Text variant="title" style={{ marginTop: 12 }}>{patient.name}</Text>
        <Text variant="secondary">{patient.gender}, {patient.age} ans • Chambre {patient.room}</Text>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Informations Médicales</Text>
        <Card>
          <View style={styles.infoRow}>
            <Text variant="secondary">Groupe Sanguin</Text>
            <Text style={{ fontWeight: 'bold' }}>{patient.bloodType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="secondary">Allergies</Text>
            <Text style={{ color: theme.error, fontWeight: 'bold' }}>{patient.allergies}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="secondary">Conditions</Text>
            <Text style={{ textAlign: 'right', flex: 1 }}>{patient.conditions}</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="subtitle" style={styles.sectionTitle}>Dernières Constantes</Text>
          <Button 
            title="Historique" 
            variant="outline" 
            onPress={() => router.push(`/(tabs)/medical/vitals?id=${id}`)}
            style={{ paddingVertical: 4, paddingHorizontal: 12 }}
          />
        </View>
        <View style={styles.vitalsGrid}>
          <Card style={styles.vitalCard}>
            <Text variant="caption">Tension</Text>
            <Text style={styles.vitalValue}>{patient.lastVitals.bp}</Text>
          </Card>
          <Card style={styles.vitalCard}>
            <Text variant="caption">Pouls</Text>
            <Text style={styles.vitalValue}>{patient.lastVitals.hr}</Text>
          </Card>
          <Card style={styles.vitalCard}>
            <Text variant="caption">Temp.</Text>
            <Text style={styles.vitalValue}>{patient.lastVitals.temp}</Text>
          </Card>
          <Card style={styles.vitalCard}>
            <Text variant="caption">SpO2</Text>
            <Text style={styles.vitalValue}>{patient.lastVitals.spo2}</Text>
          </Card>
        </View>
      </View>

      <View style={styles.actions}>
        <Button 
          title="Saisir Constantes" 
          onPress={() => router.push(`/(tabs)/medical/vitals/new?id=${id}`)} 
        />
        <Button 
          title="Évaluation IA" 
          variant="secondary" 
          onPress={() => router.push(`/(tabs)/medical/ai-evaluation?id=${id}`)} 
          style={{ marginTop: 12 }}
        />
        <Button 
          title="Administrer Médicament" 
          variant="outline" 
          onPress={() => router.push(`/(tabs)/medication/admin?id=${id}`)} 
          style={{ marginTop: 12 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  vitalCard: {
    width: '47%',
    margin: '1.5%',
    padding: 12,
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actions: {
    marginTop: 10,
    paddingBottom: 40,
  }
});
