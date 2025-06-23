import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './theme/ThemeContext';

/**
 * Custom render method that includes ThemeProvider
 * Use this instead of the default render from @testing-library/react
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => render(ui, { wrapper: TestThemeProvider, ...options });

/**
 * Theme provider wrapper component for tests
 */
export function TestThemeProvider({ children }: { children: React.ReactNode }) {
  // We use the 'light' theme for consistent test results
  return <ThemeProvider>{children}</ThemeProvider>;
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method with our custom version
export { customRender as render };
