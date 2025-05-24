import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock matchMedia for test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true
});

describe('ThemeToggle Component', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <ThemeToggle data-testid="theme-toggle" />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});