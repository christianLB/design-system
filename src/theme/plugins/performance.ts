/**
 * Performance Optimization Plugin
 * Optimizes theme performance through CSS, animation, and rendering enhancements
 */

import {
  PerformancePlugin,
  PluginContext,
  PluginResult,
  PluginConfig,
} from './types';

/**
 * Performance plugin configuration
 */
export interface PerformancePluginConfig extends PluginConfig {
  // CSS optimizations
  cssOptimization?: {
    enabled?: boolean;
    removeUnusedVariables?: boolean;
    compressColors?: boolean;
    optimizeSelectors?: boolean;
    minifyOutput?: boolean;
    deduplicateRules?: boolean;
  };

  // Animation optimizations
  animationOptimization?: {
    enabled?: boolean;
    useCompositorLayers?: boolean;
    preloadKeyframes?: boolean;
    batchAnimations?: boolean;
    useRAF?: boolean;
    cullOffscreenAnimations?: boolean;
  };

  // Lazy loading
  lazyLoading?: {
    enabled?: boolean;
    themeChunks?: boolean;
    conditionalVariables?: boolean;
    deferNonCritical?: boolean;
    prioritizeCritical?: boolean;
  };

  // Bundle optimization
  bundleOptimization?: {
    enabled?: boolean;
    treeShaking?: boolean;
    codesplitting?: boolean;
    dynamicImports?: boolean;
    compressionGzip?: boolean;
    compressionBrotli?: boolean;
  };

  // Memory optimization
  memoryOptimization?: {
    enabled?: boolean;
    weakReferences?: boolean;
    poolAnimations?: boolean;
    cacheManagement?: boolean;
    garbageCollection?: boolean;
  };

  // Rendering optimization
  renderingOptimization?: {
    enabled?: boolean;
    useVirtualization?: boolean;
    batchDOMUpdates?: boolean;
    optimizeRepaints?: boolean;
    useDocumentFragment?: boolean;
    debounceUpdates?: boolean;
  };

  // Performance monitoring
  monitoring?: {
    enabled?: boolean;
    trackFPS?: boolean;
    trackMemory?: boolean;
    trackPaintTiming?: boolean;
    trackLayoutShift?: boolean;
    reportThreshold?: number;
  };
}

/**
 * Default performance plugin configuration
 */
const defaultPerformanceConfig: PerformancePluginConfig = {
  cssOptimization: {
    enabled: true,
    removeUnusedVariables: true,
    compressColors: true,
    optimizeSelectors: true,
    minifyOutput: false, // Usually handled by build tools
    deduplicateRules: true,
  },
  animationOptimization: {
    enabled: true,
    useCompositorLayers: true,
    preloadKeyframes: true,
    batchAnimations: true,
    useRAF: true,
    cullOffscreenAnimations: true,
  },
  lazyLoading: {
    enabled: true,
    themeChunks: true,
    conditionalVariables: true,
    deferNonCritical: true,
    prioritizeCritical: true,
  },
  bundleOptimization: {
    enabled: true,
    treeShaking: true,
    codesplitting: false, // Usually handled by build tools
    dynamicImports: true,
    compressionGzip: false, // Usually handled by server
    compressionBrotli: false, // Usually handled by server
  },
  memoryOptimization: {
    enabled: true,
    weakReferences: true,
    poolAnimations: true,
    cacheManagement: true,
    garbageCollection: true,
  },
  renderingOptimization: {
    enabled: true,
    useVirtualization: false,
    batchDOMUpdates: true,
    optimizeRepaints: true,
    useDocumentFragment: true,
    debounceUpdates: true,
  },
  monitoring: {
    enabled: false, // Disabled by default in production
    trackFPS: true,
    trackMemory: true,
    trackPaintTiming: true,
    trackLayoutShift: true,
    reportThreshold: 16.67, // 60fps threshold
  },
};

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  fps: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  paintTiming: {
    firstPaint: number;
    firstContentfulPaint: number;
  };
  layoutShift: number;
  animationCount: number;
  cssVariableCount: number;
}

/**
 * Performance utilities
 */
class PerformanceUtils {
  private static animationPool: Animation[] = [];
  private static observerCache = new Map<string, IntersectionObserver>();
  private static performanceData: PerformanceMetrics | null = null;

  /**
   * Optimize CSS variables by removing unused ones
   */
  static optimizeCSSVariables(variables: Record<string, string>): Record<string, string> {
    if (typeof document === 'undefined') return variables;

    const used = new Set<string>();
    const stylesheets = Array.from(document.styleSheets);

    // Check which variables are actually used
    stylesheets.forEach(stylesheet => {
      try {
        Array.from(stylesheet.cssRules).forEach(rule => {
          if (rule instanceof CSSStyleRule) {
            const text = rule.cssText;
            Object.keys(variables).forEach(varName => {
              if (text.includes(varName)) {
                used.add(varName);
              }
            });
          }
        });
      } catch (e) {
        // Ignore cross-origin errors
      }
    });

    // Return only used variables
    const optimized: Record<string, string> = {};
    used.forEach(varName => {
      if (variables[varName]) {
        optimized[varName] = variables[varName];
      }
    });

    return optimized;
  }

  /**
   * Compress color values
   */
  static compressColors(variables: Record<string, string>): Record<string, string> {
    const compressed: Record<string, string> = {};

    Object.entries(variables).forEach(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        // Convert long hex to short hex where possible
        if (value.length === 7) {
          const [, r1, r2, g1, g2, b1, b2] = value;
          if (r1 === r2 && g1 === g2 && b1 === b2) {
            compressed[key] = `#${r1}${g1}${b1}`;
          } else {
            compressed[key] = value;
          }
        } else {
          compressed[key] = value;
        }
      } else {
        compressed[key] = value;
      }
    });

    return compressed;
  }

  /**
   * Create performance-optimized animation
   */
  static createOptimizedAnimation(
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation | null {
    if (!element || typeof element.animate !== 'function') return null;

    // Use animation from pool if available
    let animation = this.animationPool.pop();

    if (!animation) {
      // Force compositor layer for better performance
      element.style.willChange = 'transform, opacity';
      animation = element.animate(keyframes, options);
    } else {
      // Reuse existing animation
      animation.effect = new KeyframeEffect(element, keyframes, options);
    }

    // Return animation to pool when finished
    animation.addEventListener('finish', () => {
      if (animation) {
        this.animationPool.push(animation);
        element.style.willChange = 'auto';
      }
    }, { once: true });

    return animation;
  }

  /**
   * Batch DOM updates
   */
  static batchDOMUpdates(updates: Array<() => void>): void {
    const fragment = document.createDocumentFragment();
    
    // Execute all updates
    updates.forEach(update => {
      try {
        update();
      } catch (error) {
        console.warn('Error in batched DOM update:', error);
      }
    });
  }

  /**
   * Debounce function for performance
   */
  static debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Create intersection observer for culling offscreen animations
   */
  static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const key = JSON.stringify(options);
    
    if (this.observerCache.has(key)) {
      return this.observerCache.get(key)!;
    }

    const observer = new IntersectionObserver(callback, options);
    this.observerCache.set(key, observer);
    
    return observer;
  }

  /**
   * Monitor performance metrics
   */
  static startPerformanceMonitoring(config: NonNullable<PerformancePluginConfig['monitoring']>): void {
    if (typeof window === 'undefined' || !config.enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    const updateMetrics = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;

        // Update performance data
        this.performanceData = {
          fps,
          memory: this.getMemoryInfo(),
          paintTiming: this.getPaintTiming(),
          layoutShift: this.getLayoutShift(),
          animationCount: this.getAnimationCount(),
          cssVariableCount: this.getCSSVariableCount(),
        };

        // Report if below threshold
        if (config.trackFPS && fps < (config.reportThreshold || 60)) {
          this.reportPerformanceIssue('Low FPS', { fps, threshold: config.reportThreshold });
        }
      }

      if (config.trackFPS) {
        requestAnimationFrame(updateMetrics);
      }
    };

    if (config.trackFPS) {
      requestAnimationFrame(updateMetrics);
    }
  }

  /**
   * Get memory information
   */
  private static getMemoryInfo(): { used: number; total: number; percentage: number } {
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };
    }
    return { used: 0, total: 0, percentage: 0 };
  }

  /**
   * Get paint timing information
   */
  private static getPaintTiming(): { firstPaint: number; firstContentfulPaint: number } {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0;
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    
    return { firstPaint, firstContentfulPaint };
  }

  /**
   * Get layout shift information
   */
  private static getLayoutShift(): number {
    const layoutShiftEntries = performance.getEntriesByType('layout-shift');
    return layoutShiftEntries.reduce((total, entry: any) => total + entry.value, 0);
  }

  /**
   * Get current animation count
   */
  private static getAnimationCount(): number {
    return document.getAnimations().length;
  }

  /**
   * Get CSS variable count
   */
  private static getCSSVariableCount(): number {
    const styles = getComputedStyle(document.documentElement);
    let count = 0;
    
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].startsWith('--')) {
        count++;
      }
    }
    
    return count;
  }

  /**
   * Report performance issue
   */
  private static reportPerformanceIssue(type: string, data: any): void {
    console.warn(`[Performance Plugin] ${type}:`, data);
  }

  /**
   * Get current performance metrics
   */
  static getPerformanceMetrics(): PerformanceMetrics | null {
    return this.performanceData;
  }

  /**
   * Clean up performance monitoring
   */
  static cleanup(): void {
    this.animationPool.length = 0;
    this.observerCache.forEach(observer => observer.disconnect());
    this.observerCache.clear();
    this.performanceData = null;
  }
}

/**
 * Create performance optimization plugin
 */
export function createPerformancePlugin(
  config: PerformancePluginConfig = {}
): PerformancePlugin {
  const mergedConfig = { ...defaultPerformanceConfig, ...config };

  return {
    name: 'performance',
    version: '1.0.0',
    description: 'Performance optimization enhancements for themes and animations',
    category: 'performance',
    priority: 'high',
    tags: ['performance', 'optimization', 'css', 'animation', 'memory', 'rendering'],
    defaultConfig: mergedConfig,

    features: {
      cssOptimization: mergedConfig.cssOptimization?.enabled,
      animationOptimization: mergedConfig.animationOptimization?.enabled,
      lazyLoading: mergedConfig.lazyLoading?.enabled,
      bundleOptimization: mergedConfig.bundleOptimization?.enabled,
      memoryOptimization: mergedConfig.memoryOptimization?.enabled,
      renderingOptimization: mergedConfig.renderingOptimization?.enabled,
    },

    hooks: {
      beforeThemeBuild: async (context: PluginContext, config: PerformancePluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };

        // Early performance setup
        if (finalConfig.monitoring?.enabled) {
          PerformanceUtils.startPerformanceMonitoring(finalConfig.monitoring);
        }

        return { success: true };
      },

      afterThemeBuild: async (context: PluginContext, config: PerformancePluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };
        const modifications: any = { 
          cssVariables: {},
          theme: {},
        };

        try {
          // Optimize CSS variables
          if (finalConfig.cssOptimization?.enabled && context.cssVariables) {
            let optimizedVariables = { ...context.cssVariables };

            if (finalConfig.cssOptimization.removeUnusedVariables) {
              optimizedVariables = PerformanceUtils.optimizeCSSVariables(optimizedVariables);
            }

            if (finalConfig.cssOptimization.compressColors) {
              optimizedVariables = PerformanceUtils.compressColors(optimizedVariables);
            }

            modifications.cssVariables = optimizedVariables;
          }

          // Add performance-optimized CSS properties
          if (finalConfig.animationOptimization?.enabled) {
            const animationOptimizations = addAnimationOptimizations(finalConfig.animationOptimization);
            Object.assign(modifications.cssVariables, animationOptimizations);
          }

          // Add rendering optimizations
          if (finalConfig.renderingOptimization?.enabled) {
            const renderingOptimizations = addRenderingOptimizations(finalConfig.renderingOptimization);
            Object.assign(modifications.cssVariables, renderingOptimizations);
          }

          return {
            success: true,
            modifications,
          };
        } catch (error) {
          return {
            success: false,
            error: error as Error,
          };
        }
      },

      onCSSGenerate: async (context: PluginContext, config: PerformancePluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };

        if (finalConfig.lazyLoading?.enabled) {
          // Mark non-critical variables for lazy loading
          const lazyVariables = identifyLazyLoadableVariables(context.cssVariables || {});
          
          return {
            success: true,
            data: { lazyVariables },
          };
        }

        return { success: true };
      },
    },

    init: async (config: PerformancePluginConfig = {}) => {
      const finalConfig = { ...mergedConfig, ...config };

      if (typeof window !== 'undefined') {
        // Setup performance monitoring
        if (finalConfig.monitoring?.enabled) {
          PerformanceUtils.startPerformanceMonitoring(finalConfig.monitoring);
        }

        // Setup memory optimization
        if (finalConfig.memoryOptimization?.enabled) {
          setupMemoryOptimization(finalConfig.memoryOptimization);
        }

        // Setup rendering optimization
        if (finalConfig.renderingOptimization?.enabled) {
          setupRenderingOptimization(finalConfig.renderingOptimization);
        }
      }
    },

    destroy: async () => {
      PerformanceUtils.cleanup();
    },
  };
}

/**
 * Add animation optimizations
 */
function addAnimationOptimizations(
  config: NonNullable<PerformancePluginConfig['animationOptimization']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  if (config.useCompositorLayers) {
    cssVariables['--will-change-transform'] = 'transform';
    cssVariables['--will-change-opacity'] = 'opacity';
    cssVariables['--backface-visibility'] = 'hidden';
    cssVariables['--transform-style'] = 'preserve-3d';
  }

  if (config.useRAF) {
    cssVariables['--animation-timing-function'] = 'linear';
  }

  return cssVariables;
}

/**
 * Add rendering optimizations
 */
function addRenderingOptimizations(
  config: NonNullable<PerformancePluginConfig['renderingOptimization']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  if (config.optimizeRepaints) {
    cssVariables['--contain'] = 'layout style paint';
    cssVariables['--isolation'] = 'isolate';
  }

  return cssVariables;
}

/**
 * Identify lazy loadable variables
 */
function identifyLazyLoadableVariables(variables: Record<string, string>): string[] {
  const criticalPrefixes = ['--primary', '--background', '--foreground', '--text'];
  const lazyVariables: string[] = [];

  Object.keys(variables).forEach(varName => {
    const isCritical = criticalPrefixes.some(prefix => varName.startsWith(prefix));
    if (!isCritical) {
      lazyVariables.push(varName);
    }
  });

  return lazyVariables;
}

/**
 * Setup memory optimization
 */
function setupMemoryOptimization(
  config: NonNullable<PerformancePluginConfig['memoryOptimization']>
): void {
  if (config.garbageCollection) {
    // Periodic cleanup
    setInterval(() => {
      if (typeof window !== 'undefined' && 'gc' in window) {
        (window as any).gc();
      }
    }, 30000); // Every 30 seconds
  }
}

/**
 * Setup rendering optimization
 */
function setupRenderingOptimization(
  config: NonNullable<PerformancePluginConfig['renderingOptimization']>
): void {
  if (config.debounceUpdates) {
    // Setup debounced update handler
    const debouncedUpdate = PerformanceUtils.debounce(() => {
      // Batch pending DOM updates
    }, 16); // ~60fps

    // This would be connected to the actual update mechanism
  }
}

/**
 * Default performance plugin instance
 */
export const performancePlugin = createPerformancePlugin();

export default performancePlugin;