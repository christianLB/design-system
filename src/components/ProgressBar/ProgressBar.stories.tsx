import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Core Components/Feedback/Progress Bar',
  component: ProgressBar,
  args: {
    value: 40,
    maxValue: 100,
    variant: 'default',
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = { args: { variant: 'default' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Success: Story = { args: { variant: 'success', value: 80 } };
export const Warning: Story = { args: { variant: 'warning', value: 60 } };
export const Danger: Story = { args: { variant: 'danger', value: 20 } };
export const Info: Story = { args: { variant: 'info', value: 75 } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ProgressBar value={40} variant="primary" size="sm" />
      <ProgressBar value={60} variant="primary" size="md" />
      <ProgressBar value={80} variant="primary" size="lg" />
    </div>
  ),
};

export const Indeterminate: Story = { args: { isIndeterminate: true } };
