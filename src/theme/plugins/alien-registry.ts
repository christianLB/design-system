/**
 * Alien Plugin Registry
 * Central registry for all alien theme plugins
 */

import type { AnimationPlugin } from './types';
import { alienAtmosphericPlugin, createAlienAtmosphericPlugin } from './alien-atmospheric';
import { alienNeuralPlugin, createAlienNeuralPlugin } from './alien-neural';
import { alienBiomechanicalPlugin, createAlienBiomechanicalPlugin } from './alien-biomechanical';
import { alienVitalPlugin, createAlienVitalPlugin } from './alien-vital';

export interface AlienPluginConfig {
  atmospheric?: {
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
  };
  neural?: {
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
  };
  biomechanical?: {
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
  };
  vital?: {
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
  };
}

export class AlienPluginRegistry {
  private plugins: Map<string, AnimationPlugin> = new Map();
  private config: AlienPluginConfig = {};

  constructor(config: AlienPluginConfig = {}) {
    this.config = config;
    this.registerDefaultPlugins();
  }

  private registerDefaultPlugins(): void {
    // Register atmospheric plugin
    const atmosphericPlugin = this.config.atmospheric 
      ? createAlienAtmosphericPlugin(this.config.atmospheric)
      : alienAtmosphericPlugin;
    this.plugins.set('atmospheric', atmosphericPlugin);

    // Register neural plugin
    const neuralPlugin = this.config.neural 
      ? createAlienNeuralPlugin(this.config.neural)
      : alienNeuralPlugin;
    this.plugins.set('neural', neuralPlugin);

    // Register biomechanical plugin
    const biomechanicalPlugin = this.config.biomechanical 
      ? createAlienBiomechanicalPlugin(this.config.biomechanical)
      : alienBiomechanicalPlugin;
    this.plugins.set('biomechanical', biomechanicalPlugin);

    // Register vital plugin
    const vitalPlugin = this.config.vital 
      ? createAlienVitalPlugin(this.config.vital)
      : alienVitalPlugin;
    this.plugins.set('vital', vitalPlugin);
  }

  /**
   * Get all registered alien plugins
   */
  getAllPlugins(): AnimationPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get a specific plugin by name
   */
  getPlugin(name: string): AnimationPlugin | undefined {
    return this.plugins.get(name);
  }

  /**
   * Register a custom plugin
   */
  registerPlugin(name: string, plugin: AnimationPlugin): void {
    this.plugins.set(name, plugin);
  }

  /**
   * Unregister a plugin
   */
  unregisterPlugin(name: string): boolean {
    return this.plugins.delete(name);
  }

  /**
   * Update plugin configuration
   */
  updateConfig(config: Partial<AlienPluginConfig>): void {
    this.config = { ...this.config, ...config };
    this.registerDefaultPlugins(); // Re-register with new config
  }

  /**
   * Get plugins sorted by priority
   */
  getPluginsByPriority(): AnimationPlugin[] {
    const plugins = this.getAllPlugins();
    const priorityOrder = { critical: 4, high: 3, normal: 2, low: 1 };
    
    return plugins.sort((a, b) => {
      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;
      return bPriority - aPriority;
    });
  }

  /**
   * Validate all plugin configurations
   */
  validateAll(): { valid: boolean; errors: Record<string, string[]> } {
    const errors: Record<string, string[]> = {};
    let allValid = true;

    for (const [name, plugin] of this.plugins) {
      if (plugin.validate) {
        const result = plugin.validate(plugin.config);
        if (!result.valid) {
          errors[name] = result.errors;
          allValid = false;
        }
      }
    }

    return { valid: allValid, errors };
  }

  /**
   * Get performance hints from all plugins
   */
  getAllPerformanceHints(): Record<string, string[]> {
    const hints: Record<string, string[]> = {};

    for (const [name, plugin] of this.plugins) {
      if (plugin.getPerformanceHints) {
        hints[name] = plugin.getPerformanceHints();
      }
    }

    return hints;
  }

  /**
   * Create a preset configuration for different use cases
   */
  static createPreset(preset: 'minimal' | 'standard' | 'full' | 'performance'): AlienPluginConfig {
    switch (preset) {
      case 'minimal':
        return {
          atmospheric: {
            intensity: 'subtle',
            breathingEnabled: true,
            mistEnabled: false,
            atmosphericFlowEnabled: false,
            respectReducedMotion: true,
          },
          neural: {
            intensity: 'subtle',
            synapticEnabled: true,
            pathwayEnabled: false,
            networkEnabled: false,
            brainwaveEnabled: false,
            respectReducedMotion: true,
          },
          biomechanical: {
            intensity: 'subtle',
            growthEnabled: false,
            cellularEnabled: true,
            tissueEnabled: false,
            mechanicalEnabled: false,
            respectReducedMotion: true,
          },
          vital: {
            intensity: 'subtle',
            heartbeatEnabled: true,
            circulationEnabled: false,
            bloodPulseEnabled: false,
            vitalGlowEnabled: false,
            lifeForceEnabled: false,
            respectReducedMotion: true,
          },
        };

      case 'standard':
        return {
          atmospheric: {
            intensity: 'normal',
            breathingEnabled: true,
            mistEnabled: true,
            atmosphericFlowEnabled: true,
            respectReducedMotion: true,
          },
          neural: {
            intensity: 'normal',
            synapticEnabled: true,
            pathwayEnabled: true,
            networkEnabled: true,
            brainwaveEnabled: false,
            respectReducedMotion: true,
          },
          biomechanical: {
            intensity: 'normal',
            growthEnabled: true,
            cellularEnabled: true,
            tissueEnabled: true,
            mechanicalEnabled: false,
            respectReducedMotion: true,
          },
          vital: {
            intensity: 'normal',
            heartbeatEnabled: true,
            circulationEnabled: true,
            bloodPulseEnabled: true,
            vitalGlowEnabled: true,
            lifeForceEnabled: false,
            respectReducedMotion: true,
          },
        };

      case 'full':
        return {
          atmospheric: {
            intensity: 'intense',
            breathingEnabled: true,
            mistEnabled: true,
            atmosphericFlowEnabled: true,
            respectReducedMotion: true,
          },
          neural: {
            intensity: 'intense',
            synapticEnabled: true,
            pathwayEnabled: true,
            networkEnabled: true,
            brainwaveEnabled: true,
            respectReducedMotion: true,
          },
          biomechanical: {
            intensity: 'intense',
            growthEnabled: true,
            cellularEnabled: true,
            tissueEnabled: true,
            mechanicalEnabled: true,
            respectReducedMotion: true,
          },
          vital: {
            intensity: 'intense',
            heartbeatEnabled: true,
            circulationEnabled: true,
            bloodPulseEnabled: true,
            vitalGlowEnabled: true,
            lifeForceEnabled: true,
            respectReducedMotion: true,
          },
        };

      case 'performance':
        return {
          atmospheric: {
            intensity: 'subtle',
            breathingEnabled: true,
            mistEnabled: false,
            atmosphericFlowEnabled: false,
            respectReducedMotion: true,
          },
          neural: {
            intensity: 'subtle',
            synapticEnabled: false,
            pathwayEnabled: true,
            networkEnabled: false,
            brainwaveEnabled: false,
            respectReducedMotion: true,
          },
          biomechanical: {
            intensity: 'subtle',
            growthEnabled: false,
            cellularEnabled: false,
            tissueEnabled: true,
            mechanicalEnabled: false,
            respectReducedMotion: true,
          },
          vital: {
            intensity: 'subtle',
            heartbeatEnabled: true,
            circulationEnabled: false,
            bloodPulseEnabled: false,
            vitalGlowEnabled: false,
            lifeForceEnabled: false,
            respectReducedMotion: true,
          },
        };

      default:
        return {};
    }
  }

  /**
   * Get effect combinations for specific scenarios
   */
  static createEffectCombination(scenario: 'immersive' | 'interactive' | 'ambient' | 'focused'): AlienPluginConfig {
    switch (scenario) {
      case 'immersive':
        // Full sensory experience
        return {
          atmospheric: {
            intensity: 'intense',
            breathingEnabled: true,
            mistEnabled: true,
            atmosphericFlowEnabled: true,
          },
          neural: {
            intensity: 'normal',
            synapticEnabled: true,
            pathwayEnabled: true,
            networkEnabled: true,
            brainwaveEnabled: true,
          },
          biomechanical: {
            intensity: 'normal',
            growthEnabled: true,
            cellularEnabled: true,
            tissueEnabled: true,
            mechanicalEnabled: true,
          },
          vital: {
            intensity: 'intense',
            heartbeatEnabled: true,
            circulationEnabled: true,
            bloodPulseEnabled: true,
            vitalGlowEnabled: true,
            lifeForceEnabled: true,
          },
        };

      case 'interactive':
        // Responsive to user interaction
        return {
          atmospheric: {
            intensity: 'normal',
            breathingEnabled: true,
            mistEnabled: false,
            atmosphericFlowEnabled: false,
          },
          neural: {
            intensity: 'intense',
            synapticEnabled: true,
            pathwayEnabled: true,
            networkEnabled: true,
            brainwaveEnabled: false,
          },
          biomechanical: {
            intensity: 'subtle',
            growthEnabled: true,
            cellularEnabled: true,
            tissueEnabled: false,
            mechanicalEnabled: false,
          },
          vital: {
            intensity: 'normal',
            heartbeatEnabled: true,
            circulationEnabled: false,
            bloodPulseEnabled: true,
            vitalGlowEnabled: true,
            lifeForceEnabled: false,
          },
        };

      case 'ambient':
        // Subtle background atmosphere
        return {
          atmospheric: {
            intensity: 'normal',
            breathingEnabled: true,
            mistEnabled: true,
            atmosphericFlowEnabled: true,
          },
          neural: {
            intensity: 'subtle',
            synapticEnabled: false,
            pathwayEnabled: true,
            networkEnabled: true,
            brainwaveEnabled: false,
          },
          biomechanical: {
            intensity: 'subtle',
            growthEnabled: false,
            cellularEnabled: false,
            tissueEnabled: true,
            mechanicalEnabled: false,
          },
          vital: {
            intensity: 'subtle',
            heartbeatEnabled: true,
            circulationEnabled: true,
            bloodPulseEnabled: false,
            vitalGlowEnabled: false,
            lifeForceEnabled: false,
          },
        };

      case 'focused':
        // Minimal distraction, single focus
        return {
          atmospheric: {
            intensity: 'subtle',
            breathingEnabled: true,
            mistEnabled: false,
            atmosphericFlowEnabled: false,
          },
          neural: {
            intensity: 'subtle',
            synapticEnabled: true,
            pathwayEnabled: false,
            networkEnabled: false,
            brainwaveEnabled: false,
          },
          biomechanical: {
            intensity: 'subtle',
            growthEnabled: false,
            cellularEnabled: false,
            tissueEnabled: false,
            mechanicalEnabled: false,
          },
          vital: {
            intensity: 'normal',
            heartbeatEnabled: true,
            circulationEnabled: false,
            bloodPulseEnabled: false,
            vitalGlowEnabled: true,
            lifeForceEnabled: false,
          },
        };

      default:
        return {};
    }
  }

  /**
   * Get plugin recommendations based on performance constraints
   */
  getPerformanceRecommendations(constraints: {
    isMobile?: boolean;
    isLowPower?: boolean;
    hasLimitedGPU?: boolean;
    reducedMotion?: boolean;
  }): AlienPluginConfig {
    const baseConfig = AlienPluginRegistry.createPreset('performance');

    if (constraints.isMobile || constraints.isLowPower) {
      // Further reduce effects for mobile/low power
      return {
        ...baseConfig,
        atmospheric: {
          ...baseConfig.atmospheric,
          intensity: 'subtle',
          mistEnabled: false,
          atmosphericFlowEnabled: false,
        },
        neural: {
          ...baseConfig.neural,
          intensity: 'subtle',
          synapticEnabled: false,
          networkEnabled: false,
        },
        biomechanical: {
          ...baseConfig.biomechanical,
          intensity: 'subtle',
          tissueEnabled: false,
        },
        vital: {
          ...baseConfig.vital,
          intensity: 'subtle',
        },
      };
    }

    if (constraints.hasLimitedGPU) {
      // Disable GPU-intensive effects
      return {
        ...baseConfig,
        atmospheric: {
          ...baseConfig.atmospheric,
          atmosphericFlowEnabled: false,
        },
        neural: {
          ...baseConfig.neural,
          brainwaveEnabled: false,
        },
        biomechanical: {
          ...baseConfig.biomechanical,
          mechanicalEnabled: false,
        },
        vital: {
          ...baseConfig.vital,
          lifeForceEnabled: false,
        },
      };
    }

    if (constraints.reducedMotion) {
      // Respect reduced motion preferences
      const config = { ...baseConfig };
      Object.keys(config).forEach(key => {
        if (config[key as keyof AlienPluginConfig]) {
          (config[key as keyof AlienPluginConfig] as any).respectReducedMotion = true;
        }
      });
      return config;
    }

    return baseConfig;
  }
}

// Default registry instance
export const defaultAlienRegistry = new AlienPluginRegistry();

// Convenience functions for common operations
export const getAlienPlugins = (config?: AlienPluginConfig): AnimationPlugin[] => {
  if (config) {
    const registry = new AlienPluginRegistry(config);
    return registry.getAllPlugins();
  }
  return defaultAlienRegistry.getAllPlugins();
};

export const createAlienRegistry = (preset: 'minimal' | 'standard' | 'full' | 'performance'): AlienPluginRegistry => {
  const config = AlienPluginRegistry.createPreset(preset);
  return new AlienPluginRegistry(config);
};

export const createAlienEffectRegistry = (scenario: 'immersive' | 'interactive' | 'ambient' | 'focused'): AlienPluginRegistry => {
  const config = AlienPluginRegistry.createEffectCombination(scenario);
  return new AlienPluginRegistry(config);
};

export default AlienPluginRegistry;