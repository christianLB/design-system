/**
 * AnimationBuilder - Utility class for building and managing animations
 * Provides a fluent API for creating complex animations with CSS-in-JS support
 */

import { 
  AnimationTokens, 
  AnimationDurationTokens, 
  AnimationEasingTokens, 
  AnimationKeyframeTokens,
  animationTokens 
} from '../tokens/animation';

/**
 * Animation property interface
 */
export interface AnimationProperty {
  name: string;
  duration: string;
  timingFunction: string;
  delay: string;
  iterationCount: number | 'infinite';
  direction: string;
  fillMode: string;
  playState: string;
}

/**
 * CSS-in-JS animation object
 */
export interface CSSInJSAnimation {
  '@keyframes'?: Record<string, Record<string, any>>;
  animation?: string;
  animationName?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
  animationDelay?: string;
  animationIterationCount?: number | 'infinite';
  animationDirection?: string;
  animationFillMode?: string;
  animationPlayState?: string;
  willChange?: string;
  transform?: string;
  transition?: string;
}

/**
 * Animation sequence step
 */
export interface AnimationStep {
  keyframes: string | Record<string, any>;
  duration: string;
  easing: string;
  delay?: string;
  iterations?: number | 'infinite';
  direction?: string;
  fillMode?: string;
}

/**
 * Animation chain configuration
 */
export interface AnimationChain {
  steps: AnimationStep[];
  loop?: boolean;
  delay?: string;
}

/**
 * Performance optimization options
 */
export interface PerformanceOptions {
  useWillChange?: boolean;
  useTransform3d?: boolean;
  useGPUAcceleration?: boolean;
  optimizeLayering?: boolean;
}

/**
 * Motion reduction options
 */
export interface MotionOptions {
  respectReducedMotion?: boolean;
  reducedMotionFallback?: 'disable' | 'simplify' | 'duration';
  reducedMotionDuration?: string;
}

/**
 * AnimationBuilder class
 */
export class AnimationBuilder {
  private tokens: AnimationTokens;
  private currentAnimation: Partial<AnimationProperty>;
  private keyframes: Record<string, Record<string, any>>;
  private performanceOpts: PerformanceOptions;
  private motionOpts: MotionOptions;
  private animationChain: AnimationStep[];
  private cssVariables: Record<string, string>;

  constructor(tokens: AnimationTokens = animationTokens) {
    this.tokens = tokens;
    this.currentAnimation = {};
    this.keyframes = {};
    this.performanceOpts = {
      useWillChange: true,
      useTransform3d: true,
      useGPUAcceleration: true,
      optimizeLayering: true,
    };
    this.motionOpts = {
      respectReducedMotion: true,
      reducedMotionFallback: 'simplify',
      reducedMotionDuration: '0.01ms',
    };
    this.animationChain = [];
    this.cssVariables = {};
  }

  /**
   * Create a new AnimationBuilder instance
   */
  static create(tokens?: AnimationTokens): AnimationBuilder {
    return new AnimationBuilder(tokens);
  }

  /**
   * Set animation name
   */
  name(animationName: string): AnimationBuilder {
    this.currentAnimation.name = animationName;
    return this;
  }

  /**
   * Set animation duration
   */
  duration(duration: keyof AnimationDurationTokens | string): AnimationBuilder {
    if (typeof duration === 'string' && duration in this.tokens.duration) {
      this.currentAnimation.duration = this.tokens.duration[duration as keyof AnimationDurationTokens];
    } else {
      this.currentAnimation.duration = duration as string;
    }
    return this;
  }

  /**
   * Set animation easing
   */
  easing(easing: keyof AnimationEasingTokens | string): AnimationBuilder {
    if (typeof easing === 'string' && easing in this.tokens.easing) {
      this.currentAnimation.timingFunction = this.tokens.easing[easing as keyof AnimationEasingTokens];
    } else {
      this.currentAnimation.timingFunction = easing as string;
    }
    return this;
  }

  /**
   * Set animation delay
   */
  delay(delay: string): AnimationBuilder {
    this.currentAnimation.delay = delay;
    return this;
  }

  /**
   * Set animation iteration count
   */
  iterations(count: number | 'infinite'): AnimationBuilder {
    this.currentAnimation.iterationCount = count;
    return this;
  }

  /**
   * Set animation direction
   */
  direction(direction: string): AnimationBuilder {
    this.currentAnimation.direction = direction;
    return this;
  }

  /**
   * Set animation fill mode
   */
  fillMode(mode: string): AnimationBuilder {
    this.currentAnimation.fillMode = mode;
    return this;
  }

  /**
   * Set animation play state
   */
  playState(state: string): AnimationBuilder {
    this.currentAnimation.playState = state;
    return this;
  }

  /**
   * Use predefined keyframes
   */
  useKeyframes(keyframeName: keyof AnimationKeyframeTokens): AnimationBuilder {
    if (keyframeName in this.tokens.keyframes) {
      this.keyframes[keyframeName] = this.tokens.keyframes[keyframeName];
      this.currentAnimation.name = keyframeName;
    }
    return this;
  }

  /**
   * Define custom keyframes
   */
  keyframe(name: string, frames: Record<string, Record<string, any>>): AnimationBuilder {
    this.keyframes[name] = frames;
    this.currentAnimation.name = name;
    return this;
  }

  /**
   * Add step to animation chain
   */
  then(step: Omit<AnimationStep, 'keyframes'> & { keyframes: keyof AnimationKeyframeTokens | Record<string, any> }): AnimationBuilder {
    const keyframes = typeof step.keyframes === 'string' 
      ? this.tokens.keyframes[step.keyframes] 
      : step.keyframes;
    
    this.animationChain.push({
      ...step,
      keyframes,
    });
    return this;
  }

  /**
   * Set performance optimization options
   */
  optimize(options: PerformanceOptions): AnimationBuilder {
    this.performanceOpts = { ...this.performanceOpts, ...options };
    return this;
  }

  /**
   * Set motion reduction options
   */
  motion(options: MotionOptions): AnimationBuilder {
    this.motionOpts = { ...this.motionOpts, ...options };
    return this;
  }

  /**
   * Add CSS variable
   */
  variable(name: string, value: string): AnimationBuilder {
    this.cssVariables[name] = value;
    return this;
  }

  /**
   * Create a fade in animation
   */
  fadeIn(duration: keyof AnimationDurationTokens = 'normal', easing: keyof AnimationEasingTokens = 'easeOut'): AnimationBuilder {
    return this
      .useKeyframes('fadeIn')
      .duration(duration)
      .easing(easing)
      .fillMode('both');
  }

  /**
   * Create a fade out animation
   */
  fadeOut(duration: keyof AnimationDurationTokens = 'normal', easing: keyof AnimationEasingTokens = 'easeIn'): AnimationBuilder {
    return this
      .useKeyframes('fadeOut')
      .duration(duration)
      .easing(easing)
      .fillMode('both');
  }

  /**
   * Create a slide in animation
   */
  slideIn(direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: keyof AnimationDurationTokens = 'normal'): AnimationBuilder {
    const keyframeMap: Record<string, keyof AnimationKeyframeTokens> = {
      up: 'slideInUp',
      down: 'slideInDown',
      left: 'slideInLeft',
      right: 'slideInRight',
    };
    
    return this
      .useKeyframes(keyframeMap[direction])
      .duration(duration)
      .easing('easeOut')
      .fillMode('both');
  }

  /**
   * Create a slide out animation
   */
  slideOut(direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: keyof AnimationDurationTokens = 'normal'): AnimationBuilder {
    const keyframeMap: Record<string, keyof AnimationKeyframeTokens> = {
      up: 'slideOutUp',
      down: 'slideOutDown',
      left: 'slideOutLeft',
      right: 'slideOutRight',
    };
    
    return this
      .useKeyframes(keyframeMap[direction])
      .duration(duration)
      .easing('easeIn')
      .fillMode('both');
  }

  /**
   * Create a scale animation
   */
  scale(type: 'in' | 'out' = 'in', duration: keyof AnimationDurationTokens = 'normal'): AnimationBuilder {
    const keyframeName: keyof AnimationKeyframeTokens = type === 'in' ? 'scaleIn' : 'scaleOut';
    
    return this
      .useKeyframes(keyframeName)
      .duration(duration)
      .easing('easeOut')
      .fillMode('both');
  }

  /**
   * Create a bounce animation
   */
  bounce(duration: keyof AnimationDurationTokens = 'slow'): AnimationBuilder {
    return this
      .useKeyframes('bounce')
      .duration(duration)
      .easing('ease')
      .fillMode('both');
  }

  /**
   * Create a pulse animation
   */
  pulse(duration: keyof AnimationDurationTokens = 'slow'): AnimationBuilder {
    return this
      .useKeyframes('pulse')
      .duration(duration)
      .easing('easeInOut')
      .iterations('infinite');
  }

  /**
   * Create a shake animation
   */
  shake(duration: keyof AnimationDurationTokens = 'fast'): AnimationBuilder {
    return this
      .useKeyframes('shake')
      .duration(duration)
      .easing('ease')
      .fillMode('both');
  }

  /**
   * Apply reduced motion preferences
   */
  private applyReducedMotion(css: CSSInJSAnimation): CSSInJSAnimation {
    if (!this.motionOpts.respectReducedMotion) {
      return css;
    }

    // Add media query for reduced motion
    const reducedMotionCSS: CSSInJSAnimation = {
      '@media (prefers-reduced-motion: reduce)': {}
    };

    switch (this.motionOpts.reducedMotionFallback) {
      case 'disable':
        reducedMotionCSS['@media (prefers-reduced-motion: reduce)'] = {
          animation: 'none',
          transition: 'none',
        };
        break;
      case 'simplify':
        reducedMotionCSS['@media (prefers-reduced-motion: reduce)'] = {
          animationDuration: this.motionOpts.reducedMotionDuration,
          transitionDuration: this.motionOpts.reducedMotionDuration,
        };
        break;
      case 'duration':
        reducedMotionCSS['@media (prefers-reduced-motion: reduce)'] = {
          animationDuration: this.motionOpts.reducedMotionDuration,
        };
        break;
    }

    return { ...css, ...reducedMotionCSS };
  }

  /**
   * Apply performance optimizations
   */
  private applyPerformanceOptimizations(css: CSSInJSAnimation): CSSInJSAnimation {
    const optimizedCSS = { ...css };

    if (this.performanceOpts.useWillChange) {
      optimizedCSS.willChange = 'transform, opacity';
    }

    if (this.performanceOpts.useTransform3d) {
      // Add transform3d hints for GPU acceleration
      optimizedCSS.transform = optimizedCSS.transform 
        ? `${optimizedCSS.transform} translateZ(0)`
        : 'translateZ(0)';
    }

    if (this.performanceOpts.useGPUAcceleration) {
      optimizedCSS.backfaceVisibility = 'hidden';
      optimizedCSS.perspective = '1000px';
    }

    return optimizedCSS;
  }

  /**
   * Build CSS animation string
   */
  toCSSString(): string {
    const {
      name = 'animation',
      duration = this.tokens.duration.normal,
      timingFunction = this.tokens.easing.ease,
      delay = '0ms',
      iterationCount = 1,
      direction = 'normal',
      fillMode = 'none',
      playState = 'running',
    } = this.currentAnimation;

    return `${name} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode} ${playState}`;
  }

  /**
   * Build CSS-in-JS object
   */
  toCSSInJS(): CSSInJSAnimation {
    let css: CSSInJSAnimation = {};

    // Add keyframes
    if (Object.keys(this.keyframes).length > 0) {
      css['@keyframes'] = this.keyframes;
    }

    // Add animation properties
    if (this.currentAnimation.name) {
      css.animationName = this.currentAnimation.name;
    }
    if (this.currentAnimation.duration) {
      css.animationDuration = this.currentAnimation.duration;
    }
    if (this.currentAnimation.timingFunction) {
      css.animationTimingFunction = this.currentAnimation.timingFunction;
    }
    if (this.currentAnimation.delay) {
      css.animationDelay = this.currentAnimation.delay;
    }
    if (this.currentAnimation.iterationCount) {
      css.animationIterationCount = this.currentAnimation.iterationCount;
    }
    if (this.currentAnimation.direction) {
      css.animationDirection = this.currentAnimation.direction;
    }
    if (this.currentAnimation.fillMode) {
      css.animationFillMode = this.currentAnimation.fillMode;
    }
    if (this.currentAnimation.playState) {
      css.animationPlayState = this.currentAnimation.playState;
    }

    // Apply performance optimizations
    css = this.applyPerformanceOptimizations(css);

    // Apply reduced motion preferences
    css = this.applyReducedMotion(css);

    return css;
  }

  /**
   * Build animation chain
   */
  toChain(): AnimationChain {
    return {
      steps: [...this.animationChain],
      delay: this.currentAnimation.delay,
    };
  }

  /**
   * Generate CSS variables
   */
  toCSSVariables(): Record<string, string> {
    const vars: Record<string, string> = { ...this.cssVariables };

    // Add animation property variables
    if (this.currentAnimation.duration) {
      vars['--animation-duration'] = this.currentAnimation.duration;
    }
    if (this.currentAnimation.timingFunction) {
      vars['--animation-timing-function'] = this.currentAnimation.timingFunction;
    }
    if (this.currentAnimation.delay) {
      vars['--animation-delay'] = this.currentAnimation.delay;
    }

    return vars;
  }

  /**
   * Clone the animation builder
   */
  clone(): AnimationBuilder {
    const clone = new AnimationBuilder(this.tokens);
    clone.currentAnimation = { ...this.currentAnimation };
    clone.keyframes = { ...this.keyframes };
    clone.performanceOpts = { ...this.performanceOpts };
    clone.motionOpts = { ...this.motionOpts };
    clone.animationChain = [...this.animationChain];
    clone.cssVariables = { ...this.cssVariables };
    return clone;
  }

  /**
   * Reset the animation builder
   */
  reset(): AnimationBuilder {
    this.currentAnimation = {};
    this.keyframes = {};
    this.animationChain = [];
    this.cssVariables = {};
    return this;
  }
}

/**
 * Convenience function to create an AnimationBuilder
 */
export function createAnimation(tokens?: AnimationTokens): AnimationBuilder {
  return new AnimationBuilder(tokens);
}

/**
 * Quick animation builders
 */
export const quickAnimations = {
  fadeIn: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().fadeIn(duration),
  
  fadeOut: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().fadeOut(duration),
  
  slideInUp: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().slideIn('up', duration),
  
  slideInDown: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().slideIn('down', duration),
  
  slideInLeft: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().slideIn('left', duration),
  
  slideInRight: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().slideIn('right', duration),
  
  scaleIn: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().scale('in', duration),
  
  scaleOut: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().scale('out', duration),
  
  bounce: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().bounce(duration),
  
  pulse: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().pulse(duration),
  
  shake: (duration?: keyof AnimationDurationTokens) => 
    createAnimation().shake(duration),
};

export default AnimationBuilder;