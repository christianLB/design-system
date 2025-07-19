/**
 * Alien Neural Plugin
 * Interactive synaptic connections and neural pathways for alien theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';
import { alienColors } from '../theme.alien';

export interface AlienNeuralConfig {
  intensity?: 'subtle' | 'normal' | 'intense';
  synapticEnabled?: boolean;
  pathwayEnabled?: boolean;
  networkEnabled?: boolean;
  brainwaveEnabled?: boolean;
  respectReducedMotion?: boolean;
  customColors?: {
    synaptic?: string;
    pathway?: string;
    network?: string;
  };
}

const defaultConfig: AlienNeuralConfig = {
  intensity: 'normal',
  synapticEnabled: true,
  pathwayEnabled: true,
  networkEnabled: true,
  brainwaveEnabled: true,
  respectReducedMotion: true,
};

export const alienNeuralPlugin: AnimationPlugin = {
  name: 'alien-neural',
  version: '1.0.0',
  category: 'animation',
  priority: 'high',
  
  description: 'Interactive synaptic connections and neural pathways for alien theme',
  
  features: {
    customKeyframes: true,
    performanceOptimizations: true,
    gestureAnimations: true,
    advancedKeyframes: true,
  },
  
  config: defaultConfig,
  
  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as AlienNeuralConfig;
      
      // Only apply to alien theme
      if (context.theme?.meta?.name !== 'alien') {
        return { success: true };
      }
      
      const intensityConfig = {
        subtle: {
          opacity: 0.4,
          scale: 1.02,
          speed: 3000,
          frequency: 0.5,
        },
        normal: {
          opacity: 0.6,
          scale: 1.05,
          speed: 2000,
          frequency: 1,
        },
        intense: {
          opacity: 0.8,
          scale: 1.08,
          speed: 1500,
          frequency: 2,
        },
      }[config.intensity || 'normal'];
      
      const colors = {
        synaptic: config.customColors?.synaptic || alienColors.ancientBlood,
        pathway: config.customColors?.pathway || alienColors.textMuted,
        network: config.customColors?.network || alienColors.borderVessel,
      };
      
      const cssVariables: Record<string, string> = {
        // Neural configuration
        '--alien-neural-opacity': intensityConfig.opacity.toString(),
        '--alien-neural-scale': intensityConfig.scale.toString(),
        '--alien-neural-speed': `${intensityConfig.speed}ms`,
        '--alien-neural-frequency': intensityConfig.frequency.toString(),
        
        // Colors
        '--alien-neural-synaptic': colors.synaptic,
        '--alien-neural-pathway': colors.pathway,
        '--alien-neural-network': colors.network,
        
        // Feature toggles
        '--alien-synaptic-enabled': config.synapticEnabled ? '1' : '0',
        '--alien-pathway-enabled': config.pathwayEnabled ? '1' : '0',
        '--alien-network-enabled': config.networkEnabled ? '1' : '0',
        '--alien-brainwave-enabled': config.brainwaveEnabled ? '1' : '0',
      };
      
      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--alien-reduced-neural-speed'] = '0s';
        cssVariables['--alien-reduced-neural-opacity'] = '0.2';
      }
      
      // Generate keyframes for neural animations
      const keyframes: Record<string, Record<string, any>> = {};
      
      if (config.synapticEnabled) {
        keyframes['alien-synaptic-fire'] = {
          '0%': {
            opacity: '0.3',
            transform: 'scale(0.8)',
            filter: 'brightness(1)',
          },
          '10%': {
            opacity: intensityConfig.opacity,
            transform: `scale(${intensityConfig.scale * 1.2})`,
            filter: 'brightness(1.5)',
          },
          '20%': {
            opacity: intensityConfig.opacity * 0.7,
            transform: 'scale(1)',
            filter: 'brightness(1.1)',
          },
          '100%': {
            opacity: '0.3',
            transform: 'scale(0.8)',
            filter: 'brightness(1)',
          },
        };
        
        keyframes['alien-synaptic-pulse'] = {
          '0%, 100%': {
            borderColor: `rgba(107, 114, 128, ${intensityConfig.opacity * 0.3})`,
            boxShadow: `0 0 5px rgba(107, 114, 128, ${intensityConfig.opacity * 0.2})`,
          },
          '50%': {
            borderColor: `rgba(107, 114, 128, ${intensityConfig.opacity})`,
            boxShadow: `0 0 15px rgba(107, 114, 128, ${intensityConfig.opacity * 0.6}), 0 0 30px rgba(107, 114, 128, ${intensityConfig.opacity * 0.3})`,
          },
        };
      }
      
      if (config.pathwayEnabled) {
        keyframes['alien-neural-pathway'] = {
          '0%': {
            strokeDashoffset: '1000',
            opacity: '0',
          },
          '20%': {
            opacity: intensityConfig.opacity,
          },
          '80%': {
            opacity: intensityConfig.opacity,
          },
          '100%': {
            strokeDashoffset: '0',
            opacity: intensityConfig.opacity * 0.3,
          },
        };
        
        keyframes['alien-pathway-glow'] = {
          '0%, 100%': {
            filter: `drop-shadow(0 0 2px rgba(107, 114, 128, ${intensityConfig.opacity * 0.3}))`,
          },
          '50%': {
            filter: `drop-shadow(0 0 8px rgba(107, 114, 128, ${intensityConfig.opacity})) drop-shadow(0 0 16px rgba(107, 114, 128, ${intensityConfig.opacity * 0.5}))`,
          },
        };
      }
      
      if (config.networkEnabled) {
        keyframes['alien-neural-network'] = {
          '0%': {
            backgroundPosition: '0% 0%',
            opacity: intensityConfig.opacity * 0.3,
          },
          '33%': {
            backgroundPosition: '50% 50%',
            opacity: intensityConfig.opacity * 0.7,
          },
          '66%': {
            backgroundPosition: '100% 100%',
            opacity: intensityConfig.opacity * 0.5,
          },
          '100%': {
            backgroundPosition: '0% 0%',
            opacity: intensityConfig.opacity * 0.3,
          },
        };
        
        keyframes['alien-network-connection'] = {
          '0%': {
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          },
          '50%': {
            transform: 'scaleX(1)',
            transformOrigin: 'left center',
          },
          '100%': {
            transform: 'scaleX(0)',
            transformOrigin: 'right center',
          },
        };
      }
      
      if (config.brainwaveEnabled) {
        keyframes['alien-brainwave'] = {
          '0%': {
            transform: 'scaleX(0.5) scaleY(1)',
            opacity: intensityConfig.opacity * 0.5,
          },
          '25%': {
            transform: 'scaleX(1) scaleY(0.8)',
            opacity: intensityConfig.opacity,
          },
          '50%': {
            transform: 'scaleX(1.2) scaleY(1.2)',
            opacity: intensityConfig.opacity * 0.8,
          },
          '75%': {
            transform: 'scaleX(0.8) scaleY(1)',
            opacity: intensityConfig.opacity,
          },
          '100%': {
            transform: 'scaleX(0.5) scaleY(1)',
            opacity: intensityConfig.opacity * 0.5,
          },
        };
        
        keyframes['alien-neural-wave'] = {
          '0%': {
            clipPath: 'polygon(0% 50%, 0% 50%, 0% 50%, 0% 50%)',
          },
          '25%': {
            clipPath: 'polygon(0% 50%, 25% 30%, 25% 70%, 0% 50%)',
          },
          '50%': {
            clipPath: 'polygon(0% 50%, 50% 20%, 50% 80%, 0% 50%)',
          },
          '75%': {
            clipPath: 'polygon(0% 50%, 75% 30%, 75% 70%, 0% 50%)',
          },
          '100%': {
            clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
          },
        };
      }
      
      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.alien-neural-container': {
          position: 'relative',
          overflow: 'hidden',
        },
        
        '.alien-synaptic': {
          position: 'relative',
          animation: 'alien-synaptic-pulse var(--alien-neural-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-synaptic-enabled) * var(--alien-neural-opacity))',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--alien-neural-synaptic)',
            transform: 'translate(-50%, -50%)',
            animation: 'alien-synaptic-fire calc(var(--alien-neural-speed) * var(--alien-neural-frequency)) ease-out infinite',
          },
        },
        
        '.alien-neural-pathway': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              linear-gradient(90deg, transparent, var(--alien-neural-pathway), transparent),
              linear-gradient(0deg, transparent, var(--alien-neural-pathway), transparent)
            `,
            backgroundSize: '100% 2px, 2px 100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            animation: 'alien-pathway-glow var(--alien-neural-speed) ease-in-out infinite',
            opacity: 'calc(var(--alien-pathway-enabled) * 1)',
            pointerEvents: 'none',
          },
        },
        
        '.alien-neural-network': {
          position: 'relative',
          background: `
            radial-gradient(circle at 20% 20%, var(--alien-neural-network) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, var(--alien-neural-network) 1px, transparent 1px),
            radial-gradient(circle at 20% 80%, var(--alien-neural-network) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, var(--alien-neural-network) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, var(--alien-neural-network) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 60px 60px, 50px 50px, 70px 70px, 30px 30px',
          animation: 'alien-neural-network calc(var(--alien-neural-speed) * 2) ease-in-out infinite',
          opacity: 'calc(var(--alien-network-enabled) * var(--alien-neural-opacity))',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            height: '1px',
            background: `linear-gradient(90deg, transparent, var(--alien-neural-network), transparent)`,
            animation: 'alien-network-connection calc(var(--alien-neural-speed) * 1.5) ease-in-out infinite',
            transform: 'translateY(-50%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '50%',
            width: '1px',
            background: `linear-gradient(0deg, transparent, var(--alien-neural-network), transparent)`,
            animation: 'alien-network-connection calc(var(--alien-neural-speed) * 1.8) ease-in-out infinite',
            animationDelay: '0.5s',
            transform: 'translateX(-50%)',
          },
        },
        
        '.alien-brainwave': {
          position: 'relative',
          animation: 'alien-brainwave var(--alien-neural-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-brainwave-enabled) * var(--alien-neural-opacity))',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `linear-gradient(90deg, var(--alien-neural-pathway), transparent, var(--alien-neural-pathway))`,
            animation: 'alien-neural-wave calc(var(--alien-neural-speed) * 0.8) linear infinite',
            opacity: '0.6',
          },
        },
        
        '.alien-neural-interactive': {
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 300ms ease',
          '&:hover': {
            '&::before': {
              animationDuration: 'calc(var(--alien-neural-speed) * 0.5)',
            },
            '.alien-synaptic::before': {
              animationDuration: 'calc(var(--alien-neural-speed) * 0.3)',
            },
          },
        },
        
        '.alien-neural-text': {
          position: 'relative',
          color: 'var(--alien-neural-pathway)',
          textShadow: `0 0 5px var(--alien-neural-pathway)`,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '1px',
            background: 'var(--alien-neural-pathway)',
            animation: 'alien-network-connection calc(var(--alien-neural-speed) * 1.2) ease-in-out infinite',
          },
        },
        
        '.alien-neural-grid': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundImage: `
              linear-gradient(90deg, var(--alien-neural-network) 1px, transparent 1px),
              linear-gradient(0deg, var(--alien-neural-network) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 'calc(var(--alien-network-enabled) * 0.3)',
            pointerEvents: 'none',
            animation: 'alien-neural-network calc(var(--alien-neural-speed) * 3) linear infinite',
          },
        },
      };
      
      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.alien-synaptic, .alien-neural-pathway, .alien-neural-network, .alien-brainwave, .alien-neural-text, .alien-neural-grid': {
            animation: 'none !important',
          },
          '.alien-synaptic::before, .alien-neural-pathway::after, .alien-neural-network::before, .alien-neural-network::after, .alien-brainwave::before, .alien-neural-text::after, .alien-neural-grid::before': {
            animation: 'none !important',
            opacity: 'var(--alien-reduced-neural-opacity) !important',
          },
        };
      }
      
      return {
        success: true,
        modifications: {
          cssVariables,
          keyframes,
          utilityClasses,
        },
      };
    },
    
    onThemeChange: (context: PluginContext): PluginResult => {
      // Cleanup neural effects when switching away from alien
      if (context.previousTheme?.meta?.name === 'alien' && 
          context.theme?.meta?.name !== 'alien') {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--alien-neural-speed': '0s',
              '--alien-synaptic-enabled': '0',
              '--alien-pathway-enabled': '0',
              '--alien-network-enabled': '0',
              '--alien-brainwave-enabled': '0',
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
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$/;
      
      if (config.customColors.synaptic && !colorRegex.test(config.customColors.synaptic)) {
        errors.push('customColors.synaptic must be a valid hex or rgba color');
      }
      
      if (config.customColors.pathway && !colorRegex.test(config.customColors.pathway)) {
        errors.push('customColors.pathway must be a valid hex or rgba color');
      }
      
      if (config.customColors.network && !colorRegex.test(config.customColors.network)) {
        errors.push('customColors.network must be a valid hex or rgba color');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  },
  
  // Performance optimization hints
  getPerformanceHints: () => [
    'Neural effects can be CPU intensive - use sparingly on complex layouts',
    'Consider reducing network density on mobile devices',
    'Use CSS containment for isolated neural containers',
    'Avoid neural effects on rapidly scrolling content',
    'Use transform3d to enable hardware acceleration for pathway animations',
    'Limit the number of active synaptic connections simultaneously',
    'Consider using intersection observer to activate neural effects only when visible',
  ],
};

// Convenience function to create neural plugin with custom config
export const createAlienNeuralPlugin = (config: Partial<AlienNeuralConfig> = {}): AnimationPlugin => ({
  ...alienNeuralPlugin,
  config: { ...defaultConfig, ...config },
});

export default alienNeuralPlugin;