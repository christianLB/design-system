'use client';

import * as React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils';

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * A button component for toggling between light and dark themes.
 * @component
 * @example
 * <ThemeToggle />
 */
const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        ref={ref}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className={cn(
          'rounded-md p-2 h-9 w-9',
          'border border-border bg-background text-foreground',
          'hover:bg-muted hover:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'transition-colors',
          className
        )}
        onClick={toggleTheme}
        {...props}
      >
        {theme === 'dark' ? (
          // Sun icon
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ) : (
          // Moon icon
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )}
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle };
