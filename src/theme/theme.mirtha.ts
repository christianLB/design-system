/**
 * Mirtha Legrand Theme Configuration
 * Inspired by the elegance and sophistication of Argentina's eternal diva
 * Creates a luxurious experience with golden accents and graceful animations
 */

import { generateColorScale, generateSemanticColors } from './utils/colorScale';
import { mirthaAnimationTokens } from './tokens/mirtha-animations';
import { mirthaColorTokens } from './tokens/mirtha-colors';
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

// Mirtha Legrand Elegant Color Definitions
export const mirthaColors = {
  // Primary - Golden Elegance
  pureGold: '#FFD700',
  champagneGold: '#F7E7CE',
  antiqueGold: '#D4AF37',
  brightGold: '#FFD900',
  satinGold: '#CBA135',
  deepGold: '#B8860B',
  oldGold: '#CFB53B',
  brassGold: '#B5A642',
  bronzeGold: '#CD7F32',
  copperGold: '#B87333',
  darkGold: '#AA6C39',

  // Accent - Rose & Pink Sophistication
  roseGold: '#F4C2C2',
  blushPink: '#FFB6C1',
  champagneRose: '#F7CAC9',
  pearlPink: '#FFDAB9',
  dustyRose: '#DCAE96',
  mauve: '#E0B0FF',
  lavenderBlush: '#FFF0F5',
  palePink: '#FADADD',
  coralPink: '#F88379',
  salmonRose: '#FA8072',
  burgundy: '#722F37',

  // Neutral - Pearl & Cream Luxury
  pearl: '#FFF8DC',
  ivory: '#FFFFF0',
  cream: '#FFFDD0',
  alabaster: '#FEFEFA',
  porcelain: '#FCF9F3',
  champagne: '#FAF6F0',
  linen: '#FAF0E6',
  beige: '#F5F5DC',
  taupe: '#E8DFD3',
  mink: '#D2B9A7',
  charcoal: '#36454F',

  // Semantic Colors - Más cálidos y lujosos
  background: '#FBF7F0', // Champagne cálido en lugar de blanco puro
  surface: '#FDF9F3', // Crema elegante
  surfaceElevated: '#FEFAF6', // Marfil suave
  surfaceOverlay: '#FCF8F2', // Tono dorado muy sutil
  surfaceHighlight: '#FFFCF7', // Highlight con calidez
  border: '#E6DCC9', // Border más dorado
  borderSubtle: '#F2EDDF', // Subtle con más calidez
  borderAccent: '#C9A96E', // Accent dorado más rico
  text: '#36454F',
  textMuted: '#8B7D6B',
  textGold: '#B8860B',
  textElegant: '#722F37',
};

export const mirthaTheme: ThemeTokens = {
  colors: mirthaColorTokens,

  typography: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: {
      // Elegant Typography Scale
      sm: '0.875rem', // subtle
      md: '1rem', // refined
      lg: '1.25rem', // graceful
    },
  },

  spacing: {
    // Luxurious Spacing Scale
    xs: '0.25rem', // delicate
    sm: '0.5rem', // refined
    md: '1rem', // balanced
    lg: '1.5rem', // generous
    xl: '2rem', // luxurious
    '2xl': '3rem', // opulent
  },

  motion: {
    duration: {
      fast: '200ms',
      normal: '400ms',
      slow: '600ms',
    },
    easing: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  // Elegant border radius
  radius: '0.5rem',

  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  borders: {
    color: mirthaColors.borderSubtle,
  },
} as const;

// Mirtha-specific effects and tokens
export const mirthaEffects = {
  // Elegant border radius variations
  borderRadius: {
    subtle: '0.25rem',
    refined: '0.5rem',
    graceful: '0.75rem',
    flowing: '1rem',
    circular: '50%',
  },

  // Luxurious shadows
  shadows: {
    subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    soft: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    elegant: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    luxurious: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    golden: '0 4px 14px 0 rgba(255, 215, 0, 0.15), 0 2px 10px 0 rgba(255, 215, 0, 0.1)',
    rose: '0 4px 14px 0 rgba(244, 194, 194, 0.2), 0 2px 10px 0 rgba(244, 194, 194, 0.15)',
  },

  // Elegant gradients
  gradients: {
    goldShimmer: 'linear-gradient(135deg, #FFD700 0%, #F7E7CE 50%, #FFD700 100%)',
    roseGold: 'linear-gradient(135deg, #F4C2C2 0%, #FFD700 50%, #F4C2C2 100%)',
    champagne: 'linear-gradient(180deg, #FAF6F0 0%, #F7E7CE 50%, #FAF6F0 100%)',
    pearlescent: 'radial-gradient(ellipse at center, #FFFFF0 0%, #FFF8DC 40%, #FAF0E6 100%)',
    sunset: 'linear-gradient(135deg, #FFB6C1 0%, #FFD700 33%, #F88379 66%, #722F37 100%)',
    luxury: 'conic-gradient(from 0deg, #FFD700, #F4C2C2, #FFF8DC, #FFD700)',
  },

  // Graceful animations
  animations: {
    shimmer: 'shimmer 3s ease-in-out infinite',
    sparkle: 'sparkle 2s ease-in-out infinite',
    glow: 'glow 4s ease-in-out infinite',
    float: 'float 6s ease-in-out infinite',
    fade: 'fade 1s ease-in-out',
  },

  // Elegant font families
  fontFamily: {
    display: ['Playfair Display', 'Georgia', 'serif'],
    elegant: ['Crimson Text', 'Georgia', 'serif'],
    sans: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
    script: ['Dancing Script', 'cursive'],
  },

  // Golden glow effects
  glow: {
    gold: {
      sm: '0 0 10px rgba(255, 215, 0, 0.3)',
      md: '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)',
      lg: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3), 0 0 90px rgba(255, 215, 0, 0.1)',
    },
    rose: {
      sm: '0 0 10px rgba(244, 194, 194, 0.4)',
      md: '0 0 20px rgba(244, 194, 194, 0.5), 0 0 40px rgba(244, 194, 194, 0.3)',
      lg: '0 0 30px rgba(244, 194, 194, 0.6), 0 0 60px rgba(244, 194, 194, 0.4), 0 0 90px rgba(244, 194, 194, 0.2)',
    },
  },

  // Color groups for story compatibility
  charcoal: mirthaColors.charcoal,
  burgundy: mirthaColors.burgundy,
  pearl: {
    charcoal: mirthaColors.charcoal,
    background: mirthaColors.pearl,
  },
  rose: {
    burgundy: mirthaColors.burgundy,
    background: mirthaColors.roseGold,
  },

  // Sparkle effects
  sparkle: {
    gold: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.8) 0%, transparent 50%)',
    silver: 'radial-gradient(circle at 50% 50%, rgba(192, 192, 192, 0.8) 0%, transparent 50%)',
    diamond: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 50%)',
  },
};

export type MirthaTheme = typeof mirthaTheme;
