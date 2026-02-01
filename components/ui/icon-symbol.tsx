import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Mapping des noms SFSymbols vers Ionicons
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code-slash',
  'chevron.right': 'chevron-forward',
  'person.2.fill': 'people',
  'heart.text.square.fill': 'medical',
  'creditcard.fill': 'card',
  'gearshape.fill': 'settings',
  'plus': 'add',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and Ionicons on Android and web.
 */
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
}) {
  const iconName = MAPPING[name] || 'help-circle';
  
  return <Ionicons color={color as any} size={size} name={iconName as any} style={style} />;
}
