/**
 * useThemeColors Hook
 *
 * Provides easy access to theme colors with CSS variable resolution
 * and utility functions for color manipulation.
 */

import { useMemo, useCallback } from 'react';
import { useTheme } from '../theme/ThemeContext';

export interface ThemeColors {
  // Semantic colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;

  // Surface colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;

  // UI colors
  border: string;
  input: string;
  ring: string;
}

export interface UseThemeColorsReturn {
  /** All theme colors */
  colors: ThemeColors;
  /** Current theme name */
  themeName: string;
  /** Whether dark mode is active */
  isDarkMode: boolean;
  /** Get a CSS variable value */
  getCSSVariable: (variable: string) => string;
  /** Get color with opacity */
  withOpacity: (color: string, opacity: number) => string;
  /** Check if a color is light or dark */
  isLightColor: (color: string) => boolean;
}

/**
 * Get computed CSS variable value
 */
function getCSSVariableValue(variable: string): string {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variable).trim();
  return value;
}

/**
 * Convert HSL string to CSS color
 */
function hslToColor(hsl: string): string {
  if (!hsl) return '';
  // Check if it's already a full hsl() or other format
  if (hsl.startsWith('hsl') || hsl.startsWith('rgb') || hsl.startsWith('#')) {
    return hsl;
  }
  // Assume it's "h s% l%" format from Tailwind CSS
  return `hsl(${hsl})`;
}

/**
 * Parse color to RGB values
 */
function parseColorToRGB(color: string): { r: number; g: number; b: number } | null {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return { r, g, b };
}

/**
 * Calculate relative luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function useThemeColors(): UseThemeColorsReturn {
  const { theme, activeTheme } = useTheme();

  const isDarkMode = useMemo(() => {
    return theme === 'dark' || theme === 'cyberpunk' || theme === 'alien';
  }, [theme]);

  const getCSSVariable = useCallback((variable: string): string => {
    const varName = variable.startsWith('--') ? variable : `--${variable}`;
    return getCSSVariableValue(varName);
  }, []);

  const colors = useMemo((): ThemeColors => {
    // Try to get from active theme first, fallback to CSS variables
    const getColor = (key: string, cssVar: string): string => {
      if (activeTheme?.colors?.[key as keyof typeof activeTheme.colors]) {
        return activeTheme.colors[key as keyof typeof activeTheme.colors] as string;
      }
      const value = getCSSVariable(cssVar);
      return hslToColor(value) || value;
    };

    return {
      primary: getColor('primary', '--color-primary'),
      primaryForeground: getColor('primaryForeground', '--color-primary-foreground'),
      secondary: getColor('secondary', '--color-secondary'),
      secondaryForeground: getColor('secondaryForeground', '--color-secondary-foreground'),
      destructive: getColor('destructive', '--color-destructive'),
      destructiveForeground: getColor('destructiveForeground', '--color-destructive-foreground'),
      success: getColor('success', '--color-success'),
      successForeground: getColor('successForeground', '--color-success-foreground'),
      warning: getColor('warning', '--color-warning'),
      warningForeground: getColor('warningForeground', '--color-warning-foreground'),
      background: getColor('background', '--color-background'),
      foreground: getColor('foreground', '--color-foreground'),
      card: getColor('card', '--color-card'),
      cardForeground: getColor('cardForeground', '--color-card-foreground'),
      popover: getColor('popover', '--color-popover'),
      popoverForeground: getColor('popoverForeground', '--color-popover-foreground'),
      muted: getColor('muted', '--color-muted'),
      mutedForeground: getColor('mutedForeground', '--color-muted-foreground'),
      accent: getColor('accent', '--color-accent'),
      accentForeground: getColor('accentForeground', '--color-accent-foreground'),
      border: getColor('border', '--color-border'),
      input: getColor('input', '--color-input'),
      ring: getColor('ring', '--color-ring'),
    };
  }, [activeTheme, getCSSVariable]);

  const withOpacity = useCallback((color: string, opacity: number): string => {
    const rgb = parseColorToRGB(color);
    if (!rgb) return color;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  }, []);

  const isLightColor = useCallback((color: string): boolean => {
    const rgb = parseColorToRGB(color);
    if (!rgb) return true;
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.5;
  }, []);

  return {
    colors,
    themeName: theme,
    isDarkMode,
    getCSSVariable,
    withOpacity,
    isLightColor,
  };
}

export default useThemeColors;
