import React, { createContext, useContext, useEffect, useState } from 'react';
import theme from '../theme/theme';

export type Breakpoint = 'base' | keyof typeof theme.breakpoints;

const order: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

const getBreakpoint = (width: number): Breakpoint => {
  const { breakpoints } = theme;
  if (width >= parseInt(breakpoints.xl)) return 'xl';
  if (width >= parseInt(breakpoints.lg)) return 'lg';
  if (width >= parseInt(breakpoints.md)) return 'md';
  if (width >= parseInt(breakpoints.sm)) return 'sm';
  return 'base';
};

const ResponsiveContext = createContext<Breakpoint>('base');

export const ResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [bp, setBp] = useState<Breakpoint>(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handler = () => setBp(getBreakpoint(window.innerWidth));
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return <ResponsiveContext.Provider value={bp}>{children}</ResponsiveContext.Provider>;
};

export const useBreakpoint = () => useContext(ResponsiveContext);

export const useResponsiveValue = <T,>(values: T[]): T => {
  const bp = useBreakpoint();
  const index = order.indexOf(bp);
  for (let i = index; i >= 0; i--) {
    if (values[i] !== undefined) {
      return values[i] as T;
    }
  }
  return values[0];
};
