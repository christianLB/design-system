import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Login } from './Login';

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
};
export default meta;

type Story = StoryObj<typeof Login>;

export const Primary: Story = {
  render: () => <Login onSubmit={(e) => e.preventDefault()} />,
};
