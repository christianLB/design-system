/**
 * useThemeVariant Hook
 *
 * Provides access to theme variant settings (compact, comfortable, high-contrast)
 * with utilities for responsive variant switching.
 */

import { useMemo, useCallback, useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeVariant } from '../theme/builder/types';

export interface VariantSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface UseThemeVariantReturn {
  /** Current variant */
  variant: ThemeVariant;
  /** Set variant */
  setVariant: (variant: ThemeVariant) => void;
  /** Whether compact mode is active */
  isCompact: boolean;
  /** Whether comfortable mode is active */
  isComfortable: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Get spacing value for current variant */
  getSpacing: (size: keyof VariantSpacing) => string;
  /** Get font size multiplier */
  fontSizeMultiplier: number;
  /** Whether animations are enabled */
  animationsEnabled: boolean;
  /** Toggle between compact and comfortable */
  toggleDensity: () => void;
  /** Auto-detect best variant based on device */
  autoDetectVariant: () => ThemeVariant;
}

const spacingValues: Record<ThemeVariant, VariantSpacing> = {
  default: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  compact: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  comfortable: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
    xl: '3rem',
  },
  'high-contrast': {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

const fontSizeMultipliers: Record<ThemeVariant, number> = {
  default: 1,
  compact: 0.875,
  comfortable: 1.125,
  'high-contrast': 1.1,
};

export function useThemeVariant(): UseThemeVariantReturn {
  const { variant, setVariant } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isCompact = variant === 'compact';
  const isComfortable = variant === 'comfortable';
  const isHighContrast = variant === 'high-contrast';

  const getSpacing = useCallback(
    (size: keyof VariantSpacing): string => {
      return spacingValues[variant][size];
    },
    [variant],
  );

  const fontSizeMultiplier = useMemo(() => {
    return fontSizeMultipliers[variant];
  }, [variant]);

  const animationsEnabled = useMemo(() => {
    if (prefersReducedMotion) return false;
    // High contrast mode typically has reduced animations
    return variant !== 'high-contrast';
  }, [variant, prefersReducedMotion]);

  const toggleDensity = useCallback(() => {
    if (variant === 'compact') {
      setVariant('comfortable');
    } else if (variant === 'comfortable') {
      setVariant('default');
    } else {
      setVariant('compact');
    }
  }, [variant, setVariant]);

  const autoDetectVariant = useCallback((): ThemeVariant => {
    if (typeof window === 'undefined') return 'default';

    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: more)').matches) {
      return 'high-contrast';
    }

    // Check for reduced motion (might prefer simpler UI)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'high-contrast';
    }

    // Check device type based on screen size and touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const screenWidth = window.innerWidth;

    // Mobile devices benefit from larger touch targets
    if (isTouchDevice && screenWidth < 768) {
      return 'comfortable';
    }

    // Large screens with mouse can use compact
    if (!isTouchDevice && screenWidth > 1440) {
      return 'compact';
    }

    return 'default';
  }, []);

  return {
    variant,
    setVariant,
    isCompact,
    isComfortable,
    isHighContrast,
    getSpacing,
    fontSizeMultiplier,
    animationsEnabled,
    toggleDensity,
    autoDetectVariant,
  };
}

export default useThemeVariant;
