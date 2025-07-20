/**
 * Mirtha Legrand Animation Tokens
 * Elegant and graceful animations inspired by the sophistication of Argentina's eternal diva
 */

export const mirthaAnimationTokens = {
  // Animation Durations - Graceful timing
  duration: {
    instant: '50ms', // Quick sparkle
    rapid: '150ms', // Subtle transitions
    quick: '250ms', // Elegant hover states
    normal: '400ms', // Standard transitions
    smooth: '600ms', // Graceful movements
    slow: '800ms', // Luxurious reveals
    gentle: '1000ms', // Sophisticated fades
    languid: '1500ms', // Dramatic entrances
    stately: '2000ms', // Grand presentations
    ceremonial: '3000ms', // Majestic sequences
  },

  // Easing Functions - Sophisticated curves
  easing: {
    // Elegant entrances and exits
    elegantIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elegantOut: 'cubic-bezier(0, 0, 0.2, 1)',
    elegantInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Graceful movements
    gracefulIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
    gracefulOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
    gracefulInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',

    // Luxurious transitions
    luxuryIn: 'cubic-bezier(0.5, 0, 0.75, 0)',
    luxuryOut: 'cubic-bezier(0.25, 1, 0.5, 1)',
    luxuryInOut: 'cubic-bezier(0.76, 0, 0.24, 1)',

    // Dramatic effects
    dramaticIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    dramaticOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    dramaticInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Spring animations
    springGentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    springElegant: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    springLively: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Keyframe Animations
  keyframes: {
    // Shimmer effect - like light on gold
    shimmer: {
      '0%, 100%': {
        opacity: '1',
        transform: 'translateX(0) scale(1)',
      },
      '50%': {
        opacity: '0.8',
        transform: 'translateX(2px) scale(1.02)',
      },
    },

    // Sparkle effect - like diamonds
    sparkle: {
      '0%, 100%': {
        opacity: '0',
        transform: 'scale(0) rotate(0deg)',
      },
      '50%': {
        opacity: '1',
        transform: 'scale(1) rotate(180deg)',
      },
    },

    // Golden glow pulse
    glow: {
      '0%, 100%': {
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.1)',
      },
      '50%': {
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
      },
    },

    // Elegant float
    float: {
      '0%, 100%': {
        transform: 'translateY(0) rotate(0deg)',
      },
      '25%': {
        transform: 'translateY(-10px) rotate(-1deg)',
      },
      '75%': {
        transform: 'translateY(-5px) rotate(1deg)',
      },
    },

    // Graceful fade in
    fadeIn: {
      '0%': {
        opacity: '0',
        transform: 'translateY(10px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)',
      },
    },

    // Rose gold shimmer
    roseShimmer: {
      '0%': {
        backgroundPosition: '200% center',
      },
      '100%': {
        backgroundPosition: '-200% center',
      },
    },

    // Champagne bubbles
    bubbles: {
      '0%': {
        opacity: '0',
        transform: 'translateY(100%) scale(0)',
      },
      '50%': {
        opacity: '1',
        transform: 'translateY(-50%) scale(1)',
      },
      '100%': {
        opacity: '0',
        transform: 'translateY(-100%) scale(0.5)',
      },
    },

    // Elegant reveal
    reveal: {
      '0%': {
        opacity: '0',
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
      },
      '100%': {
        opacity: '1',
        transform: 'scaleX(1)',
        transformOrigin: 'left center',
      },
    },

    // Luxury zoom
    luxuryZoom: {
      '0%': {
        opacity: '0',
        transform: 'scale(0.9)',
      },
      '50%': {
        opacity: '0.5',
        transform: 'scale(1.05)',
      },
      '100%': {
        opacity: '1',
        transform: 'scale(1)',
      },
    },

    // Gentle sway
    sway: {
      '0%, 100%': {
        transform: 'rotate(-1deg)',
      },
      '50%': {
        transform: 'rotate(1deg)',
      },
    },

    // Pearl shine
    pearlShine: {
      '0%': {
        opacity: '0.7',
        filter: 'brightness(1)',
      },
      '50%': {
        opacity: '1',
        filter: 'brightness(1.2)',
      },
      '100%': {
        opacity: '0.7',
        filter: 'brightness(1)',
      },
    },

    // Elegant entrance
    entrance: {
      '0%': {
        opacity: '0',
        transform: 'scale(0.95) translateY(20px)',
      },
      '100%': {
        opacity: '1',
        transform: 'scale(1) translateY(0)',
      },
    },

    // Sophisticated exit
    exit: {
      '0%': {
        opacity: '1',
        transform: 'scale(1) translateY(0)',
      },
      '100%': {
        opacity: '0',
        transform: 'scale(0.95) translateY(-20px)',
      },
    },

    // Golden wave
    goldenWave: {
      '0%, 100%': {
        transform: 'translateX(0) translateY(0)',
      },
      '25%': {
        transform: 'translateX(10px) translateY(-5px)',
      },
      '50%': {
        transform: 'translateX(-10px) translateY(5px)',
      },
      '75%': {
        transform: 'translateX(5px) translateY(-10px)',
      },
    },

    // Spotlight effect
    spotlight: {
      '0%': {
        background: 'radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
      },
      '25%': {
        background:
          'radial-gradient(circle at 100% 0%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
      },
      '50%': {
        background:
          'radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
      },
      '75%': {
        background:
          'radial-gradient(circle at 0% 100%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
      },
      '100%': {
        background: 'radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
      },
    },
  },

  // Transition configurations
  transitions: {
    // Base transitions
    base: {
      duration: '400ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['all'],
    },

    // Elegant hover states
    hover: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['transform', 'box-shadow', 'background-color'],
    },

    // Focus transitions
    focus: {
      duration: '200ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      properties: ['box-shadow', 'outline', 'border-color'],
    },

    // Color transitions
    color: {
      duration: '400ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['color', 'background-color', 'border-color'],
    },

    // Transform transitions
    transform: {
      duration: '600ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      properties: ['transform'],
    },

    // Opacity transitions
    opacity: {
      duration: '400ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['opacity'],
    },
  },

  // Compound animations
  compounds: {
    // Elegant button hover
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 14px 0 rgba(255, 215, 0, 0.25)',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Card float effect
    cardFloat: {
      animation: 'float 6s ease-in-out infinite',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    },

    // Golden pulse
    goldenPulse: {
      animation: 'glow 4s ease-in-out infinite',
      borderColor: 'rgba(255, 215, 0, 0.5)',
    },

    // Shimmer text
    shimmerText: {
      background: 'linear-gradient(135deg, #FFD700 0%, #F7E7CE 50%, #FFD700 100%)',
      backgroundSize: '200% auto',
      animation: 'roseShimmer 3s linear infinite',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },

    // Luxury reveal
    luxuryReveal: {
      animation: 'entrance 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      opacity: '0',
    },
  },

  // Performance hints
  performance: {
    prefersReducedMotion: {
      duration: '0ms',
      animation: 'none',
      transition: 'none',
    },

    gpu: {
      transform: 'translateZ(0)',
      willChange: 'transform',
    },

    smooth: {
      backfaceVisibility: 'hidden',
      perspective: '1000px',
      transformStyle: 'preserve-3d',
    },
  },
};
