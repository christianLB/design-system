/**
 * Mirtha Legrand Color Tokens
 * Elegant color system with gold, rose, and pearl tones
 */

import { generateColorScale, generateSemanticColors } from '../utils/colorScale';
import type { SemanticColorTokens } from './colors';

// Helper function to create semantic color tokens
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

// Mirtha base colors
const mirthaBaseColors = {
  gold: '#FFD700',
  roseGold: '#F4C2C2',
  burgundy: '#722F37',
  pearl: '#FFF8DC',
  success: '#22c55e',
  warning: '#FFD900',
};

// Generate color scales
const goldScale = createSemanticColorTokens(mirthaBaseColors.gold);
const roseScale = createSemanticColorTokens(mirthaBaseColors.roseGold);
const burgundyScale = createSemanticColorTokens(mirthaBaseColors.burgundy);
const successScale = createSemanticColorTokens(mirthaBaseColors.success);
const warningScale = createSemanticColorTokens(mirthaBaseColors.warning);

export const mirthaColorTokens: SemanticColorTokens = {
  // Primary - Gold
  primary: goldScale,

  // Secondary - Rose Gold
  secondary: roseScale,

  // Destructive - Burgundy
  destructive: burgundyScale,

  // Success - Green
  success: successScale,

  // Warning - Bright Gold
  warning: warningScale,

  // Backgrounds
  background: '#FFFCF9',
  foreground: '#36454F',

  // Card
  card: '#FFF9F5',
  cardForeground: '#36454F',

  // Popover
  popover: '#FFFAF7',
  popoverForeground: '#36454F',

  // Secondary
  secondary: '#FFFBF8',
  secondaryForeground: '#8B7D6B',

  // Muted
  muted: '#F5F0EA',
  mutedForeground: '#8B7D6B',

  // Accent
  accent: mirthaBaseColors.roseGold,
  accentForeground: '#36454F',

  // Borders
  border: '#E8DFD3',
  input: '#F5F0EA',
  ring: '#D4AF37',
};
