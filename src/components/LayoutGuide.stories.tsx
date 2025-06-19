import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import tokens from '../theme/tokens.json';

const meta: Meta = {
  title: 'Guides/Responsive Layout',
};
export default meta;

export const TokenExplorer: StoryObj = {
  render: () => (
    <div>
      <p>Breakpoints:</p>
      <pre>{JSON.stringify(tokens.breakpoints, null, 2)}</pre>
    </div>
  ),
};
