import React from 'react';
import clsx from 'clsx';

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Provides a basic application layout with optional navbar and sidebar.
 */
export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  ({ navbar, sidebar, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex flex-col min-h-screen', className)}
        {...props}
      >
        {navbar}
        <div className="flex flex-1">
          {sidebar}
          <main className="flex-1 p-[var(--spacing-md)]">{children}</main>
        </div>
      </div>
    );
  }
);

AppLayout.displayName = 'AppLayout';

export default AppLayout;
