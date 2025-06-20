// Import Tailwind CSS with design system styles
import './tailwind.css';
import type { Preview, StoryFn, Decorator, StoryContext } from '@storybook/react';
import { ThemeProvider } from '@/theme/ThemeContext';
import { DarkThemeToggle } from '@/components/DarkThemeToggle/DarkThemeToggle';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => {
    return (
      <ThemeProvider>
        <div style={{ padding: '1rem' }}>
          <DarkThemeToggle />
        </div>
        <Story {...context.args} />
      </ThemeProvider>
    );
  },
];

export default preview;
