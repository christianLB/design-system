/**
 * Alien Atmospheric Effects Plugin
 * Advanced breathing patterns and atmospheric effects for alien theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';
import { alienColors } from '../theme.alien';

export interface AlienAtmosphericConfig {
  intensity?: 'subtle' | 'normal' | 'intense';
  breathingEnabled?: boolean;
  mistEnabled?: boolean;
  atmosphericFlowEnabled?: boolean;
  respectReducedMotion?: boolean;
  customColors?: {
    primary?: string;
    secondary?: string;
    mist?: string;
  };
}

const defaultConfig: AlienAtmosphericConfig = {
  intensity: 'normal',
  breathingEnabled: true,
  mistEnabled: true,
  atmosphericFlowEnabled: true,
  respectReducedMotion: true,
};

export const alienAtmosphericPlugin: AnimationPlugin = {
  name: 'alien-atmospheric',
  version: '1.0.0',
  category: 'animation',
  priority: 'normal',

  description: 'Advanced breathing patterns and atmospheric effects for alien theme',

  features: {
    customKeyframes: true,
    gestureAnimations: false,
    advancedKeyframes: true,
  },

  config: defaultConfig,

  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as AlienAtmosphericConfig;

      // Only apply to alien theme
      if (context.theme?.meta?.name !== 'alien') {
        return { success: true };
      }

      const intensityConfig = {
        subtle: {
          opacity: 0.3,
          scale: 1.02,
          blur: '1px',
          speed: 6000,
        },
        normal: {
          opacity: 0.5,
          scale: 1.05,
          blur: '2px',
          speed: 4000,
        },
        intense: {
          opacity: 0.7,
          scale: 1.08,
          blur: '3px',
          speed: 3000,
        },
      }[config.intensity || 'normal'];

      const colors = {
        primary: config.customColors?.primary || alienColors.textVital,
        secondary: config.customColors?.secondary || alienColors.ancientBlood,
        mist: config.customColors?.mist || 'rgba(229, 110, 71, 0.2)',
      };

      const cssVariables: Record<string, string> = {
        // Atmospheric configuration
        '--alien-atm-opacity': intensityConfig.opacity.toString(),
        '--alien-atm-scale': intensityConfig.scale.toString(),
        '--alien-atm-blur': intensityConfig.blur,
        '--alien-atm-speed': `${intensityConfig.speed}ms`,

        // Colors
        '--alien-atm-primary': colors.primary,
        '--alien-atm-secondary': colors.secondary,
        '--alien-atm-mist': colors.mist,

        // Feature toggles
        '--alien-breathing-enabled': config.breathingEnabled ? '1' : '0',
        '--alien-mist-enabled': config.mistEnabled ? '1' : '0',
        '--alien-flow-enabled': config.atmosphericFlowEnabled ? '1' : '0',
      };

      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--alien-reduced-atm-speed'] = '0s';
        cssVariables['--alien-reduced-atm-opacity'] = '0.2';
      }

      // Generate keyframes for atmospheric animations
      const keyframes: Record<string, Record<string, any>> = {};

      if (config.breathingEnabled) {
        keyframes['alien-atmospheric-breathe'] = {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: 'var(--alien-atm-opacity)',
            filter: `blur(${intensityConfig.blur})`,
          },
          '50%': {
            transform: `scale(${intensityConfig.scale})`,
            opacity: Math.min(intensityConfig.opacity * 1.3, 1).toString(),
            filter: `blur(${parseInt(intensityConfig.blur) / 2}px)`,
          },
        };

        keyframes['alien-ambient-pulse'] = {
          '0%, 100%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.3})`,
            borderColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.5})`,
          },
          '50%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.6})`,
            borderColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.8})`,
          },
        };
      }

      if (config.mistEnabled) {
        keyframes['alien-vital-mist'] = {
          '0%': {
            transform: 'translateX(-100%) scaleY(0.8)',
            opacity: '0',
          },
          '20%': {
            opacity: intensityConfig.opacity * 0.8,
          },
          '80%': {
            opacity: intensityConfig.opacity * 0.8,
          },
          '100%': {
            transform: 'translateX(100%) scaleY(1.2)',
            opacity: '0',
          },
        };

        keyframes['alien-mist-flow'] = {
          '0%': {
            backgroundPosition: '0% 50%',
            opacity: intensityConfig.opacity * 0.4,
          },
          '50%': {
            backgroundPosition: '100% 50%',
            opacity: intensityConfig.opacity * 0.7,
          },
          '100%': {
            backgroundPosition: '0% 50%',
            opacity: intensityConfig.opacity * 0.4,
          },
        };
      }

      if (config.atmosphericFlowEnabled) {
        keyframes['alien-atmospheric-flow'] = {
          '0%': {
            backgroundPosition: '0% 0%',
            transform: 'rotate(0deg)',
          },
          '25%': {
            backgroundPosition: '50% 50%',
            transform: 'rotate(1deg)',
          },
          '50%': {
            backgroundPosition: '100% 100%',
            transform: 'rotate(0deg)',
          },
          '75%': {
            backgroundPosition: '50% 50%',
            transform: 'rotate(-1deg)',
          },
          '100%': {
            backgroundPosition: '0% 0%',
            transform: 'rotate(0deg)',
          },
        };

        keyframes['alien-membrane-ripple'] = {
          '0%': {
            transform: 'scale(1) rotateZ(0deg)',
            borderRadius: '50%',
          },
          '25%': {
            transform: 'scale(1.1) rotateZ(2deg)',
            borderRadius: '60% 40%',
          },
          '50%': {
            transform: 'scale(1.2) rotateZ(0deg)',
            borderRadius: '40% 60%',
          },
          '75%': {
            transform: 'scale(1.1) rotateZ(-2deg)',
            borderRadius: '60% 40%',
          },
          '100%': {
            transform: 'scale(1) rotateZ(0deg)',
            borderRadius: '50%',
          },
        };
      }

      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.alien-atmospheric': {
          position: 'relative',
          overflow: 'hidden',
          animation: 'alien-atmospheric-breathe var(--alien-atm-speed) ease-in-out infinite',
        },

        '.alien-breathing': {
          animation: 'alien-atmospheric-breathe var(--alien-atm-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-breathing-enabled) * var(--alien-atm-opacity))',
        },

        '.alien-ambient': {
          position: 'relative',
          animation: 'alien-ambient-pulse var(--alien-atm-speed) ease-in-out infinite',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              radial-gradient(ellipse at center, var(--alien-atm-mist) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 20%, var(--alien-atm-mist) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, var(--alien-atm-mist) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
            zIndex: '-1',
            opacity: 'calc(var(--alien-breathing-enabled) * 0.5)',
          },
        },

        '.alien-mist-overlay': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '200%',
            height: '100%',
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                var(--alien-atm-mist) 30%, 
                var(--alien-atm-mist) 70%, 
                transparent 100%
              )
            `,
            animation: 'alien-vital-mist calc(var(--alien-atm-speed) * 2) linear infinite',
            pointerEvents: 'none',
            zIndex: '1',
            opacity: 'calc(var(--alien-mist-enabled) * 1)',
          },
        },

        '.alien-atmospheric-flow': {
          position: 'relative',
          background: `
            radial-gradient(circle at 20% 50%, var(--alien-atm-primary) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, var(--alien-atm-secondary) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, var(--alien-atm-primary) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 80px 80px, 60px 60px',
          animation:
            'alien-atmospheric-flow calc(var(--alien-atm-speed) * 2.5) ease-in-out infinite',
          opacity: 'calc(var(--alien-flow-enabled) * var(--alien-atm-opacity))',
        },

        '.alien-membrane': {
          position: 'relative',
          background: `
            radial-gradient(ellipse at center, 
              rgba(50, 55, 64, 0.4) 0%, 
              rgba(31, 35, 40, 0.6) 40%, 
              rgba(13, 17, 23, 0.8) 100%
            )
          `,
          animation:
            'alien-membrane-ripple calc(var(--alien-atm-speed) * 1.5) ease-in-out infinite',
          backdropFilter: 'blur(var(--alien-atm-blur))',
        },

        '.alien-atmospheric-container': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `
              linear-gradient(45deg, transparent 40%, var(--alien-atm-mist) 50%, transparent 60%),
              radial-gradient(circle at 30% 70%, var(--alien-atm-mist) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, var(--alien-atm-secondary) 0%, transparent 30%)
            `,
            backgroundSize: '200% 200%, 300px 300px, 400px 400px',
            animation: 'alien-mist-flow calc(var(--alien-atm-speed) * 3) linear infinite',
            pointerEvents: 'none',
            zIndex: '-10',
            opacity: 'calc(var(--alien-flow-enabled) * 0.3)',
          },
        },

        '.alien-breathing-text': {
          animation:
            'alien-atmospheric-breathe calc(var(--alien-atm-speed) * 0.8) ease-in-out infinite',
          textShadow: `0 0 10px var(--alien-atm-primary)`,
        },
      };

      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.alien-atmospheric, .alien-breathing, .alien-ambient, .alien-mist-overlay, .alien-atmospheric-flow, .alien-membrane, .alien-atmospheric-container, .alien-breathing-text':
            {
              animation: 'none !important',
            },
          '.alien-atmospheric-container::before, .alien-mist-overlay::after': {
            animation: 'none !important',
            opacity: 'var(--alien-reduced-atm-opacity) !important',
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
      // Cleanup atmospheric effects when switching away from alien
      if (context.previousTheme?.meta?.name === 'alien' && context.theme?.meta?.name !== 'alien') {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--alien-atm-speed': '0s',
              '--alien-breathing-enabled': '0',
              '--alien-mist-enabled': '0',
              '--alien-flow-enabled': '0',
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
      const colorRegex =
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$/;

      if (config.customColors.primary && !colorRegex.test(config.customColors.primary)) {
        errors.push('customColors.primary must be a valid hex or rgba color');
      }

      if (config.customColors.secondary && !colorRegex.test(config.customColors.secondary)) {
        errors.push('customColors.secondary must be a valid hex or rgba color');
      }

      if (config.customColors.mist && !colorRegex.test(config.customColors.mist)) {
        errors.push('customColors.mist must be a valid hex or rgba color');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  // Performance optimization hints
  getPerformanceHints: () => [
    'Use transform and opacity for smooth animations instead of changing layout properties',
    'Limit atmospheric effects to key visual areas to maintain performance',
    'Consider reducing intensity on mobile devices for better battery life',
    'Use CSS containment (contain: layout style paint) for isolated atmospheric effects',
    'Avoid applying breathing effects to rapidly changing content',
    'Use will-change property sparingly and remove after animation completes',
  ],
};

// Convenience function to create atmospheric plugin with custom config
export const createAlienAtmosphericPlugin = (
  config: Partial<AlienAtmosphericConfig> = {},
): AnimationPlugin => ({
  ...alienAtmosphericPlugin,
  config: { ...defaultConfig, ...config },
});

export default alienAtmosphericPlugin;
