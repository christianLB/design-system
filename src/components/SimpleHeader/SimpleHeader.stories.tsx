import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SimpleHeader } from './SimpleHeader';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof SimpleHeader> = {
  title: 'Navigation/SimpleHeader',
  component: SimpleHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SimpleHeader>;

export const Default: Story = {
  args: {
    left: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>🚀 MyApp</div>,
    navigation: [
      { label: 'Dashboard', href: '#dashboard', active: true },
      { label: 'Analytics', href: '#analytics' },
      { label: 'Settings', href: '#settings' },
    ],
    right: (
      <Stack direction="row" gap="sm">
        <Button variant="ghost" size="sm">
          <Icon name="Bell" size="sm" />
        </Button>
        <Button variant="primary" size="sm">
          Login
        </Button>
      </Stack>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    left: (
      <Stack direction="row" align="center" gap="sm">
        <Icon name="Zap" size="lg" />
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>FutureDash</span>
      </Stack>
    ),
    navigation: [
      { label: 'Dashboard', href: '#dashboard', icon: <Icon name="Home" size="sm" />, active: true },
      { label: 'Analytics', href: '#analytics', icon: <Icon name="BarChart2" size="sm" /> },
      { label: 'Users', href: '#users', icon: <Icon name="Users" size="sm" /> },
      { label: 'Settings', href: '#settings', icon: <Icon name="Settings" size="sm" /> },
    ],
    right: (
      <Stack direction="row" gap="sm">
        <Button variant="ghost" size="sm">
          <Icon name="Search" size="sm" />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Bell" size="sm" />
        </Button>
        <div style={{ 
          width: '2rem', 
          height: '2rem', 
          backgroundColor: 'var(--primary)', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}>
          JD
        </div>
      </Stack>
    ),
  },
};

export const Minimal: Story = {
  args: {
    left: <div style={{ fontWeight: 'bold' }}>Brand</div>,
    navigation: [
      { label: 'Home', href: '#home', active: true },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
};

export const CompactHeight: Story = {
  args: {
    height: 48,
    left: <div style={{ fontWeight: 'bold' }}>Compact</div>,
    navigation: [
      { label: 'Dashboard', href: '#dashboard', active: true },
      { label: 'Analytics', href: '#analytics' },
    ],
    right: <Button variant="primary" size="sm">Action</Button>,
  },
};