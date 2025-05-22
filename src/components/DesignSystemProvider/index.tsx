import React, { ReactNode, useEffect } from 'react';
import { cn } from '../../utils';
import { ThemeProvider as ThemeProviderContext } from '../../contexts/ThemeContext';

interface DesignSystemProviderProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  theme: initialTheme = 'light',
  className,
}) => {
  return (
    <ThemeProviderContext defaultTheme={initialTheme}>
      <div className={cn(className)}>
        {children}
      </div>
    </ThemeProviderContext>
  );
};

export default DesignSystemProvider;
