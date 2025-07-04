// Import Tailwind CSS with design system styles
import './tailwind.css';
import './cyberpunk-fix.css';
import type {
  Preview,
  StoryFn,
  Decorator,
  StoryContext,
} from '@storybook/react';
// Import real ThemeProvider for scalability and component compatibility
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { lightTheme } from '../src/theme/theme.light';
import { darkTheme } from '../src/theme/theme.dark';
import { futuristicTheme } from '../src/theme/theme.futuristic';
import { cyberpunkTheme } from '../src/theme/theme.cyberpunk';
import React from 'react';
import clsx from 'clsx';

// Theme mapping for Storybook compatibility and future extensibility
const STORYBOOK_THEME_MAP = {
  light: lightTheme,
  dark: darkTheme,
  futuristic: futuristicTheme,
  cyberpunk: cyberpunkTheme,
} as const;

export type StorybookTheme = keyof typeof STORYBOOK_THEME_MAP;

// Storybook Theme Manager - handles theme switching with real ThemeProvider
const StorybookThemeManager = ({
  storybookTheme,
  children,
}: {
  storybookTheme: StorybookTheme;
  children: React.ReactNode;
}) => {
  const { theme, setTheme, setVariant } = useTheme();
  const [isLocalControl, setIsLocalControl] = React.useState(false);
  
  React.useEffect(() => {
    // Only sync from Storybook if we're not in local control mode
    if (!isLocalControl) {
      // Pass theme name directly to setTheme - it expects a string, not an object
      setTheme(storybookTheme);
      
      // Set appropriate variant for theme extensibility
      // Note: Themes are not variants. Keep variant as 'default' for all themes
      setVariant('default');
    }
  }, [storybookTheme, setTheme, setVariant, isLocalControl]);

  // Enable local control when theme changes independently from Storybook
  React.useEffect(() => {
    if (theme !== storybookTheme) {
      setIsLocalControl(true);
      
      // Reset local control after 5 seconds to allow Storybook to take over again
      const timeout = setTimeout(() => {
        setIsLocalControl(false);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [theme, storybookTheme]);

  return <>{children}</>;
};

// Enhanced Theme Decorator with background effects and scalable architecture
const ThemeDecorator = ({ children }: { children: React.ReactNode }) => {
  const { variant, theme } = useTheme();
  
  // Determine theme name from theme object
  const themeName = theme?.meta?.name?.toLowerCase() || 'light';
  
  return (
    <div 
      className={clsx(
        // Base theme wrapper classes
        'storybook-theme-wrapper',
        // Theme-specific wrapper classes for future extensibility
        themeName.includes('futuristic') && 'futuristic-wrap',
        themeName.includes('cyberpunk') && 'cyberpunk-wrap',
        // Data attributes for CSS targeting
      )}
      data-theme={themeName}
      data-storybook-theme="true"
    >
      {/* Background effects for immersive themes */}
      {themeName.includes('futuristic') && <div className="futuristic-bg" aria-hidden />}
      {themeName.includes('cyberpunk') && <div className="cyberpunk-bg" aria-hidden />}
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
          { value: 'cyberpunk', title: 'Cyberpunk' },
        ],
      },
    },
  },
};

// Scalable decorator system using real ThemeProvider
export const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => (
    <ThemeProvider>
      <div style={{ padding: '1rem' }}>
        <StorybookThemeManager storybookTheme={context.globals.theme as StorybookTheme}>
          <ThemeDecorator>
            <Story {...context.args} />
          </ThemeDecorator>
        </StorybookThemeManager>
      </div>
    </ThemeProvider>
  ),
];

export default preview;
