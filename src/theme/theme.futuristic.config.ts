// Futuristic theme configuration system
export interface FuturisticConfig {
  intensity: 'subtle' | 'normal' | 'vivid';
  professional: boolean;
  reducedMotion: boolean;
}

export const futuristicConfig = {
  intensity: {
    subtle: {
      glowOpacity: 0.15,
      animationDuration: '8s',
      blurAmount: '4px',
      glowRadius: '8px',
      transformScale: 1.01,
    },
    normal: {
      glowOpacity: 0.25,
      animationDuration: '6s',
      blurAmount: '8px',
      glowRadius: '12px',
      transformScale: 1.02,
    },
    vivid: {
      glowOpacity: 0.4,
      animationDuration: '4s',
      blurAmount: '12px',
      glowRadius: '16px',
      transformScale: 1.04,
    },
  },
  effects: {
    glow: {
      small: '0 0 8px',
      medium: '0 0 12px',
      large: '0 0 16px',
      focus: '0 0 0 3px',
    },
    shadow: {
      subtle: '0 2px 8px rgba(0, 0, 0, 0.1)',
      normal: '0 4px 16px rgba(0, 0, 0, 0.15)',
      elevated: '0 8px 32px rgba(0, 0, 0, 0.2)',
    },
  },
} as const;

export const defaultFuturisticConfig: FuturisticConfig = {
  intensity: 'normal',
  professional: false,
  reducedMotion: false,
};