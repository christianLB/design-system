import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Core Components/Navigation/Breadcrumbs',
  component: Breadcrumb,
  args: {
    items: [
      { name: 'Home', href: '#' },
      { name: 'Library', href: '#' },
      { name: 'Data', href: '#' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Primary: Story = {};

export const CustomSeparator: Story = {
  args: { separator: '/' },
};
