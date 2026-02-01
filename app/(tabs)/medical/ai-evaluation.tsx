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
  
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find(p => p.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!patient) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Patient non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </Container>
    );
  }

  const lastVitals = patient.vitals && patient.vitals.length > 0 
    ? patient.vitals[patient.vitals.length - 1] 
    : null;

  // Logique d'analyse simplifiée basée sur les dernières constantes
  const getAnalysis = () => {
    if (!lastVitals) return {
      score: 50,
      status: 'Données insuffisantes',
      color: theme.textSecondary,
      points: ['Aucune donnée de constantes disponible pour analyse.'],
      recommendations: ['Veuillez saisir les constantes vitales du patient.']
    };

    const points = [];
    const recommendations = [];
    let score = 85;

    // Analyse tension
    if (lastVitals.bloodPressureSys > 140 || lastVitals.bloodPressureDia > 90) {
      points.push(`Hypertension détectée (${lastVitals.bloodPressureSys}/${lastVitals.bloodPressureDia} mmHg)`);
      recommendations.push("Surveillance tensionnelle rapprochée (toutes les 4h)");
      score -= 20;
    } else if (lastVitals.bloodPressureSys < 100) {
      points.push(`Hypotension détectée (${lastVitals.bloodPressureSys}/${lastVitals.bloodPressureDia} mmHg)`);
      recommendations.push("Hydratation à surveiller");
      score -= 15;
    }

    // Analyse pouls
    if (lastVitals.heartRate > 100) {
      points.push(`Tachycardie détectée (${lastVitals.heartRate} bpm)`);
      recommendations.push("Repos strict au lit");
      score -= 15;
    } else if (lastVitals.heartRate < 50) {
      points.push(`Bradycardie détectée (${lastVitals.heartRate} bpm)`);
      score -= 15;
    }

    // Analyse SpO2
    if (lastVitals.oxygenSaturation < 95) {
      points.push(`Désaturation en oxygène (${lastVitals.oxygenSaturation}%)`);
      recommendations.push("Oxygénothérapie à envisager selon protocole");
      score -= 25;
    }

    // Analyse température
    if (lastVitals.temperature > 38) {
      points.push(`Hyperthermie (${lastVitals.temperature}°C)`);
      recommendations.push("Administration d'antipyrétiques si prescrit");
      score -= 15;
    }

    if (points.length === 0) {
      points.push("Toutes les constantes sont dans les normes.");
      recommendations.push("Continuer la surveillance de routine.");
    }

    const color = score > 80 ? theme.success : (score > 60 ? theme.warning : theme.error);
    const status = score > 80 ? 'Risque Faible' : (score > 60 ? 'Risque Modéré' : 'Risque Élevé');

    return { score, status, color, points, recommendations };
  };

  const analysis = getAnalysis();

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 20 }}>Analyse des données de {patient.firstName}...</Text>
      </Container>
    );
  }

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="title">Évaluation IA</Text>
        <Text variant="secondary">{patient.firstName} {patient.lastName}</Text>
      </View>

      <Card style={[styles.scoreCard, { backgroundColor: analysis.color + '20', borderColor: analysis.color }]}>
        <Text variant="subtitle">Score de Risque</Text>
        <Text style={[styles.scoreValue, { color: analysis.color }]}>{analysis.score}/100</Text>
        <Text style={{ color: analysis.color, fontWeight: '600' }}>{analysis.status}</Text>
        <Text variant="caption" style={{ marginTop: 4 }}>Basé sur les dernières constantes</Text>
      </Card>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Analyse Automatique</Text>
        <Card>
          {analysis.points.map((point, index) => (
            <Text key={index} style={styles.analysisPoint}>• {point}</Text>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="subtitle" style={styles.sectionTitle}>Recommandations IA</Text>
        <Card>
          {analysis.recommendations.map((rec, index) => (
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
