import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Text, Card, Button } from '@/src/presentation/components/atoms';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function FinanceScreen() {
  const router = useRouter();
  const { theme } = useLifeCareTheme();

  // Mock data pour les factures
  const invoices = [
    { id: '1', patientName: 'Jean Dupont', amount: 1250.00, date: '2026-01-15', status: 'Payé' },
    { id: '2', patientName: 'Marie Curie', amount: 450.50, date: '2026-01-20', status: 'En attente' },
    { id: '3', patientName: 'Robert Martin', amount: 890.00, date: '2026-01-25', status: 'En attente' },
  ];

  const renderInvoiceItem = ({ item }: { item: any }) => (
    <Card style={styles.invoiceCard}>
      <View style={styles.invoiceInfo}>
        <Text style={{ fontWeight: 'bold' }}>{item.patientName}</Text>
        <Text variant="caption">{new Date(item.date).toLocaleDateString('fr-FR')}</Text>
      </View>
      <View style={styles.invoiceAmount}>
        <Text style={{ fontWeight: 'bold', color: theme.primary }}>{item.amount.toFixed(2)} €</Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.status === 'Payé' ? theme.success + '20' : theme.warning + '20' }
        ]}>
          <Text style={{ 
            fontSize: 10, 
            color: item.status === 'Payé' ? theme.success : theme.warning,
            fontWeight: 'bold'
          }}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <Container>
      <View style={styles.header}>
        <Text variant="title">Gestion Financière</Text>
        <Button 
          title="+ Nouvelle Facture" 
          onPress={() => router.push('/(tabs)/finance/invoice-new')}
          style={{ marginTop: 10 }}
        />
      </View>

      <Text variant="subtitle" style={{ marginBottom: 15 }}>Dernières Factures</Text>
      
      <FlatList
        data={invoices}
        renderItem={renderInvoiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
  },
  invoiceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  }
});
