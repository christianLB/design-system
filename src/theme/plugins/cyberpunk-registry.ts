/**
 * Cyberpunk Plugin Registry
 * Central registry for all cyberpunk theme plugins
 */

import type { AnimationPlugin } from './types';
import { cyberpunkGlowPlugin, createCyberpunkGlowPlugin } from './cyberpunk-glow';
import { cyberpunkScanlinePlugin, createCyberpunkScanlinePlugin } from './cyberpunk-scanline';
import { cyberpunkMatrixPlugin, createCyberpunkMatrixPlugin } from './cyberpunk-matrix';

export interface CyberpunkPluginConfig {
  glow?: {
    intensity?: 'subtle' | 'normal' | 'intense';
    enablePulse?: boolean;
    enableHover?: boolean;
    respectReducedMotion?: boolean;
    customColors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
  };
  scanline?: {
    lineSpacing?: number;
    lineOpacity?: number;
    animationSpeed?: 'slow' | 'normal' | 'fast';
    enableFlicker?: boolean;
    enableNoise?: boolean;
    respectReducedMotion?: boolean;
    customColors?: {
      scanlineColor?: string;
      noiseColor?: string;
    };
  };
  matrix?: {
    density?: 'light' | 'normal' | 'heavy';
    speed?: 'slow' | 'normal' | 'fast';
    characters?: 'matrix' | 'binary' | 'hex' | 'japanese';
    fadeEffect?: boolean;
    colorScheme?: 'green' | 'blue' | 'red' | 'multi';
    respectReducedMotion?: boolean;
    customColors?: {
      primary?: string;
      secondary?: string;
      fade?: string;
    };
  };
}

export class CyberpunkPluginRegistry {
  private plugins: Map<string, AnimationPlugin> = new Map();
  private config: CyberpunkPluginConfig = {};

  constructor(config: CyberpunkPluginConfig = {}) {
    this.config = config;
    this.registerDefaultPlugins();
  }

  private registerDefaultPlugins(): void {
    // Register glow plugin
    const glowPlugin = this.config.glow 
      ? createCyberpunkGlowPlugin(this.config.glow)
      : cyberpunkGlowPlugin;
    this.plugins.set('glow', glowPlugin);

    // Register scanline plugin
    const scanlinePlugin = this.config.scanline 
      ? createCyberpunkScanlinePlugin(this.config.scanline)
      : cyberpunkScanlinePlugin;
    this.plugins.set('scanline', scanlinePlugin);

    // Register matrix plugin
    const matrixPlugin = this.config.matrix 
      ? createCyberpunkMatrixPlugin(this.config.matrix)
      : cyberpunkMatrixPlugin;
    this.plugins.set('matrix', matrixPlugin);
  }

  /**
   * Get all registered cyberpunk plugins
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
  updateConfig(config: Partial<CyberpunkPluginConfig>): void {
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
  static createPreset(preset: 'minimal' | 'standard' | 'full' | 'performance'): CyberpunkPluginConfig {
    switch (preset) {
      case 'minimal':
        return {
          glow: {
            intensity: 'subtle',
            enablePulse: false,
            enableHover: true,
            respectReducedMotion: true,
          },
          scanline: {
            lineSpacing: 6,
            lineOpacity: 0.1,
            animationSpeed: 'slow',
            enableFlicker: false,
            enableNoise: false,
            respectReducedMotion: true,
          },
          matrix: {
            density: 'light',
            speed: 'slow',
            characters: 'binary',
            fadeEffect: false,
            colorScheme: 'green',
            respectReducedMotion: true,
          },
        };

      case 'standard':
        return {
          glow: {
            intensity: 'normal',
            enablePulse: true,
            enableHover: true,
            respectReducedMotion: true,
          },
          scanline: {
            lineSpacing: 4,
            lineOpacity: 0.15,
            animationSpeed: 'normal',
            enableFlicker: true,
            enableNoise: false,
            respectReducedMotion: true,
          },
          matrix: {
            density: 'normal',
            speed: 'normal',
            characters: 'matrix',
            fadeEffect: true,
            colorScheme: 'green',
            respectReducedMotion: true,
          },
        };

      case 'full':
        return {
          glow: {
            intensity: 'intense',
            enablePulse: true,
            enableHover: true,
            respectReducedMotion: true,
          },
          scanline: {
            lineSpacing: 3,
            lineOpacity: 0.2,
            animationSpeed: 'fast',
            enableFlicker: true,
            enableNoise: true,
            respectReducedMotion: true,
          },
          matrix: {
            density: 'heavy',
            speed: 'fast',
            characters: 'matrix',
            fadeEffect: true,
            colorScheme: 'multi',
            respectReducedMotion: true,
          },
        };

      case 'performance':
        return {
          glow: {
            intensity: 'normal',
            enablePulse: false,
            enableHover: false,
            respectReducedMotion: true,
          },
          scanline: {
            lineSpacing: 8,
            lineOpacity: 0.08,
            animationSpeed: 'slow',
            enableFlicker: false,
            enableNoise: false,
            respectReducedMotion: true,
          },
          matrix: {
            density: 'light',
            speed: 'slow',
            characters: 'binary',
            fadeEffect: false,
            colorScheme: 'green',
            respectReducedMotion: true,
          },
        };

      default:
        return {};
    }
  }
}

// Default registry instance
export const defaultCyberpunkRegistry = new CyberpunkPluginRegistry();

// Convenience functions for common operations
export const getCyberpunkPlugins = (config?: CyberpunkPluginConfig): AnimationPlugin[] => {
  if (config) {
    const registry = new CyberpunkPluginRegistry(config);
    return registry.getAllPlugins();
  }
  return defaultCyberpunkRegistry.getAllPlugins();
};

export const createCyberpunkRegistry = (preset: 'minimal' | 'standard' | 'full' | 'performance'): CyberpunkPluginRegistry => {
  const config = CyberpunkPluginRegistry.createPreset(preset);
  return new CyberpunkPluginRegistry(config);
};

export default CyberpunkPluginRegistry;