/**
 * useThemeComposer Hook
 *
 * Enables dynamic theme composition by merging base themes
 * with custom overrides at runtime.
 */

import { useMemo, useCallback, useState } from 'react';
import { useTheme, type Theme } from '../theme/ThemeContext';
import type { ThemeConfig, ThemeColors } from '../theme/builder/types';

export interface ThemeOverrides {
  colors?: Partial<ThemeColors>;
  fonts?: {
    sans?: string;
    mono?: string;
    heading?: string;
  };
  borderRadius?: {
    sm?: string;
    md?: string;
    lg?: string;
    full?: string;
  };
  shadows?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
}

export interface ComposedTheme {
  name: string;
  baseTheme: Theme;
  overrides: ThemeOverrides;
  cssVariables: Record<string, string>;
}

export interface UseThemeComposerReturn {
  /** Current composed theme */
  composedTheme: ComposedTheme | null;
  /** Create a new composed theme */
  composeTheme: (name: string, baseTheme: Theme, overrides: ThemeOverrides) => ComposedTheme;
  /** Apply a composed theme */
  applyComposedTheme: (theme: ComposedTheme) => void;
  /** Reset to base theme */
  resetToBase: () => void;
  /** Get CSS variables for a composed theme */
  getThemeCSSVariables: (theme: ComposedTheme) => Record<string, string>;
  /** Check if using a composed theme */
  isComposed: boolean;
  /** List of saved composed themes */
  savedThemes: ComposedTheme[];
  /** Save a composed theme */
  saveTheme: (theme: ComposedTheme) => void;
  /** Delete a saved theme */
  deleteTheme: (name: string) => void;
}

const STORAGE_KEY = 'design-system-composed-themes';

/**
 * Load saved themes from localStorage
 */
function loadSavedThemes(): ComposedTheme[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Save themes to localStorage
 */
function persistThemes(themes: ComposedTheme[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Convert theme overrides to CSS variables
 */
function overridesToCSSVariables(overrides: ThemeOverrides): Record<string, string> {
  const variables: Record<string, string> = {};

  if (overrides.colors) {
    Object.entries(overrides.colors).forEach(([key, value]) => {
      if (value) {
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        variables[`--color-${cssKey}`] = value;
      }
    });
  }

  if (overrides.fonts) {
    if (overrides.fonts.sans) variables['--font-sans'] = overrides.fonts.sans;
    if (overrides.fonts.mono) variables['--font-mono'] = overrides.fonts.mono;
    if (overrides.fonts.heading) variables['--font-heading'] = overrides.fonts.heading;
  }

  if (overrides.borderRadius) {
    if (overrides.borderRadius.sm) variables['--radius-sm'] = overrides.borderRadius.sm;
    if (overrides.borderRadius.md) variables['--radius-md'] = overrides.borderRadius.md;
    if (overrides.borderRadius.lg) variables['--radius-lg'] = overrides.borderRadius.lg;
    if (overrides.borderRadius.full) variables['--radius-full'] = overrides.borderRadius.full;
  }

  if (overrides.shadows) {
    if (overrides.shadows.sm) variables['--shadow-sm'] = overrides.shadows.sm;
    if (overrides.shadows.md) variables['--shadow-md'] = overrides.shadows.md;
    if (overrides.shadows.lg) variables['--shadow-lg'] = overrides.shadows.lg;
  }

  return variables;
}

/**
 * Apply CSS variables to document root
 */
function applyCSSVariables(variables: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Remove custom CSS variables from document root
 */
function removeCSSVariables(variables: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  Object.keys(variables).forEach((key) => {
    root.style.removeProperty(key);
  });
}

export function useThemeComposer(): UseThemeComposerReturn {
  const { theme, setTheme } = useTheme();
  const [composedTheme, setComposedTheme] = useState<ComposedTheme | null>(null);
  const [savedThemes, setSavedThemes] = useState<ComposedTheme[]>(() => loadSavedThemes());

  const isComposed = composedTheme !== null;

  const composeTheme = useCallback(
    (name: string, baseTheme: Theme, overrides: ThemeOverrides): ComposedTheme => {
      const cssVariables = overridesToCSSVariables(overrides);
      return {
        name,
        baseTheme,
        overrides,
        cssVariables,
      };
    },
    [],
  );

  const getThemeCSSVariables = useCallback((theme: ComposedTheme): Record<string, string> => {
    return theme.cssVariables;
  }, []);

  const applyComposedTheme = useCallback(
    (theme: ComposedTheme) => {
      // First, switch to the base theme
      setTheme(theme.baseTheme);

      // Then apply the custom overrides
      applyCSSVariables(theme.cssVariables);

      // Store the composed theme
      setComposedTheme(theme);
    },
    [setTheme],
  );

  const resetToBase = useCallback(() => {
    if (composedTheme) {
      // Remove custom CSS variables
      removeCSSVariables(composedTheme.cssVariables);
      setComposedTheme(null);
    }
  }, [composedTheme]);

  const saveTheme = useCallback((theme: ComposedTheme) => {
    setSavedThemes((prev) => {
      // Replace if exists, otherwise add
      const existing = prev.findIndex((t) => t.name === theme.name);
      const newThemes =
        existing >= 0
          ? [...prev.slice(0, existing), theme, ...prev.slice(existing + 1)]
          : [...prev, theme];
      persistThemes(newThemes);
      return newThemes;
    });
  }, []);

  const deleteTheme = useCallback((name: string) => {
    setSavedThemes((prev) => {
      const newThemes = prev.filter((t) => t.name !== name);
      persistThemes(newThemes);
      return newThemes;
    });
  }, []);

  return {
    composedTheme,
    composeTheme,
    applyComposedTheme,
    resetToBase,
    getThemeCSSVariables,
    isComposed,
    savedThemes,
    saveTheme,
    deleteTheme,
  };
}

export default useThemeComposer;
