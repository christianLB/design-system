import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Remove vite-plugin-inspect if it exists to avoid conflicts
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => {
        if (!plugin || typeof plugin !== 'object') return true;
        const pluginName = plugin.name || (plugin as any).enforce;
        return pluginName !== 'vite-plugin-inspect';
      });
    }
    
    // Import required modules
    const path = await import('path');
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      define: {
        // Ensure NODE_ENV is available for Tailwind config
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
      assetsInclude: ['/sb-preview/runtime.js'], // Bug workaround for Storybook
    });
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;