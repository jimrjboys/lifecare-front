import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button, Card } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function NewPatientScreen() {
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const addPatient = usePatientStore((state) => state.addPatient);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'M' as 'M' | 'F' | 'O',
    room: '',
    socialSecurityNumber: '',
    bloodType: '',
    allergies: '',
    conditions: '',
  });

  const handleSave = async () => {
    if (!form.firstName || !form.lastName || !form.room) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires (Nom, Prénom, Chambre).');
      return;
    }

    try {
      await addPatient({
        firstName: form.firstName,
        lastName: form.lastName,
        birthDate: form.birthDate || new Date().toISOString().split('T')[0],
        gender: form.gender,
        room: form.room,
        socialSecurityNumber: form.socialSecurityNumber,
        bloodType: form.bloodType,
        allergies: form.allergies ? form.allergies.split(',').map(s => s.trim()) : [],
        conditions: form.conditions ? form.conditions.split(',').map(s => s.trim()) : [],
      });

      Alert.alert('Succès', 'Patient admis avec succès.', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/patients') }
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du patient.');
    }
  };

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Admission Patient</Text>

      <Card style={styles.card}>
        <Text variant="subtitle" style={styles.sectionTitle}>Informations Personnelles</Text>
        <Input
          label="Nom *"
          placeholder="Ex: Dupont"
          value={form.lastName}
          onChangeText={(v) => setForm({ ...form, lastName: v })}
        />
        <Input
          label="Prénom *"
          placeholder="Ex: Jean"
          value={form.firstName}
          onChangeText={(v) => setForm({ ...form, firstName: v })}
        />
        <Input
          label="Date de naissance"
          placeholder="AAAA-MM-JJ"
          value={form.birthDate}
          onChangeText={(v) => setForm({ ...form, birthDate: v })}
        />
        <View style={styles.row}>
            <Text style={{ marginRight: 10 }}>Genre :</Text>
            <Button 
                title="M" 
                variant={form.gender === 'M' ? 'primary' : 'outline'} 
                onPress={() => setForm({...form, gender: 'M'})}
                style={styles.genderButton}
            />
            <Button 
                title="F" 
                variant={form.gender === 'F' ? 'primary' : 'outline'} 
                onPress={() => setForm({...form, gender: 'F'})}
                style={styles.genderButton}
            />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text variant="subtitle" style={styles.sectionTitle}>Détails Médicaux</Text>
        <Input
          label="Chambre *"
          placeholder="Ex: 302"
          value={form.room}
          onChangeText={(v) => setForm({ ...form, room: v })}
        />
        <Input
          label="Groupe Sanguin"
          placeholder="Ex: A+"
          value={form.bloodType}
          onChangeText={(v) => setForm({ ...form, bloodType: v })}
        />
        <Input
          label="Allergies (séparées par des virgules)"
          placeholder="Ex: Pénicilline, Pollen"
          value={form.allergies}
          onChangeText={(v) => setForm({ ...form, allergies: v })}
        />
        <Input
          label="Pathologies (séparées par des virgules)"
          placeholder="Ex: Diabète, Hypertension"
          value={form.conditions}
          onChangeText={(v) => setForm({ ...form, conditions: v })}
        />
      </Card>

      <View style={styles.actions}>
        <Button title="Admettre le patient" onPress={handleSave} />
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

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  genderButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginRight: 8,
    minWidth: 50,
  },
  actions: {
    marginBottom: 40,
  }
});
