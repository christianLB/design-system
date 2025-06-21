import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppLayout } from './AppLayout';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  args: {
    navbar: <Navbar items={[{ label: 'Home', href: '#' }]} />,
    sidebar: <Sidebar items={[{ label: 'Dashboard', href: '#' }]} />,
    children: <div>Content</div>,
  },
};
export default meta;

type Story = StoryObj<typeof AppLayout>;

export const Primary: Story = {};
