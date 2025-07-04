/**
 * @deprecated This SimpleThemeProvider is deprecated as of v3.5.0
 * 
 * Use the full ThemeProvider from '../src/theme/ThemeContext' instead for:
 * - Better component compatibility
 * - Access to theme builder system
 * - Future theme extensibility
 * - Full theme context features
 * 
 * This file is maintained for backward compatibility only.
 * It will be removed in v4.0.0
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SimpleTheme = 'light' | 'dark' | 'futuristic' | 'cyberpunk';

interface SimpleThemeContextType {
  theme: SimpleTheme;
  setTheme: (theme: SimpleTheme) => void;
}

const SimpleThemeContext = createContext<SimpleThemeContextType | undefined>(undefined);

export const SimpleThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<SimpleTheme>('light');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply to Storybook root
    const storybookRoot = document.getElementById('storybook-root');
    if (storybookRoot) {
      storybookRoot.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <SimpleThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </SimpleThemeContext.Provider>
  );
};

export const useSimpleTheme = () => {
  const context = useContext(SimpleThemeContext);
  if (context === undefined) {
    throw new Error('useSimpleTheme must be used within a SimpleThemeProvider');
  }
  return context;
};