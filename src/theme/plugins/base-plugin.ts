/**
 * Base Plugin Class
 * Abstract base class for all theme plugins
 */

export interface PluginConfig {
  enabled?: boolean;
  [key: string]: any;
}

export abstract class BasePlugin {
  abstract name: string;
  abstract version: string;
  abstract description: string;

  config: PluginConfig;

  constructor(config: PluginConfig = {}) {
    this.config = { enabled: true, ...config };
  }

  /**
   * Apply the plugin to an HTML element
   */
  abstract apply(element: HTMLElement): void;

  /**
   * Remove the plugin from an HTML element
   */
  abstract remove(element: HTMLElement): void;

  /**
   * Get CSS styles for this plugin
   */
  abstract getStyles(): string;

  /**
   * Get performance hints for this plugin
   */
  abstract getPerformanceHints(): Record<string, any>;

  /**
   * Cleanup and destroy the plugin
   */
  abstract destroy(): void;

  /**
   * Check if the plugin is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled !== false;
  }

  /**
   * Validate the plugin configuration
   */
  validate(): boolean {
    return true;
  }

  /**
   * Update plugin configuration
   */
  updateConfig(config: Partial<PluginConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
