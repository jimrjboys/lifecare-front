import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function TabLayout() {
  const { theme, isDark } = useLifeCareTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="patients/index"
        options={{
          title: 'Patients',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="medical/vitals/new"
        options={{
          title: 'Soins',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="heart.text.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance/invoice-new"
        options={{
          title: 'Factures',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="creditcard.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="gearshape.fill" color={color} />,
        }}
      />
      
      {/* Masquer les routes de détail des onglets si nécessaire, mais ici elles sont dans des sous-dossiers */}
      <Tabs.Screen name="patients/[id]" options={{ href: null }} />
      <Tabs.Screen name="medical/ai-evaluation" options={{ href: null }} />
      <Tabs.Screen name="medication/admin" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
