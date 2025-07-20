/**
 * Plugin System Type Definitions
 */

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
  theme?: any;
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
