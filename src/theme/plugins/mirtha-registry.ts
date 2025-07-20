/**
 * Mirtha Plugin Registry
 * Manages elegant theme plugins with performance optimization
 */

import { BasePlugin } from './base-plugin';
import { MirthaElegancePlugin } from './mirtha-elegance';
import { MirthaGoldenPlugin } from './mirtha-golden';
import type { PluginConfig, PluginCapability } from './types';

export type MirthaPluginType = 'elegance' | 'golden' | 'all';

export interface MirthaPluginConfig extends PluginConfig {
  elegance?: {
    sparkleCount?: number;
    shimmerIntensity?: number;
    glowColor?: 'gold' | 'rose';
    enableLuxury?: boolean;
  };
  golden?: {
    intensity?: number;
    animated?: boolean;
    warmth?: number;
    type?: 'hour' | 'frame' | 'accent' | 'luxury' | 'subtle';
  };
  performance?: {
    enableGPU?: boolean;
    reducedMotion?: boolean;
    prefersColorScheme?: 'light' | 'dark' | 'auto';
  };
}

export class MirthaPluginRegistry {
  private plugins: Map<string, BasePlugin> = new Map();
  private enabledPlugins: Set<string> = new Set();
  private config: MirthaPluginConfig;

  constructor(config: MirthaPluginConfig = {}) {
    this.config = config;
    this.initializePlugins();
  }

  private initializePlugins() {
    // Initialize Elegance Plugin
    this.plugins.set(
      'elegance',
      new MirthaElegancePlugin({
        enabled: this.config.elegance !== false,
        ...this.config.elegance,
      }),
    );

    // Initialize Golden Plugin
    this.plugins.set(
      'golden',
      new MirthaGoldenPlugin({
        enabled: this.config.golden !== false,
        ...this.config.golden,
      }),
    );

    // Enable plugins based on config
    if (this.config.elegance !== false) {
      this.enabledPlugins.add('elegance');
    }
    if (this.config.golden !== false) {
      this.enabledPlugins.add('golden');
    }
  }

  enable(pluginType: MirthaPluginType | MirthaPluginType[]): void {
    const types = Array.isArray(pluginType) ? pluginType : [pluginType];

    types.forEach((type) => {
      if (type === 'all') {
        this.plugins.forEach((_, key) => this.enabledPlugins.add(key));
      } else {
        this.enabledPlugins.add(type);
      }
    });
  }

  disable(pluginType: MirthaPluginType | MirthaPluginType[]): void {
    const types = Array.isArray(pluginType) ? pluginType : [pluginType];

    types.forEach((type) => {
      if (type === 'all') {
        this.enabledPlugins.clear();
      } else {
        this.enabledPlugins.delete(type);
      }
    });
  }

  applyToElement(element: HTMLElement, pluginTypes?: MirthaPluginType[]): void {
    const types = pluginTypes || Array.from(this.enabledPlugins);

    types.forEach((type) => {
      if (this.enabledPlugins.has(type) && this.plugins.has(type)) {
        const plugin = this.plugins.get(type)!;
        plugin.apply(element);
      }
    });
  }

  removeFromElement(element: HTMLElement, pluginTypes?: MirthaPluginType[]): void {
    const types = pluginTypes || Array.from(this.enabledPlugins);

    types.forEach((type) => {
      if (this.plugins.has(type)) {
        const plugin = this.plugins.get(type)!;
        plugin.remove(element);
      }
    });
  }

  getPlugin(type: MirthaPluginType): BasePlugin | undefined {
    return type === 'all' ? undefined : this.plugins.get(type);
  }

  getAllPlugins(): BasePlugin[] {
    return Array.from(this.plugins.values());
  }

  getEnabledPlugins(): BasePlugin[] {
    return Array.from(this.enabledPlugins)
      .map((type) => this.plugins.get(type))
      .filter((plugin): plugin is BasePlugin => plugin !== undefined);
  }

  updateConfig(config: Partial<MirthaPluginConfig>): void {
    this.config = { ...this.config, ...config };

    // Update individual plugin configs
    if (config.elegance && this.plugins.has('elegance')) {
      const plugin = this.plugins.get('elegance')!;
      plugin.config = { ...plugin.config, ...config.elegance };
    }

    if (config.golden && this.plugins.has('golden')) {
      const plugin = this.plugins.get('golden')!;
      plugin.config = { ...plugin.config, ...config.golden };
    }
  }

  getStyles(): string {
    return this.getEnabledPlugins()
      .map((plugin) => plugin.getStyles())
      .join('\n\n');
  }

  getPerformanceRecommendations(constraints: {
    isMobile?: boolean;
    isLowPower?: boolean;
    hasLimitedGPU?: boolean;
    reducedMotion?: boolean;
  }): MirthaPluginConfig {
    const recommendations: MirthaPluginConfig = {};

    if (constraints.isMobile || constraints.isLowPower) {
      recommendations.elegance = {
        sparkleCount: 1,
        shimmerIntensity: 0.5,
        enableLuxury: false,
      };
      recommendations.golden = {
        intensity: 0.5,
        animated: false,
      };
    }

    if (constraints.hasLimitedGPU) {
      recommendations.performance = {
        enableGPU: false,
      };
    }

    if (constraints.reducedMotion) {
      recommendations.elegance = {
        ...recommendations.elegance,
        sparkleCount: 0,
        shimmerIntensity: 0,
      };
      recommendations.golden = {
        ...recommendations.golden,
        animated: false,
      };
      recommendations.performance = {
        ...recommendations.performance,
        reducedMotion: true,
      };
    }

    return recommendations;
  }

  validateAll(): boolean {
    return this.getAllPlugins().every((plugin) => plugin.validate());
  }

  destroy(): void {
    this.getAllPlugins().forEach((plugin) => plugin.destroy());
    this.plugins.clear();
    this.enabledPlugins.clear();
  }

  getAllPerformanceHints(): Record<string, any> {
    const hints: Record<string, any> = {};

    this.plugins.forEach((plugin, type) => {
      hints[type] = plugin.getPerformanceHints();
    });

    return hints;
  }
}

// Factory functions for easy plugin creation
export function createMirthaRegistry(
  preset: 'minimal' | 'standard' | 'full' | 'performance' = 'standard',
): MirthaPluginRegistry {
  const configs: Record<typeof preset, MirthaPluginConfig> = {
    minimal: {
      elegance: { sparkleCount: 0, shimmerIntensity: 0.3, enableLuxury: false },
      golden: { intensity: 0.3, animated: false },
    },
    standard: {
      elegance: { sparkleCount: 2, shimmerIntensity: 0.7, enableLuxury: false },
      golden: { intensity: 0.7, animated: true },
    },
    full: {
      elegance: { sparkleCount: 3, shimmerIntensity: 1, enableLuxury: true },
      golden: { intensity: 1, animated: true },
    },
    performance: {
      elegance: { sparkleCount: 1, shimmerIntensity: 0.5, enableLuxury: false },
      golden: { intensity: 0.5, animated: false },
      performance: { enableGPU: true, reducedMotion: false },
    },
  };

  return new MirthaPluginRegistry(configs[preset]);
}

export function createMirthaEffectRegistry(
  scenario: 'elegant' | 'golden' | 'luxury' | 'subtle' = 'elegant',
): MirthaPluginRegistry {
  const scenarios: Record<typeof scenario, MirthaPluginConfig> = {
    elegant: {
      elegance: { sparkleCount: 2, shimmerIntensity: 0.8, glowColor: 'gold' },
      golden: { type: 'subtle', intensity: 0.5 },
    },
    golden: {
      elegance: { sparkleCount: 1, glowColor: 'gold' },
      golden: { type: 'hour', intensity: 0.8, animated: true },
    },
    luxury: {
      elegance: { sparkleCount: 3, shimmerIntensity: 1, enableLuxury: true },
      golden: { type: 'luxury', intensity: 1, animated: true },
    },
    subtle: {
      elegance: { sparkleCount: 0, shimmerIntensity: 0.3 },
      golden: { type: 'subtle', intensity: 0.3, animated: false },
    },
  };

  return new MirthaPluginRegistry(scenarios[scenario]);
}

// Export convenience function for getting all Mirtha plugins
export function getMirthaPlugins(config?: MirthaPluginConfig): BasePlugin[] {
  const registry = new MirthaPluginRegistry(config);
  return registry.getEnabledPlugins();
}
