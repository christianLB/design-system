import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { BuiltTheme, ThemeVariant } from './builder/types';
import { ThemeBuilder } from './builder/ThemeBuilder';
import { getVariantClassNames, getVariantCSSProperties } from './builder/variants';

export type Theme = 'light' | 'dark' | 'futuristic'; // 'cyberpunk' temporarily disabled
const THEME_KEY = 'vite-ui-theme';
const THEME_VARIANT_KEY = 'vite-ui-theme-variant';
const CUSTOM_THEME_KEY = 'vite-ui-custom-theme';

interface ThemeProviderState {
  theme: Theme;
  variant: ThemeVariant;
  customTheme: BuiltTheme | null;
  activeTheme: BuiltTheme;
  themeBuilder: ThemeBuilder;
  setTheme: (theme: Theme) => void;
  setVariant: (variant: ThemeVariant) => void;
  setCustomTheme: (theme: BuiltTheme | null) => void;
  applyThemeBuilder: (builder: ThemeBuilder) => void;
  resetToDefault: () => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize base theme
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark' || stored === 'futuristic') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Initialize theme variant
  const [variant, setVariantState] = useState<ThemeVariant>(() => {
    const stored = localStorage.getItem(THEME_VARIANT_KEY) as ThemeVariant | null;
    if (stored === 'default' || stored === 'compact' || stored === 'comfortable' || stored === 'high-contrast') {
      return stored;
    }
    return 'default';
  });

  // Initialize custom theme
  const [customTheme, setCustomThemeState] = useState<BuiltTheme | null>(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_THEME_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Create theme builder instance
  const themeBuilder = useMemo(() => {
    const builder = new ThemeBuilder();
    return builder.extends(theme).withVariant(variant);
  }, [theme, variant]);

  // Calculate active theme
  const activeTheme = useMemo(() => {
    if (customTheme) {
      return customTheme;
    }
    return themeBuilder.buildSync();
  }, [customTheme, themeBuilder]);

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove old theme classes and data-theme attribute
    root.classList.remove('light', 'dark', 'futuristic');
    root.removeAttribute('data-theme');
    
    // Remove old variant classes
    const oldVariantClasses = ['theme-default', 'theme-compact', 'theme-comfortable', 'theme-high-contrast', 'theme-dense', 'theme-spacious', 'theme-accessible'];
    root.classList.remove(...oldVariantClasses);

    // Apply base theme
    if (theme === 'dark' || theme === 'futuristic') {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    } else {
      root.classList.add('light');
    }

    // Apply variant classes
    const variantClasses = getVariantClassNames(variant);
    root.classList.add(...variantClasses);

    // Apply variant CSS properties
    const variantProperties = getVariantCSSProperties(variant);
    Object.entries(variantProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply theme CSS variables
    if (activeTheme && typeof activeTheme === 'object') {
      try {
        const cssVariables = themeBuilder.generateCSSVariables(activeTheme);
        if (cssVariables && typeof cssVariables === 'object') {
          Object.entries(cssVariables).forEach(([variable, value]) => {
            if (variable && value != null) {
              root.style.setProperty(variable, value);
            }
          });
        }
      } catch (error) {
        console.warn('Failed to generate CSS variables:', error);
      }
    }
  }, [theme, variant, activeTheme, themeBuilder]);

  // Theme management functions
  const setTheme = (newTheme: Theme) => {
    // Validate that newTheme is a valid theme name
    const validThemes: Theme[] = ['light', 'dark', 'futuristic'];
    if (typeof newTheme !== 'string' || !validThemes.includes(newTheme)) {
      console.error(`Invalid theme: ${newTheme}. Expected one of: ${validThemes.join(', ')}`);
      return;
    }
    
    localStorage.setItem(THEME_KEY, newTheme);
    setThemeState(newTheme);
  };

  const setVariant = (newVariant: ThemeVariant) => {
    // Validate that newVariant is a valid variant name
    const validVariants: ThemeVariant[] = ['default', 'compact', 'comfortable', 'high-contrast'];
    if (typeof newVariant !== 'string' || !validVariants.includes(newVariant)) {
      console.error(`Invalid variant: ${newVariant}. Expected one of: ${validVariants.join(', ')}`);
      return;
    }
    
    localStorage.setItem(THEME_VARIANT_KEY, newVariant);
    setVariantState(newVariant);
  };

  const setCustomTheme = (newCustomTheme: BuiltTheme | null) => {
    if (newCustomTheme) {
      localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(newCustomTheme));
    } else {
      localStorage.removeItem(CUSTOM_THEME_KEY);
    }
    setCustomThemeState(newCustomTheme);
  };

  const applyThemeBuilder = async (builder: ThemeBuilder) => {
    try {
      const builtTheme = await builder.build();
      setCustomTheme(builtTheme);
    } catch (error) {
      console.error('Failed to apply theme builder:', error);
      // Fallback to sync build
      const fallbackTheme = builder.buildSync();
      setCustomTheme(fallbackTheme);
    }
  };

  const resetToDefault = () => {
    setCustomTheme(null);
    setVariant('default');
    setTheme('light');
  };

  const value = { 
    theme, 
    variant,
    customTheme,
    activeTheme,
    themeBuilder,
    setTheme,
    setVariant,
    setCustomTheme,
    applyThemeBuilder,
    resetToDefault
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
