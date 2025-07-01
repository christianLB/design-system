import { NavigationVariant, NavigationThemeConfig } from './types';

// Variant configurations for different navigation styles
export const navigationVariants: Record<NavigationVariant, NavigationThemeConfig & { styles: Record<string, React.CSSProperties> }> = {
  default: {
    elevation: 'sm',
    border: 'bottom',
    backdrop: 'none',
    shadow: false,
    styles: {
      container: {
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border, #e4e4e7)',
      },
      nav: {
        padding: 'var(--spacing-md)',
      },
      item: {
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderRadius: 'var(--radius, 0.5rem)',
        transition: 'all var(--motion-duration-fast, 150ms) var(--motion-easing-inOut, ease-in-out)',
      },
    },
  },
  
  minimal: {
    elevation: 'none',
    border: 'none',
    backdrop: 'none',
    shadow: false,
    styles: {
      container: {
        backgroundColor: 'transparent',
      },
      nav: {
        padding: 'var(--spacing-sm) var(--spacing-md)',
      },
      item: {
        padding: 'var(--spacing-xs) var(--spacing-sm)',
        borderRadius: 'var(--radius, 0.5rem)',
        fontSize: 'var(--font-size-sm, 0.875rem)',
      },
    },
  },
  
  corporate: {
    elevation: 'md',
    border: 'bottom',
    backdrop: 'solid',
    shadow: true,
    styles: {
      container: {
        backgroundColor: 'var(--background-emphasis, #ffffff)',
        borderColor: 'var(--border, #e4e4e7)',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      nav: {
        padding: 'var(--spacing-lg)',
        maxWidth: '1280px',
        margin: '0 auto',
      },
      item: {
        padding: 'var(--spacing-sm) var(--spacing-lg)',
        fontWeight: '500',
        letterSpacing: '0.025em',
      },
    },
  },
  
  dashboard: {
    elevation: 'sm',
    border: 'bottom',
    backdrop: 'blur',
    shadow: false,
    styles: {
      container: {
        backgroundColor: 'var(--background-emphasis, rgba(255, 255, 255, 0.95))',
        backdropFilter: 'blur(8px)',
        borderColor: 'var(--border, #e4e4e7)',
      },
      nav: {
        padding: 'var(--spacing-sm) var(--spacing-lg)',
      },
      item: {
        padding: 'var(--spacing-xs) var(--spacing-md)',
        fontSize: 'var(--font-size-sm, 0.875rem)',
        fontWeight: '500',
      },
    },
  },
  
  marketing: {
    elevation: 'lg',
    border: 'none',
    backdrop: 'blur',
    shadow: true,
    styles: {
      container: {
        backgroundColor: 'var(--background-emphasis, rgba(255, 255, 255, 0.9))',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius, 0.5rem)',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      nav: {
        padding: 'var(--spacing-md) var(--spacing-xl)',
      },
      item: {
        padding: 'var(--spacing-sm) var(--spacing-lg)',
        fontWeight: '600',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        fontSize: 'var(--font-size-sm, 0.875rem)',
      },
    },
  },
};

// Layout variant configurations
export const layoutVariants = {
  default: {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: '100vh',
    },
    main: {
      flex: 1,
      overflowY: 'auto' as const,
      position: 'relative' as const,
    },
  },
  
  dashboard: {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh',
      overflow: 'hidden',
    },
    main: {
      flex: 1,
      overflow: 'hidden',
      position: 'relative' as const,
    },
  },
  
  'sidebar-fixed': {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: '100vh',
    },
    layout: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
    },
    main: {
      flex: 1,
      overflowY: 'auto' as const,
      position: 'relative' as const,
    },
  },
  
  'no-scroll': {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh',
      overflow: 'hidden',
    },
    main: {
      flex: 1,
      overflow: 'hidden',
      position: 'relative' as const,
    },
  },
} as const;

// Responsive breakpoint utilities
export const getResponsiveStyles = (breakpoint: string) => {
  const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  };
  
  return `@media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]})`;
};

// Helper function to get variant styles
export const getVariantStyles = (variant: NavigationVariant) => {
  return navigationVariants[variant] || navigationVariants.default;
};

// Helper function to merge responsive styles
export const mergeResponsiveStyles = (baseStyles: React.CSSProperties, responsiveStyles: React.CSSProperties): React.CSSProperties => {
  return {
    ...baseStyles,
    ...responsiveStyles,
  };
};