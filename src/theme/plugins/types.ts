/**
 * Plugin System Type Definitions
 */

import type { BuiltTheme } from '../builder/types';
import type { AnimationTokens } from '../tokens/animation';

export interface PluginConfig {
  enabled?: boolean;
  [key: string]: any;
}

export type PluginCapability =
  | 'animation'
  | 'effects'
  | 'accessibility'
  | 'performance'
  | 'styling'
  | 'interaction';

export type PluginCategory =
  | 'accessibility'
  | 'performance'
  | 'animation'
  | 'utility'
  | 'integration'
  | 'enhancement';

export interface PluginMetadata {
  name: string;
  version: string;
  description: string;
  capabilities: PluginCapability[];
  dependencies?: string[];
}

export interface PerformanceHints {
  gpu?: boolean;
  reflow?: 'none' | 'minimal' | 'moderate' | 'heavy';
  memory?: 'low' | 'moderate' | 'high';
  animations?: 'none' | 'css-only' | 'js-light' | 'js-heavy';
  accessibility?: string;
}

export interface PluginLifecycle {
  onInit?: () => void;
  onApply?: (element: HTMLElement) => void;
  onRemove?: (element: HTMLElement) => void;
  onDestroy?: () => void;
  onConfigUpdate?: (newConfig: PluginConfig) => void;
}

export type PluginPriority = 'low' | 'normal' | 'high' | 'critical';

export interface PluginContext {
  theme?: BuiltTheme;
  animations?: AnimationTokens;
  cssVariables?: Record<string, string>;
  isDarkMode?: boolean;
  isReducedMotion?: boolean;
  viewport?: {
    width: number;
    height: number;
  };
  device?: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

/**
 * Plugin result returned from hook execution
 */
export interface PluginResult {
  success: boolean;
  modifications?: {
    theme?: Partial<BuiltTheme>;
    animations?: Record<string, any>;
    cssVariables?: Record<string, string>;
    styles?: string;
    [key: string]: any;
  };
  error?: Error;
  errors?: string[];
  warnings?: string[];
  metadata?: Record<string, any>;
}

/**
 * Plugin hooks for lifecycle events
 */
export interface PluginHooks {
  beforeThemeBuild?: (
    context: PluginContext,
    config?: PluginConfig,
  ) => Promise<PluginResult> | PluginResult;
  afterThemeBuild?: (
    context: PluginContext,
    config?: PluginConfig,
  ) => Promise<PluginResult> | PluginResult;
  beforeApply?: (
    context: PluginContext,
    config?: PluginConfig,
  ) => Promise<PluginResult> | PluginResult;
  afterApply?: (
    context: PluginContext,
    config?: PluginConfig,
  ) => Promise<PluginResult> | PluginResult;
  onThemeChange?: (
    context: PluginContext,
    config?: PluginConfig,
  ) => Promise<PluginResult> | PluginResult;
}

/**
 * Main ThemePlugin interface
 */
export interface ThemePlugin {
  name: string;
  version: string;
  description: string;
  category: PluginCategory;
  priority: PluginPriority;
  tags?: string[];
  dependencies?: string[];
  defaultConfig?: PluginConfig;
  hooks?: PluginHooks;
  enabled?: boolean;
  initialized?: boolean;
  init?: (config?: PluginConfig) => Promise<void> | void;
  destroy?: () => Promise<void> | void;
  enable?: () => void;
  disable?: () => void;
}

/**
 * Specialized plugin types
 */
export interface AccessibilityPlugin extends ThemePlugin {
  category: 'accessibility';
}

export interface PerformancePlugin extends ThemePlugin {
  category: 'performance';
}

export interface AnimationPlugin extends ThemePlugin {
  category: 'animation';
}

export interface UtilityPlugin extends ThemePlugin {
  category: 'utility';
}

export interface IntegrationPlugin extends ThemePlugin {
  category: 'integration';
}

export interface EnhancementPlugin extends ThemePlugin {
  category: 'enhancement';
}

/**
 * Hook name type for executeHooks
 */
export type PluginHookName = keyof PluginHooks;

/**
 * Plugin manager configuration
 */
export interface PluginManagerConfig {
  enabledByDefault?: boolean;
  autoInitialize?: boolean;
  strictMode?: boolean;
  logLevel?: 'none' | 'error' | 'warn' | 'info' | 'debug';
  maxPlugins?: number;
  allowDuplicates?: boolean;
  maxExecutionTime?: number;
  allowAsyncHooks?: boolean;
  errorHandling?: 'throw' | 'log' | 'warn' | 'ignore';
}

/**
 * Plugin registration options
 */
export interface PluginRegistrationOptions {
  config?: PluginConfig;
  autoEnable?: boolean;
  autoInitialize?: boolean;
}

/**
 * Plugin execution options
 */
export interface PluginExecutionOptions {
  categories?: PluginCategory[];
  priorities?: PluginPriority[];
  includeDisabled?: boolean;
  parallel?: boolean;
  timeout?: number;
  ignoreErrors?: boolean;
  filterByCategory?: PluginCategory;
  filterByTags?: string[];
  excludePlugins?: string[];
  includeOnly?: string[];
}

/**
 * Plugin event types
 */
export interface PluginEvent {
  type: string;
  plugin?: string;
  data?: any;
  timestamp: number;
}

export type PluginEventListener = (event: PluginEvent) => void;

export interface PluginManagerEvents {
  'plugin:registered': { plugin: string };
  'plugin:unregistered': { plugin: string };
  'plugin:enabled': { plugin: string };
  'plugin:disabled': { plugin: string };
  'plugin:initialized': { plugin: string };
  'plugin:destroyed': { plugin: string };
  'plugin:error': { plugin: string; error: Error };
  'hook:before': { lifecycle: PluginHookName; plugins: string[] };
  'hook:after': { lifecycle: PluginHookName; results: Record<string, PluginResult> };
}

/**
 * Plugin validation result
 */
export interface PluginValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  plugin?: ThemePlugin;
}

/**
 * Plugin registry for managing registered plugins
 */
export interface PluginRegistry {
  plugins: Map<string, ThemePlugin>;
  configs: Map<string, PluginConfig>;
  dependencies: Map<string, string[]>;
  executionOrder: string[];
}

// Plugin utilities
export const PluginUtils = {
  createPluginContext(theme: any, options: Partial<PluginContext> = {}): PluginContext {
    const defaultViewport =
      typeof window !== 'undefined'
        ? { width: window.innerWidth, height: window.innerHeight }
        : { width: 1024, height: 768 };

    const width = options.viewport?.width ?? defaultViewport.width;

    return {
      theme,
      isDarkMode: options.isDarkMode ?? false,
      isReducedMotion: options.isReducedMotion ?? false,
      viewport: options.viewport ?? defaultViewport,
      device: options.device ?? {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      },
    };
  },

  sortPluginsByPriority(
    plugins: Array<{ priority?: PluginPriority; [key: string]: any }>,
  ): Array<any> {
    const priorityOrder: Record<PluginPriority, number> = {
      critical: 0,
      high: 1,
      normal: 2,
      low: 3,
    };

    return [...plugins].sort((a, b) => {
      const aPriority = priorityOrder[a.priority || 'normal'];
      const bPriority = priorityOrder[b.priority || 'normal'];
      return aPriority - bPriority;
    });
  },

  resolveDependencies(
    plugins: Array<{ name?: string; dependencies?: string[]; [key: string]: any }>,
  ): string[] {
    const resolved: string[] = [];
    const visited = new Set<string>();

    function visit(pluginName: string) {
      if (visited.has(pluginName)) return;
      visited.add(pluginName);

      const plugin = plugins.find((p) => p.name === pluginName);
      if (plugin?.dependencies) {
        plugin.dependencies.forEach((dep) => visit(dep));
      }

      resolved.push(pluginName);
    }

    plugins.forEach((plugin) => {
      if (plugin.name) {
        visit(plugin.name);
      }
    });

    return resolved;
  },
};
