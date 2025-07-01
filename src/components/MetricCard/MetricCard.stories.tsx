import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'neutral'],
    },
    trend: {
      control: 'select', 
      options: ['up', 'down', 'stable'],
    },
    showGlow: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMetric: Story = {
  args: {
    title: 'Total Users',
    value: '12,847',
    icon: 'Users',
  },
};

export const WithPositiveChange: Story = {
  args: {
    title: 'Revenue',
    value: '$45,231',
    change: 12.5,
    status: 'success',
    trend: 'up',
    icon: 'DollarSign',
  },
};

export const WithNegativeChange: Story = {
  args: {
    title: 'Bounce Rate',
    value: '3.4%',
    change: -8.2,
    status: 'warning',
    trend: 'down',
    icon: 'TrendingDown',
  },
};

export const WithGlow: Story = {
  args: {
    title: 'Active Sessions',
    value: '1,234',
    change: 23.1,
    status: 'success',
    trend: 'up',
    icon: 'Activity',
    showGlow: true,
  },
};

export const MetricGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      <MetricCard
        title="Total Users"
        value="12,847"
        change={12.5}
        status="success"
        trend="up"
        icon="Users"
      />
      <MetricCard
        title="Revenue"
        value="$45,231"
        change={-3.4}
        status="warning"
        trend="down"
        icon="DollarSign"
      />
      <MetricCard
        title="Conversion Rate"
        value="3.24%"
        change={0.8}
        status="success"
        trend="up"
        icon="Target"
        showGlow
      />
      <MetricCard
        title="Server Load"
        value="78%"
        status="neutral"
        icon="Server"
      />
    </div>
  ),
};