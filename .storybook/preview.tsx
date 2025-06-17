// Import Tailwind CSS with design system styles
import './tailwind.css';
import type { Preview, StoryFn, Decorator, StoryContext } from '@storybook/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
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
      <Story {...context.args} />
    </ThemeProvider>
    );
  },
];

export default preview;
