import React, { useState } from 'react';
import clsx from 'clsx';

export interface TableToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (term: string) => void;
  actions?: React.ReactNode;
  count?: number;
}

export const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  ({ onSearch, actions, count, className, ...props }, ref) => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      onSearch?.(val);
    };
    return (
      <div
        ref={ref}
        className={clsx('mb-2 flex items-center gap-2', className)}
        {...props}
      >
        {onSearch && (
          <input
            type="search"
            value={value}
            onChange={handleChange}
            className="input"
            placeholder="Search..."
          />
        )}
        <div className="flex-1" />
        {count !== undefined && (
          <span className="text-sm text-muted-foreground">{count}</span>
        )}
        {actions}
      </div>
    );
  }
);

TableToolbar.displayName = 'TableToolbar';
