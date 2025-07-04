/**
 * Plugin System Type Definitions
 * Extensible plugin architecture for theme customization and enhancement
 */

import type { BuiltTheme } from '../builder/types';
import type { AnimationTokens } from '../tokens/animation';

/**
 * Plugin lifecycle hooks
 */
export type PluginLifecycle = 
  | 'beforeThemeBuild' 
  | 'afterThemeBuild' 
  | 'beforeThemeApply' 
  | 'afterThemeApply'
  | 'onThemeChange'
  | 'onAnimationCreate'
  | 'onCSSGenerate';

/**
 * Plugin execution priority
 */
export type PluginPriority = 'low' | 'normal' | 'high' | 'critical';

/**
 * Plugin category for organization
 */
export type PluginCategory = 
  | 'accessibility' 
  | 'performance' 
  | 'animation' 
  | 'utility' 
  | 'integration' 
  | 'enhancement';

/**
 * Plugin configuration interface
 */
export interface PluginConfig {
  [key: string]: any;
}

/**
 * Plugin context passed to plugin functions
 */
export interface PluginContext {
  theme: BuiltTheme;
  animations?: AnimationTokens;
  cssVariables?: Record<string, string>;
  performance?: {
    isReducedMotion: boolean;
    supportsGPU: boolean;
    deviceType: 'mobile' | 'tablet' | 'desktop';
  };
  accessibility?: {
    screenReaderActive: boolean;
    highContrast: boolean;
    reducedMotion: boolean;
    colorBlindness?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  };
  environment?: {
    isDevelopment: boolean;
    isProduction: boolean;
    userAgent?: string;
    viewportSize?: { width: number; height: number };
  };
}

/**
 * Plugin execution result
 */
export interface PluginResult {
  success: boolean;
  data?: any;
  error?: Error;
  warnings?: string[];
  modifications?: {
    theme?: Partial<BuiltTheme>;
    animations?: Partial<AnimationTokens>;
    cssVariables?: Record<string, string>;
  };
}

/**
 * Plugin hook function signature
 */
export type PluginHookFunction = (
  context: PluginContext, 
  config?: PluginConfig
) => PluginResult | Promise<PluginResult>;

/**
 * Plugin event listener function
 */
export type PluginEventListener = (event: PluginEvent) => void;

/**
 * Plugin event interface
 */
export interface PluginEvent {
  type: string;
  plugin: string;
  data?: any;
  timestamp: number;
}

/**
 * Main plugin interface
 */
export interface ThemePlugin {
  /**
   * Plugin metadata
   */
  name: string;
  version: string;
  description: string;
  author?: string;
  category: PluginCategory;
  priority: PluginPriority;
  tags?: string[];
  
  /**
   * Plugin dependencies
   */
  dependencies?: string[];
  peerDependencies?: string[];
  
  /**
   * Plugin configuration
   */
  defaultConfig?: PluginConfig;
  configSchema?: any; // JSON schema for config validation
  
  /**
   * Plugin lifecycle hooks
   */
  hooks?: Partial<Record<PluginLifecycle, PluginHookFunction>>;
  
  /**
   * Plugin initialization
   */
  init?: (config?: PluginConfig) => void | Promise<void>;
  
  /**
   * Plugin cleanup
   */
  destroy?: () => void | Promise<void>;
  
  /**
   * Plugin enable/disable
   */
  enable?: () => void;
  disable?: () => void;
  
  /**
   * Plugin state
   */
  enabled?: boolean;
  initialized?: boolean;
}

/**
 * Plugin manager configuration
 */
export interface PluginManagerConfig {
  autoInitialize?: boolean;
  enabledByDefault?: boolean;
  strictMode?: boolean;
  allowAsyncHooks?: boolean;
  maxExecutionTime?: number;
  errorHandling?: 'throw' | 'warn' | 'silent';
  logLevel?: 'none' | 'error' | 'warn' | 'info' | 'debug';
}

/**
 * Plugin registration options
 */
export interface PluginRegistrationOptions {
  config?: PluginConfig;
  autoEnable?: boolean;
  priority?: PluginPriority;
  runBefore?: string[];
  runAfter?: string[];
}

/**
 * Plugin execution options
 */
export interface PluginExecutionOptions {
  timeout?: number;
  ignoreErrors?: boolean;
  parallel?: boolean;
  filterByCategory?: PluginCategory[];
  filterByTags?: string[];
  excludePlugins?: string[];
  includeOnly?: string[];
}

/**
 * Plugin validation result
 */
export interface PluginValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  plugin: ThemePlugin;
}

/**
 * Plugin manager events
 */
export interface PluginManagerEvents {
  'plugin:registered': { plugin: ThemePlugin };
  'plugin:unregistered': { plugin: string };
  'plugin:enabled': { plugin: string };
  'plugin:disabled': { plugin: string };
  'plugin:initialized': { plugin: string };
  'plugin:destroyed': { plugin: string };
  'plugin:error': { plugin: string; error: Error };
  'plugin:warning': { plugin: string; warning: string };
  'hook:before': { lifecycle: PluginLifecycle; plugins: string[] };
  'hook:after': { lifecycle: PluginLifecycle; results: Record<string, PluginResult> };
}

/**
 * Built-in plugin types for common use cases
 */

/**
 * Accessibility plugin interface
 */
export interface AccessibilityPlugin extends ThemePlugin {
  category: 'accessibility';
  features?: {
    contrastChecker?: boolean;
    colorBlindnessSupport?: boolean;
    screenReaderOptimization?: boolean;
    keyboardNavigation?: boolean;
    reducedMotion?: boolean;
    highContrast?: boolean;
  };
}

/**
 * Performance plugin interface
 */
export interface PerformancePlugin extends ThemePlugin {
  category: 'performance';
  features?: {
    cssOptimization?: boolean;
    animationOptimization?: boolean;
    lazyLoading?: boolean;
    bundleOptimization?: boolean;
    memoryOptimization?: boolean;
    renderingOptimization?: boolean;
  };
}

/**
 * Animation plugin interface
 */
export interface AnimationPlugin extends ThemePlugin {
  category: 'animation';
  features?: {
    customEasings?: boolean;
    advancedKeyframes?: boolean;
    springAnimations?: boolean;
    gestureAnimations?: boolean;
    parallaxEffects?: boolean;
    morphingAnimations?: boolean;
  };
}

/**
 * Utility plugin interface
 */
export interface UtilityPlugin extends ThemePlugin {
  category: 'utility';
  utilities?: {
    colorManipulation?: boolean;
    responsiveHelpers?: boolean;
    debuggingTools?: boolean;
    devTools?: boolean;
    testing?: boolean;
    documentation?: boolean;
  };
}

/**
 * Integration plugin interface
 */
export interface IntegrationPlugin extends ThemePlugin {
  category: 'integration';
  integrations?: {
    framework?: 'react' | 'vue' | 'angular' | 'svelte' | 'vanilla';
    stateManagement?: 'redux' | 'zustand' | 'mobx' | 'recoil' | 'jotai';
    styling?: 'styled-components' | 'emotion' | 'stitches' | 'tailwind' | 'css-modules';
    testing?: 'jest' | 'vitest' | 'cypress' | 'playwright' | 'storybook';
  };
}

/**
 * Enhancement plugin interface
 */
export interface EnhancementPlugin extends ThemePlugin {
  category: 'enhancement';
  enhancements?: {
    advancedTypography?: boolean;
    customComponents?: boolean;
    advancedLayouts?: boolean;
    dataVisualization?: boolean;
    interactiveElements?: boolean;
    customThemes?: boolean;
  };
}

/**
 * Plugin type union
 */
export type SpecificPlugin = 
  | AccessibilityPlugin 
  | PerformancePlugin 
  | AnimationPlugin 
  | UtilityPlugin 
  | IntegrationPlugin 
  | EnhancementPlugin;

/**
 * Plugin builder interface for creating plugins
 */
export interface PluginBuilder {
  name(name: string): PluginBuilder;
  version(version: string): PluginBuilder;
  description(description: string): PluginBuilder;
  author(author: string): PluginBuilder;
  category(category: PluginCategory): PluginBuilder;
  priority(priority: PluginPriority): PluginBuilder;
  tags(tags: string[]): PluginBuilder;
  dependencies(deps: string[]): PluginBuilder;
  config(config: PluginConfig): PluginBuilder;
  hook(lifecycle: PluginLifecycle, fn: PluginHookFunction): PluginBuilder;
  init(fn: (config?: PluginConfig) => void | Promise<void>): PluginBuilder;
  destroy(fn: () => void | Promise<void>): PluginBuilder;
  build(): ThemePlugin;
}

/**
 * Plugin factory function type
 */
export type PluginFactory<T extends PluginConfig = PluginConfig> = (config?: T) => ThemePlugin;

/**
 * Plugin module export interface
 */
export interface PluginModule {
  default: ThemePlugin | PluginFactory;
  plugin?: ThemePlugin;
  createPlugin?: PluginFactory;
}

/**
 * Plugin registry interface
 */
export interface PluginRegistry {
  plugins: Map<string, ThemePlugin>;
  configs: Map<string, PluginConfig>;
  dependencies: Map<string, string[]>;
  executionOrder: string[];
}

/**
 * Type guards for plugin types
 */
export function isAccessibilityPlugin(plugin: ThemePlugin): plugin is AccessibilityPlugin {
  return plugin.category === 'accessibility';
}

export function isPerformancePlugin(plugin: ThemePlugin): plugin is PerformancePlugin {
  return plugin.category === 'performance';
}

export function isAnimationPlugin(plugin: ThemePlugin): plugin is AnimationPlugin {
  return plugin.category === 'animation';
}

export function isUtilityPlugin(plugin: ThemePlugin): plugin is UtilityPlugin {
  return plugin.category === 'utility';
}

export function isIntegrationPlugin(plugin: ThemePlugin): plugin is IntegrationPlugin {
  return plugin.category === 'integration';
}

export function isEnhancementPlugin(plugin: ThemePlugin): plugin is EnhancementPlugin {
  return plugin.category === 'enhancement';
}

/**
 * Plugin utilities
 */
export const PluginUtils = {
  /**
   * Validate plugin structure
   */
  validatePlugin(plugin: any): plugin is ThemePlugin {
    return (
      typeof plugin === 'object' &&
      typeof plugin.name === 'string' &&
      typeof plugin.version === 'string' &&
      typeof plugin.description === 'string' &&
      typeof plugin.category === 'string' &&
      typeof plugin.priority === 'string'
    );
  },

  /**
   * Sort plugins by priority and dependencies
   */
  sortPluginsByPriority(plugins: ThemePlugin[]): ThemePlugin[] {
    const priorityOrder: Record<PluginPriority, number> = {
      critical: 0,
      high: 1,
      normal: 2,
      low: 3,
    };

    return plugins.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  },

  /**
   * Resolve plugin dependencies
   */
  resolveDependencies(plugins: ThemePlugin[]): string[] {
    const resolved: string[] = [];
    const visiting = new Set<string>();
    const visited = new Set<string>();

    function visit(pluginName: string, plugin: ThemePlugin) {
      if (visited.has(pluginName)) return;
      if (visiting.has(pluginName)) {
        throw new Error(`Circular dependency detected: ${pluginName}`);
      }

      visiting.add(pluginName);

      if (plugin.dependencies) {
        for (const dep of plugin.dependencies) {
          const depPlugin = plugins.find(p => p.name === dep);
          if (depPlugin) {
            visit(dep, depPlugin);
          }
        }
      }

      visiting.delete(pluginName);
      visited.add(pluginName);
      resolved.push(pluginName);
    }

    for (const plugin of plugins) {
      visit(plugin.name, plugin);
    }

    return resolved;
  },

  /**
   * Create plugin context
   */
  createPluginContext(theme: BuiltTheme, additional?: Partial<PluginContext>): PluginContext {
    return {
      theme,
      performance: {
        isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        supportsGPU: 'CSS' in window && 'supports' in CSS && CSS.supports('transform', 'translateZ(0)'),
        deviceType: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      },
      accessibility: {
        screenReaderActive: false, // Would need actual detection
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      },
      environment: {
        isDevelopment: process.env.NODE_ENV === 'development',
        isProduction: process.env.NODE_ENV === 'production',
        userAgent: navigator.userAgent,
        viewportSize: { width: window.innerWidth, height: window.innerHeight },
      },
      ...additional,
    };
  },
};