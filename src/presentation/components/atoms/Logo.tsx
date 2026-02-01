import * as React from 'react';
import Svg, { Path, Circle, SvgProps } from 'react-native-svg';
import { useLifeCareTheme } from '@/src/presentation/theme';

interface LogoProps extends SvgProps {
  size?: number;
  color?: string;
  variant?: 'full' | 'icon'; // 'full' for logo + text (if we had text in SVG), 'icon' for just symbol
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 100, 
  color, 
  variant = 'icon',
  ...props 
}) => {
  const { theme } = useLifeCareTheme();
  const primaryColor = color || theme.primary;

  // Design: A stylized heart with a pulse line integrated
  // The shape is a continuous line forming a heart, with a "beat" in the middle
  
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      {/* Background Circle (Optional, for app icon style) */}
      {/* <Circle cx="50" cy="50" r="48" fill={primaryColor} opacity={0.1} /> */}
      
      {/* Heart Shape with Pulse */}
      {/* Starting from top center, curving left, down to tip, up right, curving top right to center */}
      {/* Integrated Pulse: Instead of a simple V at bottom, it does a pulse */}
      
      <Path
        d="M50 85 
           L45 75 
           Q20 60 10 45 
           A17.5 17.5 0 0 1 45 25 
           A17.5 17.5 0 0 1 80 45 
           Q70 60 55 75 
           L50 85 Z"
        fill={primaryColor}
        fillOpacity={0.15}
        stroke={primaryColor}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Pulse Line - overlaying the heart or inside it */}
      <Path
        d="M25 50 H38 L45 35 L55 65 L62 50 H75"
        stroke={primaryColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Small "Cross" detail or accent if needed */}
      <Circle cx="80" cy="25" r="4" fill={theme.error} opacity={0.8} />
    </Svg>
  );
};
