import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DarkThemeToggle } from './DarkThemeToggle';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof DarkThemeToggle> = {
  title: 'Components/DarkThemeToggle',
  component: DarkThemeToggle,
};
export default meta;

type Story = StoryObj<typeof DarkThemeToggle>;

export const Primary: Story = {
  render: () => (
    <ThemeProvider>
      <DarkThemeToggle />
    </ThemeProvider>
  ),
};

export const InitialDark: Story = {
  render: () => {
    localStorage.setItem('vite-ui-theme', 'dark');
    return (
      <ThemeProvider>
        <DarkThemeToggle />
      </ThemeProvider>
    );
  },
};
