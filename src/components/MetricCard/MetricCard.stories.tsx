import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Core Components/Data Display/Metric Card',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const WithChange: Story = {
  args: {
    title: 'Revenue',
    value: '$45,231',
    change: 12.5,
    status: 'success',
    trend: 'up',
    icon: 'DollarSign',
  },
};
