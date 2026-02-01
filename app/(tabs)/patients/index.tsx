import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Input, Button } from '@/src/presentation/components/atoms';
import { PatientListItem } from '@/src/presentation/components/molecules/PatientListItem';
import { useLifeCareTheme } from '@/src/presentation/theme';

const MOCK_PATIENTS = [
  { id: '1', name: 'Jean Dupont', age: 65, gender: 'M', room: '204', status: 'stable' as const },
  { id: '2', name: 'Marie Curie', age: 42, gender: 'F', room: '105', status: 'warning' as const },
  { id: '3', name: 'Robert Martin', age: 78, gender: 'M', room: '312', status: 'critical' as const },
  { id: '4', name: 'Alice Bernard', age: 29, gender: 'F', room: '201', status: 'stable' as const },
];

export default function PatientListScreen() {
  const [search, setSearch] = useState('');
  const { theme } = useLifeCareTheme();
  const router = useRouter();

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
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
            {...item}
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
