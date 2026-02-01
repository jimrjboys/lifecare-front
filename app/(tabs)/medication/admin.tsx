import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function MedicationAdminScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();

  const [scanned, setScanned] = useState(false);

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Administration</Text>

      <Card style={{ marginBottom: 24 }}>
        <Text variant="subtitle">Patient : Jean Dupont</Text>
        <Text variant="secondary">Chambre 204 • Bracelet #4421</Text>
      </Card>

      {!scanned ? (
        <View style={styles.scanContainer}>
          <TouchableOpacity 
            style={[styles.scanButton, { borderColor: theme.primary }]}
            onPress={() => setScanned(true)}
          >
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>SCANNER LE MÉDICAMENT</Text>
            <Text variant="caption" style={{ marginTop: 8 }}>Simuler un scan de code-barres</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Card style={[styles.medCard, { borderLeftColor: theme.primary }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Doliprane 1000mg</Text>
              <Text variant="secondary">Paracétamol • 1 comprimé</Text>
              <Text variant="caption" style={{ marginTop: 4 }}>Prescrit par Dr. Martin • 08:00</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: theme.success + '20' }]}>
              <Text style={{ color: theme.success, fontSize: 12, fontWeight: 'bold' }}>VALIDE</Text>
            </View>
          </Card>

          <View style={styles.form}>
            <Text variant="subtitle" style={{ marginBottom: 12 }}>Notes d'administration</Text>
            <Card style={{ padding: 0 }}>
              <View style={{ padding: 16 }}>
                <Text variant="secondary">Aucune anomalie détectée lors de la préparation.</Text>
              </View>
            </Card>
          </View>

          <Button 
            title="Confirmer l'Administration" 
            onPress={() => router.back()} 
            style={{ marginTop: 24 }}
          />
          <Button 
            title="Annuler" 
            variant="outline" 
            onPress={() => setScanned(false)} 
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
