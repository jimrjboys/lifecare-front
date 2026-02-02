import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';
import { usePatientStore } from '@/src/application/stores/patient-store';

export default function VitalsHistoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, styles: themeStyles } = useLifeCareTheme();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Patient non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </Container>
    );
  }

  const sortedVitals = [...(patient.vitals || [])].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const renderVitalItem = ({ item }: { item: any }) => {
    const date = new Date(item.timestamp).toLocaleDateString('fr-FR');
    const time = new Date(item.timestamp).toLocaleTimeString('fr-FR', { hour: '2h', minute: '2h' });

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

  return (
    <Container>
      <View style={styles.header}>
        <Text variant="title">Historique des Constantes</Text>
        <Text variant="secondary">{patient.firstName} {patient.lastName}</Text>
      </View>

      {sortedVitals.length > 0 ? (
        <FlatList
          data={sortedVitals}
          renderItem={renderVitalItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text variant="secondary">Aucun historique disponible.</Text>
          <Button 
            title="Saisir des constantes" 
            onPress={() => router.push({ pathname: '/(tabs)/medical/vitals/new', params: { id: patient.id } })}
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
  }
});
