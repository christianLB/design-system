/**
 * Cyberpunk Animation Tokens
 * Specialized animations for cyberpunk theme
 */

import type {
  AnimationTokens,
  AnimationDurationTokens,
  AnimationEasingTokens,
  AnimationKeyframeTokens,
  AnimationConfigTokens,
  MotionPreferences,
} from './animation';

// Extended cyberpunk interfaces
interface CyberpunkDurationTokens extends AnimationDurationTokens {
  glitch: string;
  flicker: string;
  pulse: string;
  scan: string;
  matrixRain: string;
  terminalCursor: string;
  hudUpdate: string;
}

interface CyberpunkEasingTokens extends AnimationEasingTokens {
  cyber: string;
  glitch: string;
}

interface CyberpunkKeyframeTokens extends AnimationKeyframeTokens {
  neonGlow: Record<string, any>;
  glitchEffect: Record<string, any>;
  dataStream: Record<string, any>;
  terminalCursor: Record<string, any>;
  matrixRain: Record<string, any>;
  terminalFlicker: Record<string, any>;
  scanLine: Record<string, any>;
  scanLineVertical: Record<string, any>;
  matrixChar: Record<string, any>;
  matrixPulse: Record<string, any>;
  cyberLoad: Record<string, any>;
  powerUp: Record<string, any>;
  staticNoise: Record<string, any>;
  glitchText: Record<string, any>;
  cyberFlicker: Record<string, any>;
  hudSweep: Record<string, any>;
}

interface CyberpunkConfigTokens extends AnimationConfigTokens {
  reducedMotion: {
    respectsReducedMotion: boolean;
    fallback: string;
    duration: string;
  };
}

interface CyberpunkMotionPreferences extends MotionPreferences {
  respectReducedMotion: boolean; // Legacy alias
  enableGPUAcceleration?: boolean;
  intensity?: string;
  glitchEnabled?: boolean;
  matrixEffectsEnabled?: boolean;
  scanLinesEnabled?: boolean;
}

export interface CyberpunkAnimationTokens {
  duration: CyberpunkDurationTokens;
  easing: CyberpunkEasingTokens;
  keyframes: CyberpunkKeyframeTokens;
  config: CyberpunkConfigTokens;
  motion: CyberpunkMotionPreferences;
}

export const cyberpunkAnimationTokens: CyberpunkAnimationTokens = {
  duration: {
    instant: '50ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
    slowest: '1200ms',

    // Cyberpunk-specific durations
    glitch: '150ms',
    flicker: '100ms',
    pulse: '2000ms',
    scan: '3000ms',
    matrixRain: '8000ms',
    terminalCursor: '1000ms',
    hudUpdate: '500ms',
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1.0)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    back: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    circIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
    circOut: 'cubic-bezier(0, 0.55, 0.45, 1)',
    circInOut: 'cubic-bezier(0.85, 0, 0.15, 1)',
    quartIn: 'cubic-bezier(0.5, 0, 0.75, 0)',
    quartOut: 'cubic-bezier(0.25, 1, 0.5, 1)',
    quartInOut: 'cubic-bezier(0.76, 0, 0.24, 1)',
    quintIn: 'cubic-bezier(0.64, 0, 0.78, 0)',
    quintOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    quintInOut: 'cubic-bezier(0.83, 0, 0.17, 1)',
    expoIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expoInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',

    // Cyberpunk-specific easing functions
    cyber: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    glitch: 'steps(10, end)',
  },

  keyframes: {
    // Standard animations (required by base interface)
    fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
    fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
    slideInUp: { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
    slideInDown: {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(0)' },
    },
    slideInLeft: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    slideInRight: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    slideOutUp: {
      '0%': { transform: 'translateY(0)' },
      '100%': { transform: 'translateY(-100%)' },
    },
    slideOutDown: {
      '0%': { transform: 'translateY(0)' },
      '100%': { transform: 'translateY(100%)' },
    },
    slideOutLeft: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-100%)' },
    },
    slideOutRight: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(100%)' },
    },
    scaleIn: { '0%': { transform: 'scale(0)' }, '100%': { transform: 'scale(1)' } },
    scaleOut: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(0)' } },
    rotateIn: { '0%': { transform: 'rotate(-180deg)' }, '100%': { transform: 'rotate(0deg)' } },
    rotateOut: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(180deg)' } },
    bounce: {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
      '40%, 43%': { transform: 'translateY(-10px)' },
      '70%': { transform: 'translateY(-5px)' },
      '90%': { transform: 'translateY(-2px)' },
    },
    pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
    shake: {
      '0%, 100%': { transform: 'translateX(0)' },
      '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
      '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
    },
    wobble: {
      '0%, 100%': { transform: 'translateX(0)' },
      '15%': { transform: 'translateX(-5px) rotate(-5deg)' },
      '30%': { transform: 'translateX(3px) rotate(3deg)' },
      '45%': { transform: 'translateX(-2px) rotate(-2deg)' },
      '60%': { transform: 'translateX(1px) rotate(1deg)' },
      '75%': { transform: 'translateX(-1px) rotate(-1deg)' },
    },
    flip: {
      '0%': { transform: 'perspective(400px) rotateY(0)' },
      '40%': { transform: 'perspective(400px) translateZ(150px) rotateY(-190deg)' },
      '50%': { transform: 'perspective(400px) translateZ(150px) rotateY(-190deg)' },
      '80%': { transform: 'perspective(400px) scale(0.95)' },
      '100%': { transform: 'perspective(400px)' },
    },
    heartbeat: {
      '0%, 50%, 100%': { transform: 'scale(1)' },
      '5%, 45%': { transform: 'scale(1.1)' },
    },
    glow: {
      '0%, 100%': { boxShadow: '0 0 5px currentColor' },
      '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },

    // Cyberpunk-specific animations
    neonGlow: {
      '0%, 100%': {
        filter: 'brightness(1) drop-shadow(0 0 5px currentColor)',
        transform: 'scale(1)',
      },
      '50%': {
        filter: 'brightness(1.2) drop-shadow(0 0 20px currentColor)',
        transform: 'scale(1.02)',
      },
    },

    matrixPulse: {
      '0%, 100%': {
        boxShadow: '0 0 5px rgba(57, 255, 20, 0.5)',
        opacity: '1',
      },
      '50%': {
        boxShadow: '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4)',
        opacity: '0.9',
      },
    },

    // Glitch effects
    glitchEffect: {
      '0%, 90%, 100%': { transform: 'translate(0)' },
      '10%': { transform: 'translate(-2px, 1px)' },
      '20%': { transform: 'translate(2px, -1px)' },
      '30%': { transform: 'translate(-1px, 2px)' },
      '40%': { transform: 'translate(1px, -2px)' },
      '50%': { transform: 'translate(-2px, 1px)' },
      '60%': { transform: 'translate(2px, -1px)' },
      '70%': { transform: 'translate(-1px, 2px)' },
    },

    glitchText: {
      '0%': {
        clipPath: 'inset(0 0 0 0)',
        transform: 'translateX(0)',
      },
      '10%': {
        clipPath: 'inset(0 0 90% 0)',
        transform: 'translateX(-2px)',
      },
      '20%': {
        clipPath: 'inset(80% 0 0 0)',
        transform: 'translateX(2px)',
      },
      '30%': {
        clipPath: 'inset(60% 0 30% 0)',
        transform: 'translateX(-1px)',
      },
      '40%': {
        clipPath: 'inset(20% 0 70% 0)',
        transform: 'translateX(1px)',
      },
      '50%': {
        clipPath: 'inset(0 0 0 0)',
        transform: 'translateX(0)',
      },
      '100%': {
        clipPath: 'inset(0 0 0 0)',
        transform: 'translateX(0)',
      },
    },

    // Flicker effects
    cyberFlicker: {
      '0%, 100%': { opacity: '1' },
      '2%': { opacity: '0.8' },
      '4%': { opacity: '1' },
      '8%': { opacity: '0.9' },
      '10%': { opacity: '1' },
      '90%': { opacity: '0.95' },
      '92%': { opacity: '1' },
    },

    terminalFlicker: {
      '0%, 95%, 100%': { opacity: '1' },
      '96%': { opacity: '0.2' },
      '97%': { opacity: '1' },
      '98%': { opacity: '0.8' },
      '99%': { opacity: '1' },
    },

    // Scan line effects
    scanLine: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },

    scanLineVertical: {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(100%)' },
    },

    // Matrix rain
    matrixRain: {
      '0%': {
        transform: 'translateY(-100vh)',
        opacity: '0',
      },
      '10%': { opacity: '1' },
      '90%': { opacity: '1' },
      '100%': {
        transform: 'translateY(100vh)',
        opacity: '0',
      },
    },

    matrixChar: {
      '0%': { opacity: '0' },
      '50%': { opacity: '1' },
      '100%': { opacity: '0' },
    },

    // Terminal cursor
    terminalCursor: {
      '0%, 50%': { opacity: '1' },
      '51%, 100%': { opacity: '0' },
    },

    // Data stream
    dataStream: {
      '0%': {
        transform: 'scaleX(0)',
        transformOrigin: 'left',
      },
      '100%': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      },
    },

    // HUD effects
    hudSweep: {
      '0%': {
        transform: 'rotate(0deg)',
        opacity: '0.3',
      },
      '50%': {
        opacity: '1',
      },
      '100%': {
        transform: 'rotate(360deg)',
        opacity: '0.3',
      },
    },

    // Loading effects
    cyberLoad: {
      '0%': {
        transform: 'translateX(-100%)',
        boxShadow: '0 0 0 rgba(57, 255, 20, 0)',
      },
      '50%': {
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)',
      },
      '100%': {
        transform: 'translateX(100%)',
        boxShadow: '0 0 0 rgba(57, 255, 20, 0)',
      },
    },

    // Power-up effects
    powerUp: {
      '0%': {
        transform: 'scale(1)',
        filter: 'brightness(1)',
      },
      '20%': {
        transform: 'scale(1.05)',
        filter: 'brightness(1.2)',
      },
      '40%': {
        transform: 'scale(1.02)',
        filter: 'brightness(1.1)',
      },
      '60%': {
        transform: 'scale(1.03)',
        filter: 'brightness(1.15)',
      },
      '80%': {
        transform: 'scale(1.01)',
        filter: 'brightness(1.05)',
      },
      '100%': {
        transform: 'scale(1)',
        filter: 'brightness(1)',
      },
    },

    // Static interference
    staticNoise: {
      '0%': {
        backgroundPosition: '0% 0%',
      },
      '10%': {
        backgroundPosition: '5% 10%',
      },
      '20%': {
        backgroundPosition: '10% 5%',
      },
      '30%': {
        backgroundPosition: '15% 15%',
      },
      '40%': {
        backgroundPosition: '20% 8%',
      },
      '50%': {
        backgroundPosition: '25% 25%',
      },
      '60%': {
        backgroundPosition: '30% 12%',
      },
      '70%': {
        backgroundPosition: '35% 35%',
      },
      '80%': {
        backgroundPosition: '40% 18%',
      },
      '90%': {
        backgroundPosition: '45% 45%',
      },
      '100%': {
        backgroundPosition: '50% 22%',
      },
    },
  },

  config: {
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
    // Cyberpunk-specific config
    reducedMotion: {
      respectsReducedMotion: true,
      fallback: 'ease-out',
      duration: '200ms',
    },
  },

  motion: {
    respectsReducedMotion: true,
    reducedMotionDuration: '0.01ms',
    reducedMotionEasing: 'linear',
    fallbackDuration: '150ms',

    // Legacy alias and cyberpunk-specific preferences
    respectReducedMotion: true,
    enableGPUAcceleration: true,
    intensity: 'normal', // 'subtle' | 'normal' | 'intense'
    glitchEnabled: true,
    matrixEffectsEnabled: true,
    scanLinesEnabled: true,
  },
};

// Animation presets for common cyberpunk effects
export const cyberpunkAnimationPresets = {
  // Button animations
  buttonGlow: {
    duration: cyberpunkAnimationTokens.duration.normal,
    easing: cyberpunkAnimationTokens.easing.cyber,
    keyframes: cyberpunkAnimationTokens.keyframes.neonGlow,
  },

  buttonGlitch: {
    duration: cyberpunkAnimationTokens.duration.glitch,
    easing: cyberpunkAnimationTokens.easing.glitch,
    keyframes: cyberpunkAnimationTokens.keyframes.glitchEffect,
  },

  // Terminal animations
  terminalType: {
    duration: cyberpunkAnimationTokens.duration.fast,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.dataStream,
  },

  terminalCursor: {
    duration: cyberpunkAnimationTokens.duration.terminalCursor,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.terminalCursor,
    iterationCount: 'infinite',
  },

  // Matrix effects
  matrixRain: {
    duration: cyberpunkAnimationTokens.duration.matrixRain,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.matrixRain,
    iterationCount: 'infinite',
  },

  // Scan line effects
  scanLine: {
    duration: cyberpunkAnimationTokens.duration.scan,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.scanLine,
    iterationCount: 'infinite',
  },
};

export default cyberpunkAnimationTokens;
