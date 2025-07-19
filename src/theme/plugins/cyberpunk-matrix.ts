/**
 * Cyberpunk Matrix Rain Plugin
 * Adds Matrix-style digital rain effects to cyberpunk theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';

export interface CyberpunkMatrixConfig {
  density?: 'light' | 'normal' | 'heavy'; // Number of rain columns
  speed?: 'slow' | 'normal' | 'fast'; // Animation speed
  characters?: 'matrix' | 'binary' | 'hex' | 'japanese'; // Character set
  fadeEffect?: boolean; // Fading trail effect
  colorScheme?: 'green' | 'blue' | 'red' | 'multi'; // Color scheme
  respectReducedMotion?: boolean;
  customColors?: {
    primary?: string;
    secondary?: string;
    fade?: string;
  };
}

const defaultConfig: CyberpunkMatrixConfig = {
  density: 'normal',
  speed: 'normal',
  characters: 'matrix',
  fadeEffect: true,
  colorScheme: 'green',
  respectReducedMotion: true,
};

// Character sets for different themes
const characterSets = {
  matrix: [
    'ｱ',
    'ｲ',
    'ｳ',
    'ｴ',
    'ｵ',
    'ｶ',
    'ｷ',
    'ｸ',
    'ｹ',
    'ｺ',
    'ｻ',
    'ｼ',
    'ｽ',
    'ｾ',
    'ｿ',
    'ﾀ',
    'ﾁ',
    'ﾂ',
    'ﾃ',
    'ﾄ',
    'ﾅ',
    'ﾆ',
    'ﾇ',
    'ﾈ',
    'ﾉ',
    'ﾊ',
    'ﾋ',
    'ﾌ',
    'ﾍ',
    'ﾎ',
    'ﾏ',
    'ﾐ',
    'ﾑ',
    'ﾒ',
    'ﾓ',
    'ﾔ',
    'ﾕ',
    'ﾖ',
    'ﾗ',
    'ﾘ',
    'ﾙ',
    'ﾚ',
    'ﾛ',
    'ﾜ',
    'ｦ',
    'ﾝ',
  ],
  binary: ['0', '1'],
  hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
  japanese: [
    'あ',
    'い',
    'う',
    'え',
    'お',
    'か',
    'き',
    'く',
    'け',
    'こ',
    'さ',
    'し',
    'す',
    'せ',
    'そ',
    'た',
    'ち',
    'つ',
    'て',
    'と',
    'な',
    'に',
    'ぬ',
    'ね',
    'の',
    'は',
    'ひ',
    'ふ',
    'へ',
    'ほ',
    'ま',
    'み',
    'む',
    'め',
    'も',
    'や',
    'ゆ',
    'よ',
    'ら',
    'り',
    'る',
    'れ',
    'ろ',
    'わ',
    'を',
    'ん',
  ],
};

export const cyberpunkMatrixPlugin: AnimationPlugin = {
  name: 'cyberpunk-matrix',
  version: '1.0.0',
  category: 'animation',
  priority: 'low', // Lower priority as it's a background effect

  description: 'Matrix-style digital rain effects for cyberpunk theme',

  features: {
    customKeyframes: true,
    gestureAnimations: false,
    advancedKeyframes: true,
  },

  config: defaultConfig,

  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as CyberpunkMatrixConfig;

      // Only apply to cyberpunk theme
      if (context.theme?.meta?.name !== 'cyberpunk') {
        return { success: true };
      }

      const densityConfig = {
        light: {
          columns: 15,
          characterSize: '14px',
          spacing: '40px',
        },
        normal: {
          columns: 25,
          characterSize: '12px',
          spacing: '30px',
        },
        heavy: {
          columns: 40,
          characterSize: '10px',
          spacing: '20px',
        },
      }[config.density || 'normal'];

      const speedConfig = {
        slow: {
          duration: '8s',
          delay: '3s',
        },
        normal: {
          duration: '4s',
          delay: '2s',
        },
        fast: {
          duration: '2s',
          delay: '1s',
        },
      }[config.speed || 'normal'];

      const colorSchemes = {
        green: {
          primary: config.customColors?.primary || '#39FF14',
          secondary: config.customColors?.secondary || '#00FF00',
          fade: config.customColors?.fade || 'rgba(57, 255, 20, 0.1)',
        },
        blue: {
          primary: '#00BFFF',
          secondary: '#0080FF',
          fade: 'rgba(0, 191, 255, 0.1)',
        },
        red: {
          primary: '#FF0040',
          secondary: '#FF0000',
          fade: 'rgba(255, 0, 64, 0.1)',
        },
        multi: {
          primary: '#39FF14',
          secondary: '#FF0040',
          fade: 'rgba(57, 255, 20, 0.1)',
        },
      }[config.colorScheme || 'green'];

      const cssVariables: Record<string, string> = {
        // Matrix configuration
        '--cyber-matrix-columns': densityConfig.columns.toString(),
        '--cyber-matrix-char-size': densityConfig.characterSize,
        '--cyber-matrix-spacing': densityConfig.spacing,
        '--cyber-matrix-duration': speedConfig.duration,
        '--cyber-matrix-delay': speedConfig.delay,

        // Colors
        '--cyber-matrix-primary': colorSchemes.primary,
        '--cyber-matrix-secondary': colorSchemes.secondary,
        '--cyber-matrix-fade': colorSchemes.fade,

        // Character set
        '--cyber-matrix-charset': config.characters || 'matrix',

        // Feature toggles
        '--cyber-matrix-fade-enabled': config.fadeEffect ? '1' : '0',
      };

      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--cyber-reduced-matrix-duration'] = '0s';
        cssVariables['--cyber-reduced-matrix-opacity'] = '0';
      }

      // Generate keyframes for matrix rain
      const keyframes: Record<string, Record<string, any>> = {};

      // Main matrix rain fall
      keyframes['cyber-matrix-fall'] = {
        '0%': {
          transform: 'translateY(-100vh)',
          opacity: '0',
        },
        '10%': {
          opacity: '1',
        },
        '90%': {
          opacity: '1',
        },
        '100%': {
          transform: 'translateY(100vh)',
          opacity: '0',
        },
      };

      // Character cycling effect
      keyframes['cyber-matrix-cycle'] = {
        '0%': { opacity: '1' },
        '50%': { opacity: '0.3' },
        '100%': { opacity: '1' },
      };

      // Fade trail effect
      if (config.fadeEffect) {
        keyframes['cyber-matrix-fade'] = {
          '0%': {
            opacity: '1',
            filter: 'brightness(1.2)',
          },
          '50%': {
            opacity: '0.6',
            filter: 'brightness(0.8)',
          },
          '100%': {
            opacity: '0.1',
            filter: 'brightness(0.3)',
          },
        };
      }

      // Multi-color effect for 'multi' color scheme
      if (config.colorScheme === 'multi') {
        keyframes['cyber-matrix-rainbow'] = {
          '0%': { color: colorSchemes.primary },
          '33%': { color: '#00BFFF' },
          '66%': { color: '#FF0040' },
          '100%': { color: colorSchemes.primary },
        };
      }

      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.cyber-matrix-rain': {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: '-1',
          overflow: 'hidden',
          fontFamily: 'monospace',
          fontSize: 'var(--cyber-matrix-char-size)',
          lineHeight: '1',
          color: 'var(--cyber-matrix-primary)',
        },

        '.cyber-matrix-column': {
          position: 'absolute',
          top: '0',
          width: 'var(--cyber-matrix-spacing)',
          height: '100%',
          animation: `cyber-matrix-fall var(--cyber-matrix-duration) linear infinite`,
          animationDelay: 'calc(var(--cyber-matrix-delay) * var(--column-index, 0))',
        },

        '.cyber-matrix-char': {
          display: 'block',
          marginBottom: '4px',
          animation: `cyber-matrix-cycle 0.5s ease-in-out infinite`,
          animationDelay: 'calc(var(--char-index, 0) * 0.1s)',
        },

        '.cyber-matrix-background': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent calc(var(--cyber-matrix-spacing) - 2px),
                var(--cyber-matrix-fade) calc(var(--cyber-matrix-spacing) - 2px),
                var(--cyber-matrix-fade) var(--cyber-matrix-spacing)
              )
            `,
            pointerEvents: 'none',
            zIndex: '-1',
            opacity: 'calc(var(--cyber-matrix-fade-enabled) * 0.3)',
          },
        },

        '.cyber-matrix-overlay': {
          position: 'relative',
          '&::after': {
            content:
              '"' + characterSets[config.characters || 'matrix'].slice(0, 20).join(' ') + '"',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            fontFamily: 'monospace',
            fontSize: 'var(--cyber-matrix-char-size)',
            color: 'var(--cyber-matrix-primary)',
            opacity: '0.1',
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
            animation: 'cyber-matrix-cycle 2s ease-in-out infinite',
            zIndex: '1',
          },
        },
      };

      // Add fade effect classes
      if (config.fadeEffect) {
        utilityClasses['.cyber-matrix-char-fade'] = {
          animation: 'cyber-matrix-fade 3s linear infinite',
          animationDelay: 'calc(var(--char-index, 0) * 0.3s)',
        };
      }

      // Add multi-color effect
      if (config.colorScheme === 'multi') {
        utilityClasses['.cyber-matrix-rainbow'] = {
          animation: 'cyber-matrix-rainbow 6s linear infinite',
        };
      }

      // Simplified matrix text effect for easier application
      utilityClasses['.cyber-matrix-text'] = {
        fontFamily: 'monospace',
        color: 'var(--cyber-matrix-primary)',
        textShadow: `0 0 5px var(--cyber-matrix-primary)`,
        animation: 'cyber-matrix-cycle 1s ease-in-out infinite',
        letterSpacing: '2px',
      };

      // Matrix cursor effect
      utilityClasses['.cyber-matrix-cursor'] = {
        position: 'relative',
        '&::after': {
          content: '"█"',
          animation: 'cyber-matrix-cycle 1s ease-in-out infinite',
          color: 'var(--cyber-matrix-primary)',
          marginLeft: '2px',
        },
      };

      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.cyber-matrix-rain, .cyber-matrix-column, .cyber-matrix-char, .cyber-matrix-text, .cyber-matrix-cursor':
            {
              animation: 'none !important',
            },
          '.cyber-matrix-rain': {
            opacity: 'var(--cyber-reduced-matrix-opacity)',
          },
          '.cyber-matrix-overlay::after': {
            animation: 'none !important',
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
      // Cleanup matrix effects when switching away from cyberpunk
      if (
        context.previousTheme?.meta?.name === 'cyberpunk' &&
        context.theme?.meta?.name !== 'cyberpunk'
      ) {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--cyber-matrix-duration': '0s',
              '--cyber-reduced-matrix-opacity': '0',
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

    if (config.density && !['light', 'normal', 'heavy'].includes(config.density)) {
      errors.push('density must be "light", "normal", or "heavy"');
    }

    if (config.speed && !['slow', 'normal', 'fast'].includes(config.speed)) {
      errors.push('speed must be "slow", "normal", or "fast"');
    }

    if (config.characters && !['matrix', 'binary', 'hex', 'japanese'].includes(config.characters)) {
      errors.push('characters must be "matrix", "binary", "hex", or "japanese"');
    }

    if (config.colorScheme && !['green', 'blue', 'red', 'multi'].includes(config.colorScheme)) {
      errors.push('colorScheme must be "green", "blue", "red", or "multi"');
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

      if (config.customColors.fade && !colorRegex.test(config.customColors.fade)) {
        errors.push('customColors.fade must be a valid hex or rgba color');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  // Performance optimization hints
  getPerformanceHints: () => [
    'Matrix rain is CPU intensive - use sparingly on mobile devices',
    'Consider reducing density on lower-end devices',
    'Use CSS containment for better performance isolation',
    'Avoid matrix effects on scrollable content areas',
    'Consider disabling matrix rain during intensive operations',
    'Use will-change property only when animation is active',
  ],
};

// Convenience function to create matrix plugin with custom config
export const createCyberpunkMatrixPlugin = (
  config: Partial<CyberpunkMatrixConfig> = {},
): AnimationPlugin => ({
  ...cyberpunkMatrixPlugin,
  config: { ...defaultConfig, ...config },
});

// Helper function to generate matrix characters for CSS content
export const generateMatrixCharacters = (
  charset: keyof typeof characterSets,
  count: number = 20,
): string => {
  const chars = characterSets[charset];
  return Array.from({ length: count }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    ' ',
  );
};

export default cyberpunkMatrixPlugin;
