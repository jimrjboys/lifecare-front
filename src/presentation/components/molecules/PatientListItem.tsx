import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { useLifeCareTheme } from '../../theme';

interface PatientListItemProps {
  name: string;
  age: number;
  gender: string;
  room: string;
  status: 'stable' | 'warning' | 'critical';
  onPress: () => void;
}

export const PatientListItem: React.FC<PatientListItemProps> = ({ 
  name, age, gender, room, status, onPress 
}) => {
  const { theme } = useLifeCareTheme();
  
  const statusColors = {
    stable: theme.success,
    warning: theme.warning,
    critical: theme.error,
  };
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ 
          width: 50, 
          height: 50, 
          borderRadius: 25, 
          backgroundColor: theme.primary + '20',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12
        }}>
          <Text variant="title" style={{ color: theme.primary }}>{name.charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="subtitle">{name}</Text>
          <Text variant="caption">{gender}, {age} ans • Chambre {room}</Text>
        </View>
        <View style={{ 
          paddingHorizontal: 8, 
          paddingVertical: 4, 
          borderRadius: 12, 
          backgroundColor: statusColors[status] + '20' 
        }}>
          <Text style={{ color: statusColors[status], fontSize: 10, fontWeight: 'bold' }}>
            {status.toUpperCase()}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
