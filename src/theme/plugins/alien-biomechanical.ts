/**
 * Alien Biomechanical Plugin
 * Organic growth animations and cellular effects for alien theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';
import { alienColors } from '../theme.alien';

export interface AlienBiomechanicalConfig {
  intensity?: 'subtle' | 'normal' | 'intense';
  growthEnabled?: boolean;
  cellularEnabled?: boolean;
  tissueEnabled?: boolean;
  mechanicalEnabled?: boolean;
  respectReducedMotion?: boolean;
  customColors?: {
    organic?: string;
    cellular?: string;
    tissue?: string;
    mechanical?: string;
  };
}

const defaultConfig: AlienBiomechanicalConfig = {
  intensity: 'normal',
  growthEnabled: true,
  cellularEnabled: true,
  tissueEnabled: true,
  mechanicalEnabled: true,
  respectReducedMotion: true,
};

export const alienBiomechanicalPlugin: AnimationPlugin = {
  name: 'alien-biomechanical',
  version: '1.0.0',
  category: 'animation',
  priority: 'normal',

  description: 'Organic growth animations and cellular effects for alien theme',

  features: {
    customKeyframes: true,
    gestureAnimations: true,
    advancedKeyframes: true,
  },

  config: defaultConfig,

  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as AlienBiomechanicalConfig;

      // Only apply to alien theme
      if (context.theme?.meta?.name !== 'alien') {
        return { success: true };
      }

      const intensityConfig = {
        subtle: {
          scale: 1.02,
          rotate: 1,
          speed: 8000,
          blur: '0.5px',
        },
        normal: {
          scale: 1.05,
          rotate: 2,
          speed: 6000,
          blur: '1px',
        },
        intense: {
          scale: 1.1,
          rotate: 3,
          speed: 4000,
          blur: '2px',
        },
      }[config.intensity || 'normal'];

      const colors = {
        organic: config.customColors?.organic || alienColors.connectiveTissue,
        cellular: config.customColors?.cellular || alienColors.innerSkin,
        tissue: config.customColors?.tissue || alienColors.paleCartilage,
        mechanical: config.customColors?.mechanical || alienColors.steelOrganic,
      };

      const cssVariables: Record<string, string> = {
        // Biomechanical configuration
        '--alien-bio-scale': intensityConfig.scale.toString(),
        '--alien-bio-rotate': `${intensityConfig.rotate}deg`,
        '--alien-bio-speed': `${intensityConfig.speed}ms`,
        '--alien-bio-blur': intensityConfig.blur,

        // Colors
        '--alien-bio-organic': colors.organic,
        '--alien-bio-cellular': colors.cellular,
        '--alien-bio-tissue': colors.tissue,
        '--alien-bio-mechanical': colors.mechanical,

        // Feature toggles
        '--alien-growth-enabled': config.growthEnabled ? '1' : '0',
        '--alien-cellular-enabled': config.cellularEnabled ? '1' : '0',
        '--alien-tissue-enabled': config.tissueEnabled ? '1' : '0',
        '--alien-mechanical-enabled': config.mechanicalEnabled ? '1' : '0',
      };

      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--alien-reduced-bio-speed'] = '0s';
        cssVariables['--alien-reduced-bio-scale'] = '1';
      }

      // Generate keyframes for biomechanical animations
      const keyframes: Record<string, Record<string, any>> = {};

      if (config.growthEnabled) {
        keyframes['alien-organic-growth'] = {
          '0%': {
            transform: `scale(0.8) rotate(-${intensityConfig.rotate}deg)`,
            opacity: '0.7',
            filter: `blur(${intensityConfig.blur})`,
          },
          '25%': {
            transform: `scale(${intensityConfig.scale * 1.05}) rotate(${intensityConfig.rotate}deg)`,
            opacity: '0.9',
            filter: 'blur(0.5px)',
          },
          '50%': {
            transform: `scale(${intensityConfig.scale * 1.1}) rotate(-${intensityConfig.rotate / 2}deg)`,
            opacity: '1',
            filter: 'blur(0px)',
          },
          '75%': {
            transform: `scale(${intensityConfig.scale * 0.95}) rotate(${intensityConfig.rotate / 2}deg)`,
            opacity: '0.9',
            filter: 'blur(0.5px)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
            opacity: '0.8',
            filter: `blur(${intensityConfig.blur})`,
          },
        };

        keyframes['alien-growth-expand'] = {
          '0%': {
            clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)',
            borderRadius: '50%',
          },
          '50%': {
            clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
            borderRadius: '30% 70% 40% 60%',
          },
          '100%': {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '20% 80% 30% 70%',
          },
        };
      }

      if (config.cellularEnabled) {
        keyframes['alien-cellular-division'] = {
          '0%': {
            transform: 'scale(1)',
            borderRadius: '50%',
            backgroundColor: colors.cellular,
          },
          '30%': {
            transform: 'scale(1.3)',
            borderRadius: '40%',
            backgroundColor: colors.organic,
          },
          '60%': {
            transform: 'scale(1.1) scaleX(0.8)',
            borderRadius: '30% 70%',
            backgroundColor: colors.tissue,
          },
          '80%': {
            transform: 'scale(1.2) scaleX(0.6)',
            borderRadius: '20% 80%',
            backgroundColor: colors.cellular,
          },
          '100%': {
            transform: 'scale(1) scaleX(0.5)',
            borderRadius: '10% 90%',
            backgroundColor: colors.organic,
          },
        };

        keyframes['alien-cellular-pulse'] = {
          '0%, 100%': {
            boxShadow: `inset 0 0 10px ${colors.cellular}`,
            border: `1px solid ${colors.cellular}`,
          },
          '50%': {
            boxShadow: `inset 0 0 20px ${colors.organic}, 0 0 15px ${colors.cellular}`,
            border: `2px solid ${colors.organic}`,
          },
        };
      }

      if (config.tissueEnabled) {
        keyframes['alien-tissue-expansion'] = {
          '0%': {
            clipPath: 'polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%)',
            filter: 'blur(3px)',
            backgroundSize: '10px 10px',
          },
          '50%': {
            clipPath: 'polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)',
            filter: 'blur(1px)',
            backgroundSize: '20px 20px',
          },
          '100%': {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'blur(0px)',
            backgroundSize: '30px 30px',
          },
        };

        keyframes['alien-tissue-weave'] = {
          '0%': {
            backgroundPosition: '0% 0%',
            opacity: '0.6',
          },
          '33%': {
            backgroundPosition: '50% 25%',
            opacity: '0.8',
          },
          '66%': {
            backgroundPosition: '100% 50%',
            opacity: '0.7',
          },
          '100%': {
            backgroundPosition: '0% 0%',
            opacity: '0.6',
          },
        };
      }

      if (config.mechanicalEnabled) {
        keyframes['alien-biomechanical-move'] = {
          '0%': {
            transform: 'translateY(0) rotateZ(0deg)',
            borderRadius: '20% 80% 40% 60%',
            backgroundColor: colors.mechanical,
          },
          '25%': {
            transform: `translateY(-5px) rotateZ(${intensityConfig.rotate}deg)`,
            borderRadius: '40% 60% 20% 80%',
            backgroundColor: colors.organic,
          },
          '50%': {
            transform: `translateY(-2px) rotateZ(-${intensityConfig.rotate / 2}deg)`,
            borderRadius: '60% 40% 80% 20%',
            backgroundColor: colors.tissue,
          },
          '75%': {
            transform: `translateY(-3px) rotateZ(${intensityConfig.rotate / 2}deg)`,
            borderRadius: '80% 20% 60% 40%',
            backgroundColor: colors.cellular,
          },
          '100%': {
            transform: 'translateY(0) rotateZ(0deg)',
            borderRadius: '20% 80% 40% 60%',
            backgroundColor: colors.mechanical,
          },
        };

        keyframes['alien-mechanical-gear'] = {
          '0%': {
            transform: 'rotate(0deg) scale(1)',
            filter: 'brightness(1)',
          },
          '25%': {
            transform: `rotate(${intensityConfig.rotate * 30}deg) scale(1.02)`,
            filter: 'brightness(1.1)',
          },
          '50%': {
            transform: `rotate(${intensityConfig.rotate * 60}deg) scale(1.05)`,
            filter: 'brightness(1.2)',
          },
          '75%': {
            transform: `rotate(${intensityConfig.rotate * 90}deg) scale(1.02)`,
            filter: 'brightness(1.1)',
          },
          '100%': {
            transform: `rotate(${intensityConfig.rotate * 120}deg) scale(1)`,
            filter: 'brightness(1)',
          },
        };
      }

      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.alien-biomechanical-container': {
          position: 'relative',
          overflow: 'hidden',
        },

        '.alien-organic-growth': {
          animation: 'alien-organic-growth var(--alien-bio-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-growth-enabled) * 1)',
          transformOrigin: 'center center',
        },

        '.alien-growth-expand': {
          animation: 'alien-growth-expand calc(var(--alien-bio-speed) * 0.8) ease-out forwards',
          overflow: 'hidden',
        },

        '.alien-cellular': {
          position: 'relative',
          animation: 'alien-cellular-pulse calc(var(--alien-bio-speed) * 0.6) ease-in-out infinite',
          opacity: 'calc(var(--alien-cellular-enabled) * 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            backgroundColor: 'var(--alien-bio-cellular)',
            animation: 'alien-cellular-division var(--alien-bio-speed) ease-in-out infinite',
            opacity: '0.6',
          },
        },

        '.alien-tissue': {
          position: 'relative',
          background: `
            repeating-linear-gradient(
              45deg,
              var(--alien-bio-tissue) 0px,
              transparent 2px,
              transparent 8px,
              var(--alien-bio-tissue) 10px
            ),
            repeating-linear-gradient(
              -45deg,
              var(--alien-bio-organic) 0px,
              transparent 3px,
              transparent 12px,
              var(--alien-bio-organic) 15px
            )
          `,
          animation:
            'alien-tissue-expansion calc(var(--alien-bio-speed) * 1.2) ease-in-out infinite, alien-tissue-weave calc(var(--alien-bio-speed) * 2) linear infinite',
          opacity: 'calc(var(--alien-tissue-enabled) * 0.8)',
        },

        '.alien-biomechanical': {
          position: 'relative',
          animation: 'alien-biomechanical-move var(--alien-bio-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-mechanical-enabled) * 1)',
          background: `
            radial-gradient(circle at 25% 25%, var(--alien-bio-mechanical) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, var(--alien-bio-organic) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 15px 15px',
        },

        '.alien-mechanical-gear': {
          position: 'relative',
          animation: 'alien-mechanical-gear calc(var(--alien-bio-speed) * 0.5) linear infinite',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            height: '80%',
            border: '2px solid var(--alien-bio-mechanical)',
            borderRadius: '20%',
            transform: 'translate(-50%, -50%)',
            background: `
              conic-gradient(from 0deg, 
                var(--alien-bio-mechanical) 0deg, 
                var(--alien-bio-organic) 60deg, 
                var(--alien-bio-mechanical) 120deg, 
                var(--alien-bio-tissue) 180deg, 
                var(--alien-bio-mechanical) 240deg, 
                var(--alien-bio-cellular) 300deg, 
                var(--alien-bio-mechanical) 360deg
              )
            `,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '30%',
            height: '30%',
            backgroundColor: 'var(--alien-bio-mechanical)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          },
        },

        '.alien-bio-interactive': {
          cursor: 'pointer',
          transition: 'all 300ms ease',
          '&:hover': {
            animationDuration: 'calc(var(--alien-bio-speed) * 0.5)',
            transform: 'scale(1.02)',
          },
        },

        '.alien-bio-text': {
          position: 'relative',
          background: `linear-gradient(90deg, var(--alien-bio-organic), var(--alien-bio-tissue))`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: 'alien-tissue-weave calc(var(--alien-bio-speed) * 1.5) linear infinite',
        },

        '.alien-bio-surface': {
          position: 'relative',
          background: `
            radial-gradient(ellipse at top left, var(--alien-bio-organic) 0%, transparent 50%),
            radial-gradient(ellipse at top right, var(--alien-bio-cellular) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, var(--alien-bio-tissue) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, var(--alien-bio-mechanical) 0%, transparent 50%)
          `,
          backgroundSize: '50% 50%',
          animation: 'alien-tissue-weave calc(var(--alien-bio-speed) * 3) ease-in-out infinite',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              repeating-conic-gradient(
                from 0deg at 50% 50%,
                var(--alien-bio-organic) 0deg,
                transparent 30deg,
                var(--alien-bio-tissue) 60deg,
                transparent 90deg
              )
            `,
            opacity: '0.3',
            animation:
              'alien-mechanical-gear calc(var(--alien-bio-speed) * 4) linear infinite reverse',
          },
        },
      };

      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.alien-organic-growth, .alien-growth-expand, .alien-cellular, .alien-tissue, .alien-biomechanical, .alien-mechanical-gear, .alien-bio-text, .alien-bio-surface':
            {
              animation: 'none !important',
            },
          '.alien-cellular::before, .alien-mechanical-gear::before, .alien-mechanical-gear::after, .alien-bio-surface::before':
            {
              animation: 'none !important',
            },
          '.alien-organic-growth, .alien-cellular, .alien-tissue, .alien-biomechanical': {
            transform: 'scale(var(--alien-reduced-bio-scale)) !important',
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
      // Cleanup biomechanical effects when switching away from alien
      if (context.previousTheme?.meta?.name === 'alien' && context.theme?.meta?.name !== 'alien') {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--alien-bio-speed': '0s',
              '--alien-growth-enabled': '0',
              '--alien-cellular-enabled': '0',
              '--alien-tissue-enabled': '0',
              '--alien-mechanical-enabled': '0',
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

      const colorFields = ['organic', 'cellular', 'tissue', 'mechanical'];
      for (const field of colorFields) {
        if (config.customColors[field] && !colorRegex.test(config.customColors[field])) {
          errors.push(`customColors.${field} must be a valid hex or rgba color`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  // Performance optimization hints
  getPerformanceHints: () => [
    'Biomechanical effects with complex gradients can impact performance - use selectively',
    'Consider reducing cellular division frequency on mobile devices',
    'Use CSS containment for isolated biomechanical containers',
    'Avoid tissue expansion effects on large elements',
    'Use transform3d to enable hardware acceleration for growth animations',
    'Limit the number of concurrent organic growth animations',
    'Consider using intersection observer to activate effects only when visible',
    'Use will-change property sparingly and remove after animation completes',
  ],
};

// Convenience function to create biomechanical plugin with custom config
export const createAlienBiomechanicalPlugin = (
  config: Partial<AlienBiomechanicalConfig> = {},
): AnimationPlugin => ({
  ...alienBiomechanicalPlugin,
  config: { ...defaultConfig, ...config },
});

export default alienBiomechanicalPlugin;
