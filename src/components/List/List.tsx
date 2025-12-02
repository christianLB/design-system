/**
 * List Component
 *
 * A versatile list component for displaying collections of items
 * with support for selection, actions, and grouping.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const listVariants = cva('', {
  variants: {
    variant: {
      default: 'divide-y divide-border',
      bordered: 'border border-border rounded-lg divide-y divide-border',
      card: 'space-y-2',
      flush: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const listItemVariants = cva('flex items-center gap-3 transition-colors', {
  variants: {
    variant: {
      default: 'bg-background hover:bg-muted/50',
      bordered: 'bg-background hover:bg-muted/50',
      card: 'bg-card border border-border rounded-lg hover:bg-muted/50',
      flush: 'hover:bg-muted/50',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3',
      lg: 'px-5 py-4 text-lg',
    },
    interactive: {
      true: 'cursor-pointer',
      false: '',
    },
    selected: {
      true: 'bg-primary/10',
      false: '',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    interactive: false,
    selected: false,
    disabled: false,
  },
});

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  meta?: React.ReactNode;
  disabled?: boolean;
  href?: string;
}

export interface ListProps<T extends ListItem>
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>,
    VariantProps<typeof listVariants> {
  /** List items */
  items: T[];
  /** Selected item IDs */
  selected?: string[];
  /** Selection mode */
  selectionMode?: 'none' | 'single' | 'multiple';
  /** Item click handler */
  onItemClick?: (item: T) => void;
  /** Selection change handler */
  onSelect?: (items: T[]) => void;
  /** Render custom item content */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** Item actions slot */
  itemActions?: (item: T) => React.ReactNode;
  /** Show chevron on interactive items */
  showChevron?: boolean;
  /** Animate items */
  animated?: boolean;
  /** Empty state */
  emptyState?: React.ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Number of skeleton rows when loading */
  skeletonCount?: number;
  /** Group items by key */
  groupBy?: keyof T;
  /** Custom group header renderer */
  renderGroupHeader?: (groupKey: string, items: T[]) => React.ReactNode;
}

function ListItemSkeleton({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 'h-12', md: 'h-16', lg: 'h-20' };
  return (
    <div className={cn('flex items-center gap-3 px-4', heights[size])}>
      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
        <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function List<T extends ListItem>({
  items,
  variant,
  size = 'md',
  selected = [],
  selectionMode = 'none',
  onItemClick,
  onSelect,
  renderItem,
  itemActions,
  showChevron = false,
  animated = true,
  emptyState,
  isLoading,
  skeletonCount = 3,
  groupBy,
  renderGroupHeader,
  className,
  ...props
}: ListProps<T>) {
  const handleItemClick = (item: T) => {
    if (item.disabled) return;

    if (selectionMode === 'single') {
      onSelect?.([item]);
    } else if (selectionMode === 'multiple') {
      const isSelected = selected.includes(item.id);
      const newSelected = isSelected
        ? items.filter((i) => selected.includes(i.id) && i.id !== item.id)
        : [...items.filter((i) => selected.includes(i.id)), item];
      onSelect?.(newSelected);
    }

    onItemClick?.(item);
  };

  const isInteractive = selectionMode !== 'none' || !!onItemClick;

  const itemAnimation = animated
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2 },
      }
    : {};

  // Group items if groupBy is specified
  const groupedItems = React.useMemo(() => {
    if (!groupBy) return { '': items };

    return items.reduce(
      (acc, item) => {
        const key = String(item[groupBy] ?? 'Other');
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<string, T[]>,
    );
  }, [items, groupBy]);

  if (isLoading) {
    return (
      <ul className={cn(listVariants({ variant, size }), className)} {...props}>
        {[...Array(skeletonCount)].map((_, i) => (
          <li key={i}>
            <ListItemSkeleton size={size || 'md'} />
          </li>
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return emptyState ? (
      <>{emptyState}</>
    ) : (
      <div className="py-8 text-center text-muted-foreground">No items</div>
    );
  }

  const renderListItem = (item: T, index: number) => {
    const isSelected = selected.includes(item.id);

    if (renderItem) {
      return renderItem(item, index);
    }

    return (
      <>
        {/* Selection indicator */}
        {selectionMode !== 'none' && (
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-full border',
              isSelected ? 'bg-primary border-primary' : 'border-input',
            )}
          >
            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>
        )}

        {/* Avatar or icon */}
        {item.avatar && (
          <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        )}
        {item.icon && !item.avatar && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            {item.icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{item.title}</div>
          {item.description && (
            <div className="text-sm text-muted-foreground truncate">{item.description}</div>
          )}
        </div>

        {/* Meta */}
        {item.meta && <div className="text-sm text-muted-foreground">{item.meta}</div>}

        {/* Actions */}
        {itemActions && <div onClick={(e) => e.stopPropagation()}>{itemActions(item)}</div>}

        {/* Chevron */}
        {showChevron && isInteractive && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </>
    );
  };

  return (
    <ul
      className={cn(listVariants({ variant, size }), className)}
      role={selectionMode !== 'none' ? 'listbox' : 'list'}
      aria-multiselectable={selectionMode === 'multiple'}
      {...props}
    >
      <AnimatePresence>
        {Object.entries(groupedItems).map(([groupKey, groupItems]) => (
          <React.Fragment key={groupKey}>
            {/* Group header */}
            {groupBy && groupKey && (
              <li className="sticky top-0 bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {renderGroupHeader ? renderGroupHeader(groupKey, groupItems) : groupKey}
              </li>
            )}

            {/* Group items */}
            {groupItems.map((item, index) => {
              const isSelected = selected.includes(item.id);
              const ItemWrapper = animated ? motion.li : 'li';

              return (
                <ItemWrapper
                  key={item.id}
                  className={cn(
                    listItemVariants({
                      variant,
                      size,
                      interactive: isInteractive,
                      selected: isSelected,
                      disabled: item.disabled,
                    }),
                  )}
                  onClick={() => handleItemClick(item)}
                  role={selectionMode !== 'none' ? 'option' : undefined}
                  aria-selected={selectionMode !== 'none' ? isSelected : undefined}
                  aria-disabled={item.disabled}
                  tabIndex={isInteractive && !item.disabled ? 0 : undefined}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                  {...(animated ? itemAnimation : {})}
                >
                  {renderListItem(item, index)}
                </ItemWrapper>
              );
            })}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </ul>
  );
}

List.displayName = 'List';

export { listVariants, listItemVariants };
export default List;
