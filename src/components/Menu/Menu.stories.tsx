import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Menu } from './Menu';
import { Button } from '@/components/Button';
import { withTheme, withLightBackground, withDarkBackground } from '../Navigation/stories.utils';

const meta: Meta<typeof Menu> = {
  title: 'Core Components/Navigation/Menu',
  component: Menu,
  decorators: [withTheme],
  args: {
    trigger: <Button variant="secondary">Open Menu</Button>,
    items: [
      { label: 'Profile', value: 'profile', icon: 'user' },
      { label: 'Settings', value: 'settings', icon: 'settings' },
      { label: 'Help', value: 'help', icon: 'help' },
      { label: 'Logout', value: 'logout', icon: 'logout' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  decorators: [withLightBackground],
};

export const AlignRight: Story = {
  args: { align: 'right' },
  decorators: [withLightBackground],
};

export const DarkTheme: Story = {
  decorators: [withDarkBackground],
};

export const WithCustomTrigger: Story = {
  args: {
    trigger: <Button variant="primary">Custom Trigger</Button>,
  },
  decorators: [withLightBackground],
};
