/**
 * Cyberpunk Scanline Effects Plugin
 * Adds retro CRT-style scanline overlays to cyberpunk theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';

export interface CyberpunkScanlineConfig {
  lineSpacing?: number; // pixels between scanlines
  lineOpacity?: number; // opacity of scanline overlay
  animationSpeed?: 'slow' | 'normal' | 'fast';
  enableFlicker?: boolean; // CRT-style flickering
  enableNoise?: boolean; // Static noise overlay
  respectReducedMotion?: boolean;
  customColors?: {
    scanlineColor?: string;
    noiseColor?: string;
  };
}

const defaultConfig: CyberpunkScanlineConfig = {
  lineSpacing: 4,
  lineOpacity: 0.15,
  animationSpeed: 'normal',
  enableFlicker: true,
  enableNoise: false,
  respectReducedMotion: true,
};

export const cyberpunkScanlinePlugin: AnimationPlugin = {
  name: 'cyberpunk-scanline',
  version: '1.0.0',
  category: 'animation',
  priority: 'normal',

  description: 'CRT-style scanline effects for cyberpunk theme',

  features: {
    customKeyframes: true,
    gestureAnimations: false,
    advancedKeyframes: true,
  },

  config: defaultConfig,

  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as CyberpunkScanlineConfig;

      // Only apply to cyberpunk theme
      if (context.theme?.meta?.name !== 'cyberpunk') {
        return { success: true };
      }

      const animationSpeeds = {
        slow: {
          scanline: '8s',
          flicker: '4s',
          noise: '0.8s',
        },
        normal: {
          scanline: '4s',
          flicker: '2s',
          noise: '0.4s',
        },
        fast: {
          scanline: '2s',
          flicker: '1s',
          noise: '0.2s',
        },
      }[config.animationSpeed || 'normal'];

      const colors = {
        scanline: config.customColors?.scanlineColor || 'rgba(57, 255, 20, 0.1)',
        noise: config.customColors?.noiseColor || 'rgba(255, 255, 255, 0.03)',
      };

      const cssVariables: Record<string, string> = {
        // Scanline configuration
        '--cyber-scanline-spacing': `${config.lineSpacing}px`,
        '--cyber-scanline-opacity': config.lineOpacity?.toString() || '0.15',
        '--cyber-scanline-color': colors.scanline,
        '--cyber-noise-color': colors.noise,

        // Animation speeds
        '--cyber-scanline-speed': animationSpeeds.scanline,
        '--cyber-flicker-speed': animationSpeeds.flicker,
        '--cyber-noise-speed': animationSpeeds.noise,

        // Feature toggles
        '--cyber-flicker-enabled': config.enableFlicker ? '1' : '0',
        '--cyber-noise-enabled': config.enableNoise ? '1' : '0',
      };

      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--cyber-reduced-scanline-speed'] = '0s';
        cssVariables['--cyber-reduced-flicker-speed'] = '0s';
        cssVariables['--cyber-reduced-noise-speed'] = '0s';
      }

      // Generate keyframes for scanline animations
      const keyframes: Record<string, Record<string, any>> = {};

      // Moving scanline effect
      keyframes['cyber-scanline-sweep'] = {
        '0%': {
          transform: 'translateY(-100vh)',
        },
        '100%': {
          transform: 'translateY(100vh)',
        },
      };

      // CRT flicker effect
      if (config.enableFlicker) {
        keyframes['cyber-crt-flicker'] = {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1) contrast(1)',
          },
          '2%': {
            opacity: '0.98',
            filter: 'brightness(1.1) contrast(1.05)',
          },
          '4%': {
            opacity: '1',
            filter: 'brightness(0.95) contrast(0.98)',
          },
          '8%': {
            opacity: '0.99',
            filter: 'brightness(1.05) contrast(1.02)',
          },
          '10%': {
            opacity: '1',
            filter: 'brightness(1) contrast(1)',
          },
        };

        // Subtle screen shake
        keyframes['cyber-crt-shake'] = {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%': {
            transform: 'translateX(1px)',
          },
          '20%': {
            transform: 'translateX(-1px)',
          },
          '30%': {
            transform: 'translateX(0.5px)',
          },
          '40%': {
            transform: 'translateX(-0.5px)',
          },
          '50%': {
            transform: 'translateX(0)',
          },
        };
      }

      // Static noise effect
      if (config.enableNoise) {
        keyframes['cyber-static-noise'] = {
          '0%': {
            transform: 'translateY(0) scaleX(1)',
            opacity: '0.03',
          },
          '10%': {
            transform: 'translateY(-5px) scaleX(1.01)',
            opacity: '0.05',
          },
          '20%': {
            transform: 'translateY(2px) scaleX(0.99)',
            opacity: '0.02',
          },
          '30%': {
            transform: 'translateY(-2px) scaleX(1.02)',
            opacity: '0.04',
          },
          '40%': {
            transform: 'translateY(3px) scaleX(0.98)',
            opacity: '0.03',
          },
          '50%': {
            transform: 'translateY(-1px) scaleX(1.01)',
            opacity: '0.06',
          },
          '60%': {
            transform: 'translateY(1px) scaleX(0.99)',
            opacity: '0.02',
          },
          '70%': {
            transform: 'translateY(-3px) scaleX(1.02)',
            opacity: '0.04',
          },
          '80%': {
            transform: 'translateY(2px) scaleX(0.98)',
            opacity: '0.05',
          },
          '90%': {
            transform: 'translateY(-1px) scaleX(1)',
            opacity: '0.03',
          },
          '100%': {
            transform: 'translateY(0) scaleX(1)',
            opacity: '0.03',
          },
        };
      }

      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.cyber-scanlines': {
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `repeating-linear-gradient(
              transparent,
              transparent var(--cyber-scanline-spacing),
              var(--cyber-scanline-color) var(--cyber-scanline-spacing),
              var(--cyber-scanline-color) calc(var(--cyber-scanline-spacing) + 1px)
            )`,
            pointerEvents: 'none',
            zIndex: '1000',
            opacity: 'var(--cyber-scanline-opacity)',
          },
        },

        '.cyber-scanline-sweep': {
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, var(--cyber-scanline-color), transparent)',
            animation: 'cyber-scanline-sweep var(--cyber-scanline-speed) linear infinite',
            pointerEvents: 'none',
            zIndex: '1001',
          },
        },

        '.cyber-crt-screen': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `repeating-linear-gradient(
              transparent,
              transparent var(--cyber-scanline-spacing),
              var(--cyber-scanline-color) var(--cyber-scanline-spacing),
              var(--cyber-scanline-color) calc(var(--cyber-scanline-spacing) + 1px)
            )`,
            pointerEvents: 'none',
            zIndex: '1000',
            opacity: 'var(--cyber-scanline-opacity)',
          },
        },
      };

      // Add flicker effects
      if (config.enableFlicker) {
        utilityClasses['.cyber-crt-flicker'] = {
          animation: `cyber-crt-flicker var(--cyber-flicker-speed) ease-in-out infinite, 
                     cyber-crt-shake calc(var(--cyber-flicker-speed) * 2) ease-in-out infinite`,
        };

        utilityClasses['.cyber-crt-screen'] = {
          ...utilityClasses['.cyber-crt-screen'],
          animation: 'cyber-crt-flicker var(--cyber-flicker-speed) ease-in-out infinite',
        };
      }

      // Add noise effects
      if (config.enableNoise) {
        utilityClasses['.cyber-static-noise'] = {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              radial-gradient(circle at 20% 50%, var(--cyber-noise-color) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, var(--cyber-noise-color) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, var(--cyber-noise-color) 1px, transparent 1px),
              radial-gradient(circle at 90% 90%, var(--cyber-noise-color) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 60px 60px, 40px 40px, 30px 30px',
            animation: 'cyber-static-noise var(--cyber-noise-speed) linear infinite',
            pointerEvents: 'none',
            zIndex: '1002',
            opacity: 'calc(var(--cyber-noise-enabled) * 1)',
          },
        };
      }

      // Combined CRT effect
      utilityClasses['.cyber-crt-full'] = {
        ...utilityClasses['.cyber-crt-screen'],
        '&::after': {
          ...(utilityClasses['.cyber-scanline-sweep'] as any)['&::after'],
        },
      };

      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.cyber-scanline-sweep, .cyber-crt-flicker, .cyber-static-noise, .cyber-crt-full': {
            animation: 'none !important',
          },
          '.cyber-scanline-sweep::after, .cyber-crt-full::after': {
            animation: 'none !important',
          },
          '.cyber-static-noise::after': {
            animation: 'none !important',
            opacity: '0 !important',
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
      // Cleanup scanline effects when switching away from cyberpunk
      if (
        context.previousTheme?.meta?.name === 'cyberpunk' &&
        context.theme?.meta?.name !== 'cyberpunk'
      ) {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--cyber-scanline-speed': '0s',
              '--cyber-flicker-speed': '0s',
              '--cyber-noise-speed': '0s',
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

    if (config.lineSpacing && (config.lineSpacing < 1 || config.lineSpacing > 20)) {
      errors.push('lineSpacing must be between 1 and 20 pixels');
    }

    if (config.lineOpacity && (config.lineOpacity < 0 || config.lineOpacity > 1)) {
      errors.push('lineOpacity must be between 0 and 1');
    }

    if (config.animationSpeed && !['slow', 'normal', 'fast'].includes(config.animationSpeed)) {
      errors.push('animationSpeed must be "slow", "normal", or "fast"');
    }

    if (config.customColors) {
      const colorRegex =
        /^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$|^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      if (
        config.customColors.scanlineColor &&
        !colorRegex.test(config.customColors.scanlineColor)
      ) {
        errors.push('customColors.scanlineColor must be a valid hex or rgba color');
      }

      if (config.customColors.noiseColor && !colorRegex.test(config.customColors.noiseColor)) {
        errors.push('customColors.noiseColor must be a valid hex or rgba color');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  // Performance optimization hints
  getPerformanceHints: () => [
    'Use transform properties instead of changing position for better performance',
    'Limit scanline effects to critical UI areas only',
    'Consider disabling noise effects on mobile devices',
    'Use CSS containment (contain: layout style paint) for isolated effects',
    'Avoid applying scanlines to rapidly changing content',
  ],
};

// Convenience function to create scanline plugin with custom config
export const createCyberpunkScanlinePlugin = (
  config: Partial<CyberpunkScanlineConfig> = {},
): AnimationPlugin => ({
  ...cyberpunkScanlinePlugin,
  config: { ...defaultConfig, ...config },
});

export default cyberpunkScanlinePlugin;
