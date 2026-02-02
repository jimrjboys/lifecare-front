import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLifeCareTheme } from '@/src/presentation/theme';

export default function TabLayout() {
  console.log('TabLayout rendering...');
  const { theme } = useLifeCareTheme();
  console.log('TabLayout theme:', theme ? 'ok' : 'missing');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 12,
          paddingTop: 8,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="patients/index"
        options={{
          title: 'Patients',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="medical/index"
        options={{
          title: 'Soins',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.text.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance/index"
        options={{
          title: 'Factures',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
      
      {/* Masquer les routes internes et de détail du menu des onglets */}
      <Tabs.Screen name="patients/[id]" options={{ href: null }} />
      <Tabs.Screen name="patients/new" options={{ href: null }} />
      <Tabs.Screen name="medical/vitals/index" options={{ href: null }} />
      <Tabs.Screen name="medical/vitals/new" options={{ href: null }} />
      <Tabs.Screen name="medical/ai-evaluation" options={{ href: null }} />
      <Tabs.Screen name="medication/admin" options={{ href: null }} />
      <Tabs.Screen name="medication/prescription" options={{ href: null }} />
      <Tabs.Screen name="finance/invoice-new" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
