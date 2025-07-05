/**
 * Animation Token Definitions
 * Comprehensive animation system with durations, easings, and keyframes
 */

// Import cyberpunk animation tokens
export * from './cyberpunk-animations';

/**
 * Animation duration tokens
 */
export interface AnimationDurationTokens {
  instant: string;
  fast: string;
  normal: string;
  slow: string;
  slower: string;
  slowest: string;
}

/**
 * Animation easing tokens
 */
export interface AnimationEasingTokens {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  sharp: string;
  bounce: string;
  elastic: string;
  back: string;
  circIn: string;
  circOut: string;
  circInOut: string;
  quartIn: string;
  quartOut: string;
  quartInOut: string;
  quintIn: string;
  quintOut: string;
  quintInOut: string;
  expoIn: string;
  expoOut: string;
  expoInOut: string;
}

/**
 * Animation keyframe definitions
 */
export interface AnimationKeyframeTokens {
  fadeIn: Record<string, any>;
  fadeOut: Record<string, any>;
  slideInUp: Record<string, any>;
  slideInDown: Record<string, any>;
  slideInLeft: Record<string, any>;
  slideInRight: Record<string, any>;
  slideOutUp: Record<string, any>;
  slideOutDown: Record<string, any>;
  slideOutLeft: Record<string, any>;
  slideOutRight: Record<string, any>;
  scaleIn: Record<string, any>;
  scaleOut: Record<string, any>;
  rotateIn: Record<string, any>;
  rotateOut: Record<string, any>;
  bounce: Record<string, any>;
  pulse: Record<string, any>;
  shake: Record<string, any>;
  wobble: Record<string, any>;
  flip: Record<string, any>;
  heartbeat: Record<string, any>;
  glow: Record<string, any>;
  float: Record<string, any>;
}

/**
 * Animation configuration tokens
 */
export interface AnimationConfigTokens {
  delays: {
    none: string;
    short: string;
    medium: string;
    long: string;
  };
  iterations: {
    once: number;
    twice: number;
    infinite: number;
  };
  fillModes: {
    none: string;
    forwards: string;
    backwards: string;
    both: string;
  };
  directions: {
    normal: string;
    reverse: string;
    alternate: string;
    alternateReverse: string;
  };
  playStates: {
    running: string;
    paused: string;
  };
}

/**
 * Motion reduction preferences
 */
export interface MotionPreferences {
  respectsReducedMotion: boolean;
  reducedMotionDuration: string;
  reducedMotionEasing: string;
  fallbackDuration: string;
}

/**
 * Complete animation token interface
 */
export interface AnimationTokens {
  duration: AnimationDurationTokens;
  easing: AnimationEasingTokens;
  keyframes: AnimationKeyframeTokens;
  config: AnimationConfigTokens;
  motion: MotionPreferences;
}

/**
 * Default animation duration tokens
 */
export const animationDurationTokens: AnimationDurationTokens = {
  instant: '0ms',
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
  slowest: '1000ms',
};

/**
 * Default animation easing tokens
 */
export const animationEasingTokens: AnimationEasingTokens = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1.0)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  circIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  circOut: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  circInOut: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  quartIn: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  quartOut: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  quartInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  quintIn: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  quintOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
  quintInOut: 'cubic-bezier(0.86, 0, 0.07, 1)',
  expoIn: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  expoOut: 'cubic-bezier(0.19, 1, 0.22, 1)',
  expoInOut: 'cubic-bezier(1, 0, 0, 1)',
};

/**
 * Default animation keyframe tokens
 */
export const animationKeyframeTokens: AnimationKeyframeTokens = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  slideInUp: {
    '0%': { 
      transform: 'translateY(100%)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'translateY(0)', 
      opacity: '1' 
    },
  },
  slideInDown: {
    '0%': { 
      transform: 'translateY(-100%)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'translateY(0)', 
      opacity: '1' 
    },
  },
  slideInLeft: {
    '0%': { 
      transform: 'translateX(-100%)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'translateX(0)', 
      opacity: '1' 
    },
  },
  slideInRight: {
    '0%': { 
      transform: 'translateX(100%)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'translateX(0)', 
      opacity: '1' 
    },
  },
  slideOutUp: {
    '0%': { 
      transform: 'translateY(0)', 
      opacity: '1' 
    },
    '100%': { 
      transform: 'translateY(-100%)', 
      opacity: '0' 
    },
  },
  slideOutDown: {
    '0%': { 
      transform: 'translateY(0)', 
      opacity: '1' 
    },
    '100%': { 
      transform: 'translateY(100%)', 
      opacity: '0' 
    },
  },
  slideOutLeft: {
    '0%': { 
      transform: 'translateX(0)', 
      opacity: '1' 
    },
    '100%': { 
      transform: 'translateX(-100%)', 
      opacity: '0' 
    },
  },
  slideOutRight: {
    '0%': { 
      transform: 'translateX(0)', 
      opacity: '1' 
    },
    '100%': { 
      transform: 'translateX(100%)', 
      opacity: '0' 
    },
  },
  scaleIn: {
    '0%': { 
      transform: 'scale(0)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'scale(1)', 
      opacity: '1' 
    },
  },
  scaleOut: {
    '0%': { 
      transform: 'scale(1)', 
      opacity: '1' 
    },
    '100%': { 
      transform: 'scale(0)', 
      opacity: '0' 
    },
  },
  rotateIn: {
    '0%': { 
      transform: 'rotate(-200deg) scale(0)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'rotate(0) scale(1)', 
      opacity: '1' 
    },
  },
  rotateOut: {
    '0%': { 
      transform: 'rotate(0) scale(1)', 
      opacity: '1' 
    },
    '100%': { 
      transform: 'rotate(200deg) scale(0)', 
      opacity: '0' 
    },
  },
  bounce: {
    '0%, 20%, 53%, 80%, 100%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '40%, 43%': {
      transform: 'translate3d(0, -30px, 0)',
    },
    '70%': {
      transform: 'translate3d(0, -15px, 0)',
    },
    '90%': {
      transform: 'translate3d(0, -4px, 0)',
    },
  },
  pulse: {
    '0%': { 
      transform: 'scale(1)', 
      opacity: '1' 
    },
    '50%': { 
      transform: 'scale(1.05)', 
      opacity: '0.7' 
    },
    '100%': { 
      transform: 'scale(1)', 
      opacity: '1' 
    },
  },
  shake: {
    '0%, 100%': {
      transform: 'translateX(0)',
    },
    '10%, 30%, 50%, 70%, 90%': {
      transform: 'translateX(-10px)',
    },
    '20%, 40%, 60%, 80%': {
      transform: 'translateX(10px)',
    },
  },
  wobble: {
    '0%': {
      transform: 'translateX(0%)',
    },
    '15%': {
      transform: 'translateX(-25%) rotate(-5deg)',
    },
    '30%': {
      transform: 'translateX(20%) rotate(3deg)',
    },
    '45%': {
      transform: 'translateX(-15%) rotate(-3deg)',
    },
    '60%': {
      transform: 'translateX(10%) rotate(2deg)',
    },
    '75%': {
      transform: 'translateX(-5%) rotate(-1deg)',
    },
    '100%': {
      transform: 'translateX(0%)',
    },
  },
  flip: {
    '0%': {
      transform: 'perspective(400px) rotateY(0)',
    },
    '40%': {
      transform: 'perspective(400px) translateZ(150px) rotateY(170deg)',
    },
    '50%': {
      transform: 'perspective(400px) translateZ(150px) rotateY(190deg) scale(1)',
    },
    '80%': {
      transform: 'perspective(400px) rotateY(360deg) scale(0.95)',
    },
    '100%': {
      transform: 'perspective(400px) scale(1)',
    },
  },
  heartbeat: {
    '0%': {
      transform: 'scale(1)',
    },
    '14%': {
      transform: 'scale(1.3)',
    },
    '28%': {
      transform: 'scale(1)',
    },
    '42%': {
      transform: 'scale(1.3)',
    },
    '70%': {
      transform: 'scale(1)',
    },
  },
  glow: {
    '0%': {
      boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
    },
    '50%': {
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
    },
    '100%': {
      boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
    },
  },
  float: {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
};

/**
 * Default animation configuration tokens
 */
export const animationConfigTokens: AnimationConfigTokens = {
  delays: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
    long: '300ms',
  },
  iterations: {
    once: 1,
    twice: 2,
    infinite: Infinity,
  },
  fillModes: {
    none: 'none',
    forwards: 'forwards',
    backwards: 'backwards',
    both: 'both',
  },
  directions: {
    normal: 'normal',
    reverse: 'reverse',
    alternate: 'alternate',
    alternateReverse: 'alternate-reverse',
  },
  playStates: {
    running: 'running',
    paused: 'paused',
  },
};

/**
 * Motion preferences configuration
 */
export const motionPreferences: MotionPreferences = {
  respectsReducedMotion: true,
  reducedMotionDuration: '0.01ms',
  reducedMotionEasing: 'linear',
  fallbackDuration: '150ms',
};

/**
 * Complete animation tokens
 */
export const animationTokens: AnimationTokens = {
  duration: animationDurationTokens,
  easing: animationEasingTokens,
  keyframes: animationKeyframeTokens,
  config: animationConfigTokens,
  motion: motionPreferences,
};

/**
 * Type exports
 */
export type AnimationTokenType = typeof animationTokens;