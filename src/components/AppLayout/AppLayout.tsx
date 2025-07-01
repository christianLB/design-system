import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Box } from '../Box/Box';
import { Stack } from '../Stack/Stack';
import { 
  LayoutVariant, 
  HeaderBehavior, 
  SpacingToken, 
  ResponsiveConfig
} from '../Navigation/types';
import { layoutVariants, mergeResponsiveStyles } from '../Navigation/variants';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  // Layout variants
  variant?: LayoutVariant;
  
  // Behavior configuration
  headerBehavior?: HeaderBehavior;
  sidebarBehavior?: SidebarBehavior;
  
  // Scroll control
  enableVerticalScroll?: boolean;
  enableHorizontalScroll?: boolean;
  
  // Content configuration
  contentPadding?: SpacingToken | 'none';
  
  // Responsive configuration
  breakpoints?: ResponsiveConfig;
  
  // Components
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  
  // Legacy props (deprecated)
  /** @deprecated Use headerBehavior='sticky' instead */
  stickyHeader?: boolean;
  /** @deprecated Use sidebar collapsed state management instead */
  sidebarInitiallyCollapsed?: boolean;
}

/**
 * Modern application layout with flexible configuration options.
 * Supports multiple layout variants, responsive behavior, and professional styling.
 */
export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      // New props
      variant = 'default',
      headerBehavior = 'static',
      enableVerticalScroll = true,
      enableHorizontalScroll = false,
      contentPadding = 'md',
      breakpoints,
      
      // Components
      header,
      sidebar,
      children,
      className,
      
      // Legacy props (with deprecation handling)
      stickyHeader = false,
      sidebarInitiallyCollapsed = false,
      
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const isFuturistic = theme === 'futuristic';
    
    // Handle legacy props
    const actualHeaderBehavior = stickyHeader ? 'sticky' : headerBehavior;
    
    // Sidebar state management
    const [isSidebarCollapsed, setSidebarCollapsed] = React.useState(
      sidebarInitiallyCollapsed,
    );

    const handleSidebarToggle = () => {
      setSidebarCollapsed(prev => !prev);
    };

    // Get layout variant styles
    const variantStyles = layoutVariants[variant] || layoutVariants.default;
    
    // Build responsive styles
    const responsiveStyles = React.useMemo(() => {
      if (!breakpoints) return {};
      
      const styles: React.CSSProperties = {};
      Object.entries(breakpoints).forEach(([breakpoint, config]) => {
        // Apply responsive configuration
        if (config) {
          styles[`@media (min-width: var(--breakpoint-${breakpoint}))`] = {
            // Add responsive styles based on config
          };
        }
      });
      return styles;
    }, [breakpoints]);

    // Header styles based on behavior
    const getHeaderStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {};
      
      switch (actualHeaderBehavior) {
        case 'sticky':
          return {
            ...baseStyles,
            position: 'sticky',
            top: 0,
            zIndex: 'var(--z-index-sticky, 1100)',
          };
        case 'floating':
          return {
            ...baseStyles,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 'var(--z-index-sticky, 1100)',
          };
        case 'hidden':
          return {
            ...baseStyles,
            display: 'none',
          };
        default:
          return baseStyles;
      }
    };

    // Main content styles
    const getMainStyles = (): React.CSSProperties => {
      const baseStyles = {
        ...variantStyles.main,
        overflowY: enableVerticalScroll ? 'auto' : 'hidden',
        overflowX: enableHorizontalScroll ? 'auto' : 'hidden',
      } as React.CSSProperties;
      
      // Add padding if specified
      if (contentPadding !== 'none') {
        baseStyles.padding = `var(--spacing-${contentPadding})`;
      }
      
      return baseStyles;
    };

    // Layout container styles
    const containerStyles: React.CSSProperties = {
      ...variantStyles.container,
      ...mergeResponsiveStyles({}, responsiveStyles),
    };

    // Sidebar with enhanced props
    const sidebarWithProps = React.useMemo(() => {
      if (!sidebar || !React.isValidElement(sidebar)) return sidebar;
      
      return React.cloneElement(sidebar as React.ReactElement<SidebarProps>, {
        collapsed: isSidebarCollapsed,
        onToggle: handleSidebarToggle,
      });
    }, [sidebar, isSidebarCollapsed]);

    // Build the layout structure
    const buildLayout = () => {
      if (variant === 'sidebar-fixed') {
        return (
          <div style={containerStyles} className={className} {...props}>
            {header && (
              <Box style={getHeaderStyles()}>
                {header}
              </Box>
            )}
            <div style={layoutVariants['sidebar-fixed'].layout}>
              {sidebar && <Box>{sidebarWithProps}</Box>}
              <Box style={getMainStyles()} role="main">
                {children}
              </Box>
            </div>
          </div>
        );
      }
      
      return (
        <Stack
          ref={ref}
          direction="column"
          style={containerStyles}
          className={className}
          {...props}
        >
          {header && (
            <Box style={getHeaderStyles()}>
              {header}
            </Box>
          )}
          <Stack direction="row" style={{ flex: 1, overflow: variant === 'dashboard' ? 'hidden' : 'auto' }}>
            {sidebar && <Box>{sidebarWithProps}</Box>}
            <Box style={getMainStyles()} role="main">
              {children}
            </Box>
          </Stack>
        </Stack>
      );
    };

    const layout = buildLayout();

    // Apply futuristic theme wrapper if needed
    if (isFuturistic) {
      return (
        <div className="futuristic-wrap">
          <div className="futuristic-bg" />
          {layout}
        </div>
      );
    }

    return layout;
  }
);

AppLayout.displayName = 'AppLayout';

export default AppLayout;
