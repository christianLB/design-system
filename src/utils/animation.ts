/**
 * Animation Utility Functions
 * Helper functions for creating and managing animations
 */

import { AnimationBuilder, createAnimation } from '../theme/animation/AnimationBuilder';
import { animationTokens, AnimationTokens } from '../theme/tokens/animation';
import { animationPresets } from '../theme/animation/presets';

/**
 * Animation timing interface
 */
export interface AnimationTiming {
  duration: number;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  playState?: 'running' | 'paused';
}

/**
 * Animation sequence interface
 */
export interface AnimationSequence {
  animations: Array<{
    keyframes: Keyframe[];
    timing: AnimationTiming;
    element?: Element;
  }>;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

/**
 * Easing function type
 */
export type EasingFunction = (t: number) => number;

/**
 * CSS Animation utilities
 */
export class CSSAnimationUtils {
  /**
   * Convert duration string to milliseconds
   */
  static parseDuration(duration: string): number {
    if (duration.endsWith('ms')) {
      return parseFloat(duration);
    } else if (duration.endsWith('s')) {
      return parseFloat(duration) * 1000;
    }
    return parseFloat(duration);
  }

  /**
   * Create CSS animation string
   */
  static createAnimationString(
    name: string,
    duration: string,
    easing: string = 'ease',
    delay: string = '0s',
    iterations: number | 'infinite' = 1,
    direction: string = 'normal',
    fillMode: string = 'none'
  ): string {
    return `${name} ${duration} ${easing} ${delay} ${iterations} ${direction} ${fillMode}`;
  }

  /**
   * Create keyframes CSS string
   */
  static createKeyframesCSS(name: string, keyframes: Record<string, Record<string, any>>): string {
    const keyframeStrings = Object.entries(keyframes).map(([percentage, styles]) => {
      const styleStrings = Object.entries(styles).map(([property, value]) => 
        `${property}: ${value}`
      ).join('; ');
      return `  ${percentage} { ${styleStrings}; }`;
    });

    return `@keyframes ${name} {\n${keyframeStrings.join('\n')}\n}`;
  }

  /**
   * Apply animation to element
   */
  static applyAnimation(
    element: Element,
    animationString: string
  ): void {
    if (element instanceof HTMLElement) {
      element.style.animation = animationString;
    }
  }

  /**
   * Remove animation from element
   */
  static removeAnimation(element: Element): void {
    if (element instanceof HTMLElement) {
      element.style.animation = '';
    }
  }

  /**
   * Check if animations are supported
   */
  static supportsAnimations(): boolean {
    return typeof window !== 'undefined' && 'animate' in document.createElement('div');
  }

  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get animation duration with reduced motion fallback
   */
  static getOptimalDuration(baseDuration: string): string {
    if (this.prefersReducedMotion()) {
      return '0.01ms';
    }
    return baseDuration;
  }
}

/**
 * Web Animations API utilities
 */
export class WebAnimationUtils {
  /**
   * Create Web Animation
   */
  static animate(
    element: Element,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation | null {
    if (!element || !('animate' in element)) return null;
    
    return element.animate(keyframes, options);
  }

  /**
   * Create animation with reduced motion support
   */
  static animateWithReducedMotion(
    element: Element,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation | null {
    if (CSSAnimationUtils.prefersReducedMotion()) {
      // Use minimal animation for reduced motion
      const reducedKeyframes = [keyframes[0], keyframes[keyframes.length - 1]];
      const reducedOptions = { ...options, duration: 1 };
      return this.animate(element, reducedKeyframes, reducedOptions);
    }
    
    return this.animate(element, keyframes, options);
  }

  /**
   * Create staggered animations
   */
  static staggeredAnimate(
    elements: Element[],
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
    staggerDelay: number = 100
  ): Animation[] {
    const animations: Animation[] = [];

    elements.forEach((element, index) => {
      const staggeredOptions = {
        ...options,
        delay: (options.delay || 0) + (index * staggerDelay),
      };
      
      const animation = this.animate(element, keyframes, staggeredOptions);
      if (animation) {
        animations.push(animation);
      }
    });

    return animations;
  }

  /**
   * Create animation sequence
   */
  static async sequence(sequence: AnimationSequence): Promise<void> {
    let currentProgress = 0;
    const totalAnimations = sequence.animations.length;

    for (let i = 0; i < totalAnimations; i++) {
      const { keyframes, timing, element } = sequence.animations[i];
      
      if (element) {
        const animation = this.animate(element, keyframes, timing);
        
        if (animation) {
          await new Promise<void>(resolve => {
            animation.addEventListener('finish', () => {
              currentProgress = (i + 1) / totalAnimations;
              sequence.onProgress?.(currentProgress);
              resolve();
            });
          });
        }
      }
    }

    sequence.onComplete?.();
  }

  /**
   * Create parallel animations
   */
  static parallel(
    animations: Array<{
      element: Element;
      keyframes: Keyframe[];
      options: KeyframeAnimationOptions;
    }>
  ): Promise<void> {
    const animationPromises = animations.map(({ element, keyframes, options }) => {
      const animation = this.animate(element, keyframes, options);
      
      if (animation) {
        return new Promise<void>(resolve => {
          animation.addEventListener('finish', () => resolve());
        });
      }
      
      return Promise.resolve();
    });

    return Promise.all(animationPromises).then(() => {});
  }

  /**
   * Pause all animations on element
   */
  static pauseAnimations(element: Element): void {
    const animations = element.getAnimations();
    animations.forEach(animation => animation.pause());
  }

  /**
   * Resume all animations on element
   */
  static resumeAnimations(element: Element): void {
    const animations = element.getAnimations();
    animations.forEach(animation => animation.play());
  }

  /**
   * Cancel all animations on element
   */
  static cancelAnimations(element: Element): void {
    const animations = element.getAnimations();
    animations.forEach(animation => animation.cancel());
  }
}

/**
 * Easing functions
 */
export const EasingFunctions = {
  // Basic easings
  linear: (t: number): number => t,
  
  easeIn: (t: number): number => t * t,
  easeOut: (t: number): number => 1 - (1 - t) * (1 - t),
  easeInOut: (t: number): number => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,

  // Cubic easings
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // Quartic easings
  easeInQuart: (t: number): number => t * t * t * t,
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t: number): number => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,

  // Elastic easings
  easeInElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },

  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },

  // Bounce easings
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },

  // Custom easings
  createCubicBezier: (x1: number, y1: number, x2: number, y2: number): EasingFunction => {
    return (t: number): number => {
      // Simplified cubic bezier approximation
      return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
    };
  },
};

/**
 * Animation utility functions
 */
export const AnimationUtils = {
  /**
   * Create fade in animation
   */
  fadeIn: (
    element: Element, 
    duration: number = 300, 
    easing: string = 'ease-out'
  ): Animation | null => {
    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [{ opacity: '0' }, { opacity: '1' }],
      { duration, easing, fill: 'both' }
    );
  },

  /**
   * Create fade out animation
   */
  fadeOut: (
    element: Element, 
    duration: number = 300, 
    easing: string = 'ease-in'
  ): Animation | null => {
    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [{ opacity: '1' }, { opacity: '0' }],
      { duration, easing, fill: 'both' }
    );
  },

  /**
   * Create slide in animation
   */
  slideIn: (
    element: Element,
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    duration: number = 300,
    distance: string = '100%'
  ): Animation | null => {
    const transforms: Record<string, string> = {
      up: `translateY(${distance})`,
      down: `translateY(-${distance})`,
      left: `translateX(-${distance})`,
      right: `translateX(${distance})`,
    };

    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [
        { transform: transforms[direction], opacity: '0' },
        { transform: 'translate(0, 0)', opacity: '1' }
      ],
      { duration, easing: 'ease-out', fill: 'both' }
    );
  },

  /**
   * Create scale animation
   */
  scale: (
    element: Element,
    fromScale: number = 0,
    toScale: number = 1,
    duration: number = 300
  ): Animation | null => {
    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [
        { transform: `scale(${fromScale})`, opacity: '0' },
        { transform: `scale(${toScale})`, opacity: '1' }
      ],
      { duration, easing: 'ease-out', fill: 'both' }
    );
  },

  /**
   * Create rotation animation
   */
  rotate: (
    element: Element,
    fromRotation: number = 0,
    toRotation: number = 360,
    duration: number = 1000
  ): Animation | null => {
    return WebAnimationUtils.animate(
      element,
      [
        { transform: `rotate(${fromRotation}deg)` },
        { transform: `rotate(${toRotation}deg)` }
      ],
      { duration, easing: 'linear', iterations: Infinity }
    );
  },

  /**
   * Create pulse animation
   */
  pulse: (
    element: Element,
    scale: number = 1.05,
    duration: number = 1000
  ): Animation | null => {
    return WebAnimationUtils.animate(
      element,
      [
        { transform: 'scale(1)', opacity: '1' },
        { transform: `scale(${scale})`, opacity: '0.7' },
        { transform: 'scale(1)', opacity: '1' }
      ],
      { duration, easing: 'ease-in-out', iterations: Infinity }
    );
  },

  /**
   * Create shake animation
   */
  shake: (
    element: Element,
    intensity: number = 10,
    duration: number = 500
  ): Animation | null => {
    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${intensity}px)` },
        { transform: `translateX(${intensity}px)` },
        { transform: `translateX(-${intensity}px)` },
        { transform: `translateX(${intensity}px)` },
        { transform: 'translateX(0)' }
      ],
      { duration, easing: 'ease-in-out' }
    );
  },

  /**
   * Create bounce animation
   */
  bounce: (
    element: Element,
    height: string = '20px',
    duration: number = 600
  ): Animation | null => {
    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [
        { transform: 'translateY(0)' },
        { transform: `translateY(-${height})` },
        { transform: 'translateY(0)' }
      ],
      { duration, easing: 'ease-out' }
    );
  },

  /**
   * Create typing animation
   */
  typing: (
    element: Element,
    text: string,
    speed: number = 50
  ): Promise<void> => {
    return new Promise(resolve => {
      if (!(element instanceof HTMLElement)) {
        resolve();
        return;
      }

      element.textContent = '';
      let index = 0;

      const typeChar = () => {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
          setTimeout(typeChar, speed);
        } else {
          resolve();
        }
      };

      typeChar();
    });
  },

  /**
   * Create reveal animation
   */
  reveal: (
    element: Element,
    direction: 'horizontal' | 'vertical' = 'vertical',
    duration: number = 600
  ): Animation | null => {
    if (!(element instanceof HTMLElement)) return null;

    const clipPath = direction === 'horizontal'
      ? ['inset(0 100% 0 0)', 'inset(0 0 0 0)']
      : ['inset(100% 0 0 0)', 'inset(0 0 0 0)'];

    return WebAnimationUtils.animateWithReducedMotion(
      element,
      [
        { clipPath: clipPath[0] },
        { clipPath: clipPath[1] }
      ],
      { duration, easing: 'ease-out', fill: 'both' }
    );
  },
};

/**
 * Quick animation helpers using preset configurations
 */
export const QuickAnimations = {
  /**
   * Animate element entrance
   */
  enter: (element: Element, type: 'fade' | 'slide' | 'scale' = 'fade'): Animation | null => {
    const preset = animationPresets[`${type}In`] || animationPresets.fadeIn;
    const builder = preset.builder.clone();
    
    if (element instanceof HTMLElement && 'animate' in element) {
      const cssInJS = builder.toCSSInJS();
      const keyframes = Object.values(cssInJS['@keyframes'] || {})[0] as Record<string, any>;
      
      if (keyframes) {
        const keyframeArray = Object.entries(keyframes).map(([percentage, styles]) => ({
          offset: parseFloat(percentage) / 100,
          ...styles,
        }));
        
        return element.animate(keyframeArray, {
          duration: CSSAnimationUtils.parseDuration(builder['currentAnimation'].duration || '300ms'),
          easing: builder['currentAnimation'].timingFunction || 'ease',
          fill: 'both',
        });
      }
    }
    
    return null;
  },

  /**
   * Animate element exit
   */
  exit: (element: Element, type: 'fade' | 'slide' | 'scale' = 'fade'): Animation | null => {
    const preset = animationPresets[`${type}Out`] || animationPresets.fadeOut;
    return QuickAnimations.enter(element, type);
  },

  /**
   * Animate attention
   */
  attention: (element: Element, type: 'pulse' | 'shake' | 'bounce' = 'pulse'): Animation | null => {
    const preset = animationPresets[type];
    if (preset) {
      return QuickAnimations.enter(element, 'fade'); // Placeholder implementation
    }
    return null;
  },
};

/**
 * Animation performance utilities
 */
export const AnimationPerformance = {
  /**
   * Check if element is in viewport
   */
  isInViewport: (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Optimize element for animation
   */
  optimizeForAnimation: (element: Element): void => {
    if (element instanceof HTMLElement) {
      element.style.willChange = 'transform, opacity';
      element.style.backfaceVisibility = 'hidden';
      element.style.transform = 'translateZ(0)'; // Force hardware acceleration
    }
  },

  /**
   * Clean up animation optimizations
   */
  cleanupOptimizations: (element: Element): void => {
    if (element instanceof HTMLElement) {
      element.style.willChange = 'auto';
      element.style.backfaceVisibility = '';
      element.style.transform = '';
    }
  },

  /**
   * Measure animation performance
   */
  measurePerformance: async (
    animationFn: () => Promise<void> | void,
    iterations: number = 1
  ): Promise<{ average: number; min: number; max: number; total: number }> => {
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await animationFn();
      const end = performance.now();
      times.push(end - start);
    }

    const total = times.reduce((sum, time) => sum + time, 0);
    const average = total / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    return { average, min, max, total };
  },
};

export default {
  CSSAnimationUtils,
  WebAnimationUtils,
  EasingFunctions,
  AnimationUtils,
  QuickAnimations,
  AnimationPerformance,
};