import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './Button';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Text } from '../Text';
import { Icon } from '../Icon';

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    variant: { control: 'select' },
    size: { control: 'select' },
    fullWidth: { control: 'boolean' },
    glow: { control: 'boolean' },
    elevated: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Interactive buttons for forms, dialogs, and more. Supports multiple variants, sizes, and states.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// Individual variant stories
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Confirm' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link Button' },
};

export const WithIcon: Story = {
  args: { children: <><Icon name="Plus" size="sm" /> Create New</> },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Glowing: Story = {
  args: { glow: true, children: 'Glow Effect' },
};

export const Elevated: Story = {
  args: { elevated: true, children: 'Elevated Button' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '400px', border: '1px dashed var(--border)' }}>
        <Story />
      </div>
    ),
  ],
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => (
    <Stack gap="xl">
      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Button Variants</Text>
        <Stack direction="row" gap="md" wrap align="center">
          <Box className="p-3">
            <Button variant="primary">Primary</Button>
          </Box>
          <Box className="p-3">  
            <Button variant="secondary">Secondary</Button>
          </Box>
          <Box className="p-3 bg-[var(--background)]">
            <Button variant="ghost">Ghost</Button>
          </Box>
          <Box className="p-3">
            <Button variant="destructive">Destructive</Button>
          </Box>
          <Box className="p-3">
            <Button variant="success">Success</Button>
          </Box>
          <Box className="p-3">
            <Button variant="outline">Outline</Button>
          </Box>
          <Box className="p-3">
            <Button variant="link">Link</Button>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Button Sizes</Text>
        <Stack direction="row" gap="md" align="center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">With Icons</Text>
        <Stack direction="row" gap="md" wrap align="center">
          <Button variant="primary">
            <Icon name="Plus" size="sm" />
            <span>Create</span>
          </Button>
          <Button variant="secondary">
            <Icon name="Download" size="sm" />
            <span>Download</span>
          </Button>
          <Button variant="ghost">
            <Icon name="Settings" size="sm" />
            <span>Settings</span>
          </Button>
          <Button variant="destructive">
            <Icon name="Trash" size="sm" />
            <span>Delete</span>
          </Button>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Button States</Text>
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="w-20">Default:</Text>
            <Button variant="primary">Default</Button>
          </Stack>
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="w-20">Hover:</Text>
            <Button variant="primary" className="hover:bg-[var(--primary-hover)]" id="hover-button">Hover</Button>
          </Stack>
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="w-20">Focus:</Text>
            <Button variant="primary" className="focus:ring-2 ring-[var(--primary)]" id="focus-button">Focus</Button>
          </Stack>
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="w-20">Disabled:</Text>
            <Button variant="primary" disabled>Disabled</Button>
          </Stack>
        </Stack>
      </Box>
      
      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Special States</Text>
        <Stack direction="row" gap="md" wrap align="center">
          <Box className="p-3">
            <Button glow>Glowing</Button>
          </Box>
          <Box className="p-3">
            <Button elevated>Elevated</Button>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Full Width</Text>
        <Box className="border border-dashed border-[var(--border)] p-2 mb-4">
          <Button fullWidth>Full Width Button</Button>
        </Box>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Light & Dark Variants</Text>
        <Stack gap="md">
          <Box className="bg-[var(--background)] p-4 rounded">
            <Text className="mb-2">Light Background</Text>
            <Stack direction="row" gap="md" wrap>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="link">Link</Button>
            </Stack>
          </Box>
          
          <Box className="bg-[var(--background-emphasis)] p-4 rounded">
            <Text className="mb-2 text-[var(--foreground-emphasis)]">Dark Background</Text>
            <Stack direction="row" gap="md" wrap>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="link">Link</Button>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Futuristic Theme</Text>
        <Stack direction="row" gap="md" wrap align="center">
          <Box className="p-3">
            <Button variant="primary" glow>Primary Glow</Button>
          </Box>
          <Box className="p-3">
            <Button variant="secondary" glow>Secondary Glow</Button>
          </Box>
          <Box className="p-3">
            <Button variant="destructive" glow>Danger Glow</Button>
          </Box>
          <Box className="p-3">
            <Button variant="success" glow>Success Glow</Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive showcase of all button variants, sizes, states, and themes.'
      }
    }
  }
};
