import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button } from '@/src/presentation/components/atoms';
import { PatientListItem } from '@/src/presentation/components/molecules/PatientListItem';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function PatientListScreen() {
  const [search, setSearch] = useState('');
  const { theme } = useLifeCareTheme();
  const router = useRouter();
  const patients = usePatientStore((state) => state.patients);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getPatientStatus = (patient: any) => {
    if (!patient.vitals || patient.vitals.length === 0) return 'stable';
    const latest = patient.vitals[patient.vitals.length - 1];
    if (latest.heartRate > 100 || latest.heartRate < 50 || latest.oxygenSaturation < 92) return 'critical';
    if (latest.heartRate > 90 || latest.heartRate < 60 || latest.oxygenSaturation < 95) return 'warning';
    return 'stable';
  };

  const filteredPatients = patients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <View style={styles.header}>
        <Text variant="title">Mes Patients</Text>
        <Button 
          title="+ Nouveau" 
          onPress={() => router.push('/(tabs)/patients/new')} 
          style={{ paddingVertical: 8, paddingHorizontal: 16 }}
        />
      </View>

      <Input
        placeholder="Rechercher un patient..."
        value={search}
        onChangeText={setSearch}
        style={{ marginBottom: 20 }}
      />

      <FlatList
        data={filteredPatients}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PatientListItem
            name={`${item.firstName} ${item.lastName}`}
            age={calculateAge(item.birthDate)}
            gender={item.gender}
            room="-" // Serait ajouté plus tard
            status={getPatientStatus(item)}
            onPress={() => router.push(`/(tabs)/patients/${item.id}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  }
});
