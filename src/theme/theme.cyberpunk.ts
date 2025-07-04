/**
 * Cyberpunk Theme Configuration
 * Inspired by DOOM, Evangelion, Swordfish, and The Matrix
 */

import { generateColorScale } from './utils/colorScale';
import type { ThemeTokens } from './theme.light';

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
    primary: generateColorScale(cyberpunkColors.matrixGreen),
    primaryForeground: cyberpunkColors.deepVoid,
    
    // Secondary - DOOM Red Scale  
    secondary: generateColorScale(cyberpunkColors.doomRed),
    secondaryForeground: cyberpunkColors.pureWhite,
    
    // Neutral - Dark Tech Scale
    neutral100: cyberpunkColors.almostBlack,
    neutral900: cyberpunkColors.pureWhite,
    
    // Semantic Colors using cyberpunk palette
    background: {
      default: cyberpunkColors.deepVoid,
      paper: cyberpunkColors.almostBlack,
      elevated: cyberpunkColors.darkCharcoal,
    },
    
    foreground: {
      default: cyberpunkColors.pureWhite,
      subtle: '#999999',
      muted: '#666666',
      inverted: cyberpunkColors.deepVoid,
    },
    
    border: {
      default: cyberpunkColors.lightCharcoal,
      subtle: cyberpunkColors.mediumCharcoal,
      strong: cyberpunkColors.matrixGreen,
    },
    
    // Accent Colors
    accent: {
      purple: cyberpunkColors.evangelionPurple,
      cyan: cyberpunkColors.swordfishCyan,
      orange: cyberpunkColors.techOrange,
      yellow: cyberpunkColors.cyberYellow,
      pink: cyberpunkColors.hotPink,
    },
    
    // Status Colors
    success: generateColorScale(cyberpunkColors.matrixGreen),
    warning: generateColorScale(cyberpunkColors.techOrange),
    error: generateColorScale(cyberpunkColors.doomRed),
    info: generateColorScale(cyberpunkColors.swordfishCyan),
  },
  
  typography: {
    fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
    fontSize: {
      sm: '0.875rem',
      md: '1rem', 
      lg: '1.125rem',
    },
    
    // Cyberpunk-specific font families
    families: {
      mono: ['Fira Code', 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      display: ['Orbitron', 'Exo 2', 'Rajdhani', 'sans-serif'],
      body: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    }
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
      // Cyberpunk-specific durations
      glitch: '150ms',
      flicker: '100ms',
      scan: '3s',
      matrixRain: '8s',
    },
    easing: {
      inOut: 'ease-in-out',
      // Cyberpunk-specific easing
      cyber: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      glitch: 'steps(10, end)',
      pulse: 'cubic-bezier(0.4, 0, 0.6, 1)',
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