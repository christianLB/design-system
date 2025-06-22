import * as React from 'react';
import clsx from 'clsx';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={clsx(
          'w-full bg-background-emphasis text-foreground-emphasis',
          className
        )}
        {...props}
      >
        {children}
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header };
