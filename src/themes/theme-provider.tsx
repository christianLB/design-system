import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, baseTheme } from './base.theme';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  availableThemes: Theme[];
  registerTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  enableDarkMode?: boolean;
}

export function ThemeProvider({
  children,
  initialTheme = baseTheme,
  enableDarkMode = true,
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([baseTheme]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Register new themes dynamically
  const registerTheme = (theme: Theme) => {
    setAvailableThemes((prev) => {
      const exists = prev.find((t) => t.name === theme.name);
      if (!exists) {
        return [...prev, theme];
      }
      return prev;
    });
  };

  // Set theme and apply CSS variables
  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyThemeToDOM(theme);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (enableDarkMode) {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);

      if (newDarkMode) {
        // Apply dark theme modifications
        const darkTheme: Theme = {
          ...currentTheme,
          colors: {
            ...currentTheme.colors,
            background: '#1f2937',
            surface: '#374151',
            text: '#f9fafb',
            textSecondary: '#d1d5db',
          },
        };
        applyThemeToDOM(darkTheme);
      } else {
        applyThemeToDOM(currentTheme);
      }
    }
  };

  // Apply theme variables to DOM
  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply typography variables
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    // Apply spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply border radius variables
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });
  };

  // Apply initial theme on mount
  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, []);

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    toggleDarkMode,
    isDarkMode,
    availableThemes,
    registerTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
