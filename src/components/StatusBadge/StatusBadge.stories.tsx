import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Active',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Failed',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Processing',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Draft',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <StatusBadge variant="success" size="sm">Small</StatusBadge>
      <StatusBadge variant="success" size="md">Medium</StatusBadge>
      <StatusBadge variant="success" size="lg">Large</StatusBadge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge variant="success">Success</StatusBadge>
      <StatusBadge variant="warning">Warning</StatusBadge>
      <StatusBadge variant="error">Error</StatusBadge>
      <StatusBadge variant="info">Info</StatusBadge>
      <StatusBadge variant="neutral">Neutral</StatusBadge>
    </div>
  ),
};