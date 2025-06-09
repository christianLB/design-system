import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';
import { DesignSystemProvider } from '../src/components/DesignSystemProvider';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <DesignSystemProvider>
        <Story />
      </DesignSystemProvider>
    ),
  ],
};

export default preview;
