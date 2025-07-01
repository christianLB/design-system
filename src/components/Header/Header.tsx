import * as React from 'react';
import clsx from 'clsx';
import { Box } from '@/components/Box';
import { 
  NavigationThemeConfig,
  SpacingToken 
} from '../Navigation/types';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  // Variant and styling
  variant?: 'default' | 'compact' | 'tall' | 'branded';
  position?: 'static' | 'sticky' | 'fixed' | 'floating';
  
  // Content sections
  brand?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  
  // Styling options
  backdrop?: 'none' | 'blur' | 'solid';
  shadow?: boolean;
  border?: NavigationThemeConfig['border'];
  fullWidth?: boolean;
  maxWidth?: string;
  
  // Responsive
  mobileLayout?: 'stacked' | 'collapsed' | 'hidden';
  
  // Legacy props
  /** @deprecated Use appropriate spacing in variant styles instead */
  padding?: SpacingToken | 'none';
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ 
    // New props
    variant = 'default',
    position = 'static',
    brand,
    navigation,
    actions,
    backdrop = 'none',
    shadow = false,
    border = 'none',
    fullWidth = true,
    maxWidth,
    
    // Legacy props
    children, 
    className, 
    padding = 'md', 
    
    ...props 
  }, ref) => {
    
    // Header-specific variant configurations
    const headerVariants = {
      default: {
        height: 'auto',
        padding: 'var(--spacing-md)',
      },
      compact: {
        height: '3.5rem',
        padding: 'var(--spacing-sm) var(--spacing-md)',
      },
      tall: {
        height: '5rem',
        padding: 'var(--spacing-lg) var(--spacing-md)',
      },
      branded: {
        height: 'auto',
        padding: 'var(--spacing-lg) var(--spacing-xl)',
      },
    };
    
    const currentVariant = headerVariants[variant] || headerVariants.default;
    
    // Position-specific styles
    const getPositionStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {};
      
      switch (position) {
        case 'sticky':
          return {
            ...baseStyles,
            position: 'sticky',
            top: 0,
            zIndex: 'var(--z-index-sticky, 1100)',
          };
        case 'fixed':
          return {
            ...baseStyles,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 'var(--z-index-sticky, 1100)',
          };
        case 'floating':
          return {
            ...baseStyles,
            position: 'fixed',
            top: 'var(--spacing-md)',
            left: 'var(--spacing-md)',
            right: 'var(--spacing-md)',
            borderRadius: 'var(--radius)',
            zIndex: 'var(--z-index-sticky, 1100)',
          };
        default:
          return baseStyles;
      }
    };
    
    // Backdrop styles
    const getBackdropStyles = (): React.CSSProperties => {
      switch (backdrop) {
        case 'blur':
          return {
            backgroundColor: 'var(--background-blur, rgba(15, 23, 42, 0.95))',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          };
        case 'solid':
          return {
            backgroundColor: 'var(--background-emphasis, var(--background))',
          };
        default:
          return {
            backgroundColor: 'var(--background)',
          };
      }
    };
    
    // Build container styles
    const containerStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      maxWidth: maxWidth || 'none',
      ...getPositionStyles(),
      ...getBackdropStyles(),
      ...currentVariant,
      ...(shadow && {
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      }),
      ...(border && border !== 'none' && {
        borderBottom: border === 'bottom' || border === 'all' ? '1px solid var(--border, #e4e4e7)' : undefined,
        borderTop: border === 'top' || border === 'all' ? '1px solid var(--border, #e4e4e7)' : undefined,
        border: border === 'all' ? '1px solid var(--border, #e4e4e7)' : undefined,
      }),
    };
    
    // Content wrapper styles
    const contentStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    };
    
    // Handle legacy children vs new section-based approach
    const hasNewSections = brand || navigation || actions;
    
    const renderContent = () => {
      if (hasNewSections) {
        return (
          <div style={contentStyles}>
            {/* Left section - Brand */}
            {brand && (
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                {brand}
              </Box>
            )}
            
            {/* Center section - Navigation */}
            {navigation && (
              <Box style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flex: 1,
                margin: '0 var(--spacing-lg)',
              }}>
                {navigation}
              </Box>
            )}
            
            {/* Right section - Actions */}
            {actions && (
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                {actions}
              </Box>
            )}
          </div>
        );
      }
      
      // Legacy children support
      if (children) {
        const legacyPadding = padding !== 'none' ? {
          padding: `var(--spacing-${padding})`,
        } : {};
        
        return (
          <Box style={legacyPadding}>
            {children}
          </Box>
        );
      }
      
      return null;
    };
    
    return (
      <header
        ref={ref}
        className={clsx(
          'header',
          `header--${variant}`,
          `header--${position}`,
          backdrop !== 'none' && `header--backdrop-${backdrop}`,
          shadow && 'header--shadow',
          className
        )}
        style={containerStyles}
        {...props}
      >
        {renderContent()}
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header };
