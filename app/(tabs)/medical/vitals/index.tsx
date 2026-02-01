import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePatientStore } from '../../../../src/application/stores/patient-store';
import { LifeCareStyles } from '../../../../src/presentation/theme/lifecare-styles';
import { LifeCareTheme, LifeCareSpacing } from '../../../../src/presentation/theme/lifecare-theme';

export default function VitalsHistoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <View style={LifeCareStyles.container}>
        <Text style={LifeCareStyles.textPrimary}>Patient non trouvé</Text>
      </View>
    );
  }

  // Trier les constantes par date décroissante (plus récent en premier)
  const sortedVitals = [...patient.vitals].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderVitalItem = ({ item }: { item: any }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyDate}>{formatDate(item.timestamp)}</Text>
        <Ionicons name="time-outline" size={16} color={LifeCareTheme.light.textSecondary} />
      </View>

      <View style={styles.vitalGrid}>
        <View style={styles.vitalMiniCard}>
          <Text style={styles.vitalLabel}>Tension</Text>
          <Text style={[styles.vitalValue, { color: LifeCareTheme.light.bloodPressure }]}>
            {item.bloodPressureSys}/{item.bloodPressureDia}
          </Text>
          <Text style={styles.vitalUnit}>mmHg</Text>
        </View>

        <View style={styles.vitalMiniCard}>
          <Text style={styles.vitalLabel}>Pouls</Text>
          <Text style={[styles.vitalValue, { color: LifeCareTheme.light.heartRate }]}>
            {item.heartRate}
          </Text>
          <Text style={styles.vitalUnit}>bpm</Text>
        </View>

        <View style={styles.vitalMiniCard}>
          <Text style={styles.vitalLabel}>SpO2</Text>
          <Text style={[styles.vitalValue, { color: LifeCareTheme.light.oxygen }]}>
            {item.oxygenSaturation}%
          </Text>
        </View>

        <View style={styles.vitalMiniCard}>
          <Text style={styles.vitalLabel}>Temp.</Text>
          <Text style={[styles.vitalValue, { color: LifeCareTheme.light.temperature }]}>
            {item.temperature}°C
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={LifeCareStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={LifeCareTheme.light.primary} />
        </TouchableOpacity>
        <View>
          <Text style={LifeCareStyles.titleMedium}>Historique</Text>
          <Text style={LifeCareStyles.textSecondary}>
            {patient.firstName} {patient.lastName}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push(`/(tabs)/medical/vitals/new?id=${id}`)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {sortedVitals.length > 0 ? (
        <FlatList
          data={sortedVitals}
          renderItem={renderVitalItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="analytics-outline" size={64} color={LifeCareTheme.light.border} />
          <Text style={styles.emptyText}>Aucune donnée enregistrée</Text>
          <TouchableOpacity 
            style={[LifeCareStyles.buttonPrimary, { marginTop: LifeCareSpacing.lg }]}
            onPress={() => router.push(`/(tabs)/medical/vitals/new?id=${id}`)}
          >
            <Text style={LifeCareStyles.textButton}>Ajouter des constantes</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: LifeCareSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: LifeCareTheme.light.border,
    marginBottom: LifeCareSpacing.md,
  },
  backButton: {
    padding: LifeCareSpacing.sm,
    marginRight: LifeCareSpacing.sm,
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: LifeCareTheme.light.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: LifeCareSpacing.xl,
  },
  historyCard: {
    backgroundColor: LifeCareTheme.light.surface,
    borderRadius: LifeCareSpacing.md,
    padding: LifeCareSpacing.md,
    marginBottom: LifeCareSpacing.md,
    borderWidth: 1,
    borderColor: LifeCareTheme.light.border,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LifeCareSpacing.md,
    paddingBottom: LifeCareSpacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: LifeCareTheme.light.border + '40',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: LifeCareTheme.light.textPrimary,
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalMiniCard: {
    width: '23%',
    alignItems: 'center',
  },
  vitalLabel: {
    fontSize: 10,
    color: LifeCareTheme.light.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vitalUnit: {
    fontSize: 10,
    color: LifeCareTheme.light.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: LifeCareSpacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: LifeCareTheme.light.textSecondary,
    marginTop: LifeCareSpacing.md,
    textAlign: 'center',
  },
});
