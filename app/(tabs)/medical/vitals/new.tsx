import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Input, Button, Card } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function NewVitalsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();

  const [vitals, setVitals] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    weight: '',
    oxygen: '',
  });

  const handleSave = () => {
    // Static logic
    router.back();
  };

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Saisie des Constantes</Text>
      
      <Card style={{ marginBottom: 20 }}>
        <Text variant="subtitle" style={{ marginBottom: 16 }}>Tension Artérielle (mmHg)</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Input
            placeholder="Systolique"
            value={vitals.systolic}
            onChangeText={(v) => setVitals({...vitals, systolic: v})}
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
          <Input
            placeholder="Diastolique"
            value={vitals.diastolic}
            onChangeText={(v) => setVitals({...vitals, diastolic: v})}
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
        </View>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <Input
          label="Fréquence Cardiaque (bpm)"
          placeholder="Ex: 72"
          value={vitals.heartRate}
          onChangeText={(v) => setVitals({...vitals, heartRate: v})}
          keyboardType="numeric"
        />
        <Input
          label="Température (°C)"
          placeholder="Ex: 37.2"
          value={vitals.temperature}
          onChangeText={(v) => setVitals({...vitals, temperature: v})}
          keyboardType="numeric"
        />
        <Input
          label="Poids (kg)"
          placeholder="Ex: 70"
          value={vitals.weight}
          onChangeText={(v) => setVitals({...vitals, weight: v})}
          keyboardType="numeric"
        />
        <Input
          label="Saturation O2 (%)"
          placeholder="Ex: 98"
          value={vitals.oxygen}
          onChangeText={(v) => setVitals({...vitals, oxygen: v})}
          keyboardType="numeric"
        />
      </Card>

      <Button title="Enregistrer les données" onPress={handleSave} />
      <Button 
        title="Annuler" 
        variant="outline" 
        onPress={() => router.back()} 
        style={{ marginTop: 12, marginBottom: 40 }}
      />
    </Container>
  );
}
