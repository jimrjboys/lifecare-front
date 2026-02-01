import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button } from '@/src/presentation/components/atoms';
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
    socialSecurityNumber: '',
    phone: '',
    email: '',
    address: '',
    bloodType: '',
  });

  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.birthDate) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires (Prénom, Nom, Date de naissance)');
      return;
    }

    addPatient(form);
    Alert.alert('Succès', 'Patient ajouté avec succès', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="title" style={styles.title}>Nouveau Patient</Text>
        <Text variant="secondary" style={styles.subtitle}>Informations administratives</Text>

        <View style={styles.form}>
          <Input
            label="Nom *"
            placeholder="Ex: Dupont"
            value={form.lastName}
            onChangeText={(text) => setForm({ ...form, lastName: text })}
          />
          <Input
            label="Prénom *"
            placeholder="Ex: Jean"
            value={form.firstName}
            onChangeText={(text) => setForm({ ...form, firstName: text })}
          />
          <Input
            label="Date de naissance (AAAA-MM-JJ) *"
            placeholder="1990-01-01"
            value={form.birthDate}
            onChangeText={(text) => setForm({ ...form, birthDate: text })}
          />
          
          <View style={styles.genderContainer}>
            <Text style={styles.label}>Genre</Text>
            <View style={styles.row}>
              {(['M', 'F', 'O'] as const).map((g) => (
                <Button
                  key={g}
                  title={g === 'M' ? 'Homme' : g === 'F' ? 'Femme' : 'Autre'}
                  variant={form.gender === g ? 'primary' : 'outline'}
                  onPress={() => setForm({ ...form, gender: g })}
                  style={styles.genderButton}
                />
              ))}
            </View>
          </View>

          <Input
            label="Numéro de Sécurité Sociale"
            placeholder="1 90 01 ..."
            value={form.socialSecurityNumber}
            onChangeText={(text) => setForm({ ...form, socialSecurityNumber: text })}
            keyboardType="numeric"
          />

          <Input
            label="Téléphone"
            placeholder="06 12 34 56 78"
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
            keyboardType="phone-pad"
          />

          <Input
            label="Email"
            placeholder="patient@email.com"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
          />

          <Input
            label="Groupe Sanguin"
            placeholder="Ex: A+"
            value={form.bloodType}
            onChangeText={(text) => setForm({ ...form, bloodType: text })}
          />

          <Button 
            title="Enregistrer le Patient" 
            onPress={handleSave} 
            style={styles.saveButton}
          />
          <Button 
            title="Annuler" 
            variant="outline" 
            onPress={() => router.back()} 
          />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  genderContainer: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
  },
  saveButton: {
    marginTop: 20,
  },
});
