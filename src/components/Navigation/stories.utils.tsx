import React from 'react';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { ThemeProvider } from '../../theme/ThemeContext';

export const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Documentation', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'About', href: '#' },
];

export const logoElement = <span className="font-bold text-lg">FutureDash</span>;
export const ctaElement = <Button variant="primary">Sign Up</Button>;

/**
 * Standard wrapper for navigation stories with ThemeProvider
 */
export const withTheme = (Story: React.ComponentType) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

/**
 * Light background decorator for navigation components
 */
export const withLightBackground = (Story: React.ComponentType) => (
  <Box className="w-full bg-neutral-100 p-4">
    <Story />
  </Box>
);

/**
 * Dark background decorator for navigation components
 */
export const withDarkBackground = (Story: React.ComponentType) => (
  <Box className="w-full bg-neutral-900 text-white p-4">
    <Story />
  </Box>
);

/**
 * Sidebar/stack layout container
 */
export const withStackContainer = (Story: React.ComponentType) => (
  <Box className="w-64 bg-neutral-100 p-4">
    <Story />
  </Box>
);

/**
 * Mobile viewport container
 */
export const mobileViewport = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
