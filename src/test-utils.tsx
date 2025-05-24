/**
 * Test utilities for React components in Vitest
 */
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach } from 'vitest';

/**
 * Custom renderer for React components
 * Creates a fresh container for each test to avoid "Cannot update an unmounted root" errors
 */
export function render(element: React.ReactElement) {
  // Create a fresh root element for each test
  const rootContainer = document.createElement('div');
  document.body.appendChild(rootContainer);
  const reactRoot = createRoot(rootContainer);
  
  // Render the component
  reactRoot.render(element);
  
  // Store root for cleanup
  const roots = window.__VITEST_REACT_ROOTS__ = window.__VITEST_REACT_ROOTS__ || [];
  roots.push({ rootContainer, reactRoot });
  
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

// Add this to global Window type
declare global {
  interface Window {
    __VITEST_REACT_ROOTS__?: Array<{
      rootContainer: HTMLElement;
      reactRoot: ReturnType<typeof createRoot>;
    }>;
  }
}

// Clean up after each test
afterEach(() => {
  const roots = window.__VITEST_REACT_ROOTS__ || [];
  
  // Unmount all roots
  roots.forEach(({ reactRoot, rootContainer }) => {
    reactRoot.unmount();
    if (rootContainer.parentNode) {
      rootContainer.parentNode.removeChild(rootContainer);
    }
  });
  
  // Reset roots array
  window.__VITEST_REACT_ROOTS__ = [];
});
