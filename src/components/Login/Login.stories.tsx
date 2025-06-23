import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Login } from './Login';
import { ThemeProvider } from '../../theme/ThemeContext';

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
};
export default meta;

type Story = StoryObj<typeof Login>;

export const Primary: Story = {
  render: () => <Login onSubmit={(e) => e.preventDefault()} />,
};
