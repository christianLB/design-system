/**
 * Cyberpunk Animation Tokens
 * Specialized animations for cyberpunk theme
 */

import type { AnimationTokens } from './animation';

export const cyberpunkAnimationTokens: AnimationTokens = {
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
    inOut: 'ease-in-out',
    out: 'ease-out',
    in: 'ease-in',
    
    // Cyberpunk-specific easing functions
    cyber: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    glitch: 'steps(10, end)',
    pulse: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    anticipation: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    overshoot: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  
  keyframes: {
    // Matrix-style effects
    neonGlow: {
      '0%, 100%': { 
        filter: 'brightness(1) drop-shadow(0 0 5px currentColor)',
        transform: 'scale(1)'
      },
      '50%': { 
        filter: 'brightness(1.2) drop-shadow(0 0 20px currentColor)',
        transform: 'scale(1.02)'
      }
    },
    
    matrixPulse: {
      '0%, 100%': { 
        boxShadow: '0 0 5px rgba(57, 255, 20, 0.5)',
        opacity: '1'
      },
      '50%': { 
        boxShadow: '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4)',
        opacity: '0.9'
      }
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
      '70%': { transform: 'translate(-1px, 2px)' }
    },
    
    glitchText: {
      '0%': { 
        clipPath: 'inset(0 0 0 0)',
        transform: 'translateX(0)'
      },
      '10%': { 
        clipPath: 'inset(0 0 90% 0)',
        transform: 'translateX(-2px)'
      },
      '20%': { 
        clipPath: 'inset(80% 0 0 0)',
        transform: 'translateX(2px)'
      },
      '30%': { 
        clipPath: 'inset(60% 0 30% 0)',
        transform: 'translateX(-1px)'
      },
      '40%': { 
        clipPath: 'inset(20% 0 70% 0)',
        transform: 'translateX(1px)'
      },
      '50%': { 
        clipPath: 'inset(0 0 0 0)',
        transform: 'translateX(0)'
      },
      '100%': { 
        clipPath: 'inset(0 0 0 0)',
        transform: 'translateX(0)'
      }
    },
    
    // Flicker effects
    cyberFlicker: {
      '0%, 100%': { opacity: '1' },
      '2%': { opacity: '0.8' },
      '4%': { opacity: '1' },
      '8%': { opacity: '0.9' },
      '10%': { opacity: '1' },
      '90%': { opacity: '0.95' },
      '92%': { opacity: '1' }
    },
    
    terminalFlicker: {
      '0%, 95%, 100%': { opacity: '1' },
      '96%': { opacity: '0.2' },
      '97%': { opacity: '1' },
      '98%': { opacity: '0.8' },
      '99%': { opacity: '1' }
    },
    
    // Scan line effects
    scanLine: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' }
    },
    
    scanLineVertical: {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(100%)' }
    },
    
    // Matrix rain
    matrixRain: {
      '0%': { 
        transform: 'translateY(-100vh)', 
        opacity: '0' 
      },
      '10%': { opacity: '1' },
      '90%': { opacity: '1' },
      '100%': { 
        transform: 'translateY(100vh)', 
        opacity: '0' 
      }
    },
    
    matrixChar: {
      '0%': { opacity: '0' },
      '50%': { opacity: '1' },
      '100%': { opacity: '0' }
    },
    
    // Terminal cursor
    terminalCursor: {
      '0%, 50%': { opacity: '1' },
      '51%, 100%': { opacity: '0' }
    },
    
    // Data stream
    dataStream: {
      '0%': { 
        transform: 'scaleX(0)',
        transformOrigin: 'left'
      },
      '100%': { 
        transform: 'scaleX(1)',
        transformOrigin: 'left'
      }
    },
    
    // HUD effects
    hudSweep: {
      '0%': { 
        transform: 'rotate(0deg)',
        opacity: '0.3'
      },
      '50%': { 
        opacity: '1'
      },
      '100%': { 
        transform: 'rotate(360deg)',
        opacity: '0.3'
      }
    },
    
    // Loading effects
    cyberLoad: {
      '0%': { 
        transform: 'translateX(-100%)',
        boxShadow: '0 0 0 rgba(57, 255, 20, 0)'
      },
      '50%': { 
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)'
      },
      '100%': { 
        transform: 'translateX(100%)',
        boxShadow: '0 0 0 rgba(57, 255, 20, 0)'
      }
    },
    
    // Power-up effects
    powerUp: {
      '0%': { 
        transform: 'scale(1)',
        filter: 'brightness(1)'
      },
      '20%': { 
        transform: 'scale(1.05)',
        filter: 'brightness(1.2)'
      },
      '40%': { 
        transform: 'scale(1.02)',
        filter: 'brightness(1.1)'
      },
      '60%': { 
        transform: 'scale(1.03)',
        filter: 'brightness(1.15)'
      },
      '80%': { 
        transform: 'scale(1.01)',
        filter: 'brightness(1.05)'
      },
      '100%': { 
        transform: 'scale(1)',
        filter: 'brightness(1)'
      }
    },
    
    // Static interference
    staticNoise: {
      '0%': { 
        backgroundPosition: '0% 0%'
      },
      '10%': { 
        backgroundPosition: '5% 10%'
      },
      '20%': { 
        backgroundPosition: '10% 5%'
      },
      '30%': { 
        backgroundPosition: '15% 15%'
      },
      '40%': { 
        backgroundPosition: '20% 8%'
      },
      '50%': { 
        backgroundPosition: '25% 25%'
      },
      '60%': { 
        backgroundPosition: '30% 12%'
      },
      '70%': { 
        backgroundPosition: '35% 35%'
      },
      '80%': { 
        backgroundPosition: '40% 18%'
      },
      '90%': { 
        backgroundPosition: '45% 45%'
      },
      '100%': { 
        backgroundPosition: '50% 22%'
      }
    }
  },
  
  config: {
    // Reduced motion alternatives
    reducedMotion: {
      duration: '200ms',
      easing: 'ease-out'
    },
    
    // Performance settings
    performance: {
      useTransforms: true,
      enableGPUAcceleration: true,
      willChange: ['transform', 'opacity', 'filter']
    }
  },
  
  motion: {
    respectReducedMotion: true,
    enableGPUAcceleration: true,
    
    // Cyberpunk-specific motion preferences  
    intensity: 'normal', // 'subtle' | 'normal' | 'intense'
    glitchEnabled: true,
    matrixEffectsEnabled: true,
    scanLinesEnabled: true,
  }
};

// Animation presets for common cyberpunk effects
export const cyberpunkAnimationPresets = {
  // Button animations
  buttonGlow: {
    duration: cyberpunkAnimationTokens.duration.normal,
    easing: cyberpunkAnimationTokens.easing.cyber,
    keyframes: cyberpunkAnimationTokens.keyframes.neonGlow
  },
  
  buttonGlitch: {
    duration: cyberpunkAnimationTokens.duration.glitch,
    easing: cyberpunkAnimationTokens.easing.glitch,
    keyframes: cyberpunkAnimationTokens.keyframes.glitchEffect
  },
  
  // Terminal animations
  terminalType: {
    duration: cyberpunkAnimationTokens.duration.fast,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.dataStream
  },
  
  terminalCursor: {
    duration: cyberpunkAnimationTokens.duration.terminalCursor,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.terminalCursor,
    iterationCount: 'infinite'
  },
  
  // Matrix effects
  matrixRain: {
    duration: cyberpunkAnimationTokens.duration.matrixRain,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.matrixRain,
    iterationCount: 'infinite'
  },
  
  // Scan line effects
  scanLine: {
    duration: cyberpunkAnimationTokens.duration.scan,
    easing: cyberpunkAnimationTokens.easing.linear,
    keyframes: cyberpunkAnimationTokens.keyframes.scanLine,
    iterationCount: 'infinite'
  }
};

export default cyberpunkAnimationTokens;