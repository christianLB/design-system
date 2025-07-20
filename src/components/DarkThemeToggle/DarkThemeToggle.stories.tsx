import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DarkThemeToggle } from './DarkThemeToggle';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof DarkThemeToggle> = {
  title: 'Core Components/Specialized/Theme Rotator',
  component: DarkThemeToggle,
  parameters: {
    docs: {
      description: {
        component:
          'A theme rotation component that cycles through all 4 available themes: Light → Dark → Futuristic → Cyberpunk. Click the button to switch themes dynamically.',
      },
    },
  },
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

export const InitialFuturistic: Story = {
  render: () => {
    localStorage.setItem('vite-ui-theme', 'futuristic');
    return (
      <ThemeProvider>
        <DarkThemeToggle />
      </ThemeProvider>
    );
  },
};

export const InitialCyberpunk: Story = {
  render: () => {
    localStorage.setItem('vite-ui-theme', 'cyberpunk');
    return (
      <ThemeProvider>
        <DarkThemeToggle />
      </ThemeProvider>
    );
  },
};

// Showcase all 4 themes
export const FourThemeCycle: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = React.useState('light');

    const themes = ['light', 'dark', 'futuristic', 'cyberpunk'];
    const themeDescriptions = {
      light: 'Clean, minimal light theme for everyday use',
      dark: 'Professional dark theme with reduced eye strain',
      futuristic: 'High-tech theme with glowing elements and animations',
      cyberpunk: 'Matrix-inspired theme with neon colors and digital effects',
    };

    const cycleTheme = () => {
      const currentIndex = themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const nextTheme = themes[nextIndex];
      setCurrentTheme(nextTheme);
      localStorage.setItem('vite-ui-theme', nextTheme);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Four Theme Cycle Demonstration</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Click the theme toggle to cycle through: Light → Dark → Futuristic → Cyberpunk
          </p>
          <div className="p-4 border rounded-lg bg-background">
            <div className="mb-4">
              <strong>Current Theme:</strong>{' '}
              {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
            </div>
            <div className="mb-4 text-sm">
              {themeDescriptions[currentTheme as keyof typeof themeDescriptions]}
            </div>
            <ThemeProvider>
              <div className="flex items-center justify-center gap-4">
                <DarkThemeToggle />
                <button
                  onClick={cycleTheme}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                >
                  Manually Cycle Theme
                </button>
              </div>
            </ThemeProvider>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <div
              key={theme}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                currentTheme === theme ? 'ring-2 ring-primary bg-accent' : 'hover:bg-accent/50'
              }`}
              onClick={() => {
                setCurrentTheme(theme);
                localStorage.setItem('vite-ui-theme', theme);
              }}
            >
              <div className="text-center">
                <div className="font-semibold capitalize mb-2">{theme}</div>
                <div
                  className={`w-full h-8 rounded mb-2 ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-gray-100 to-white border'
                      : theme === 'dark'
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900'
                        : theme === 'futuristic'
                          ? 'bg-gradient-to-r from-blue-900 to-cyan-900'
                          : 'bg-gradient-to-r from-green-900 to-red-900'
                  }`}
                ></div>
                <div className="text-xs text-muted-foreground">
                  {theme === 'light' && '☀️ Bright & Clean'}
                  {theme === 'dark' && '🌙 Professional'}
                  {theme === 'futuristic' && '🚀 High-tech'}
                  {theme === 'cyberpunk' && '⚡ Digital Reality'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
