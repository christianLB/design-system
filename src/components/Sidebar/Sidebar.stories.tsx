import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Users', href: '#', items: [{ label: 'List', href: '#' }] },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {};

export const Collapsed: Story = {
  args: { collapsed: true },
};
