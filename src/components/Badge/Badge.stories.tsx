import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Core Components/Data Display/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};

export const WithClass: Story = {
  args: { className: 'bg-blue-500 text-white' },
};
