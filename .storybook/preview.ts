// Use the compiled global styles for Storybook
// The CSS entry lives at the project root, not under src
import '../index.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
