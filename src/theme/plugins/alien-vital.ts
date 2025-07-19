/**
 * Alien Vital Plugin
 * Pulse, circulation, and life force visualizations for alien theme
 */

import type { AnimationPlugin, PluginContext, PluginResult } from './types';
import { alienColors } from '../theme.alien';

export interface AlienVitalConfig {
  intensity?: 'subtle' | 'normal' | 'intense';
  heartbeatEnabled?: boolean;
  circulationEnabled?: boolean;
  bloodPulseEnabled?: boolean;
  vitalGlowEnabled?: boolean;
  lifeForceEnabled?: boolean;
  respectReducedMotion?: boolean;
  customColors?: {
    heartbeat?: string;
    circulation?: string;
    bloodPulse?: string;
    vitalGlow?: string;
    lifeForce?: string;
  };
}

const defaultConfig: AlienVitalConfig = {
  intensity: 'normal',
  heartbeatEnabled: true,
  circulationEnabled: true,
  bloodPulseEnabled: true,
  vitalGlowEnabled: true,
  lifeForceEnabled: true,
  respectReducedMotion: true,
};

export const alienVitalPlugin: AnimationPlugin = {
  name: 'alien-vital',
  version: '1.0.0',
  category: 'animation',
  priority: 'high',
  
  description: 'Pulse, circulation, and life force visualizations for alien theme',
  
  features: {
    customKeyframes: true,
    performanceOptimizations: true,
    gestureAnimations: true,
    advancedKeyframes: true,
  },
  
  config: defaultConfig,
  
  hooks: {
    afterThemeBuild: (context: PluginContext): PluginResult => {
      const config = { ...defaultConfig, ...context.config } as AlienVitalConfig;
      
      // Only apply to alien theme
      if (context.theme?.meta?.name !== 'alien') {
        return { success: true };
      }
      
      const intensityConfig = {
        subtle: {
          opacity: 0.4,
          scale: 1.03,
          glow: '5px',
          speed: 4000,
          pulse: 0.6,
        },
        normal: {
          opacity: 0.6,
          scale: 1.05,
          glow: '10px',
          speed: 3000,
          pulse: 0.8,
        },
        intense: {
          opacity: 0.8,
          scale: 1.08,
          glow: '15px',
          speed: 2000,
          pulse: 1.0,
        },
      }[config.intensity || 'normal'];
      
      const colors = {
        heartbeat: config.customColors?.heartbeat || alienColors.textVital,
        circulation: config.customColors?.circulation || alienColors.arterialPulse,
        bloodPulse: config.customColors?.bloodPulse || alienColors.pulsingLife,
        vitalGlow: config.customColors?.vitalGlow || alienColors.heartbeat,
        lifeForce: config.customColors?.lifeForce || alienColors.adrenaline,
      };
      
      const cssVariables: Record<string, string> = {
        // Vital configuration
        '--alien-vital-opacity': intensityConfig.opacity.toString(),
        '--alien-vital-scale': intensityConfig.scale.toString(),
        '--alien-vital-glow': intensityConfig.glow,
        '--alien-vital-speed': `${intensityConfig.speed}ms`,
        '--alien-vital-pulse': intensityConfig.pulse.toString(),
        
        // Colors
        '--alien-vital-heartbeat': colors.heartbeat,
        '--alien-vital-circulation': colors.circulation,
        '--alien-vital-blood': colors.bloodPulse,
        '--alien-vital-glow': colors.vitalGlow,
        '--alien-vital-life': colors.lifeForce,
        
        // Feature toggles
        '--alien-heartbeat-enabled': config.heartbeatEnabled ? '1' : '0',
        '--alien-circulation-enabled': config.circulationEnabled ? '1' : '0',
        '--alien-blood-enabled': config.bloodPulseEnabled ? '1' : '0',
        '--alien-glow-enabled': config.vitalGlowEnabled ? '1' : '0',
        '--alien-life-enabled': config.lifeForceEnabled ? '1' : '0',
      };
      
      // Add reduced motion support
      if (config.respectReducedMotion) {
        cssVariables['--alien-reduced-vital-speed'] = '0s';
        cssVariables['--alien-reduced-vital-opacity'] = '0.3';
      }
      
      // Generate keyframes for vital animations
      const keyframes: Record<string, Record<string, any>> = {};
      
      if (config.heartbeatEnabled) {
        keyframes['alien-heartbeat'] = {
          '0%, 60%, 100%': {
            transform: 'scale(1)',
            opacity: intensityConfig.opacity,
          },
          '5%': {
            transform: `scale(${intensityConfig.scale})`,
            opacity: intensityConfig.opacity * 1.2,
          },
          '15%': {
            transform: 'scale(0.98)',
            opacity: intensityConfig.opacity * 0.8,
          },
          '25%': {
            transform: `scale(${intensityConfig.scale * 1.1})`,
            opacity: intensityConfig.opacity * 1.3,
          },
          '35%': {
            transform: 'scale(0.97)',
            opacity: intensityConfig.opacity * 0.7,
          },
        };
        
        keyframes['alien-vital-pulse'] = {
          '0%, 100%': {
            boxShadow: `0 0 ${intensityConfig.glow} ${colors.heartbeat}`,
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.3})`,
          },
          '50%': {
            boxShadow: `0 0 ${parseInt(intensityConfig.glow) * 2}px ${colors.heartbeat}, 0 0 ${parseInt(intensityConfig.glow) * 3}px ${colors.vitalGlow}`,
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.7})`,
          },
        };
      }
      
      if (config.circulationEnabled) {
        keyframes['alien-circulation-flow'] = {
          '0%': {
            transform: 'translateX(-100%) scaleY(1)',
            opacity: '0',
          },
          '10%': {
            opacity: intensityConfig.opacity * 0.6,
          },
          '50%': {
            transform: 'translateX(0) scaleY(1.2)',
            opacity: intensityConfig.opacity,
          },
          '90%': {
            opacity: intensityConfig.opacity * 0.6,
          },
          '100%': {
            transform: 'translateX(100%) scaleY(1)',
            opacity: '0',
          },
        };
        
        keyframes['alien-vessel-flow'] = {
          '0%': {
            backgroundPosition: '0% 50%',
            filter: 'brightness(1)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            filter: 'brightness(1.3)',
          },
          '100%': {
            backgroundPosition: '0% 50%',
            filter: 'brightness(1)',
          },
        };
      }
      
      if (config.bloodPulseEnabled) {
        keyframes['alien-blood-pulse'] = {
          '0%, 100%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.3})`,
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
          '15%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.7})`,
            transform: `scale(${intensityConfig.scale})`,
            filter: 'brightness(1.2)',
          },
          '30%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.5})`,
            transform: 'scale(0.95)',
            filter: 'brightness(0.9)',
          },
          '45%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.8})`,
            transform: `scale(${intensityConfig.scale * 1.05})`,
            filter: 'brightness(1.3)',
          },
          '60%': {
            backgroundColor: `rgba(229, 110, 71, ${intensityConfig.opacity * 0.4})`,
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
        };
        
        keyframes['alien-blood-drop'] = {
          '0%': {
            transform: 'translateY(-100%) scale(0.5)',
            opacity: '0',
            borderRadius: '50% 50% 50% 50%',
          },
          '10%': {
            opacity: intensityConfig.opacity,
            borderRadius: '50% 50% 50% 50%',
          },
          '50%': {
            transform: 'translateY(50%) scale(1.2)',
            opacity: intensityConfig.opacity * 1.2,
            borderRadius: '60% 40% 40% 60%',
          },
          '90%': {
            opacity: intensityConfig.opacity * 0.8,
            borderRadius: '70% 30% 30% 70%',
          },
          '100%': {
            transform: 'translateY(100%) scale(0.8)',
            opacity: '0',
            borderRadius: '80% 20% 20% 80%',
          },
        };
      }
      
      if (config.vitalGlowEnabled) {
        keyframes['alien-vital-glow'] = {
          '0%, 100%': {
            boxShadow: `0 0 ${intensityConfig.glow} rgba(229, 110, 71, ${intensityConfig.opacity * 0.3}), inset 0 0 ${parseInt(intensityConfig.glow) * 2}px rgba(229, 110, 71, ${intensityConfig.opacity * 0.1})`,
            filter: 'brightness(1)',
          },
          '50%': {
            boxShadow: `0 0 ${parseInt(intensityConfig.glow) * 2}px rgba(229, 110, 71, ${intensityConfig.opacity * 0.6}), 0 0 ${parseInt(intensityConfig.glow) * 4}px rgba(229, 110, 71, ${intensityConfig.opacity * 0.3}), inset 0 0 ${parseInt(intensityConfig.glow) * 3}px rgba(229, 110, 71, ${intensityConfig.opacity * 0.2})`,
            filter: 'brightness(1.2)',
          },
        };
        
        keyframes['alien-glow-ripple'] = {
          '0%': {
            transform: 'scale(0.8)',
            opacity: intensityConfig.opacity,
            borderRadius: '50%',
          },
          '50%': {
            transform: 'scale(1.5)',
            opacity: intensityConfig.opacity * 0.3,
            borderRadius: '40%',
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0',
            borderRadius: '30%',
          },
        };
      }
      
      if (config.lifeForceEnabled) {
        keyframes['alien-life-force'] = {
          '0%': {
            transform: 'scale(0.8) rotate(0deg)',
            opacity: intensityConfig.opacity * 0.6,
            filter: 'hue-rotate(0deg)',
          },
          '25%': {
            transform: `scale(${intensityConfig.scale}) rotate(90deg)`,
            opacity: intensityConfig.opacity * 0.9,
            filter: 'hue-rotate(30deg)',
          },
          '50%': {
            transform: `scale(${intensityConfig.scale * 1.3}) rotate(180deg)`,
            opacity: intensityConfig.opacity,
            filter: 'hue-rotate(60deg)',
          },
          '75%': {
            transform: `scale(${intensityConfig.scale}) rotate(270deg)`,
            opacity: intensityConfig.opacity * 0.9,
            filter: 'hue-rotate(30deg)',
          },
          '100%': {
            transform: 'scale(0.8) rotate(360deg)',
            opacity: intensityConfig.opacity * 0.6,
            filter: 'hue-rotate(0deg)',
          },
        };
        
        keyframes['alien-energy-spiral'] = {
          '0%': {
            transform: 'rotate(0deg) scale(0.5)',
            opacity: '0',
          },
          '20%': {
            opacity: intensityConfig.opacity * 0.8,
          },
          '80%': {
            opacity: intensityConfig.opacity * 0.8,
          },
          '100%': {
            transform: 'rotate(360deg) scale(2)',
            opacity: '0',
          },
        };
      }
      
      // Generate utility classes
      const utilityClasses: Record<string, Record<string, any>> = {
        '.alien-vital-container': {
          position: 'relative',
          overflow: 'hidden',
        },
        
        '.alien-heartbeat': {
          animation: 'alien-heartbeat var(--alien-vital-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-heartbeat-enabled) * var(--alien-vital-opacity))',
          transformOrigin: 'center center',
        },
        
        '.alien-vital-pulse': {
          animation: 'alien-vital-pulse calc(var(--alien-vital-speed) * 0.8) ease-in-out infinite',
          border: `1px solid var(--alien-vital-heartbeat)`,
        },
        
        '.alien-circulation': {
          position: 'relative',
          background: `linear-gradient(90deg, transparent, var(--alien-vital-circulation), transparent)`,
          animation: 'alien-circulation-flow calc(var(--alien-vital-speed) * 1.5) linear infinite',
          opacity: 'calc(var(--alien-circulation-enabled) * 1)',
        },
        
        '.alien-vessel': {
          position: 'relative',
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              var(--alien-vital-circulation) 20%, 
              var(--alien-vital-blood) 50%, 
              var(--alien-vital-circulation) 80%, 
              transparent 100%
            )
          `,
          backgroundSize: '200% 100%',
          animation: 'alien-vessel-flow calc(var(--alien-vital-speed) * 2) linear infinite',
          height: '4px',
          borderRadius: '2px',
        },
        
        '.alien-blood-pulse': {
          animation: 'alien-blood-pulse var(--alien-vital-speed) ease-in-out infinite',
          opacity: 'calc(var(--alien-blood-enabled) * 1)',
          border: `1px solid var(--alien-vital-blood)`,
        },
        
        '.alien-blood-drop': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '8px',
            height: '12px',
            backgroundColor: 'var(--alien-vital-blood)',
            animation: 'alien-blood-drop calc(var(--alien-vital-speed) * 0.6) ease-in-out infinite',
            left: '50%',
            transform: 'translateX(-50%)',
          },
        },
        
        '.alien-vital-glow': {
          animation: 'alien-vital-glow calc(var(--alien-vital-speed) * 1.2) ease-in-out infinite',
          opacity: 'calc(var(--alien-glow-enabled) * 1)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '150%',
            height: '150%',
            border: `2px solid var(--alien-vital-glow)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'alien-glow-ripple calc(var(--alien-vital-speed) * 2) ease-out infinite',
            pointerEvents: 'none',
          },
        },
        
        '.alien-life-force': {
          position: 'relative',
          animation: 'alien-life-force calc(var(--alien-vital-speed) * 3) ease-in-out infinite',
          opacity: 'calc(var(--alien-life-enabled) * 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            background: `
              conic-gradient(from 0deg, 
                transparent 0deg, 
                var(--alien-vital-life) 60deg, 
                transparent 120deg, 
                var(--alien-vital-glow) 180deg, 
                transparent 240deg, 
                var(--alien-vital-life) 300deg, 
                transparent 360deg
              )
            `,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'alien-energy-spiral calc(var(--alien-vital-speed) * 4) linear infinite',
            pointerEvents: 'none',
            opacity: '0.5',
          },
        },
        
        '.alien-vital-interactive': {
          cursor: 'pointer',
          transition: 'all 300ms ease',
          '&:hover': {
            animationDuration: 'calc(var(--alien-vital-speed) * 0.5)',
            '--alien-vital-pulse': 'calc(var(--alien-vital-pulse) * 1.5)',
          },
        },
        
        '.alien-vital-text': {
          color: 'var(--alien-vital-heartbeat)',
          textShadow: `0 0 ${intensityConfig.glow} var(--alien-vital-heartbeat)`,
          animation: 'alien-vital-glow calc(var(--alien-vital-speed) * 1.5) ease-in-out infinite',
        },
        
        '.alien-vital-network': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              radial-gradient(circle at 20% 20%, var(--alien-vital-circulation) 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, var(--alien-vital-blood) 1px, transparent 1px),
              radial-gradient(circle at 20% 80%, var(--alien-vital-glow) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, var(--alien-vital-life) 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px, 40px 40px, 35px 35px, 60px 60px',
            animation: 'alien-vessel-flow calc(var(--alien-vital-speed) * 5) linear infinite',
            opacity: '0.6',
            pointerEvents: 'none',
          },
        },
      };
      
      // Reduced motion support
      if (config.respectReducedMotion) {
        utilityClasses['@media (prefers-reduced-motion: reduce)'] = {
          '.alien-heartbeat, .alien-vital-pulse, .alien-circulation, .alien-vessel, .alien-blood-pulse, .alien-vital-glow, .alien-life-force, .alien-vital-text, .alien-vital-network': {
            animation: 'none !important',
          },
          '.alien-blood-drop::before, .alien-vital-glow::after, .alien-life-force::before, .alien-vital-network::before': {
            animation: 'none !important',
          },
          '.alien-heartbeat, .alien-circulation, .alien-blood-pulse, .alien-vital-glow, .alien-life-force': {
            opacity: 'var(--alien-reduced-vital-opacity) !important',
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
      // Cleanup vital effects when switching away from alien
      if (context.previousTheme?.meta?.name === 'alien' && 
          context.theme?.meta?.name !== 'alien') {
        return {
          success: true,
          modifications: {
            cssVariables: {
              '--alien-vital-speed': '0s',
              '--alien-heartbeat-enabled': '0',
              '--alien-circulation-enabled': '0',
              '--alien-blood-enabled': '0',
              '--alien-glow-enabled': '0',
              '--alien-life-enabled': '0',
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
      
      const colorFields = ['heartbeat', 'circulation', 'bloodPulse', 'vitalGlow', 'lifeForce'];
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
    'Vital effects with complex animations can impact battery life - use judiciously',
    'Consider reducing heartbeat frequency on mobile devices',
    'Use CSS containment for isolated vital effect containers',
    'Avoid life force spirals on large elements',
    'Use transform3d to enable hardware acceleration for circulation flows',
    'Limit the number of concurrent blood pulse animations',
    'Consider using intersection observer to activate vital effects only when visible',
    'Use will-change property sparingly and remove after animation completes',
    'Vital glow effects can be expensive - use selectively for key interactive elements',
  ],
};

// Convenience function to create vital plugin with custom config
export const createAlienVitalPlugin = (config: Partial<AlienVitalConfig> = {}): AnimationPlugin => ({
  ...alienVitalPlugin,
  config: { ...defaultConfig, ...config },
});

export default alienVitalPlugin;