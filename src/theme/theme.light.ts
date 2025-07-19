import { lightColorTokens, type SemanticColorTokens } from './tokens/colors';

export interface ThemeTokens {
  colors: SemanticColorTokens;
  typography: {
    fontFamily: string;
    fontSize: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl'?: string;
  };
  motion: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      inOut: string;
      default?: string;
      bounce?: string;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: string;
  zIndex: {
    dropdown: number;
    sticky: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
  borders?: {
    color: string;
  };
}

export const lightTheme: ThemeTokens = {
  colors: lightColorTokens,
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  motion: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      inOut: 'ease-in-out',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  radius: '0.5rem',
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
  borders: {
    color: lightColorTokens.border,
  },
} as const;

export type Theme = ThemeTokens;
