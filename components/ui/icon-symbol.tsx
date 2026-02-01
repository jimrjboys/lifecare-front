// Fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

const MAPPING = {
  'house.fill': { lib: 'Ionicons', name: 'home' },
  'paperplane.fill': { lib: 'Ionicons', name: 'paper-plane' },
  'chevron.left.forwardslash.chevron.right': { lib: 'MaterialIcons', name: 'code' },
  'chevron.right': { lib: 'MaterialIcons', name: 'chevron-right' },
  'person.2.fill': { lib: 'Ionicons', name: 'people' },
  'heart.text.square.fill': { lib: 'Ionicons', name: 'heart-half' },
  'creditcard.fill': { lib: 'Ionicons', name: 'card' },
  'gearshape.fill': { lib: 'Ionicons', name: 'settings' },
} as const;

type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconConfig = MAPPING[name];
  
  if (iconConfig.lib === 'Ionicons') {
    return <Ionicons color={color as any} size={size} name={iconConfig.name as any} style={style} />;
  }
  
  return <MaterialIcons color={color as any} size={size} name={iconConfig.name as any} style={style} />;
}
