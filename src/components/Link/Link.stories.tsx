import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { Box } from '@/components/Box';
import { Stack } from '../Stack';
import {
  withTheme,
  withLightBackground,
  withDarkBackground,
  navItems,
} from '../Navigation/stories.utils';

const meta: Meta<typeof Link> = {
  title: 'Core Components/Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  decorators: [withTheme],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'nav', 'emphasized'],
      description: 'Visual style of the link',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the link take the full width of its container',
    },
    children: {
      control: 'text',
      description: 'Content of the link',
    },
    href: {
      control: 'text',
      description: 'URL the link points to',
    },
  },
  args: {
    children: 'Link Text',
    href: '#',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        component:
          'A component for navigational links and actions that should appear as links rather than buttons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  decorators: [withLightBackground],
};

export const Variants: Story = {
  render: (args) => (
    <Box className="p-4 rounded-md">
      <Stack direction="row" align="center" gap="md">
        <Link {...args} variant="default">
          Default Link
        </Link>
        <Link {...args} variant="subtle">
          Subtle Link
        </Link>
        <Link {...args} variant="nav">
          Navigation Link
        </Link>
        <Link {...args} variant="emphasized">
          Emphasized Link
        </Link>
      </Stack>
    </Box>
  ),
  decorators: [withLightBackground],
};

export const OnDarkBackground: Story = {
  render: (args) => (
    <Box className="p-4 rounded-md">
      <Stack direction="row" align="center" gap="md">
        <Link {...args} variant="default">
          Default Link
        </Link>
        <Link {...args} variant="subtle">
          Subtle Link
        </Link>
        <Link {...args} variant="nav">
          Navigation Link
        </Link>
        <Link {...args} variant="emphasized">
          Emphasized Link
        </Link>
      </Stack>
    </Box>
  ),
  decorators: [withDarkBackground],
};

export const NavigationLinks: Story = {
  render: (args) => (
    <Box className="p-4 rounded-md">
      <Stack direction="row" align="center" gap="md">
        {navItems.map((item) => (
          <Link key={item.label} {...args} href={item.href} variant="nav">
            {item.label}
          </Link>
        ))}
      </Stack>
    </Box>
  ),
  decorators: [withLightBackground],
};

export const StackedNavigationLinks: Story = {
  render: (args) => (
    <Box className="p-4 rounded-md w-48">
      <Stack direction="column" align="stretch" gap="sm">
        {navItems.map((item) => (
          <Link key={item.label} {...args} href={item.href} variant="nav" fullWidth>
            {item.label}
          </Link>
        ))}
      </Stack>
    </Box>
  ),
  decorators: [withLightBackground],
};

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'External Link',
  },
  decorators: [withLightBackground],
};
