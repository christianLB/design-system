import { lightTheme, ThemeTokens } from './theme.light';
import { darkColorTokens } from './tokens/colors';

export const darkTheme: ThemeTokens = {
  colors: darkColorTokens,
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  motion: lightTheme.motion,
  breakpoints: lightTheme.breakpoints,
  radius: '0.5rem',
  zIndex: lightTheme.zIndex,
  borders: {
    color: darkColorTokens.border,
  },
} as const;
