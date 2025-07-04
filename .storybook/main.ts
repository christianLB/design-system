import type { StorybookConfig } from '@storybook/react-vite';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read version from package.json
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
const version = packageJson.version;

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(ts|tsx|mdx)',
    '../src/docs/**/*.stories.@(mdx|tsx)',
    '../src/examples/**/*.stories.@(ts|tsx|mdx)',
    '../src/stories/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  features: {
    // @ts-ignore - The Storybook types for Vite do not seem to include this valid option
    storiesJson: true,
  },
  env: (config) => ({
    ...config,
    STORYBOOK_PACKAGE_VERSION: version,
  }),
  viteFinal: async (config) => {
    // Inject version as global variable for manager
    config.define = {
      ...config.define,
      '__STORYBOOK_PACKAGE_VERSION__': JSON.stringify(version),
    };
    return config;
  },
  managerEntries: [require.resolve('./manager.js')],
};

export default config;
