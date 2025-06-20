export interface ThemeTokens {
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    neutral100: string;
    neutral900: string;
  };
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
  };
  motion: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      inOut: string;
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
  borders: {
    color: string;
  };
}

export const lightTheme: ThemeTokens = {
  colors: {
    primary: '#1e40af',
    primaryForeground: '#ffffff',
    secondary: '#4b5563',
    secondaryForeground: '#ffffff',
    neutral100: '#f4f4f5',
    neutral900: '#171717',
  },
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
    color: '#e4e4e7',
  },
} as const;

export type Theme = ThemeTokens;
