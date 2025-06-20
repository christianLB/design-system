import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { lightTheme, darkTheme } from '../theme';

const meta: Meta = {
  title: 'Guides/Responsive Layout',
};
export default meta;

export const TokenExplorer: StoryObj = {
  render: () => (
    <div>
      <p>Breakpoints:</p>
      <pre>{JSON.stringify(lightTheme.breakpoints, null, 2)}</pre>
      <p>Dark theme border color:</p>
      <pre>{JSON.stringify(darkTheme.borders, null, 2)}</pre>
    </div>
  ),
};
