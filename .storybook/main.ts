import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../components/**/*.stories.@(ts|tsx)', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-backgrounds',
  ],
  docs: {
    autodocs: true,
  },
  core: {
    builder: '@storybook/builder-vite',
  },
};

export default config;