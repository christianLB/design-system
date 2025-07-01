import * as React from 'react';
import clsx from 'clsx';
import { Box } from '@/components/Box';
import { Stack } from '@/components/Stack';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';
import { BreadcrumbItem } from './types';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeHref?: string;
  variant?: 'default' | 'compact' | 'pills';
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    items,
    separator = <Icon name="ChevronRight" size="sm" />,
    maxItems = 5,
    showHome = true,
    homeHref = '/',
    variant = 'default',
    className,
    ...props
  }, ref) => {
    
    // Build the full items array including home if needed
    const allItems = React.useMemo(() => {
      const itemsToProcess = [...items];
      
      if (showHome && itemsToProcess[0]?.href !== homeHref) {
        itemsToProcess.unshift({
          label: 'Home',
          href: homeHref,
          icon: <Icon name="Home" size="sm" />,
        });
      }
      
      return itemsToProcess;
    }, [items, showHome, homeHref]);
    
    // Handle maxItems by showing first, last, and middle items with ellipsis
    const displayItems = React.useMemo(() => {
      if (allItems.length <= maxItems) {
        return allItems;
      }
      
      const firstItems = allItems.slice(0, 1);
      const lastItems = allItems.slice(-2);
      const middleCount = maxItems - firstItems.length - lastItems.length - 1; // -1 for ellipsis
      
      if (middleCount > 0) {
        const middleStart = Math.max(1, allItems.length - lastItems.length - middleCount);
        const middleItems = allItems.slice(middleStart, middleStart + middleCount);
        
        return [
          ...firstItems,
          { label: '...', href: undefined, icon: undefined },
          ...middleItems,
          ...lastItems,
        ];
      }
      
      return [
        ...firstItems,
        { label: '...', href: undefined, icon: undefined },
        ...lastItems,
      ];
    }, [allItems, maxItems]);
    
    // Variant-specific styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'compact':
          return {
            container: {
              fontSize: '0.75rem',
            },
            item: {
              padding: '0.125rem 0.25rem',
            },
            separator: {
              margin: '0 0.25rem',
            },
          };
        case 'pills':
          return {
            container: {
              backgroundColor: 'var(--background-subtle)',
              borderRadius: 'var(--radius)',
              padding: '0.25rem',
            },
            item: {
              padding: '0.25rem 0.5rem',
              borderRadius: 'calc(var(--radius) - 0.125rem)',
              backgroundColor: 'transparent',
              transition: 'background-color 150ms ease-in-out',
            },
            separator: {
              margin: '0 0.125rem',
            },
          };
        default:
          return {
            container: {},
            item: {
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius)',
              transition: 'all 150ms ease-in-out',
            },
            separator: {
              margin: '0 0.5rem',
              color: 'var(--foreground-muted)',
            },
          };
      }
    };
    
    const variantStyles = getVariantStyles();
    
    // Render a breadcrumb item
    const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
      const itemContent = (
        <Stack direction="row" align="center" gap="xs">
          {item.icon && <Box>{item.icon}</Box>}
          <span>{item.label}</span>
        </Stack>
      );
      
      const itemStyle = {
        ...variantStyles.item,
        ...(isLast && {
          color: 'var(--foreground)',
          fontWeight: '500',
          ...(variant === 'pills' && {
            backgroundColor: 'var(--background)',
          }),
        }),
        ...(item.label === '...' && {
          cursor: 'default',
          color: 'var(--foreground-muted)',
        }),
      };
      
      if (item.href && !isLast && item.label !== '...') {
        return (
          <Link
            key={`${item.href}-${index}`}
            href={item.href}
            variant="subtle"
            style={itemStyle}
            className="breadcrumb-item breadcrumb-item--link"
          >
            {itemContent}
          </Link>
        );
      }
      
      return (
        <Box
          key={`${item.label}-${index}`}
          style={itemStyle}
          className={clsx(
            'breadcrumb-item',
            isLast && 'breadcrumb-item--current',
            item.label === '...' && 'breadcrumb-item--ellipsis'
          )}
        >
          {itemContent}
        </Box>
      );
    };
    
    return (
      <nav
        ref={ref}
        className={clsx(
          'breadcrumb',
          `breadcrumb--${variant}`,
          className
        )}
        style={variantStyles.container}
        aria-label="Breadcrumb navigation"
        {...props}
      >
        <Stack direction="row" align="center">
          {displayItems.map((item, index) => (
            <React.Fragment key={`fragment-${index}`}>
              {renderItem(item, index, index === displayItems.length - 1)}
              {index < displayItems.length - 1 && (
                <Box
                  className="breadcrumb-separator"
                  style={variantStyles.separator}
                  aria-hidden="true"
                >
                  {separator}
                </Box>
              )}
            </React.Fragment>
          ))}
        </Stack>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';