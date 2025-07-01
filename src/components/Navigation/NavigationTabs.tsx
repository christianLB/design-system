import * as React from 'react';
import clsx from 'clsx';
import { Box } from '@/components/Box';
import { Stack } from '@/components/Stack';
import { TabItem } from './types';

export interface NavigationTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: 'underline' | 'pills' | 'cards' | 'minimal';
  orientation?: 'horizontal' | 'vertical';
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const NavigationTabs = React.forwardRef<HTMLDivElement, NavigationTabsProps>(
  ({
    variant = 'underline',
    orientation = 'horizontal',
    items,
    value: controlledValue,
    defaultValue,
    onChange,
    fullWidth = false,
    centered = false,
    size = 'md',
    className,
    ...props
  }, ref) => {
    
    // Internal state for uncontrolled usage
    const [internalValue, setInternalValue] = React.useState(() => {
      return defaultValue || items[0]?.value || '';
    });
    
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    
    // Handle tab change
    const handleTabChange = React.useCallback((newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [controlledValue, onChange]);
    
    // Size-specific styles
    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return {
            fontSize: '0.75rem',
            padding: '0.375rem 0.75rem',
            gap: 'var(--spacing-xs)',
          };
        case 'lg':
          return {
            fontSize: '1rem',
            padding: '0.75rem 1.5rem',
            gap: 'var(--spacing-md)',
          };
        default:
          return {
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
            gap: 'var(--spacing-sm)',
          };
      }
    };
    
    const sizeStyles = getSizeStyles();
    
    // Variant-specific styles
    const getVariantStyles = () => {
      const baseTab = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeStyles.gap,
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        fontWeight: '500',
        borderRadius: 'var(--radius)',
        transition: 'all 150ms ease-in-out',
        cursor: 'pointer',
        textDecoration: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'var(--foreground-muted)',
        whiteSpace: 'nowrap' as const,
      };
      
      switch (variant) {
        case 'underline':
          return {
            container: {
              borderBottom: '1px solid var(--border)',
              position: 'relative' as const,
            },
            tab: {
              ...baseTab,
              borderRadius: 0,
              borderBottom: '2px solid transparent',
              paddingBottom: 'calc(0.5rem - 1px)',
            },
            activeTab: {
              color: 'var(--primary)',
              borderBottomColor: 'var(--primary)',
            },
            hoverTab: {
              color: 'var(--foreground)',
              backgroundColor: 'var(--background-subtle)',
            },
          };
        
        case 'pills':
          return {
            container: {
              backgroundColor: 'var(--background-subtle)',
              borderRadius: 'var(--radius)',
              padding: '0.25rem',
            },
            tab: {
              ...baseTab,
              borderRadius: 'calc(var(--radius) - 0.125rem)',
            },
            activeTab: {
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            },
            hoverTab: {
              backgroundColor: 'var(--background-hover)',
              color: 'var(--foreground)',
            },
          };
        
        case 'cards':
          return {
            container: {
              gap: '0.25rem',
            },
            tab: {
              ...baseTab,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--background)',
            },
            activeTab: {
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderColor: 'var(--primary)',
            },
            hoverTab: {
              backgroundColor: 'var(--background-hover)',
              borderColor: 'var(--border-hover)',
            },
          };
        
        case 'minimal':
        default:
          return {
            container: {},
            tab: {
              ...baseTab,
              padding: '0.25rem 0.5rem',
            },
            activeTab: {
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-subtle)',
            },
            hoverTab: {
              color: 'var(--foreground)',
              backgroundColor: 'var(--background-subtle)',
            },
          };
      }
    };
    
    const variantStyles = getVariantStyles();
    
    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      alignItems: orientation === 'vertical' ? 'stretch' : 'center',
      justifyContent: centered ? 'center' : 'flex-start',
      width: fullWidth ? '100%' : 'auto',
      ...variantStyles.container,
    };
    
    // Render a tab item
    const renderTab = (item: TabItem) => {
      const isActive = item.value === value;
      const isDisabled = item.disabled;
      
      const tabStyles: React.CSSProperties = {
        ...variantStyles.tab,
        ...(isActive && variantStyles.activeTab),
        ...(isDisabled && {
          opacity: 0.5,
          cursor: 'not-allowed',
          pointerEvents: 'none',
        }),
        ...(fullWidth && orientation === 'horizontal' && {
          flex: 1,
        }),
      };
      
      const handleClick = () => {
        if (!isDisabled) {
          handleTabChange(item.value);
        }
      };
      
      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      };
      
      return (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={isActive}
          aria-disabled={isDisabled}
          tabIndex={isActive ? 0 : -1}
          style={tabStyles}
          className={clsx(
            'navigation-tab',
            isActive && 'navigation-tab--active',
            isDisabled && 'navigation-tab--disabled'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={(e) => {
            if (!isActive && !isDisabled) {
              Object.assign(e.currentTarget.style, variantStyles.hoverTab);
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive && !isDisabled) {
              Object.assign(e.currentTarget.style, {
                ...variantStyles.tab,
                ...(fullWidth && orientation === 'horizontal' && { flex: 1 }),
              });
            }
          }}
        >
          <Stack direction="row" align="center" gap="xs">
            {item.icon && <Box>{item.icon}</Box>}
            <span>{item.label}</span>
            {item.badge && (
              <Box
                style={{
                  backgroundColor: isActive ? 'var(--primary-foreground)' : 'var(--primary)',
                  color: isActive ? 'var(--primary)' : 'var(--primary-foreground)',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.6875rem',
                  fontWeight: '600',
                  lineHeight: 1,
                  minWidth: '1rem',
                  textAlign: 'center' as const,
                }}
              >
                {item.badge}
              </Box>
            )}
          </Stack>
        </button>
      );
    };
    
    // Keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      const currentIndex = items.findIndex(item => item.value === value);
      let nextIndex = currentIndex;
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }
      
      const nextItem = items[nextIndex];
      if (nextItem && !nextItem.disabled) {
        handleTabChange(nextItem.value);
      }
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'navigation-tabs',
          `navigation-tabs--${variant}`,
          `navigation-tabs--${orientation}`,
          `navigation-tabs--${size}`,
          fullWidth && 'navigation-tabs--full-width',
          centered && 'navigation-tabs--centered',
          className
        )}
        style={containerStyles}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {items.map(renderTab)}
      </div>
    );
  }
);

NavigationTabs.displayName = 'NavigationTabs';