// Import Tailwind CSS with design system styles
import './tailwind.css';
import type {
  Preview,
  StoryFn,
  Decorator,
  StoryContext,
} from '@storybook/react';
import { ThemeProvider, useTheme, type Theme } from '@/theme/ThemeContext';
import React from 'react';
import clsx from 'clsx';

const ThemeWrapper = ({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) => {
  const { setTheme } = useTheme();
  React.useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);
  return <>{children}</>;
};

const FuturisticDecorator = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className={clsx(theme === 'futuristic' && 'futuristic-wrap')}>
      {theme === 'futuristic' && <div className="futuristic-bg" aria-hidden />}
      {children}
    </div>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    // Add version info to parameters - use global variable instead of process.env
    version: (globalThis as any).__STORYBOOK_PACKAGE_VERSION__ || '3.3.2',
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
          { value: 'futuristic', title: 'Futuristic' },
        ],
      },
    },
  },
};

export const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => (
    <ThemeProvider>
      <div style={{ padding: '1rem' }}>
        <ThemeWrapper theme={context.globals.theme as Theme}>
          <FuturisticDecorator>
            <Story {...context.args} />
          </FuturisticDecorator>
        </ThemeWrapper>
      </div>
    </ThemeProvider>
  ),
];

export default preview;
