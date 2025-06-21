import { lightTheme, ThemeTokens } from './theme.light';

export const futuristicTheme: ThemeTokens = {
  colors: {
    primary: '#7F5AF0',
    primaryForeground: '#0F0F1A',
    secondary: '#2CB67D',
    secondaryForeground: '#0F0F1A',
    neutral100: '#0F0F1A',
    neutral900: '#ffffffcc',
  },
  typography: {
    fontFamily: "'Inter', 'IBM Plex Sans', sans-serif",
    fontSize: lightTheme.typography.fontSize,
  },
  spacing: lightTheme.spacing,
  motion: lightTheme.motion,
  breakpoints: lightTheme.breakpoints,
  radius: '0.5rem',
  zIndex: lightTheme.zIndex,
  borders: {
    color: '#7F5AF0',
  },
} as const;
