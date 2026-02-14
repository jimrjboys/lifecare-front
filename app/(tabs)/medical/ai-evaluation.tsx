import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function AIEvaluationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useLifeCareTheme();
  const [loading, setLoading] = useState(true);
  const [aiDiagnostic, setAiDiagnostic] = useState<any>(null);
  
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find(p => p.id === id);

  useEffect(() => {
    async function fetchAiDiagnostic() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await apiClient.get(`/medical/ai-diagnostic/${id}`);
        setAiDiagnostic(data);
      } catch (error) {
        console.error("Error fetching AI diagnostic:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAiDiagnostic();
  }, [id]);

  if (!patient) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }} scrollable={false}>
        <Text>Patient non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </Container>
    );
  }

  const lastVitals = patient.vitals && patient.vitals.length > 0 
    ? patient.vitals[patient.vitals.length - 1] 
    : null;

  // Utiliser les données de l'IA si disponibles, sinon utiliser la logique locale comme fallback
  const analysis = aiDiagnostic || {
    score: 50,
    status: 'Analyse en cours...',
    color: theme.textSecondary,
    summary: 'Analyse des données vitales...',
    potentialRisks: [],
    recommendations: []
  };

  // Adapter les données de l'IA aux besoins de l'UI
  const displayColor = analysis.color || (analysis.score > 80 ? theme.success : (analysis.score > 60 ? theme.warning : theme.error));
  const displayStatus = analysis.status || (analysis.score > 80 ? 'Risque Faible' : (analysis.score > 60 ? 'Risque Modéré' : 'Risque Élevé'));
  const displayRisks = analysis.potentialRisks || [];
  const displayRecommendations = analysis.recommendations || [];

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }} scrollable={false}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 20 }}>Analyse DeepSeek en cours pour {patient.firstName}...</Text>
      </Container>
    );
  }

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="title">Évaluation IA DeepSeek</Text>
        <Text variant="secondary">{patient.firstName} {patient.lastName}</Text>
      </View>

      <Card style={[styles.scoreCard, { backgroundColor: displayColor + '20', borderColor: displayColor }]}>
        <Text variant="subtitle">Indice de Santé IA</Text>
        <Text style={[styles.scoreValue, { color: displayColor }]}>{analysis.score}/100</Text>
        <Text style={{ color: displayColor, fontWeight: '600' }}>{displayStatus}</Text>
        <Text variant="caption" style={{ marginTop: 4 }}>Analyse prédictive en temps réel</Text>
      </Card>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Résumé Clinique IA</Text>
        <Card>
          <Text style={styles.analysisPoint}>{analysis.summary}</Text>
        </Card>
      </View>

      {displayRisks.length > 0 && (
        <View style={styles.section}>
          <Text variant="subtitle" style={styles.sectionTitle}>Risques Potentiels Identifiés</Text>
          <Card>
            {displayRisks.map((risk: string, index: number) => (
              <Text key={index} style={styles.analysisPoint}>• {risk}</Text>
            ))}
          </Card>
        </View>
      )}

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Actions Recommandées</Text>
        <Card>
          {displayRecommendations.map((rec: string, index: number) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={styles.recommendationTitle}>{index + 1}. {rec.split(' ')[0]} {rec.split(' ')[1] || ''}</Text>
              <Text variant="secondary">{rec}</Text>
            </View>
          ))}
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
  header: {
    marginVertical: 20,
  },
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
