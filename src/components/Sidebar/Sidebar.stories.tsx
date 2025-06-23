import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sidebar } from './Sidebar';
import { Icon } from '@/components/Icon';
import {
  withTheme,
  withLightBackground,
  withDarkBackground
} from '../Navigation/stories.utils';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  decorators: [withTheme],
  args: {
    items: [
      { label: 'Dashboard', href: '#', icon: <Icon name="Home" size="sm" /> },
      { label: 'Analytics', href: '#/analytics', icon: <Icon name="BarChart2" size="sm" /> },
      { label: 'Users', href: '#/users', icon: <Icon name="Users" size="sm" />, items: [
        { label: 'List', href: '#/users/list' },
        { label: 'Add', href: '#/users/add' }
      ] },
      { label: 'Settings', href: '#/settings', icon: <Icon name="Settings" size="sm" /> },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
  decorators: [withLightBackground]
};

export const Collapsed: Story = {
  args: { collapsed: true },
  decorators: [withLightBackground]
};

export const OnDarkBackground: Story = {
  decorators: [withDarkBackground]
};

export const CollapsedDark: Story = {
  args: { collapsed: true },
  decorators: [withDarkBackground]
};
