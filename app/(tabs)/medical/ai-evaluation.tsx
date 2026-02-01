import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function AIEvaluationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 20 }}>Analyse des données par l'IA...</Text>
      </Container>
    );
  }

  return (
    <Container scrollable>
      <Text variant="title" style={{ marginVertical: 20 }}>Évaluation IA</Text>

      <Card style={[styles.scoreCard, { backgroundColor: theme.warning + '20', borderColor: theme.warning }]}>
        <Text variant="subtitle">Score de Risque</Text>
        <Text style={[styles.scoreValue, { color: theme.warning }]}>68/100</Text>
        <Text variant="caption">Risque Modéré - Surveillance accrue recommandée</Text>
      </Card>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Analyse Automatique</Text>
        <Card>
          <Text style={styles.analysisPoint}>• Hypertension légère détectée (145/92 mmHg)</Text>
          <Text style={styles.analysisPoint}>• Tachycardie épisodique durant la nuit</Text>
          <Text style={styles.analysisPoint}>• Interaction possible entre traitement A et B</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Recommandations IA</Text>
        <Card>
          <Text style={styles.recommendationTitle}>1. Ajustement Posologie</Text>
          <Text variant="secondary" style={{ marginBottom: 12 }}>Considérer une augmentation de 5mg sur le traitement hypotenseur.</Text>
          
          <Text style={styles.recommendationTitle}>2. Examens Complémentaires</Text>
          <Text variant="secondary" style={{ marginBottom: 12 }}>Prescrire un bilan rénal complet d'ici 48h.</Text>
          
          <Text style={styles.recommendationTitle}>3. Surveillance</Text>
          <Text variant="secondary">Mesure de la tension toutes les 4 heures.</Text>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button title="Valider & Enregistrer" onPress={() => router.back()} />
        <Button 
          title="Partager le rapport" 
          variant="outline" 
          onPress={() => {}} 
          style={{ marginTop: 12, marginBottom: 40 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  scoreCard: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 24,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  analysisPoint: {
    marginBottom: 8,
    fontSize: 15,
  },
  recommendationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actions: {
    marginTop: 10,
  }
});
