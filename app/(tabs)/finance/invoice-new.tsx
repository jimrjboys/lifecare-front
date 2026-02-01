import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function InvoiceNewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();

  const costs = {
    hospitalization: 1200.00,
    medication: 450.50,
    procedures: 300.00,
    total: 1950.50
  };

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Facturation</Text>

      <Card style={{ marginBottom: 24 }}>
        <Text variant="subtitle">Patient : Jean Dupont</Text>
        <Text variant="secondary">Période : 25/01/2026 - 01/02/2026</Text>
      </Card>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Détail des Frais</Text>
        <Card>
          <View style={styles.costRow}>
            <Text>Frais d'hospitalisation (7 jours)</Text>
            <Text style={styles.amount}>{costs.hospitalization.toFixed(2)} €</Text>
          </View>
          <View style={styles.costRow}>
            <Text>Médicaments & Consommables</Text>
            <Text style={styles.amount}>{costs.medication.toFixed(2)} €</Text>
          </View>
          <View style={styles.costRow}>
            <Text>Actes Médicaux</Text>
            <Text style={styles.amount}>{costs.procedures.toFixed(2)} €</Text>
          </View>
          <View style={[styles.costRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>TOTAL À PAYER</Text>
            <Text style={styles.totalAmount}>{costs.total.toFixed(2)} €</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Mode de Règlement</Text>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={styles.paymentMethod}>
            <View style={[styles.radio, { borderColor: theme.primary }]}>
              <View style={[styles.radioInner, { backgroundColor: theme.primary }]} />
            </View>
            <Text variant="caption">Assurance</Text>
          </View>
          <View style={styles.paymentMethod}>
            <View style={[styles.radio, { borderColor: theme.textSecondary }]} />
            <Text variant="caption">Direct</Text>
          </View>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button title="Générer la Facture (PDF)" onPress={() => router.back()} />
        <Button 
          title="Envoyer par Email" 
          variant="secondary" 
          onPress={() => {}} 
          style={{ marginTop: 12 }}
        />
        <Button 
          title="Annuler" 
          variant="outline" 
          onPress={() => router.back()} 
          style={{ marginTop: 12, marginBottom: 40 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  amount: {
    fontWeight: '600',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2c3e50',
  },
  paymentMethod: {
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  actions: {
    marginTop: 10,
  }
});
