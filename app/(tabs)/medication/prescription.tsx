import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Input, Button, Card } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function PrescriptionScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const patients = usePatientStore((state) => state.patients);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const patient = patients.find(p => p.id === id);

  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
  });

  if (!patient) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Patient non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </Container>
    );
  }

  const handleSave = () => {
    if (!form.name || !form.dosage || !form.frequency) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires.');
      return;
    }

    const newMedication = {
      id: Math.random().toString(36).substring(7),
      ...form
    };

    const currentMedications = patient.medications || [];
    updatePatient(patient.id, {
      medications: [...currentMedications, newMedication]
    });

    Alert.alert('Succès', 'Prescription ajoutée.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Nouvelle Prescription</Text>
      <Text variant="secondary" style={{ marginBottom: 20 }}>Pour: {patient.firstName} {patient.lastName}</Text>

      <Card>
        <Input
          label="Nom du Médicament *"
          placeholder="Ex: Amoxicilline"
          value={form.name}
          onChangeText={(v) => setForm({ ...form, name: v })}
        />
        <Input
          label="Dosage *"
          placeholder="Ex: 500mg"
          value={form.dosage}
          onChangeText={(v) => setForm({ ...form, dosage: v })}
        />
        <Input
          label="Fréquence *"
          placeholder="Ex: 2x / jour"
          value={form.frequency}
          onChangeText={(v) => setForm({ ...form, frequency: v })}
        />
        <Input
          label="Instructions particulières"
          placeholder="Ex: À prendre au milieu du repas"
          value={form.instructions}
          onChangeText={(v) => setForm({ ...form, instructions: v })}
          style={{ height: 80 }}
        />
      </Card>

      <View style={{ marginTop: 24, marginBottom: 40 }}>
        <Button title="Valider la prescription" onPress={handleSave} />
        <Button 
            title="Annuler" 
            variant="outline" 
            onPress={() => router.back()} 
            style={{ marginTop: 12 }}
        />
      </View>
    </Container>
  );
}
