import * as React from 'react';
import clsx from 'clsx';
import { Box } from '@/components/Box';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional padding for the inner Box container
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ children, className, padding = 'md', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={clsx(
          'w-full bg-background-emphasis text-foreground-emphasis',
          className
        )}
        {...props}
      >
        <Box className={padding !== 'none' ? `p-${padding}` : ''}>
          {children}
        </Box>
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header };
