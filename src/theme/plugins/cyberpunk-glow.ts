/**
 * Cyberpunk Glow Effects Plugin
 * Adds dynamic glow effects and neon lighting to cyberpunk theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';
import { cyberpunkColors } from '../theme.cyberpunk';

export interface CyberpunkGlowConfig {
  intensity?: 'subtle' | 'normal' | 'intense';
  enablePulse?: boolean;
  enableHover?: boolean;
  respectReducedMotion?: boolean;
  customColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

const defaultConfig: CyberpunkGlowConfig = {
  intensity: 'normal',
  enablePulse: true,
  enableHover: true,
  respectReducedMotion: true,
};

export const cyberpunkGlowPlugin: AnimationPlugin = {
  name: 'cyberpunk-glow',
  version: '1.0.0',
  category: 'animation',
  priority: 'normal',

  description: 'Dynamic glow effects for cyberpunk theme',

  features: {
    customKeyframes: true,
    gestureAnimations: false,
    advancedKeyframes: true,
  },

  config: defaultConfig,

  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as CyberpunkGlowConfig;

      // Only apply to cyberpunk theme
      if (context.theme?.meta?.name !== 'cyberpunk') {
        return { success: true };
      }

      const glowIntensity = {
        subtle: {
          opacity: 0.3,
          blur: '4px',
          spread: '8px',
        },
        normal: {
          opacity: 0.5,
          blur: '8px',
          spread: '12px',
        },
        intense: {
          opacity: 0.7,
          blur: '12px',
          spread: '16px',
        },
      }[config.intensity || 'normal'];

      const colors = {
        primary: config.customColors?.primary || cyberpunkColors.matrixGreen,
        secondary: config.customColors?.secondary || cyberpunkColors.doomRed,
        accent: config.customColors?.accent || cyberpunkColors.swordfishCyan,
      };

      const cssVariables: Record<string, string> = {
        // Glow intensity variables
        '--cyber-glow-opacity': glowIntensity.opacity.toString(),
        '--cyber-glow-blur': glowIntensity.blur,
        '--cyber-glow-spread': glowIntensity.spread,

        // Primary glow colors (Matrix Green)
        '--cyber-glow-primary-sm': `0 0 5px rgba(57, 255, 20, ${glowIntensity.opacity * 0.6})`,
        '--cyber-glow-primary-md': `0 0 ${glowIntensity.blur} rgba(57, 255, 20, ${glowIntensity.opacity}), 0 0 ${glowIntensity.spread} rgba(57, 255, 20, ${glowIntensity.opacity * 0.5})`,
        '--cyber-glow-primary-lg': `0 0 ${glowIntensity.blur} rgba(57, 255, 20, ${glowIntensity.opacity}), 0 0 ${glowIntensity.spread} rgba(57, 255, 20, ${glowIntensity.opacity * 0.6}), 0 0 ${parseInt(glowIntensity.spread) * 2}px rgba(57, 255, 20, ${glowIntensity.opacity * 0.3})`,

        // Secondary glow colors (DOOM Red)
        '--cyber-glow-secondary-sm': `0 0 5px rgba(255, 0, 0, ${glowIntensity.opacity * 0.6})`,
        '--cyber-glow-secondary-md': `0 0 ${glowIntensity.blur} rgba(255, 0, 0, ${glowIntensity.opacity}), 0 0 ${glowIntensity.spread} rgba(255, 0, 0, ${glowIntensity.opacity * 0.5})`,
        '--cyber-glow-secondary-lg': `0 0 ${glowIntensity.blur} rgba(255, 0, 0, ${glowIntensity.opacity}), 0 0 ${glowIntensity.spread} rgba(255, 0, 0, ${glowIntensity.opacity * 0.6}), 0 0 ${parseInt(glowIntensity.spread) * 2}px rgba(255, 0, 0, ${glowIntensity.opacity * 0.3})`,

        // Accent glow colors (Swordfish Cyan)
        '--cyber-glow-accent-sm': `0 0 5px rgba(0, 255, 255, ${glowIntensity.opacity * 0.6})`,
        '--cyber-glow-accent-md': `0 0 ${glowIntensity.blur} rgba(0, 255, 255, ${glowIntensity.opacity}), 0 0 ${glowIntensity.spread} rgba(0, 255, 255, ${glowIntensity.opacity * 0.5})`,
        '--cyber-glow-accent-lg': `0 0 ${glowIntensity.blur} rgba(0, 255, 255, ${glowIntensity.opacity}), 0 0 ${glowIntensity.spread} rgba(0, 255, 255, ${glowIntensity.opacity * 0.6}), 0 0 ${parseInt(glowIntensity.spread) * 2}px rgba(0, 255, 255, ${glowIntensity.opacity * 0.3})`,

        // Animation variables
        '--cyber-pulse-duration': config.enablePulse ? '2s' : '0s',
        '--cyber-hover-transition': config.enableHover
          ? '300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          : 'none',
      };

      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--cyber-reduced-motion-glow'] = 'var(--cyber-glow-primary-sm)';
        cssVariables['--cyber-reduced-motion-duration'] = '0s';
      }

      // Generate keyframes for glow animations
      const keyframes: Record<string, Record<string, any>> = {};

      if (config.enablePulse) {
        keyframes['cyber-glow-pulse'] = {
          '0%, 100%': {
            boxShadow: 'var(--cyber-glow-primary-sm)',
            filter: 'brightness(1)',
          },
          '50%': {
            boxShadow: 'var(--cyber-glow-primary-md)',
            filter: 'brightness(1.1)',
          },
        };

        keyframes['cyber-glow-pulse-intense'] = {
          '0%, 100%': {
            boxShadow: 'var(--cyber-glow-primary-md)',
            filter: 'brightness(1)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: 'var(--cyber-glow-primary-lg)',
            filter: 'brightness(1.2)',
            transform: 'scale(1.02)',
          },
        };

        // Multi-color glow animation
        keyframes['cyber-glow-rainbow'] = {
          '0%': { boxShadow: 'var(--cyber-glow-primary-md)' },
          '33%': { boxShadow: 'var(--cyber-glow-secondary-md)' },
          '66%': { boxShadow: 'var(--cyber-glow-accent-md)' },
          '100%': { boxShadow: 'var(--cyber-glow-primary-md)' },
        };
      }

      // Text glow effects
      keyframes['cyber-text-glow'] = {
        '0%, 100%': {
          textShadow: `0 0 5px ${colors.primary}, 0 0 10px ${colors.primary}`,
        },
        '50%': {
          textShadow: `0 0 8px ${colors.primary}, 0 0 15px ${colors.primary}, 0 0 20px ${colors.primary}`,
        },
      };

      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.cyber-glow': {
          boxShadow: 'var(--cyber-glow-primary-md)',
          transition: 'var(--cyber-hover-transition)',
        },
        '.cyber-glow:hover': {
          boxShadow: 'var(--cyber-glow-primary-lg)',
        },
        '.cyber-glow-red': {
          boxShadow: 'var(--cyber-glow-secondary-md)',
          transition: 'var(--cyber-hover-transition)',
        },
        '.cyber-glow-red:hover': {
          boxShadow: 'var(--cyber-glow-secondary-lg)',
        },
        '.cyber-glow-cyan': {
          boxShadow: 'var(--cyber-glow-accent-md)',
          transition: 'var(--cyber-hover-transition)',
        },
        '.cyber-glow-cyan:hover': {
          boxShadow: 'var(--cyber-glow-accent-lg)',
        },
        '.cyber-text-glow': {
          animation: 'cyber-text-glow var(--cyber-pulse-duration) ease-in-out infinite',
        },
        '.cyber-pulse': {
          animation: 'cyber-glow-pulse var(--cyber-pulse-duration) ease-in-out infinite',
        },
        '.cyber-pulse-intense': {
          animation: 'cyber-glow-pulse-intense var(--cyber-pulse-duration) ease-in-out infinite',
        },
        '.cyber-rainbow': {
          animation: `cyber-glow-rainbow ${config.enablePulse ? '6s' : '0s'} ease-in-out infinite`,
        },
      };

      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.cyber-pulse, .cyber-pulse-intense, .cyber-rainbow, .cyber-text-glow': {
            animation: 'none',
            boxShadow: 'var(--cyber-reduced-motion-glow)',
          },
        };
      }

      return {
        success: true,
        modifications: {
          cssVariables,
          keyframes,
        },
      };
    },

    onThemeChange: (context: PluginContext): PluginResult => {
      // Cleanup animations when switching away from cyberpunk
      if (
        context.previousTheme?.meta?.name === 'cyberpunk' &&
        context.theme?.meta?.name !== 'cyberpunk'
      ) {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--cyber-pulse-duration': '0s',
              '--cyber-hover-transition': 'none',
            },
          },
        };
      }

      return { success: true };
    },
  },

  // Plugin validation
  validate: (config: any): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (config.intensity && !['subtle', 'normal', 'intense'].includes(config.intensity)) {
      errors.push('intensity must be "subtle", "normal", or "intense"');
    }

    if (config.customColors) {
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      if (config.customColors.primary && !colorRegex.test(config.customColors.primary)) {
        errors.push('customColors.primary must be a valid hex color');
      }

      if (config.customColors.secondary && !colorRegex.test(config.customColors.secondary)) {
        errors.push('customColors.secondary must be a valid hex color');
      }

      if (config.customColors.accent && !colorRegex.test(config.customColors.accent)) {
        errors.push('customColors.accent must be a valid hex color');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  // Performance optimization hints
  getPerformanceHints: () => [
    'Use transform instead of changing box-shadow for animations when possible',
    'Limit the number of glowing elements visible at once',
    'Consider using CSS filters for better performance on mobile devices',
    'Use will-change property sparingly and remove after animation completes',
  ],
};

// Convenience function to create glow plugin with custom config
export const createCyberpunkGlowPlugin = (
  config: Partial<CyberpunkGlowConfig> = {},
): AnimationPlugin => ({
  ...cyberpunkGlowPlugin,
  config: { ...defaultConfig, ...config },
});

export default cyberpunkGlowPlugin;
