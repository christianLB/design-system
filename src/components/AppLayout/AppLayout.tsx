import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';

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
    const { theme } = useTheme();
    const isFuturistic = theme === 'futuristic';

    const layout = (
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

    if (isFuturistic) {
      return (
        <div className="futuristic-wrap">
          <div className="futuristic-bg" />
          {layout}
        </div>
      );
    }

    return layout;
  }
);

AppLayout.displayName = 'AppLayout';

export default AppLayout;
