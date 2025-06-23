import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Menu } from './Menu';
import { Button } from '@/components/Button';
import { 
  withTheme,
  withLightBackground,
  withDarkBackground
} from '../Navigation/stories.utils';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  decorators: [withTheme],
  args: {
    trigger: <Button variant="secondary">Open Menu</Button>,
    items: [
      { label: 'Profile', value: 'profile' },
      { label: 'Settings', value: 'settings' },
      { label: 'Help', value: 'help' },
      { label: 'Logout', value: 'logout' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  decorators: [withLightBackground]
};

export const AlignRight: Story = {
  args: { align: 'right' },
  decorators: [withLightBackground]
};

export const DarkTheme: Story = {
  decorators: [withDarkBackground]
};

export const WithCustomTrigger: Story = {
  args: {
    trigger: <Button variant="primary">Custom Trigger</Button>
  },
  decorators: [withLightBackground]
};
