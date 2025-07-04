/**
 * PluginManager - Central system for managing theme plugins
 * Handles plugin registration, lifecycle, and execution
 */

import {
  ThemePlugin,
  PluginManagerConfig,
  PluginRegistrationOptions,
  PluginExecutionOptions,
  PluginContext,
  PluginResult,
  PluginLifecycle,
  PluginEvent,
  PluginEventListener,
  PluginManagerEvents,
  PluginValidationResult,
  PluginRegistry,
  PluginUtils,
  PluginConfig,
  PluginPriority,
  PluginCategory,
} from './types';
import type { BuiltTheme } from '../builder/types';
import type { AnimationTokens } from '../tokens/animation';

/**
 * Simple event emitter for plugin events
 */
class SimpleEventEmitter {
  private listeners: Map<string, PluginEventListener[]> = new Map();

  on<K extends keyof PluginManagerEvents>(event: K, listener: (data: PluginManagerEvents[K]) => void): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener as PluginEventListener);
    return this;
  }

  off<K extends keyof PluginManagerEvents>(event: K, listener: (data: PluginManagerEvents[K]) => void): this {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener as PluginEventListener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
    return this;
  }

  emit<K extends keyof PluginManagerEvents>(event: K, data: PluginManagerEvents[K]): boolean {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener({ type: event, plugin: '', data, timestamp: Date.now() }));
      return true;
    }
    return false;
  }
}

/**
 * Default plugin manager configuration
 */
export const defaultPluginManagerConfig: PluginManagerConfig = {
  autoInitialize: true,
  enabledByDefault: true,
  strictMode: false,
  allowAsyncHooks: true,
  maxExecutionTime: 5000,
  errorHandling: 'warn',
  logLevel: 'warn',
};

/**
 * PluginManager class
 */
export class PluginManager extends SimpleEventEmitter {
  private config: PluginManagerConfig;
  private registry: PluginRegistry;
  private initialized: boolean = false;

  constructor(config: Partial<PluginManagerConfig> = {}) {
    super();
    this.config = { ...defaultPluginManagerConfig, ...config };
    this.registry = {
      plugins: new Map(),
      configs: new Map(),
      dependencies: new Map(),
      executionOrder: [],
    };
  }

  /**
   * Create a new PluginManager instance
   */
  static create(config?: Partial<PluginManagerConfig>): PluginManager {
    return new PluginManager(config);
  }

  /**
   * Initialize the plugin manager
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      this.log('warn', 'PluginManager already initialized');
      return;
    }

    this.log('info', 'Initializing PluginManager...');

    // Initialize all registered plugins if auto-initialize is enabled
    if (this.config.autoInitialize) {
      await this.initializeAllPlugins();
    }

    // Resolve execution order based on dependencies
    this.resolveExecutionOrder();

    this.initialized = true;
    this.log('info', 'PluginManager initialized successfully');
  }

  /**
   * Register a plugin
   */
  async register(
    plugin: ThemePlugin, 
    options: PluginRegistrationOptions = {}
  ): Promise<void> {
    const validation = this.validatePlugin(plugin);
    if (!validation.valid) {
      const error = new Error(`Plugin validation failed: ${validation.errors.join(', ')}`);
      this.handleError('plugin:error', plugin.name, error);
      return;
    }

    // Check for name conflicts
    if (this.registry.plugins.has(plugin.name)) {
      const error = new Error(`Plugin with name '${plugin.name}' already registered`);
      this.handleError('plugin:error', plugin.name, error);
      return;
    }

    // Check dependencies
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.registry.plugins.has(dep)) {
          this.log('warn', `Plugin '${plugin.name}' depends on '${dep}' which is not registered`);
        }
      }
    }

    // Register the plugin
    this.registry.plugins.set(plugin.name, plugin);
    this.registry.configs.set(plugin.name, { ...plugin.defaultConfig, ...options.config });
    
    if (plugin.dependencies) {
      this.registry.dependencies.set(plugin.name, plugin.dependencies);
    }

    // Set initial state
    plugin.enabled = options.autoEnable ?? this.config.enabledByDefault ?? true;
    plugin.initialized = false;

    // Initialize if auto-initialize is enabled
    if (this.config.autoInitialize && plugin.enabled) {
      await this.initializePlugin(plugin.name);
    }

    // Update execution order
    this.resolveExecutionOrder();

    this.emit('plugin:registered', { plugin });
    this.log('info', `Plugin '${plugin.name}' registered successfully`);
  }

  /**
   * Unregister a plugin
   */
  async unregister(pluginName: string): Promise<void> {
    const plugin = this.registry.plugins.get(pluginName);
    if (!plugin) {
      this.log('warn', `Plugin '${pluginName}' not found`);
      return;
    }

    // Destroy if initialized
    if (plugin.initialized) {
      await this.destroyPlugin(pluginName);
    }

    // Remove from registry
    this.registry.plugins.delete(pluginName);
    this.registry.configs.delete(pluginName);
    this.registry.dependencies.delete(pluginName);

    // Update execution order
    this.resolveExecutionOrder();

    this.emit('plugin:unregistered', { plugin: pluginName });
    this.log('info', `Plugin '${pluginName}' unregistered successfully`);
  }

  /**
   * Enable a plugin
   */
  async enable(pluginName: string): Promise<void> {
    const plugin = this.registry.plugins.get(pluginName);
    if (!plugin) {
      this.log('warn', `Plugin '${pluginName}' not found`);
      return;
    }

    if (plugin.enabled) {
      this.log('warn', `Plugin '${pluginName}' already enabled`);
      return;
    }

    plugin.enabled = true;

    if (plugin.enable) {
      plugin.enable();
    }

    // Initialize if not already initialized
    if (!plugin.initialized && this.initialized) {
      await this.initializePlugin(pluginName);
    }

    this.emit('plugin:enabled', { plugin: pluginName });
    this.log('info', `Plugin '${pluginName}' enabled`);
  }

  /**
   * Disable a plugin
   */
  async disable(pluginName: string): Promise<void> {
    const plugin = this.registry.plugins.get(pluginName);
    if (!plugin) {
      this.log('warn', `Plugin '${pluginName}' not found`);
      return;
    }

    if (!plugin.enabled) {
      this.log('warn', `Plugin '${pluginName}' already disabled`);
      return;
    }

    plugin.enabled = false;

    if (plugin.disable) {
      plugin.disable();
    }

    this.emit('plugin:disabled', { plugin: pluginName });
    this.log('info', `Plugin '${pluginName}' disabled`);
  }

  /**
   * Execute plugins for a specific lifecycle
   */
  async executeHooks(
    lifecycle: PluginLifecycle, 
    context: PluginContext,
    options: PluginExecutionOptions = {}
  ): Promise<Record<string, PluginResult>> {
    const enabledPlugins = this.getEnabledPlugins(options);
    const results: Record<string, PluginResult> = {};

    this.emit('hook:before', { lifecycle, plugins: enabledPlugins.map(p => p.name) });

    if (options.parallel && this.config.allowAsyncHooks) {
      // Execute plugins in parallel
      const promises = enabledPlugins.map(async (plugin) => {
        try {
          const result = await this.executePluginHook(plugin, lifecycle, context, options.timeout);
          results[plugin.name] = result;
        } catch (error) {
          results[plugin.name] = { success: false, error: error as Error };
          this.handleError('plugin:error', plugin.name, error as Error);
        }
      });

      await Promise.all(promises);
    } else {
      // Execute plugins sequentially
      for (const plugin of enabledPlugins) {
        try {
          const result = await this.executePluginHook(plugin, lifecycle, context, options.timeout);
          results[plugin.name] = result;
        } catch (error) {
          results[plugin.name] = { success: false, error: error as Error };
          this.handleError('plugin:error', plugin.name, error as Error);
          
          if (!options.ignoreErrors && this.config.errorHandling === 'throw') {
            throw error;
          }
        }
      }
    }

    this.emit('hook:after', { lifecycle, results });

    return results;
  }

  /**
   * Get plugin by name
   */
  getPlugin(name: string): ThemePlugin | undefined {
    return this.registry.plugins.get(name);
  }

  /**
   * Get all plugins
   */
  getPlugins(): ThemePlugin[] {
    return Array.from(this.registry.plugins.values());
  }

  /**
   * Get enabled plugins
   */
  getEnabledPlugins(options: PluginExecutionOptions = {}): ThemePlugin[] {
    let plugins = this.getPlugins().filter(plugin => plugin.enabled);

    // Apply filters
    if (options.filterByCategory) {
      plugins = plugins.filter(plugin => options.filterByCategory!.includes(plugin.category));
    }

    if (options.filterByTags) {
      plugins = plugins.filter(plugin => 
        plugin.tags && plugin.tags.some(tag => options.filterByTags!.includes(tag))
      );
    }

    if (options.excludePlugins) {
      plugins = plugins.filter(plugin => !options.excludePlugins!.includes(plugin.name));
    }

    if (options.includeOnly) {
      plugins = plugins.filter(plugin => options.includeOnly!.includes(plugin.name));
    }

    // Sort by execution order
    return plugins.sort((a, b) => {
      const orderA = this.registry.executionOrder.indexOf(a.name);
      const orderB = this.registry.executionOrder.indexOf(b.name);
      return orderA - orderB;
    });
  }

  /**
   * Get plugins by category
   */
  getPluginsByCategory(category: PluginCategory): ThemePlugin[] {
    return this.getPlugins().filter(plugin => plugin.category === category);
  }

  /**
   * Get plugin configuration
   */
  getPluginConfig(pluginName: string): PluginConfig | undefined {
    return this.registry.configs.get(pluginName);
  }

  /**
   * Update plugin configuration
   */
  updatePluginConfig(pluginName: string, config: Partial<PluginConfig>): void {
    const currentConfig = this.registry.configs.get(pluginName) || {};
    this.registry.configs.set(pluginName, { ...currentConfig, ...config });
  }

  /**
   * Check if plugin is registered
   */
  isRegistered(pluginName: string): boolean {
    return this.registry.plugins.has(pluginName);
  }

  /**
   * Check if plugin is enabled
   */
  isEnabled(pluginName: string): boolean {
    const plugin = this.registry.plugins.get(pluginName);
    return plugin ? plugin.enabled === true : false;
  }

  /**
   * Check if plugin is initialized
   */
  isInitialized(pluginName: string): boolean {
    const plugin = this.registry.plugins.get(pluginName);
    return plugin ? plugin.initialized === true : false;
  }

  /**
   * Get plugin statistics
   */
  getStats(): {
    total: number;
    enabled: number;
    initialized: number;
    byCategory: Record<PluginCategory, number>;
    byPriority: Record<PluginPriority, number>;
  } {
    const plugins = this.getPlugins();
    const enabled = plugins.filter(p => p.enabled);
    const initialized = plugins.filter(p => p.initialized);

    const byCategory: Record<PluginCategory, number> = {
      accessibility: 0,
      performance: 0,
      animation: 0,
      utility: 0,
      integration: 0,
      enhancement: 0,
    };

    const byPriority: Record<PluginPriority, number> = {
      low: 0,
      normal: 0,
      high: 0,
      critical: 0,
    };

    plugins.forEach(plugin => {
      byCategory[plugin.category]++;
      byPriority[plugin.priority]++;
    });

    return {
      total: plugins.length,
      enabled: enabled.length,
      initialized: initialized.length,
      byCategory,
      byPriority,
    };
  }

  /**
   * Clear all plugins
   */
  async clear(): Promise<void> {
    const pluginNames = Array.from(this.registry.plugins.keys());
    
    for (const name of pluginNames) {
      await this.unregister(name);
    }

    this.registry.executionOrder = [];
    this.log('info', 'All plugins cleared');
  }

  /**
   * Validate a plugin
   */
  private validatePlugin(plugin: ThemePlugin): PluginValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!plugin.name) errors.push('Plugin name is required');
    if (!plugin.version) errors.push('Plugin version is required');
    if (!plugin.description) errors.push('Plugin description is required');
    if (!plugin.category) errors.push('Plugin category is required');
    if (!plugin.priority) errors.push('Plugin priority is required');

    // Valid values
    const validCategories: PluginCategory[] = ['accessibility', 'performance', 'animation', 'utility', 'integration', 'enhancement'];
    if (plugin.category && !validCategories.includes(plugin.category)) {
      errors.push(`Invalid category: ${plugin.category}`);
    }

    const validPriorities: PluginPriority[] = ['low', 'normal', 'high', 'critical'];
    if (plugin.priority && !validPriorities.includes(plugin.priority)) {
      errors.push(`Invalid priority: ${plugin.priority}`);
    }

    // Warnings
    if (!plugin.hooks || Object.keys(plugin.hooks).length === 0) {
      warnings.push('Plugin has no hooks defined');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      plugin,
    };
  }

  /**
   * Initialize all plugins
   */
  private async initializeAllPlugins(): Promise<void> {
    const plugins = this.getPlugins().filter(p => p.enabled && !p.initialized);
    
    for (const plugin of plugins) {
      await this.initializePlugin(plugin.name);
    }
  }

  /**
   * Initialize a specific plugin
   */
  private async initializePlugin(pluginName: string): Promise<void> {
    const plugin = this.registry.plugins.get(pluginName);
    if (!plugin || plugin.initialized) return;

    try {
      if (plugin.init) {
        const config = this.registry.configs.get(pluginName);
        await plugin.init(config);
      }

      plugin.initialized = true;
      this.emit('plugin:initialized', { plugin: pluginName });
      this.log('info', `Plugin '${pluginName}' initialized`);
    } catch (error) {
      this.handleError('plugin:error', pluginName, error as Error);
    }
  }

  /**
   * Destroy a specific plugin
   */
  private async destroyPlugin(pluginName: string): Promise<void> {
    const plugin = this.registry.plugins.get(pluginName);
    if (!plugin || !plugin.initialized) return;

    try {
      if (plugin.destroy) {
        await plugin.destroy();
      }

      plugin.initialized = false;
      this.emit('plugin:destroyed', { plugin: pluginName });
      this.log('info', `Plugin '${pluginName}' destroyed`);
    } catch (error) {
      this.handleError('plugin:error', pluginName, error as Error);
    }
  }

  /**
   * Execute a plugin hook
   */
  private async executePluginHook(
    plugin: ThemePlugin,
    lifecycle: PluginLifecycle,
    context: PluginContext,
    timeout?: number
  ): Promise<PluginResult> {
    const hook = plugin.hooks?.[lifecycle];
    if (!hook) {
      return { success: true };
    }

    const config = this.registry.configs.get(plugin.name);
    const maxTimeout = timeout || this.config.maxExecutionTime || 5000;

    const executeWithTimeout = async (): Promise<PluginResult> => {
      if (this.config.allowAsyncHooks) {
        return await Promise.race([
          hook(context, config),
          new Promise<PluginResult>((_, reject) => 
            setTimeout(() => reject(new Error(`Plugin '${plugin.name}' timed out`)), maxTimeout)
          ),
        ]);
      } else {
        return hook(context, config);
      }
    };

    try {
      const result = await executeWithTimeout();
      return result;
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  /**
   * Resolve execution order based on dependencies
   */
  private resolveExecutionOrder(): void {
    try {
      const plugins = this.getPlugins();
      this.registry.executionOrder = PluginUtils.resolveDependencies(plugins);
    } catch (error) {
      this.handleError('plugin:error', 'system', error as Error);
      // Fallback to priority-based order
      const plugins = PluginUtils.sortPluginsByPriority(this.getPlugins());
      this.registry.executionOrder = plugins.map(p => p.name);
    }
  }

  /**
   * Handle errors
   */
  private handleError(event: keyof PluginManagerEvents, pluginName: string, error: Error): void {
    this.log('error', `Plugin '${pluginName}' error: ${error.message}`);
    
    if (event === 'plugin:error') {
      this.emit(event, { plugin: pluginName, error });
    }

    if (this.config.errorHandling === 'throw') {
      throw error;
    }
  }

  /**
   * Logging utility
   */
  private log(level: 'error' | 'warn' | 'info' | 'debug', message: string): void {
    if (!this.config.logLevel || this.config.logLevel === 'none') return;

    const levels = ['error', 'warn', 'info', 'debug'];
    const configLevel = levels.indexOf(this.config.logLevel);
    const messageLevel = levels.indexOf(level);

    if (messageLevel <= configLevel) {
      console[level](`[PluginManager] ${message}`);
    }
  }
}

/**
 * Convenience function to create a PluginManager
 */
export function createPluginManager(config?: Partial<PluginManagerConfig>): PluginManager {
  return new PluginManager(config);
}

export default PluginManager;