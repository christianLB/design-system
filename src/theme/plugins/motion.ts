/**
 * Motion Enhancement Plugin
 * Advanced animation capabilities and motion design enhancements
 */

import {
  ThemePlugin,
  PluginContext,
  PluginResult,
  PluginConfig,
} from './types';
import { AnimationBuilder } from '../animation/AnimationBuilder';
import { animationTokens } from '../tokens/animation';

/**
 * Motion plugin configuration
 */
export interface MotionPluginConfig extends PluginConfig {
  // Spring animations
  springAnimations?: {
    enabled?: boolean;
    presets?: ('gentle' | 'wobbly' | 'stiff' | 'slow' | 'molasses')[];
    customSprings?: Record<string, { tension: number; friction: number; mass?: number }>;
  };

  // Gesture animations
  gestureAnimations?: {
    enabled?: boolean;
    swipeThreshold?: number;
    dragResistance?: number;
    snapToGrid?: boolean;
    momentumScrolling?: boolean;
  };

  // Parallax effects
  parallaxEffects?: {
    enabled?: boolean;
    intensity?: number;
    respectReducedMotion?: boolean;
    layers?: number;
    smoothness?: number;
  };

  // Advanced easings
  advancedEasings?: {
    enabled?: boolean;
    customBeziers?: Record<string, string>;
    physicsBasedEasing?: boolean;
    anticipation?: boolean;
    overshoot?: boolean;
  };

  // Morphing animations
  morphingAnimations?: {
    enabled?: boolean;
    pathMorphing?: boolean;
    shapeTransitions?: boolean;
    fluidTransitions?: boolean;
    smoothCorners?: boolean;
  };

  // Performance optimizations
  performanceOptimizations?: {
    enabled?: boolean;
    useCompositorLayers?: boolean;
    preloadAnimations?: boolean;
    batchAnimations?: boolean;
    useRequestAnimationFrame?: boolean;
  };
}

/**
 * Default motion plugin configuration
 */
const defaultMotionConfig: MotionPluginConfig = {
  springAnimations: {
    enabled: true,
    presets: ['gentle', 'wobbly', 'stiff'],
    customSprings: {},
  },
  gestureAnimations: {
    enabled: true,
    swipeThreshold: 50,
    dragResistance: 0.8,
    snapToGrid: false,
    momentumScrolling: true,
  },
  parallaxEffects: {
    enabled: true,
    intensity: 0.5,
    respectReducedMotion: true,
    layers: 3,
    smoothness: 60,
  },
  advancedEasings: {
    enabled: true,
    customBeziers: {},
    physicsBasedEasing: true,
    anticipation: true,
    overshoot: true,
  },
  morphingAnimations: {
    enabled: true,
    pathMorphing: true,
    shapeTransitions: true,
    fluidTransitions: true,
    smoothCorners: true,
  },
  performanceOptimizations: {
    enabled: true,
    useCompositorLayers: true,
    preloadAnimations: true,
    batchAnimations: true,
    useRequestAnimationFrame: true,
  },
};

/**
 * Spring animation presets
 */
const SPRING_PRESETS = {
  gentle: { tension: 120, friction: 14, mass: 1 },
  wobbly: { tension: 180, friction: 12, mass: 1 },
  stiff: { tension: 210, friction: 20, mass: 1 },
  slow: { tension: 280, friction: 60, mass: 1 },
  molasses: { tension: 280, friction: 120, mass: 1 },
};

/**
 * Advanced easing functions
 */
const ADVANCED_EASINGS = {
  // Anticipation easings
  anticipate: 'cubic-bezier(0.22, 1, 0.36, 1)',
  anticipateIn: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  anticipateOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  anticipateInOut: 'cubic-bezier(0.22, 1, 0.36, 1)',

  // Overshoot easings
  overshoot: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  overshootIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  overshootOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  overshootInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Elastic easings
  elasticIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  elasticOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  elasticInOut: 'cubic-bezier(0.23, 1, 0.32, 1)',

  // Bounce easings
  bounceIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  bounceOut: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  bounceInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Custom physics-based
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  damped: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  material: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

/**
 * Motion utilities
 */
class MotionUtils {
  /**
   * Create spring animation CSS
   */
  static createSpringAnimation(
    name: string, 
    keyframes: Record<string, any>, 
    spring: { tension: number; friction: number; mass?: number }
  ): string {
    const duration = this.calculateSpringDuration(spring);
    const easing = this.springToCubicBezier(spring);
    
    return `
      @keyframes ${name} {
        ${Object.entries(keyframes).map(([percent, props]) => 
          `${percent} { ${Object.entries(props).map(([prop, value]) => `${prop}: ${value}`).join('; ')} }`
        ).join('\n        ')}
      }
      .${name} {
        animation: ${name} ${duration}ms ${easing} both;
      }
    `;
  }

  /**
   * Calculate spring duration from physics properties
   */
  static calculateSpringDuration(spring: { tension: number; friction: number; mass?: number }): number {
    const { tension, friction, mass = 1 } = spring;
    const w0 = Math.sqrt(tension / mass);
    const zeta = friction / (2 * Math.sqrt(tension * mass));
    
    if (zeta < 1) {
      // Underdamped
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return (4 / (zeta * w0)) * 1000;
    } else {
      // Overdamped or critically damped
      return (4 / w0) * 1000;
    }
  }

  /**
   * Convert spring parameters to cubic bezier approximation
   */
  static springToCubicBezier(spring: { tension: number; friction: number; mass?: number }): string {
    const { tension, friction } = spring;
    
    // Simplified conversion for demonstration
    // In practice, you might want a more sophisticated conversion
    const x1 = tension / 500;
    const y1 = 0;
    const x2 = 1 - (friction / 100);
    const y2 = 1;
    
    return `cubic-bezier(${x1.toFixed(3)}, ${y1}, ${x2.toFixed(3)}, ${y2})`;
  }

  /**
   * Create parallax transform
   */
  static createParallaxTransform(
    intensity: number, 
    layer: number, 
    scrollY: number
  ): string {
    const speed = intensity * (layer / 10);
    const translateY = scrollY * speed;
    return `translate3d(0, ${translateY}px, 0)`;
  }

  /**
   * Generate morphing keyframes
   */
  static generateMorphingKeyframes(
    fromPath: string, 
    toPath: string, 
    steps: number = 10
  ): Record<string, any> {
    const keyframes: Record<string, any> = {};
    
    for (let i = 0; i <= steps; i++) {
      const percent = `${(i / steps) * 100}%`;
      const progress = i / steps;
      
      // Simplified path interpolation (in practice, use a proper SVG path interpolation library)
      keyframes[percent] = {
        d: progress === 0 ? fromPath : progress === 1 ? toPath : `path("${toPath}")`,
      };
    }
    
    return keyframes;
  }

  /**
   * Detect device capabilities
   */
  static detectDeviceCapabilities() {
    if (typeof window === 'undefined') {
      return {
        supportsGPU: false,
        supportsTouch: false,
        supportsPointer: false,
        prefersReducedMotion: false,
      };
    }

    return {
      supportsGPU: 'CSS' in window && 'supports' in CSS && CSS.supports('transform', 'translateZ(0)'),
      supportsTouch: 'ontouchstart' in window,
      supportsPointer: 'PointerEvent' in window,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };
  }

  /**
   * Create performance-optimized animation
   */
  static createOptimizedAnimation(
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
    useCompositor: boolean = true
  ): Animation | null {
    if (!element || !('animate' in element)) return null;

    if (useCompositor) {
      // Add will-change for compositor layer
      element.style.willChange = 'transform, opacity';
      
      // Clean up after animation
      const animation = element.animate(keyframes, options);
      animation.addEventListener('finish', () => {
        element.style.willChange = 'auto';
      });
      
      return animation;
    }

    return element.animate(keyframes, options);
  }
}

/**
 * Create motion enhancement plugin
 */
export function createMotionPlugin(
  config: MotionPluginConfig = {}
): ThemePlugin {
  const mergedConfig = { ...defaultMotionConfig, ...config };

  return {
    name: 'motion',
    version: '1.0.0',
    description: 'Advanced motion design enhancements and animation capabilities',
    category: 'animation',
    priority: 'normal',
    tags: ['motion', 'animation', 'spring', 'parallax', 'gesture', 'morphing'],
    defaultConfig: mergedConfig,

    hooks: {
      afterThemeBuild: async (context: PluginContext, config: MotionPluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };
        const modifications: any = { 
          animations: {},
          cssVariables: {},
        };

        try {
          // Add spring animations
          if (finalConfig.springAnimations?.enabled) {
            const springSupport = addSpringAnimations(finalConfig.springAnimations);
            Object.assign(modifications.animations, springSupport.animations);
            Object.assign(modifications.cssVariables, springSupport.cssVariables);
          }

          // Add advanced easings
          if (finalConfig.advancedEasings?.enabled) {
            const easingSupport = addAdvancedEasings(finalConfig.advancedEasings);
            Object.assign(modifications.animations, easingSupport.animations);
            Object.assign(modifications.cssVariables, easingSupport.cssVariables);
          }

          // Add parallax support
          if (finalConfig.parallaxEffects?.enabled) {
            const parallaxSupport = addParallaxSupport(finalConfig.parallaxEffects);
            Object.assign(modifications.cssVariables, parallaxSupport);
          }

          // Add morphing animations
          if (finalConfig.morphingAnimations?.enabled) {
            const morphingSupport = addMorphingSupport(finalConfig.morphingAnimations);
            Object.assign(modifications.cssVariables, morphingSupport);
          }

          // Add performance optimizations
          if (finalConfig.performanceOptimizations?.enabled) {
            const performanceSupport = addPerformanceOptimizations(finalConfig.performanceOptimizations);
            Object.assign(modifications.cssVariables, performanceSupport);
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

      onAnimationCreate: async (context: PluginContext, config: MotionPluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };
        const deviceCapabilities = MotionUtils.detectDeviceCapabilities();

        // Adjust animations based on device capabilities
        if (deviceCapabilities.prefersReducedMotion && finalConfig.parallaxEffects?.respectReducedMotion) {
          return {
            success: true,
            data: { disableParallax: true },
          };
        }

        return { success: true };
      },
    },

    init: async (config: MotionPluginConfig = {}) => {
      if (typeof window !== 'undefined') {
        // Add gesture event listeners if enabled
        if (config.gestureAnimations?.enabled) {
          setupGestureHandlers(config.gestureAnimations);
        }

        // Setup parallax scrolling if enabled
        if (config.parallaxEffects?.enabled) {
          setupParallaxScrolling(config.parallaxEffects);
        }

        // Add performance monitoring
        if (config.performanceOptimizations?.enabled) {
          setupPerformanceMonitoring();
        }
      }
    },

    destroy: async () => {
      if (typeof window !== 'undefined') {
        // Clean up event listeners
        cleanupMotionHandlers();
      }
    },
  };
}

/**
 * Add spring animations support
 */
function addSpringAnimations(
  config: NonNullable<MotionPluginConfig['springAnimations']>
): { animations: any; cssVariables: Record<string, string> } {
  const animations: any = {};
  const cssVariables: Record<string, string> = {};

  // Add preset springs
  if (config.presets) {
    config.presets.forEach(preset => {
      const spring = SPRING_PRESETS[preset];
      const duration = MotionUtils.calculateSpringDuration(spring);
      const easing = MotionUtils.springToCubicBezier(spring);
      
      cssVariables[`--spring-${preset}-duration`] = `${duration}ms`;
      cssVariables[`--spring-${preset}-easing`] = easing;
    });
  }

  // Add custom springs
  if (config.customSprings) {
    Object.entries(config.customSprings).forEach(([name, spring]) => {
      const duration = MotionUtils.calculateSpringDuration(spring);
      const easing = MotionUtils.springToCubicBezier(spring);
      
      cssVariables[`--spring-${name}-duration`] = `${duration}ms`;
      cssVariables[`--spring-${name}-easing`] = easing;
    });
  }

  return { animations, cssVariables };
}

/**
 * Add advanced easings
 */
function addAdvancedEasings(
  config: NonNullable<MotionPluginConfig['advancedEasings']>
): { animations: any; cssVariables: Record<string, string> } {
  const animations: any = {};
  const cssVariables: Record<string, string> = {};

  // Add built-in advanced easings
  Object.entries(ADVANCED_EASINGS).forEach(([name, easing]) => {
    cssVariables[`--easing-${name}`] = easing;
  });

  // Add custom beziers
  if (config.customBeziers) {
    Object.entries(config.customBeziers).forEach(([name, bezier]) => {
      cssVariables[`--easing-${name}`] = bezier;
    });
  }

  return { animations, cssVariables };
}

/**
 * Add parallax support
 */
function addParallaxSupport(
  config: NonNullable<MotionPluginConfig['parallaxEffects']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  cssVariables['--parallax-intensity'] = config.intensity?.toString() || '0.5';
  cssVariables['--parallax-layers'] = config.layers?.toString() || '3';
  cssVariables['--parallax-smoothness'] = config.smoothness?.toString() || '60';

  return cssVariables;
}

/**
 * Add morphing support
 */
function addMorphingSupport(
  config: NonNullable<MotionPluginConfig['morphingAnimations']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  if (config.smoothCorners) {
    cssVariables['--morph-smooth-corners'] = '1';
  }

  if (config.fluidTransitions) {
    cssVariables['--morph-fluid-duration'] = '300ms';
    cssVariables['--morph-fluid-easing'] = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  return cssVariables;
}

/**
 * Add performance optimizations
 */
function addPerformanceOptimizations(
  config: NonNullable<MotionPluginConfig['performanceOptimizations']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  if (config.useCompositorLayers) {
    cssVariables['--will-change-transform'] = 'transform';
    cssVariables['--will-change-opacity'] = 'opacity';
    cssVariables['--will-change-auto'] = 'auto';
  }

  return cssVariables;
}

/**
 * Setup gesture handlers
 */
function setupGestureHandlers(config: NonNullable<MotionPluginConfig['gestureAnimations']>): void {
  // Implementation would go here for gesture handling
  // This is a placeholder for the actual gesture implementation
}

/**
 * Setup parallax scrolling
 */
function setupParallaxScrolling(config: NonNullable<MotionPluginConfig['parallaxEffects']>): void {
  // Implementation would go here for parallax scrolling
  // This is a placeholder for the actual parallax implementation
}

/**
 * Setup performance monitoring
 */
function setupPerformanceMonitoring(): void {
  // Implementation would go here for performance monitoring
  // This is a placeholder for the actual performance monitoring
}

/**
 * Cleanup motion handlers
 */
function cleanupMotionHandlers(): void {
  // Implementation would go here for cleanup
  // This is a placeholder for the actual cleanup implementation
}

/**
 * Default motion plugin instance
 */
export const motionPlugin = createMotionPlugin();

export default motionPlugin;