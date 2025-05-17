import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.mdx',
    '../stories/*.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  // Simplified TypeScript configuration
  typescript: {
    check: false,
    reactDocgen: false
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true
  }
};

export default config;