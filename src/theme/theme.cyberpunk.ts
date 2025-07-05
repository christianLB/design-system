/**
 * Cyberpunk Theme Configuration
 * Inspired by DOOM, Evangelion, Swordfish, and The Matrix
 */

import { generateColorScale, generateSemanticColors } from './utils/colorScale';
import type { ThemeTokens } from './theme.light';

// Helper function to create semantic color tokens from a color scale
function createSemanticColorTokens(baseColor: string) {
  const scale = generateColorScale(baseColor);
  const semantic = generateSemanticColors(baseColor);
  
  return {
    50: scale['50'],
    100: scale['100'],
    200: scale['200'],
    300: scale['300'],
    400: scale['400'],
    500: scale['500'],
    600: scale['600'],
    700: scale['700'],
    800: scale['800'],
    900: scale['900'],
    950: scale['950'],
    DEFAULT: scale['500'],
    foreground: semantic.foreground,
    background: semantic.background,
    border: semantic.border,
    muted: semantic.muted,
    accent: semantic.accent,
  };
}

// Cyberpunk Color Definitions
export const cyberpunkColors = {
  // Matrix Green (Primary)
  matrixGreen: '#39ff14',
  brightMatrixGreen: '#00ff41',
  
  // DOOM Red (Secondary)  
  doomRed: '#ff0000',
  brightDoomRed: '#ff3333',
  
  // Evangelion Purple
  evangelionPurple: '#6a0dad',
  
  // Swordfish Cyan
  swordfishCyan: '#00ffff',
  
  // Tech Orange
  techOrange: '#ff6600',
  
  // Cyber Yellow
  cyberYellow: '#ffff00',
  
  // Hot Pink
  hotPink: '#ff1493',
  
  // Deep Void (Background)
  deepVoid: '#000000',
  almostBlack: '#0a0a0a',
  darkCharcoal: '#1a1a1a',
  mediumCharcoal: '#2a2a2a',
  lightCharcoal: '#3a3a3a',
  
  // Pure white
  pureWhite: '#ffffff'
};

export const cyberpunkTheme: ThemeTokens = {
  colors: {
    // Primary - Matrix Green Scale
    primary: createSemanticColorTokens(cyberpunkColors.matrixGreen),
    
    // Secondary - DOOM Red Scale  
    secondary: createSemanticColorTokens(cyberpunkColors.doomRed),
    
    // Destructive - DOOM Red
    destructive: createSemanticColorTokens(cyberpunkColors.doomRed),
    
    // Success - Matrix Green
    success: createSemanticColorTokens(cyberpunkColors.matrixGreen),
    
    // Warning - Tech Orange
    warning: createSemanticColorTokens(cyberpunkColors.techOrange),
    
    // Semantic Colors using cyberpunk palette
    background: cyberpunkColors.deepVoid,
    foreground: cyberpunkColors.pureWhite,
    
    // Card colors
    card: cyberpunkColors.almostBlack,
    cardForeground: cyberpunkColors.pureWhite,
    
    // Popover colors
    popover: cyberpunkColors.almostBlack,
    popoverForeground: cyberpunkColors.pureWhite,
    
    // Border and input colors
    border: cyberpunkColors.lightCharcoal,
    input: cyberpunkColors.darkCharcoal,
    ring: cyberpunkColors.matrixGreen,
    
    // Muted colors
    muted: cyberpunkColors.darkCharcoal,
    mutedForeground: '#999999',
    
    // Accent colors
    accent: cyberpunkColors.evangelionPurple,
    accentForeground: cyberpunkColors.pureWhite,
  },
  
  typography: {
    fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
    fontSize: {
      sm: '0.875rem',
      md: '1rem', 
      lg: '1.125rem',
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  motion: {
    duration: {
      fast: '150ms',
      normal: '300ms', 
      slow: '500ms',
    },
    easing: {
      inOut: 'ease-in-out',
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
  },
  
  radius: '0.5rem',
  
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1300, 
    popover: 1400,
    tooltip: 1500,
  },
  
  borders: {
    color: cyberpunkColors.matrixGreen,
  },
  
  // Cyberpunk-specific effects
  effects: {
    glow: {
      green: {
        sm: '0 0 5px rgba(57, 255, 20, 0.5)',
        md: '0 0 10px rgba(57, 255, 20, 0.6), 0 0 20px rgba(57, 255, 20, 0.3)',
        lg: '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4), 0 0 45px rgba(57, 255, 20, 0.2)',
      },
      red: {
        sm: '0 0 5px rgba(255, 0, 0, 0.5)',
        md: '0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.3)', 
        lg: '0 0 15px rgba(255, 0, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.4), 0 0 45px rgba(255, 0, 0, 0.2)',
      },
      cyan: {
        sm: '0 0 5px rgba(0, 255, 255, 0.5)',
        md: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3)',
        lg: '0 0 15px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.4), 0 0 45px rgba(0, 255, 255, 0.2)',
      },
    },
    
    shadows: {
      terminal: 'inset 0 0 20px rgba(57, 255, 20, 0.1)',
      hud: '0 4px 16px rgba(0, 0, 0, 0.4)',
      elevated: '0 8px 32px rgba(0, 0, 0, 0.6)',
    },
    
    patterns: {
      scanLines: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.03) 2px, rgba(57, 255, 20, 0.03) 4px)',
      grid: 'linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)',
      matrixBg: 'linear-gradient(180deg, #000000 0%, #0a0f0a 50%, #000000 100%)',
    },
  },
} as const;

export type CyberpunkTheme = typeof cyberpunkTheme;