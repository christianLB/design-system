import * as React from 'react';
import clsx from 'clsx';
import { Link } from '@/components/Link';

export interface SimpleHeaderItem {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export interface SimpleHeaderProps extends React.HTMLAttributes<HTMLElement> {
  // 3 regions
  left?: React.ReactNode;
  navigation?: SimpleHeaderItem[];
  right?: React.ReactNode;
  
  // Styling
  height?: number;
  border?: boolean;
  className?: string;
}

/**
 * Simple 3-region header component:
 * - Left: Logo/brand
 * - Center: Navigation items
 * - Right: Actions/user menu
 * 
 * Max height 70px, no responsive behavior, no hamburger menu.
 */
export const SimpleHeader = React.forwardRef<HTMLElement, SimpleHeaderProps>(
  ({ 
    left,
    navigation = [],
    right,
    height = 64,
    border = true,
    className,
    ...props 
  }, ref) => {
    
    const headerStyles: React.CSSProperties = {
      height: `${height}px`,
      maxHeight: '70px',
      minHeight: '48px',
      backgroundColor: 'var(--background)',
      borderBottom: border ? '1px solid var(--border)' : 'none',
      padding: '0 var(--spacing-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    };

    const regionStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0, // Allow flex shrinking
    };

    const leftRegionStyles: React.CSSProperties = {
      ...regionStyles,
      flex: '0 0 auto', // Don't grow, don't shrink
      marginRight: 'var(--spacing-lg)',
    };

    const centerRegionStyles: React.CSSProperties = {
      ...regionStyles,
      flex: '1 1 auto', // Grow and shrink as needed
      justifyContent: 'center',
      gap: 'var(--spacing-md)',
    };

    const rightRegionStyles: React.CSSProperties = {
      ...regionStyles,
      flex: '0 0 auto', // Don't grow, don't shrink
      marginLeft: 'var(--spacing-lg)',
    };

    const navItemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-xs)',
      padding: 'var(--spacing-sm) var(--spacing-md)',
      borderRadius: 'var(--radius)',
      textDecoration: 'none',
      color: 'var(--foreground)',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all var(--super-fast, 0.1s) ease-out',
      whiteSpace: 'nowrap',
    };

    const renderNavigation = () => {
      if (!navigation || navigation.length === 0) return null;
      
      return (
        <div style={centerRegionStyles}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                ...navItemStyles,
                backgroundColor: item.active ? 'var(--muted)' : 'transparent',
                color: item.active ? 'var(--primary)' : 'var(--foreground)',
                fontWeight: item.active ? '600' : '500',
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = 'var(--muted)';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      );
    };

    return (
      <header
        ref={ref}
        className={clsx('simple-header', className)}
        style={headerStyles}
        {...props}
      >
        {/* Left Region */}
        {left && (
          <div style={leftRegionStyles}>
            {left}
          </div>
        )}

        {/* Center Region - Navigation */}
        {renderNavigation()}

        {/* Right Region */}
        {right && (
          <div style={rightRegionStyles}>
            {right}
          </div>
        )}
      </header>
    );
  }
);

SimpleHeader.displayName = 'SimpleHeader';

export default SimpleHeader;