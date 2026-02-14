import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';
import { LineChart } from 'react-native-chart-kit';

export default function VitalsHistoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, styles: themeStyles } = useLifeCareTheme();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find(p => p.id === id);
  const [activeChart, setActiveChart] = useState<'tension' | 'pouls' | 'temp' | 'spo2'>('tension');

  if (!patient) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }} scrollable={false}>
        <Text>Patient non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </Container>
    );
  }

  const sortedVitals = [...(patient.vitals || [])].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const chartData = {
    labels: sortedVitals.slice(-6).map(v => new Date(v.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })),
    datasets: activeChart === 'tension' ? [
      {
        data: sortedVitals.slice(-6).map(v => v.bloodPressureSys),
        color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`, // Violet
        strokeWidth: 2
      },
      {
        data: sortedVitals.slice(-6).map(v => v.bloodPressureDia),
        color: (opacity = 1) => `rgba(156, 39, 176, ${opacity * 0.5})`,
        strokeWidth: 2
      }
    ] : [
      {
        data: sortedVitals.slice(-6).map(v => {
          if (activeChart === 'pouls') return v.heartRate;
          if (activeChart === 'temp') return v.temperature;
          if (activeChart === 'spo2') return v.oxygenSaturation;
          return 0;
        }),
        color: (opacity = 1) => {
          if (activeChart === 'pouls') return `rgba(231, 111, 81, ${opacity})`;
          if (activeChart === 'temp') return `rgba(233, 196, 106, ${opacity})`;
          if (activeChart === 'spo2') return `rgba(0, 180, 216, ${opacity})`;
          return theme.primary;
        },
        strokeWidth: 2
      }
    ]
  };

  const renderVitalItem = ({ item }: { item: any }) => {
    const date = new Date(item.timestamp).toLocaleDateString('fr-FR');
    const time = new Date(item.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return (
      <Card style={styles.historyCard}>
        <View style={styles.cardHeader}>
          <Text variant="subtitle">{date} à {time}</Text>
        </View>
        
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Text variant="caption">Tension</Text>
            <Text style={{ fontWeight: 'bold', color: theme.medical.bloodPressure }}>
              {item.bloodPressureSys}/{item.bloodPressureDia}
            </Text>
          </View>
          
          <View style={styles.vitalItem}>
            <Text variant="caption">Pouls</Text>
            <Text style={{ fontWeight: 'bold', color: theme.medical.heartRate }}>
              {item.heartRate} bpm
            </Text>
          </View>
          
          <View style={styles.vitalItem}>
            <Text variant="caption">Temp.</Text>
            <Text style={{ fontWeight: 'bold', color: theme.medical.temperature }}>
              {item.temperature}°C
            </Text>
          </View>
          
          <View style={styles.vitalItem}>
            <Text variant="caption">SpO2</Text>
            <Text style={{ fontWeight: 'bold', color: theme.medical.oxygen }}>
              {item.oxygenSaturation}%
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text variant="title">Historique des Constantes</Text>
        <Text variant="secondary">{patient.firstName} {patient.lastName}</Text>
      </View>

      {sortedVitals.length > 1 && (
        <Card style={styles.chartCard}>
          <View style={styles.chartTabs}>
            {(['tension', 'pouls', 'temp', 'spo2'] as const).map((tab) => (
              <Button 
                key={tab}
                title={tab.toUpperCase()}
                variant={activeChart === tab ? 'primary' : 'outline'}
                onPress={() => setActiveChart(tab)}
                style={styles.tabButton}
                textStyle={{ fontSize: 10 }}
              />
            ))}
          </View>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 64}
            height={180}
            chartConfig={{
              backgroundColor: theme.card,
              backgroundGradientFrom: theme.card,
              backgroundGradientTo: theme.card,
              decimalPlaces: 1,
              color: (opacity = 1) => theme.textSecondary,
              labelColor: (opacity = 1) => theme.textSecondary,
              style: { borderRadius: 16 },
              propsForDots: { r: "4", strokeWidth: "2" }
            }}
            bezier
            style={styles.chart}
          />
        </Card>
      )}

      <Text variant="subtitle" style={{ marginVertical: 15 }}>Derniers relevés</Text>
    </>
  );

  return (
    <Container>
      {sortedVitals.length > 0 ? (
        <FlatList
          ListHeaderComponent={ListHeader}
          data={[...sortedVitals].reverse()}
          renderItem={renderVitalItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.header}>
            <Text variant="title">Historique des Constantes</Text>
            <Text variant="secondary">{patient.firstName} {patient.lastName}</Text>
          </View>
          <Text variant="secondary">Aucun historique disponible.</Text>
          <Button 
            title="Saisir des constantes" 
            onPress={() => router.push({ pathname: '/medical/vitals/new', params: { id: patient.id } })}
            style={{ marginTop: 20 }}
          />
        </View>
      )}
      
      <Button 
        title="Retour au profil" 
        variant="outline" 
        onPress={() => router.back()} 
        style={{ marginVertical: 20 }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
  },
  historyCard: {
    marginBottom: 12,
    padding: 12,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 12,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalItem: {
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCard: {
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 6,
    minWidth: 60,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});
