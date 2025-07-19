/**
 * Alien Animation Tokens
 * Specialized animations for alien biomechanical theme
 */

import type { AnimationTokens, AnimationDurationTokens, AnimationEasingTokens, AnimationKeyframeTokens, AnimationConfigTokens, MotionPreferences } from './animation';

// Extended alien interfaces
interface AlienDurationTokens extends AnimationDurationTokens {
  breathe: string;
  pulse: string;
  circulation: string;
  neural: string;
  growth: string;
  synaptic: string;
  membrane: string;
  organicFlow: string;
  biomechanical: string;
}

interface AlienEasingTokens extends AnimationEasingTokens {
  organic: string;
  biomechanical: string;
  neural: string;
  circulation: string;
}

interface AlienKeyframeTokens extends AnimationKeyframeTokens {
  // Atmospheric effects
  atmosphericBreathe: Record<string, any>;
  organicPulse: Record<string, any>;
  vitalMist: Record<string, any>;
  atmosphericFlow: Record<string, any>;
  
  // Neural effects
  synapticFire: Record<string, any>;
  neuralPathway: Record<string, any>;
  brainwave: Record<string, any>;
  neuralNetwork: Record<string, any>;
  
  // Biomechanical effects
  organicGrowth: Record<string, any>;
  cellularDivision: Record<string, any>;
  tissueExpansion: Record<string, any>;
  biomechanicalMove: Record<string, any>;
  
  // Vital effects
  heartbeat: Record<string, any>;
  circulationFlow: Record<string, any>;
  bloodPulse: Record<string, any>;
  vitalGlow: Record<string, any>;
  lifeForce: Record<string, any>;
}

interface AlienConfigTokens extends AnimationConfigTokens {
  reducedMotion: {
    respectsReducedMotion: boolean;
    fallback: string;
    duration: string;
  };
}

interface AlienMotionPreferences extends MotionPreferences {
  respectReducedMotion: boolean; // Legacy alias
  enableGPUAcceleration?: boolean;
  intensity?: string;
  atmosphericEnabled?: boolean;
  neuralEnabled?: boolean;
  biomechanicalEnabled?: boolean;
  vitalEnabled?: boolean;
}

export interface AlienAnimationTokens {
  duration: AlienDurationTokens;
  easing: AlienEasingTokens;
  keyframes: AlienKeyframeTokens;
  config: AlienConfigTokens;
  motion: AlienMotionPreferences;
}

export const alienAnimationTokens: AlienAnimationTokens = {
  duration: {
    instant: '50ms',
    fast: '150ms', 
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
    slowest: '1200ms',
    
    // Alien-specific durations
    breathe: '4000ms',
    pulse: '3000ms',
    circulation: '8000ms',
    neural: '2000ms',
    growth: '6000ms',
    synaptic: '500ms',
    membrane: '1500ms',
    organicFlow: '10000ms',
    biomechanical: '4500ms',
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
    
    // Alien-specific easing functions
    organic: 'cubic-bezier(0.23, 1, 0.32, 1)',
    biomechanical: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    neural: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    circulation: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
  
  keyframes: {
    // Standard animations (required by base interface)
    fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
    fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
    slideInUp: { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
    slideInDown: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(0)' } },
    slideInLeft: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
    slideInRight: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
    slideOutUp: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-100%)' } },
    slideOutDown: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(100%)' } },
    slideOutLeft: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-100%)' } },
    slideOutRight: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(100%)' } },
    scaleIn: { '0%': { transform: 'scale(0)' }, '100%': { transform: 'scale(1)' } },
    scaleOut: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(0)' } },
    rotateIn: { '0%': { transform: 'rotate(-180deg)' }, '100%': { transform: 'rotate(0deg)' } },
    rotateOut: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(180deg)' } },
    bounce: { '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' }, '40%, 43%': { transform: 'translateY(-10px)' }, '70%': { transform: 'translateY(-5px)' }, '90%': { transform: 'translateY(-2px)' } },
    pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
    shake: { '0%, 100%': { transform: 'translateX(0)' }, '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' }, '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' } },
    wobble: { '0%, 100%': { transform: 'translateX(0)' }, '15%': { transform: 'translateX(-5px) rotate(-5deg)' }, '30%': { transform: 'translateX(3px) rotate(3deg)' }, '45%': { transform: 'translateX(-2px) rotate(-2deg)' }, '60%': { transform: 'translateX(1px) rotate(1deg)' }, '75%': { transform: 'translateX(-1px) rotate(-1deg)' } },
    flip: { '0%': { transform: 'perspective(400px) rotateY(0)' }, '40%': { transform: 'perspective(400px) translateZ(150px) rotateY(-190deg)' }, '50%': { transform: 'perspective(400px) translateZ(150px) rotateY(-190deg)' }, '80%': { transform: 'perspective(400px) scale(0.95)' }, '100%': { transform: 'perspective(400px)' } },
    heartbeat: { '0%, 50%, 100%': { transform: 'scale(1)' }, '5%, 45%': { transform: 'scale(1.1)' } },
    glow: { '0%, 100%': { boxShadow: '0 0 5px currentColor' }, '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' } },
    float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },

    // Atmospheric effects
    atmosphericBreathe: {
      '0%, 100%': { 
        transform: 'scale(1)',
        opacity: '0.6',
        filter: 'blur(2px)'
      },
      '50%': { 
        transform: 'scale(1.05)',
        opacity: '0.8',
        filter: 'blur(1px)'
      }
    },
    
    organicPulse: {
      '0%, 100%': { 
        boxShadow: '0 0 10px rgba(229, 110, 71, 0.3)',
        transform: 'scale(1)'
      },
      '50%': { 
        boxShadow: '0 0 25px rgba(229, 110, 71, 0.6), 0 0 40px rgba(229, 110, 71, 0.3)',
        transform: 'scale(1.03)'
      }
    },
    
    vitalMist: {
      '0%': { 
        transform: 'translateX(-100%) scaleY(0.8)',
        opacity: '0'
      },
      '20%': { 
        opacity: '0.4'
      },
      '80%': { 
        opacity: '0.4'
      },
      '100%': { 
        transform: 'translateX(100%) scaleY(1.2)',
        opacity: '0'
      }
    },
    
    atmosphericFlow: {
      '0%': { 
        backgroundPosition: '0% 50%'
      },
      '50%': { 
        backgroundPosition: '100% 50%'
      },
      '100%': { 
        backgroundPosition: '0% 50%'
      }
    },
    
    // Neural effects
    synapticFire: {
      '0%': { 
        opacity: '0.3',
        transform: 'scale(0.8)'
      },
      '10%': { 
        opacity: '1',
        transform: 'scale(1.2)'
      },
      '20%': { 
        opacity: '0.6',
        transform: 'scale(1)'
      },
      '100%': { 
        opacity: '0.3',
        transform: 'scale(0.8)'
      }
    },
    
    neuralPathway: {
      '0%': { 
        strokeDashoffset: '1000',
        opacity: '0'
      },
      '20%': { 
        opacity: '1'
      },
      '80%': { 
        opacity: '1'
      },
      '100%': { 
        strokeDashoffset: '0',
        opacity: '0.3'
      }
    },
    
    brainwave: {
      '0%': { 
        transform: 'scaleX(0.5) scaleY(1)',
        opacity: '0.5'
      },
      '25%': { 
        transform: 'scaleX(1) scaleY(0.8)',
        opacity: '1'
      },
      '50%': { 
        transform: 'scaleX(1.2) scaleY(1.2)',
        opacity: '0.8'
      },
      '75%': { 
        transform: 'scaleX(0.8) scaleY(1)',
        opacity: '1'
      },
      '100%': { 
        transform: 'scaleX(0.5) scaleY(1)',
        opacity: '0.5'
      }
    },
    
    neuralNetwork: {
      '0%': { 
        backgroundPosition: '0% 0%',
        opacity: '0.3'
      },
      '33%': { 
        backgroundPosition: '50% 50%',
        opacity: '0.7'
      },
      '66%': { 
        backgroundPosition: '100% 100%',
        opacity: '0.5'
      },
      '100%': { 
        backgroundPosition: '0% 0%',
        opacity: '0.3'
      }
    },
    
    // Biomechanical effects
    organicGrowth: {
      '0%': { 
        transform: 'scale(0.8) rotate(-2deg)',
        opacity: '0.7'
      },
      '25%': { 
        transform: 'scale(1.05) rotate(1deg)',
        opacity: '0.9'
      },
      '50%': { 
        transform: 'scale(1.1) rotate(-1deg)',
        opacity: '1'
      },
      '75%': { 
        transform: 'scale(0.95) rotate(0.5deg)',
        opacity: '0.9'
      },
      '100%': { 
        transform: 'scale(1) rotate(0deg)',
        opacity: '0.8'
      }
    },
    
    cellularDivision: {
      '0%': { 
        transform: 'scale(1)',
        borderRadius: '50%'
      },
      '30%': { 
        transform: 'scale(1.3)',
        borderRadius: '40%'
      },
      '60%': { 
        transform: 'scale(1.1) scaleX(0.8)',
        borderRadius: '30% 70%'
      },
      '80%': { 
        transform: 'scale(1.2) scaleX(0.6)',
        borderRadius: '20% 80%'
      },
      '100%': { 
        transform: 'scale(1) scaleX(0.5)',
        borderRadius: '10% 90%'
      }
    },
    
    tissueExpansion: {
      '0%': { 
        clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)',
        filter: 'blur(3px)'
      },
      '50%': { 
        clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
        filter: 'blur(1px)'
      },
      '100%': { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(0px)'
      }
    },
    
    biomechanicalMove: {
      '0%': { 
        transform: 'translateY(0) rotateZ(0deg)',
        borderRadius: '20% 80% 40% 60%'
      },
      '25%': { 
        transform: 'translateY(-5px) rotateZ(2deg)',
        borderRadius: '40% 60% 20% 80%'
      },
      '50%': { 
        transform: 'translateY(-2px) rotateZ(-1deg)',
        borderRadius: '60% 40% 80% 20%'
      },
      '75%': { 
        transform: 'translateY(-3px) rotateZ(1deg)',
        borderRadius: '80% 20% 60% 40%'
      },
      '100%': { 
        transform: 'translateY(0) rotateZ(0deg)',
        borderRadius: '20% 80% 40% 60%'
      }
    },
    
    // Vital effects
    circulationFlow: {
      '0%': { 
        transform: 'translateX(-100%) scaleY(1)',
        opacity: '0'
      },
      '10%': { 
        opacity: '0.6'
      },
      '50%': { 
        transform: 'translateX(0) scaleY(1.2)',
        opacity: '1'
      },
      '90%': { 
        opacity: '0.6'
      },
      '100%': { 
        transform: 'translateX(100%) scaleY(1)',
        opacity: '0'
      }
    },
    
    bloodPulse: {
      '0%, 100%': { 
        backgroundColor: 'rgba(229, 110, 71, 0.3)',
        transform: 'scale(1)'
      },
      '15%': { 
        backgroundColor: 'rgba(229, 110, 71, 0.7)',
        transform: 'scale(1.1)'
      },
      '30%': { 
        backgroundColor: 'rgba(229, 110, 71, 0.5)',
        transform: 'scale(0.95)'
      },
      '45%': { 
        backgroundColor: 'rgba(229, 110, 71, 0.8)',
        transform: 'scale(1.05)'
      },
      '60%': { 
        backgroundColor: 'rgba(229, 110, 71, 0.4)',
        transform: 'scale(1)'
      }
    },
    
    vitalGlow: {
      '0%, 100%': { 
        boxShadow: '0 0 5px rgba(229, 110, 71, 0.3), inset 0 0 10px rgba(229, 110, 71, 0.1)',
        filter: 'brightness(1)'
      },
      '50%': { 
        boxShadow: '0 0 20px rgba(229, 110, 71, 0.6), 0 0 40px rgba(229, 110, 71, 0.3), inset 0 0 20px rgba(229, 110, 71, 0.2)',
        filter: 'brightness(1.2)'
      }
    },
    
    lifeForce: {
      '0%': { 
        transform: 'scale(0.8) rotate(0deg)',
        opacity: '0.6',
        filter: 'hue-rotate(0deg)'
      },
      '25%': { 
        transform: 'scale(1.1) rotate(90deg)',
        opacity: '0.9',
        filter: 'hue-rotate(30deg)'
      },
      '50%': { 
        transform: 'scale(1.3) rotate(180deg)',
        opacity: '1',
        filter: 'hue-rotate(60deg)'
      },
      '75%': { 
        transform: 'scale(1.1) rotate(270deg)',
        opacity: '0.9',
        filter: 'hue-rotate(30deg)'
      },
      '100%': { 
        transform: 'scale(0.8) rotate(360deg)',
        opacity: '0.6',
        filter: 'hue-rotate(0deg)'
      }
    }
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
    // Alien-specific config
    reducedMotion: {
      respectsReducedMotion: true,
      fallback: 'ease-out',
      duration: '200ms',
    }
  },
  
  motion: {
    respectsReducedMotion: true,
    reducedMotionDuration: '0.01ms',
    reducedMotionEasing: 'linear',
    fallbackDuration: '150ms',
    
    // Legacy alias and alien-specific preferences
    respectReducedMotion: true,
    enableGPUAcceleration: true,
    intensity: 'normal', // 'subtle' | 'normal' | 'intense'
    atmosphericEnabled: true,
    neuralEnabled: true,
    biomechanicalEnabled: true,
    vitalEnabled: true,
  }
};

// Animation presets for common alien effects
export const alienAnimationPresets = {
  // Atmospheric presets
  breathingEffect: {
    duration: alienAnimationTokens.duration.breathe,
    easing: alienAnimationTokens.easing.organic,
    keyframes: alienAnimationTokens.keyframes.atmosphericBreathe,
    iterationCount: 'infinite'
  },
  
  organicPulse: {
    duration: alienAnimationTokens.duration.pulse,
    easing: alienAnimationTokens.easing.organic,
    keyframes: alienAnimationTokens.keyframes.organicPulse,
    iterationCount: 'infinite'
  },
  
  // Neural presets
  synapticFire: {
    duration: alienAnimationTokens.duration.synaptic,
    easing: alienAnimationTokens.easing.neural,
    keyframes: alienAnimationTokens.keyframes.synapticFire
  },
  
  neuralActivity: {
    duration: alienAnimationTokens.duration.neural,
    easing: alienAnimationTokens.easing.neural,
    keyframes: alienAnimationTokens.keyframes.brainwave,
    iterationCount: 'infinite'
  },
  
  // Biomechanical presets
  organicGrowth: {
    duration: alienAnimationTokens.duration.growth,
    easing: alienAnimationTokens.easing.biomechanical,
    keyframes: alienAnimationTokens.keyframes.organicGrowth
  },
  
  cellularDivision: {
    duration: alienAnimationTokens.duration.biomechanical,
    easing: alienAnimationTokens.easing.biomechanical,
    keyframes: alienAnimationTokens.keyframes.cellularDivision
  },
  
  // Vital presets
  circulation: {
    duration: alienAnimationTokens.duration.circulation,
    easing: alienAnimationTokens.easing.circulation,
    keyframes: alienAnimationTokens.keyframes.circulationFlow,
    iterationCount: 'infinite'
  },
  
  vitalGlow: {
    duration: alienAnimationTokens.duration.pulse,
    easing: alienAnimationTokens.easing.organic,
    keyframes: alienAnimationTokens.keyframes.vitalGlow,
    iterationCount: 'infinite'
  }
};

export default alienAnimationTokens;