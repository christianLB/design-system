/**
 * Test utilities for React components in Vitest
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach } from 'vitest';

// Setup a container for tests
let rootContainer: HTMLElement | null = null;
let reactRoot: ReturnType<typeof createRoot> | null = null;

/**
 * Custom renderer for React components
 */
export function render(element: React.ReactElement) {
  // Create root element if it doesn't exist
  if (!rootContainer) {
    rootContainer = document.createElement('div');
    document.body.appendChild(rootContainer);
    reactRoot = createRoot(rootContainer);
  }
  
  // Render the component
  if (!reactRoot) {
    throw new Error('React root is not initialized');
  }
  reactRoot.render(element);
  
  // Return utilities
  return {
    container: rootContainer,
    getByText: (text: string) => {
      const nodes = Array.from(rootContainer?.querySelectorAll('*') || []);
      return nodes.find(node => node.textContent === text);
    },
    queryByTestId: (testId: string) => {
      return rootContainer?.querySelector(`[data-testid="${testId}"]`);
    }
  };
}

// Clean up after each test
afterEach(() => {
  if (reactRoot) {
    reactRoot.unmount();
  }
});
