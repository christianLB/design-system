import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Core Components/Feedback/Alert',
  component: Alert,
  args: {
    title: 'Heads up!',
    description: 'Something happened',
    variant: 'info',
  },
  argTypes: { onClose: { action: 'closed' } },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {};
export const Success: Story = { args: { variant: 'success' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const WithAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <button className="btn-sm">Undo</button>
    </Alert>
  ),
};
