// Import Tailwind CSS with design system styles
import './tailwind.css';
import type { Preview, StoryFn, Decorator, StoryContext } from '@storybook/react';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';
import React from 'react';

const ThemeWrapper = ({ theme, children }: { theme: 'light' | 'dark'; children: React.ReactNode }) => {
  const { setTheme } = useTheme();
  React.useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);
  return <>{children}</>;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
};

export const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => (
    <ThemeProvider>
      <div style={{ padding: '1rem' }}>
        <ThemeWrapper theme={context.globals.theme as 'light' | 'dark'}>
          <Story {...context.args} />
        </ThemeWrapper>
      </div>
    </ThemeProvider>
  ),
];

export default preview;
