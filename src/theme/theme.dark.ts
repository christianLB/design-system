import { lightTheme, ThemeTokens } from './theme.light';

export const darkTheme: ThemeTokens = {
  colors: {
    primary: '#fafafa',
    primaryForeground: '#09090b',
    secondary: '#18181b',
    secondaryForeground: '#fafafa',
    neutral100: '#0a0a0a',
    neutral900: '#fafafa',
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  motion: lightTheme.motion,
  breakpoints: lightTheme.breakpoints,
  radius: '0.5rem',
  zIndex: lightTheme.zIndex,
  borders: {
    color: '#27272a',
  },
} as const;
