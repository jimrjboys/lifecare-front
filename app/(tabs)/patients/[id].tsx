import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function PatientProfileScreen() {
  const { id } = useLocalSearchParams();
  const { theme, styles: themeStyles } = useLifeCareTheme();
  const router = useRouter();
  
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Patient non trouvé</Text>
          <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
        </View>
      </Container>
    );
  }

  // Calcul de l'âge
  const birthDate = new Date(patient.birthDate);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  // Dernières constantes
  const lastVitals = patient.vitals && patient.vitals.length > 0 
    ? patient.vitals[patient.vitals.length - 1] 
    : null;

  const borderStyle = { borderBottomColor: theme.backgroundSecondary };

  return (
    <Container scrollable>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={{ color: theme.textOnPrimary, fontSize: 32, fontWeight: 'bold' }}>
            {patient.firstName[0]}{patient.lastName[0]}
          </Text>
        </View>
        <Text variant="title" style={{ marginTop: 12 }}>{patient.firstName} {patient.lastName}</Text>
        <Text variant="secondary">{patient.gender === 'M' ? 'Masculin' : 'Féminin'}, {age} ans • Chambre {patient.room || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Informations Médicales</Text>
        <Card>
          <View style={[styles.infoRow, borderStyle]}>
            <Text variant="secondary">NSS</Text>
            <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>{patient.socialSecurityNumber || 'N/A'}</Text>
          </View>
          <View style={[styles.infoRow, borderStyle]}>
            <Text variant="secondary">Groupe Sanguin</Text>
            <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>{patient.bloodType || 'Inconnu'}</Text>
          </View>
          <View style={[styles.infoRow, borderStyle]}>
            <Text variant="secondary">Allergies</Text>
            <Text style={{ color: theme.error, fontWeight: 'bold' }}>{patient.allergies?.join(', ') || 'Aucune'}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text variant="secondary">Conditions</Text>
            <Text style={{ textAlign: 'right', flex: 1, color: theme.textPrimary }}>{patient.conditions?.join(', ') || 'Aucune'}</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text variant="subtitle">Dernières Constantes</Text>
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
            <Text style={[styles.vitalValue, { color: theme.textPrimary }]}>{lastVitals ? `${lastVitals.bloodPressureSys}/${lastVitals.bloodPressureDia}` : '--'}</Text>
          </Card>
          <Card style={styles.vitalCard}>
            <Text variant="caption">Pouls</Text>
            <Text style={[styles.vitalValue, { color: theme.textPrimary }]}>{lastVitals?.heartRate ? `${lastVitals.heartRate} bpm` : '--'}</Text>
          </Card>
          <Card style={styles.vitalCard}>
            <Text variant="caption">Temp.</Text>
            <Text style={[styles.vitalValue, { color: theme.textPrimary }]}>{lastVitals?.temperature ? `${lastVitals.temperature}°C` : '--'}</Text>
          </Card>
          <Card style={styles.vitalCard}>
            <Text variant="caption">SpO2</Text>
            <Text style={[styles.vitalValue, { color: theme.textPrimary }]}>{lastVitals?.oxygenSaturation ? `${lastVitals.oxygenSaturation}%` : '--'}</Text>
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
