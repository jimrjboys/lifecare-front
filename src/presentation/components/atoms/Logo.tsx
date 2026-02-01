import * as React from 'react';
import Svg, { Path, Circle, SvgProps, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { useLifeCareTheme } from '@/src/presentation/theme';

interface LogoProps extends SvgProps {
  size?: number;
  color?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 100, 
  color, 
  variant = 'icon',
  ...props 
}) => {
  const { theme } = useLifeCareTheme();
  
  // AI/Tech Style: Gradients, Nodes, and Digital Pulse
  const primaryColor = color || theme.primary;
  const secondaryColor = theme.secondary;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <Defs>
        <LinearGradient id="grad_ai" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#0077B6" stopOpacity="1" />
          <Stop offset="1" stopColor="#00B4D8" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="grad_pulse" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#E76F51" stopOpacity="1" />
          <Stop offset="1" stopColor="#FFCCBC" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Tech Circuit Heart Outline */}
      {/* Left Circuit Lobe */}
      <Path
        d="M50 90 L35 75 Q10 50 10 30 A15 15 0 0 1 40 15 A15 15 0 0 1 50 25"
        stroke="url(#grad_ai)"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
      {/* Right Circuit Lobe */}
      <Path
        d="M50 90 L65 75 Q90 50 90 30 A15 15 0 0 1 60 15 A15 15 0 0 1 50 25"
        stroke="url(#grad_ai)"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Circuit Nodes (Dots) at endings */}
      <Circle cx="50" cy="90" r="3" fill="#0077B6" />
      <Circle cx="50" cy="25" r="3" fill="#00B4D8" />
      <Circle cx="10" cy="30" r="3" fill="#0077B6" />
      <Circle cx="90" cy="30" r="3" fill="#0077B6" />

      {/* Digital/AI Network Overlay */}
      <G opacity="0.8">
        {/* Network connections */}
        <Path 
          d="M30 45 L50 35 L70 45" 
          stroke="url(#grad_ai)" 
          strokeWidth={1.5} 
          strokeDasharray="2,2"
        />
        <Path 
          d="M50 35 L50 65" 
          stroke="url(#grad_ai)" 
          strokeWidth={1.5} 
          strokeDasharray="2,2"
        />
        {/* Nodes */}
        <Circle cx="30" cy="45" r="2" fill="#00B4D8" />
        <Circle cx="70" cy="45" r="2" fill="#00B4D8" />
        <Circle cx="50" cy="35" r="2.5" fill="#00B4D8" />
      </G>

      {/* Digital Pulse Line (The "Life" aspect) */}
      <Path
        d="M25 60 H38 L45 45 L55 75 L62 60 H75"
        stroke="url(#grad_pulse)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
