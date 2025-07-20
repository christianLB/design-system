import { useState, useEffect, useCallback } from 'react';
import { Theme } from './base.theme';
import { useTheme } from './theme-provider';

/**
 * Hook for managing theme preferences with localStorage
 */
export function useThemePreferences() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const saveThemePreference = useCallback(
    (theme: Theme) => {
      localStorage.setItem('preferred-theme', theme.name);
      setTheme(theme);
    },
    [setTheme],
  );

  const loadThemePreference = useCallback(() => {
    const saved = localStorage.getItem('preferred-theme');
    if (saved) {
      const theme = availableThemes.find((t) => t.name === saved);
      if (theme) {
        setTheme(theme);
      }
    }
  }, [availableThemes, setTheme]);

  useEffect(() => {
    loadThemePreference();
  }, [loadThemePreference]);

  return {
    currentTheme,
    saveThemePreference,
    loadThemePreference,
  };
}

/**
 * Hook for detecting system dark mode preference
 */
export function useSystemTheme() {
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    setSystemPrefersDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemPrefersDark;
}

/**
 * Hook for auto-switching themes based on time of day
 */
export function useAutoTheme(lightTheme: Theme, darkTheme: Theme) {
  const { setTheme } = useTheme();
  const [autoMode, setAutoMode] = useState(false);

  useEffect(() => {
    if (!autoMode) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 18;
      setTheme(isDayTime ? lightTheme : darkTheme);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [autoMode, lightTheme, darkTheme, setTheme]);

  return {
    autoMode,
    setAutoMode,
  };
}

/**
 * Hook for responsive theme switching based on screen size
 */
export function useResponsiveTheme(mobileTheme: Theme, desktopTheme: Theme) {
  const { setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setTheme(e.matches ? mobileTheme : desktopTheme);
    };

    setIsMobile(mediaQuery.matches);
    setTheme(mediaQuery.matches ? mobileTheme : desktopTheme);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mobileTheme, desktopTheme, setTheme]);

  return isMobile;
}

/**
 * Hook for theme animation and transitions
 */
export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setTheme: originalSetTheme } = useTheme();

  const setThemeWithTransition = useCallback(
    (theme: Theme, duration: number = 300) => {
      setIsTransitioning(true);

      // Add transition class to body
      document.body.style.transition = `background-color ${duration}ms ease, color ${duration}ms ease`;

      originalSetTheme(theme);

      setTimeout(() => {
        setIsTransitioning(false);
        document.body.style.transition = '';
      }, duration);
    },
    [originalSetTheme],
  );

  return {
    isTransitioning,
    setThemeWithTransition,
  };
}
