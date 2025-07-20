import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBadge } from './NotificationBadge';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof NotificationBadge> = {
  title: 'Core Components/Data Display/Notification Badge',
  component: NotificationBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCount: Story = {
  args: {
    count: 5,
    children: (
      <Button variant="ghost" size="sm">
        <Icon name="Bell" size="sm" />
      </Button>
    ),
  },
};
