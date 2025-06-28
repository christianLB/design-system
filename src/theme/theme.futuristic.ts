import { lightTheme, ThemeTokens } from './theme.light';

// Enhanced futuristic theme with improved accessibility and professional aesthetics
export const futuristicTheme: ThemeTokens = {
  colors: {
    // Professional indigo instead of vibrant purple
    primary: '#6366F1',
    primaryForeground: '#FFFFFF',
    secondary: '#0F766E', // Elegant teal instead of bright green
    secondaryForeground: '#FFFFFF',
    // Improved contrast ratios for WCAG AA compliance
    neutral100: '#0F172A', // Warmer dark background
    neutral900: '#F8FAFC', // Pure white for better contrast
  },
  typography: {
    fontFamily: "'Inter Variable', 'SF Pro Display', system-ui, sans-serif",
    fontSize: lightTheme.typography.fontSize,
  },
  spacing: {
    ...lightTheme.spacing,
    // More generous spacing for professional look
    md: '0.75rem', // 12px
    lg: '1.25rem', // 20px
    xl: '2rem',    // 32px
    '2xl': '3rem', // 48px
  },
  motion: {
    ...lightTheme.motion,
    // Smoother, more professional transitions
    duration: {
      fast: '0.15s',
      normal: '0.2s',
      slow: '0.3s',
    },
    easing: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  breakpoints: lightTheme.breakpoints,
  radius: '0.75rem', // Slightly more rounded for modern feel
  zIndex: lightTheme.zIndex,
  borders: {
    color: '#6366F1',
  },
} as const;

// Professional variant with even more subtle styling
export const futuristicThemeProfessional: ThemeTokens = {
  ...futuristicTheme,
  colors: {
    ...futuristicTheme.colors,
    primary: '#4F46E5', // Slightly darker for corporate feel
    secondary: '#059669', // Professional green
    neutral100: '#1E293B', // Lighter background for less contrast
  },
  radius: '0.5rem', // More conservative border radius
} as const;

// High contrast variant for accessibility
export const futuristicThemeHighContrast: ThemeTokens = {
  ...futuristicTheme,
  colors: {
    ...futuristicTheme.colors,
    primary: '#A855F7', // Higher contrast purple
    secondary: '#10B981', // Brighter green
    neutral900: '#FFFFFF', // Pure white
  },
  borders: {
    color: '#C4B5FD', // Lighter border for better visibility
  },
} as const;
