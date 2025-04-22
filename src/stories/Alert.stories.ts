import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../../components/Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info Alert',
    children: 'This is an informational alert.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success Alert',
    children: 'This is a success alert.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning Alert',
    children: 'This is a warning alert.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error Alert',
    children: 'This is an error alert.',
  },
};