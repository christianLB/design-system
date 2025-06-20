import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Menu } from './Menu';
import { Button } from '../Button/Button';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    trigger: <Button>Open</Button>,
    items: [
      { label: 'Profile', value: 'profile' },
      { label: 'Logout', value: 'logout' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Primary: Story = {};

export const AlignRight: Story = {
  args: { align: 'right' },
};
