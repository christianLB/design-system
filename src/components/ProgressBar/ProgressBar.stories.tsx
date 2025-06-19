import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    value: 40,
    maxValue: 100,
    variant: 'default',
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Primary: Story = {};

export const Success: Story = { args: { variant: 'success', value: 80 } };
