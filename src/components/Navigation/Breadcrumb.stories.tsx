import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Icon } from '@/components/Icon';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Core Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'pills'],
      description: 'Visual variant of the breadcrumb',
    },
    maxItems: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Maximum number of items to show before truncating',
    },
    showHome: {
      control: 'boolean',
      description: 'Whether to show a home item at the beginning',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const sampleItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Users', href: '/users' },
  { label: 'Profile', href: '/users/profile' },
  { label: 'Settings', href: '/users/profile/settings' },
  { label: 'Security' }, // Current page - no href
];

const longItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Administration', href: '/admin' },
  { label: 'User Management', href: '/admin/users' },
  { label: 'Role Management', href: '/admin/roles' },
  { label: 'Permissions', href: '/admin/permissions' },
  { label: 'Security Settings', href: '/admin/security' },
  { label: 'Two-Factor Authentication', href: '/admin/security/2fa' },
  { label: 'Current Page' },
];

const itemsWithIcons = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Icon name="Home" size="sm" />,
  },
  {
    label: 'Products',
    href: '/products',
    icon: <Icon name="Package" size="sm" />,
  },
  {
    label: 'Electronics',
    href: '/products/electronics',
    icon: <Icon name="Zap" size="sm" />,
  },
  { label: 'Smartphones' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
    showHome: true,
  },
};

export const Compact: Story = {
  args: {
    items: sampleItems,
    variant: 'compact',
    showHome: true,
  },
};

export const Pills: Story = {
  args: {
    items: sampleItems,
    variant: 'pills',
    showHome: true,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    variant: 'default',
    showHome: false,
  },
};

export const WithTruncation: Story = {
  args: {
    items: longItems,
    maxItems: 5,
    variant: 'default',
    showHome: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: <span style={{ color: '#666' }}>→</span>,
    variant: 'default',
    showHome: false,
  },
};

export const NoHome: Story = {
  args: {
    items: sampleItems,
    variant: 'default',
    showHome: false,
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current Page' }],
    variant: 'default',
    showHome: true,
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Very Long Dashboard Name', href: '/dashboard' },
      { label: 'Extremely Long User Management Section', href: '/users' },
      { label: 'Super Long Profile Configuration Area', href: '/profile' },
      { label: 'Current Very Long Page Title' },
    ],
    variant: 'default',
    maxItems: 4,
    showHome: true,
  },
};
