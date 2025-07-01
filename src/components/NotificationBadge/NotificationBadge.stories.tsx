import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBadge } from './NotificationBadge';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof NotificationBadge> = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['count', 'dot'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    maxCount: {
      control: 'number',
    },
  },
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

export const HighCount: Story = {
  args: {
    count: 99,
    children: (
      <Button variant="ghost" size="sm">
        <Icon name="Mail" size="sm" />
      </Button>
    ),
  },
};

export const DotVariant: Story = {
  args: {
    count: 3,
    variant: 'dot',
    children: (
      <Button variant="ghost" size="sm">
        <Icon name="Settings" size="sm" />
      </Button>
    ),
  },
};

export const MultipleExamples: Story = {
  render: () => (
    <div className="flex gap-6 p-4">
      <NotificationBadge count={3}>
        <Button variant="primary">
          <Icon name="ShoppingCart" size="sm" />
          Cart
        </Button>
      </NotificationBadge>
      
      <NotificationBadge count={8} variant="dot">
        <Button variant="ghost" size="sm">
          <Icon name="Heart" size="sm" />
        </Button>
      </NotificationBadge>
      
      <NotificationBadge count={99}>
        <Button variant="outline">
          <Icon name="Inbox" size="sm" />
          Messages
        </Button>
      </NotificationBadge>
    </div>
  ),
};