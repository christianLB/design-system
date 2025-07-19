/**
 * Alien Theme Configuration
 * Inspired by H.R. Giger's biomechanical aesthetic
 * Creates an immersive experience that evokes the sensation of inhabiting a living structure
 */

import { generateColorScale, generateSemanticColors } from './utils/colorScale';
import { alienColorTokens } from './tokens/colors';
import { alienAnimationTokens } from './tokens/alien-animations';
import { 
  AlienPluginRegistry, 
  getAlienPlugins, 
  createAlienRegistry, 
  createAlienEffectRegistry,
  type AlienPluginConfig 
} from './plugins/alien-registry';
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

// Alien Biomechanical Color Definitions
export const alienColors = {
  // Primary - Internal Structure (Steel Organic)
  steelOrganic: '#708090',
  boneWhite: '#fafbfc',
  paleCartilage: '#f2f4f6',
  innerSkin: '#e3e7eb',
  connectiveTissue: '#cbd3db',
  deepVein: '#9ba8b7',
  sleepingMuscle: '#5d6b7a',
  internalOrgan: '#4a5560',
  thoracicCavity: '#3c4349',
  bonemarrow: '#2c3034',
  internalVoid: '#1a1d20',
  
  // Neutral - Living Habitat
  externalSurface: '#fbfcfc',
  epidermis: '#f6f7f8',
  dermis: '#eaebec',
  subcutaneousTissue: '#d8dbde',
  interstitialFluid: '#a8aeb5',
  ancientBlood: '#6b7280',
  collapsedVein: '#565d67',
  restingOrgan: '#454a52',
  abdominalCavity: '#323740',
  mechanicalWomb: '#1f2328',
  primordialVoid: '#0d1117',
  
  // Accent - Vital Elements
  vitalGlow: '#fef8f3',
  bodyHeat: '#fdeee3',
  activeCirculation: '#fad8c0',
  arterialPulse: '#f6bb93',
  heartbeat: '#f19066',
  pulsingLife: '#e56e47',
  adrenaline: '#d4552f',
  oxygenatedBlood: '#b13f26',
  bloodIron: '#8f3520',
  clot: '#752d1b',
  driedBlood: '#3d1509',
  
  // Semantic Colors
  background: '#0d1117',
  surfaceCavity: '#1f2328',
  surfaceOrgan: '#323740',
  surfaceTissue: '#454a52',
  surfaceMembrane: '#565d67',
  border: '#6b7280',
  borderVessel: '#a8aeb5',
  borderBone: '#d8dbde',
  text: '#f6f7f8',
  textMuted: '#a8aeb5',
  textVital: '#e56e47',
  textGhost: '#6b7280'
};

export const alienTheme: ThemeTokens = {
  colors: alienColorTokens,
  
  typography: {
    fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
    fontSize: {
      // Organic Typography Scale
      sm: '0.75rem',     // pulse
      md: '1rem',        // heartbeat
      lg: '1.125rem',    // circulation
    },
  },
  
  spacing: {
    // Biomechanical Spacing Scale
    xs: '0.125rem',  // synapse
    sm: '0.25rem',   // membrane
    md: '0.5rem',    // vessel
    lg: '1rem',      // organ
    xl: '1.5rem',    // cavity
    '2xl': '2rem',   // chamber
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
  
  // Asymmetric border radius for organic feel
  radius: '0.375rem 0.75rem 0.25rem 0.625rem',
  
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
  
  borders: {
    color: alienColors.border,
  },
} as const;

// Alien-specific effects and tokens (can be used by components that support alien theme)
export const alienEffects = {
  // Organic border radius variations
  borderRadius: {
    cell: '0.125rem',
    vessel: '0.25rem 0.5rem',
    organ: '0.375rem 0.75rem 0.25rem 0.625rem',
    cavity: '0.5rem 1rem 0.375rem 0.875rem',
    organism: '50%',
  },
  
  // Biomechanical shadows
  shadows: {
    membrane: '0 1px 3px rgba(13, 17, 23, 0.8), inset 0 1px 0 rgba(246, 247, 248, 0.03)',
    organ: '0 4px 12px rgba(13, 17, 23, 0.9), inset 0 1px 0 rgba(246, 247, 248, 0.05)',
    cavity: '0 8px 24px rgba(13, 17, 23, 0.95), inset 0 2px 4px rgba(13, 17, 23, 0.8)',
    vessel: '0 2px 8px rgba(229, 110, 71, 0.1), inset 0 1px 2px rgba(13, 17, 23, 0.6)',
    pulse: '0 0 20px rgba(229, 110, 71, 0.2), 0 0 40px rgba(229, 110, 71, 0.1)',
    neural: 'inset 0 2px 8px rgba(13, 17, 23, 0.9), 0 1px 0 rgba(246, 247, 248, 0.02)',
  },
  
  // Organic gradients
  gradients: {
    membrane: 'linear-gradient(135deg, rgba(50, 55, 64, 0.8) 0%, rgba(31, 35, 40, 0.9) 50%, rgba(13, 17, 23, 1) 100%)',
    vessel: 'radial-gradient(ellipse at center, rgba(69, 74, 82, 0.6) 0%, rgba(50, 55, 64, 0.8) 40%, rgba(31, 35, 40, 0.95) 100%)',
    organ: 'conic-gradient(from 45deg, rgba(31, 35, 40, 1) 0deg, rgba(50, 55, 64, 0.9) 120deg, rgba(69, 74, 82, 0.7) 240deg, rgba(31, 35, 40, 1) 360deg)',
    circulation: 'linear-gradient(90deg, transparent 0%, rgba(229, 110, 71, 0.1) 30%, rgba(229, 110, 71, 0.2) 50%, rgba(229, 110, 71, 0.1) 70%, transparent 100%)',
    neural: 'radial-gradient(circle at 30% 70%, rgba(107, 114, 128, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168, 174, 181, 0.05) 0%, transparent 50%)',
  },
  
  // Biomechanical animations
  animations: {
    breathe: 'breathe 4s ease-in-out infinite',
    circulation: 'circulation 8s linear infinite',
    neural: 'neural 2s ease-in-out infinite alternate',
    pulse: 'pulse 3s ease-in-out infinite',
  },
  
  // Organic font families
  fontFamily: {
    organic: ['Crimson Text', 'Georgia', 'serif'],
    neural: ['Space Mono', 'Courier New', 'monospace'],
    sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
    mono: ['SF Mono', 'Consolas', 'Liberation Mono', 'monospace'],
  },
  
  // Vital color variants for interactive states
  vital: {
    glow: {
      sm: '0 0 5px rgba(229, 110, 71, 0.3)',
      md: '0 0 10px rgba(229, 110, 71, 0.4), 0 0 20px rgba(229, 110, 71, 0.2)',
      lg: '0 0 15px rgba(229, 110, 71, 0.5), 0 0 30px rgba(229, 110, 71, 0.3), 0 0 45px rgba(229, 110, 71, 0.1)',
    },
    circulation: {
      active: 'rgba(229, 110, 71, 0.2)',
      pulse: 'rgba(229, 110, 71, 0.4)',
      dormant: 'rgba(229, 110, 71, 0.1)',
    },
  },
  
  // Neural pathway effects
  neural: {
    pathways: {
      horizontal: 'linear-gradient(90deg, transparent, rgba(107, 114, 128, 0.3), transparent)',
      vertical: 'linear-gradient(180deg, transparent, rgba(107, 114, 128, 0.2), transparent)',
      radial: 'radial-gradient(circle, rgba(107, 114, 128, 0.15) 0%, transparent 70%)',
    },
    synaptic: {
      active: 'rgba(107, 114, 128, 0.6)',
      dormant: 'rgba(107, 114, 128, 0.2)',
    },
  },
};

// Plugin integration
export const alienPluginRegistry = new AlienPluginRegistry();

// Enhanced alien theme with plugin system integration
export const alienThemeWithPlugins = {
  ...alienTheme,
  animations: alienAnimationTokens,
  plugins: {
    registry: alienPluginRegistry,
    getPlugins: getAlienPlugins,
    createRegistry: createAlienRegistry,
    createEffectRegistry: createAlienEffectRegistry,
    
    // Pre-configured effect scenarios
    scenarios: {
      immersive: createAlienEffectRegistry('immersive'),
      interactive: createAlienEffectRegistry('interactive'),
      ambient: createAlienEffectRegistry('ambient'),
      focused: createAlienEffectRegistry('focused'),
    },
    
    // Pre-configured performance presets
    presets: {
      minimal: createAlienRegistry('minimal'),
      standard: createAlienRegistry('standard'),
      full: createAlienRegistry('full'),
      performance: createAlienRegistry('performance'),
    },
  },
  
  // Plugin configuration utilities
  configurePlugins: (config: AlienPluginConfig) => {
    alienPluginRegistry.updateConfig(config);
    return getAlienPlugins(config);
  },
  
  // Performance optimization utilities
  optimizeForDevice: (constraints: {
    isMobile?: boolean;
    isLowPower?: boolean;
    hasLimitedGPU?: boolean;
    reducedMotion?: boolean;
  }) => {
    const optimizedConfig = alienPluginRegistry.getPerformanceRecommendations(constraints);
    return new AlienPluginRegistry(optimizedConfig);
  },
  
  // Validation utilities
  validatePlugins: () => alienPluginRegistry.validateAll(),
  getPerformanceHints: () => alienPluginRegistry.getAllPerformanceHints(),
  
  // Meta information for plugin system
  meta: {
    name: 'alien',
    version: '1.0.0',
    description: 'Biomechanical alien theme with advanced plugin system',
    pluginCount: alienPluginRegistry.getAllPlugins().length,
    supportedEffects: [
      'atmospheric-breathing',
      'neural-pathways', 
      'biomechanical-growth',
      'vital-circulation'
    ],
  },
};

export type AlienTheme = typeof alienTheme;
export type AlienThemeWithPlugins = typeof alienThemeWithPlugins;

// Export plugin system components for external use
export {
  AlienPluginRegistry,
  getAlienPlugins,
  createAlienRegistry,
  createAlienEffectRegistry,
  type AlienPluginConfig,
};