import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavigationTabs } from './NavigationTabs';
import { Icon } from '@/components/Icon';
import { Box } from '@/components/Box';

const meta: Meta<typeof NavigationTabs> = {
  title: 'Core Components/Navigation/Navigation Tabs',
  component: NavigationTabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pills', 'cards', 'minimal'],
      description: 'Visual variant of the tabs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tabs',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs should take full width',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationTabs>;

const basicItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Reports', value: 'reports' },
  { label: 'Settings', value: 'settings' },
];

const itemsWithIcons = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: <Icon name="BarChart" size="sm" />,
  },
  {
    label: 'Users',
    value: 'users',
    icon: <Icon name="Users" size="sm" />,
  },
  {
    label: 'Products',
    value: 'products',
    icon: <Icon name="Package" size="sm" />,
  },
  {
    label: 'Orders',
    value: 'orders',
    icon: <Icon name="ShoppingCart" size="sm" />,
    badge: '12',
  },
];

const itemsWithBadges = [
  { label: 'All', value: 'all', badge: '120' },
  { label: 'Active', value: 'active', badge: '89' },
  { label: 'Pending', value: 'pending', badge: '23' },
  { label: 'Archived', value: 'archived', badge: '8' },
];

const itemsWithDisabled = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Scheduled', value: 'scheduled', disabled: true },
  { label: 'Archived', value: 'archived' },
];

// Controlled component wrapper for stories
const ControlledTabs = ({
  defaultValue,
  ...props
}: {
  defaultValue: string;
  items: { label: string; value: string }[];
}) => {
  const [value, setValue] = React.useState(defaultValue || props.items[0]?.value);

  return (
    <div>
      <NavigationTabs {...props} value={value} onChange={setValue} />
      <Box
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
        }}
      >
        <strong>Active tab:</strong> {value}
      </Box>
    </div>
  );
};

export const Underline: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'underline',
    defaultValue: 'overview',
  },
};

export const Pills: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'pills',
    defaultValue: 'analytics',
  },
};

export const Cards: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'cards',
    defaultValue: 'reports',
  },
};

export const Minimal: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'minimal',
    defaultValue: 'settings',
  },
};

export const WithIcons: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: itemsWithIcons,
    variant: 'pills',
    defaultValue: 'dashboard',
  },
};

export const WithBadges: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: itemsWithBadges,
    variant: 'underline',
    defaultValue: 'all',
  },
};

export const WithDisabled: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: itemsWithDisabled,
    variant: 'pills',
    defaultValue: 'published',
  },
};

export const Vertical: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: itemsWithIcons,
    variant: 'cards',
    orientation: 'vertical',
    defaultValue: 'dashboard',
  },
  parameters: {
    layout: 'padded',
  },
};

export const SmallSize: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'pills',
    size: 'sm',
    defaultValue: 'overview',
  },
};

export const LargeSize: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: itemsWithIcons,
    variant: 'underline',
    size: 'lg',
    defaultValue: 'dashboard',
  },
};

export const FullWidth: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'underline',
    fullWidth: true,
    defaultValue: 'overview',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Centered: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: basicItems,
    variant: 'pills',
    centered: true,
    defaultValue: 'analytics',
  },
  parameters: {
    layout: 'padded',
  },
};

export const ManyTabs: Story = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    items: [
      { label: 'Overview', value: 'overview' },
      { label: 'Analytics', value: 'analytics', badge: '5' },
      { label: 'Performance', value: 'performance' },
      { label: 'Security', value: 'security' },
      { label: 'Integrations', value: 'integrations' },
      { label: 'Billing', value: 'billing' },
      { label: 'Team', value: 'team', badge: '12' },
      { label: 'Settings', value: 'settings' },
    ],
    variant: 'underline',
    size: 'sm',
    defaultValue: 'overview',
  },
  parameters: {
    layout: 'padded',
  },
};
