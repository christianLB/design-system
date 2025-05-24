/**
 * Script to fix the ThemeToggle test by properly mocking window.matchMedia
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Fix for ThemeToggle test
const themeToggleTestFix = {
  component: 'ThemeToggle',
  file: '__tests__/ThemeToggle.test.tsx',
  content: `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock matchMedia for test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
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
});`
};

// Function to fix ThemeToggle test
const fixThemeToggleTest = () => {
  const { component, file, content } = themeToggleTestFix;
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  fs.writeFileSync(filePath, content);
  console.log(`  Fixed ${component}/${file} with proper mocks for matchMedia and localStorage`);
  return true;
};

// Main function
const fixTestFailure = () => {
  console.log('Fixing ThemeToggle test failure by adding proper mocks...\n');
  
  // Fix ThemeToggle test
  fixThemeToggleTest();
  
  console.log('\nTest fix applied. Please run tests to verify.');
};

// Run the script
fixTestFailure();
