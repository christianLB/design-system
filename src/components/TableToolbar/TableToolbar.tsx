import React from 'react';

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  count?: number;
}

export const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  ({ onSearch, actions, count, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`table-toolbar flex items-center justify-between mb-[var(--spacing-sm)] ${className || ''}`}
        {...props}
      >
        <div className="flex items-center gap-[var(--spacing-sm)]">
          {onSearch && (
            <input
              type="text"
              aria-label="Search"
              onChange={e => onSearch(e.target.value)}
              className="input"
            />
          )}
          {typeof count === 'number' && (
            <span className="text-sm text-gray-500">{count} items</span>
          )}
        </div>
        <div className="flex items-center gap-[var(--spacing-sm)]">{actions}</div>
      </div>
    );
  }
);

TableToolbar.displayName = 'TableToolbar';
