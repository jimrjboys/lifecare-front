import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';
import { Medication } from '@/src/domain/entities/patient';

export default function MedicationAdminScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  
  const patients = usePatientStore((state) => state.patients);
  const administerMedication = usePatientStore((state) => state.administerMedication);
  const patient = patients.find(p => p.id === id);

  const [scannedMed, setScannedMed] = useState<Medication | null>(null);
  const [notes, setNotes] = useState('');

  if (!patient) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Patient non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </Container>
    );
  }

  const handleScan = () => {
    // Simuler un scan réussi en prenant le premier médicament du patient
    if (patient.medications && patient.medications.length > 0) {
      setScannedMed(patient.medications[0]);
    } else {
      Alert.alert('Erreur', 'Aucun médicament prescrit pour ce patient.');
    }
  };

  const handleConfirm = () => {
    if (!scannedMed) return;

    administerMedication(patient.id, {
      medicationId: scannedMed.id,
      administeredBy: 'Infirmier de garde', // Mocked user
      status: 'administered',
      notes: notes || 'Administration standard effectuée.'
    });

    Alert.alert('Succès', `L'administration de ${scannedMed.name} a été enregistrée.`, [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Administration</Text>

      <Card style={{ marginBottom: 24 }}>
        <Text variant="subtitle">Patient : {patient.firstName} {patient.lastName}</Text>
        <Text variant="secondary">Chambre {patient.room || 'N/A'} • Bracelet #{patient.id.padStart(4, '0')}</Text>
      </Card>

      {!scannedMed ? (
        <View style={styles.scanContainer}>
          <TouchableOpacity 
            style={[styles.scanButton, { borderColor: theme.primary }]}
            onPress={handleScan}
          >
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>SCANNER LE MÉDICAMENT</Text>
            <Text variant="caption" style={{ marginTop: 8 }}>Simuler un scan de code-barres</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Card style={[styles.medCard, { borderLeftColor: theme.primary }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{scannedMed.name} {scannedMed.dosage}</Text>
              <Text variant="secondary">{scannedMed.instructions || 'Pas d\'instructions particulières'}</Text>
              <Text variant="caption" style={{ marginTop: 4 }}>Prescrit : {scannedMed.frequency}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: theme.success + '20' }]}>
              <Text style={{ color: theme.success, fontSize: 12, fontWeight: 'bold' }}>VALIDE</Text>
            </View>
          </Card>

          <View style={styles.form}>
            <Text variant="subtitle" style={{ marginBottom: 12 }}>Notes d'administration</Text>
            <Card style={{ padding: 16 }}>
              <Text variant="secondary">L'administration sera enregistrée sous votre nom.</Text>
            </Card>
          </View>

          <Button 
            title="Confirmer l'Administration" 
            onPress={handleConfirm} 
            style={{ marginTop: 24 }}
          />
          <Button 
            title="Annuler" 
            variant="outline" 
            onPress={() => setScannedMed(null)} 
            style={{ marginTop: 12, marginBottom: 40 }}
          />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  scanContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: '80%',
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  form: {
    marginTop: 10,
  }
});
