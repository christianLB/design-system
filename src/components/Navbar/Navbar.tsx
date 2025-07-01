import * as React from 'react';
import clsx from 'clsx';
import { Stack } from '@/components/Stack';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';
import { 
  NavigationVariant, 
  BaseNavigationItem, 
  NavigationThemeConfig,
  ResponsiveBreakpoint 
} from '../Navigation/types';
import { getVariantStyles } from '../Navigation/variants';

export interface NavItem extends BaseNavigationItem {
  badge?: string | number;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  // Core configuration
  variant?: NavigationVariant;
  items: NavItem[];
  
  // Layout and composition
  leftSection?: React.ReactNode;
  centerSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  
  // Legacy props (for backward compatibility)
  logo?: React.ReactNode;
  cta?: React.ReactNode;
  
  // Layout options
  layout?: 'horizontal' | 'vertical' | 'mixed';
  
  // Responsive behavior
  mobileBreakpoint?: ResponsiveBreakpoint;
  collapseBehavior?: 'overlay' | 'stack' | 'hidden';
  
  // Styling options
  elevation?: NavigationThemeConfig['elevation'];
  border?: NavigationThemeConfig['border'];
  fullWidth?: boolean;
  maxWidth?: string;
  
  // Interaction
  onItemClick?: (item: NavItem) => void;
  
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ 
    // New props
    variant = 'default',
    items, 
    leftSection,
    centerSection,
    rightSection,
    layout = 'horizontal',
    mobileBreakpoint = 'md',
    collapseBehavior = 'overlay',
    elevation,
    border,
    fullWidth = true,
    maxWidth,
    onItemClick,
    
    // Legacy props
    logo, 
    cta, 
    
    className, 
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    // Get variant styles
    const variantConfig = getVariantStyles(variant);
    
    // Handle legacy layout prop
    const actualLayout = layout || 'horizontal';
    
    // Build navigation items with enhanced functionality
    const navItems = items.map((item) => {
      const handleClick = () => {
        onItemClick?.(item);
        if (isOpen) setIsOpen(false); // Close mobile menu on item click
      };
      
      return (
        <Link 
          key={item.href} 
          href={item.href} 
          variant="nav"
          onClick={handleClick}
          className={clsx(
            item.disabled && 'opacity-50 pointer-events-none',
            item.active && 'font-semibold'
          )}
          style={variantConfig.styles.item}
        >
          <Stack direction="row" align="center" gap="xs">
            {item.icon && <Box>{item.icon}</Box>}
            <span>{item.label}</span>
            {item.badge && (
              <Box 
                className="badge"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  lineHeight: 1,
                }}
              >
                {item.badge}
              </Box>
            )}
          </Stack>
        </Link>
      );
    });
    
    // Determine sections to render
    const leftContent = leftSection || logo;
    const centerContent = centerSection || (
      <Stack
        direction={actualLayout === 'horizontal' ? 'row' : 'column'}
        align={actualLayout === 'horizontal' ? 'center' : 'start'}
        gap="sm"
        className={actualLayout === 'horizontal' ? 'flex-grow justify-center' : ''}
      >
        {navItems}
      </Stack>
    );
    const rightContent = rightSection || cta;
    
    // Container styles
    const containerStyles: React.CSSProperties = {
      ...variantConfig.styles.container,
      width: fullWidth ? '100%' : 'auto',
      maxWidth: maxWidth || 'none',
      ...(elevation && elevation !== 'none' && {
        boxShadow: variantConfig.shadow ? variantConfig.styles.container.boxShadow : undefined,
      }),
      ...(border && border !== 'none' && {
        borderBottom: border === 'bottom' || border === 'all' ? `1px solid ${variantConfig.styles.container.borderColor}` : undefined,
        borderTop: border === 'top' || border === 'all' ? `1px solid ${variantConfig.styles.container.borderColor}` : undefined,
        border: border === 'all' ? `1px solid ${variantConfig.styles.container.borderColor}` : undefined,
      }),
    };
    
    const navStyles: React.CSSProperties = {
      ...variantConfig.styles.nav,
    };

    return (
      <nav 
        ref={ref} 
        className={clsx(className)} 
        style={containerStyles}
        {...props}
      >
        <div style={navStyles}>
          {/* Mobile Header */}
          <Stack
            direction="row"
            align="center"
            justify="between"
            className={`${mobileBreakpoint}:hidden w-full`}
          >
            {leftContent && <Box>{leftContent}</Box>}
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <Icon name={isOpen ? 'X' : 'Menu'} />
            </Button>
          </Stack>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            align="center"
            justify="between"
            className={`hidden ${mobileBreakpoint}:flex w-full`}
          >
            {leftContent && (
              <Box style={{ marginRight: 'var(--spacing-lg)' }}>
                {leftContent}
              </Box>
            )}
            
            {centerContent}
            
            {rightContent && <Box>{rightContent}</Box>}
          </Stack>

          {/* Mobile Menu */}
          {isOpen && (
            <Box 
              className={`${mobileBreakpoint}:hidden`}
              style={{
                marginTop: 'var(--spacing-md)',
                ...(collapseBehavior === 'overlay' && {
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: variantConfig.styles.container.backgroundColor,
                  borderTop: `1px solid ${variantConfig.styles.container.borderColor}`,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  zIndex: 50,
                  padding: 'var(--spacing-md)',
                }),
              }}
            >
              <Stack direction="column" align="center" gap="sm">
                {navItems}
                {rightContent && (
                  <Box style={{ marginTop: 'var(--spacing-md)' }}>
                    {rightContent}
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export { Navbar };
