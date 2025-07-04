import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './Button';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Text } from '../Text';
// import { Icon } from '../Icon'; // Legacy icon usage - now using iconStart/iconEnd props

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
  args: { 
    iconStart: 'Plus',
    children: 'Create New' 
  },
};

export const WithIconEnd: Story = {
  args: { 
    iconEnd: 'ChevronRight',
    children: 'Continue',
    variant: 'outline'
  },
};

export const IconOnly: Story = {
  args: { 
    iconStart: 'Settings',
    'aria-label': 'Settings',
    variant: 'ghost'
  },
};

export const LoadingState: Story = {
  args: { 
    iconStart: 'Loader',
    children: 'Loading...',
    disabled: true,
    className: 'loading'
  },
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
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="md" wrap align="center">
            <Button variant="primary" iconStart="Plus">
              Create
            </Button>
            <Button variant="secondary" iconStart="Download">
              Download
            </Button>
            <Button variant="ghost" iconStart="Settings">
              Settings
            </Button>
            <Button variant="destructive" iconStart="Trash">
              Delete
            </Button>
          </Stack>
          
          <Stack direction="row" gap="md" wrap align="center">
            <Button variant="outline" iconEnd="ChevronRight">
              Continue
            </Button>
            <Button variant="link" iconEnd="ExternalLink">
              Open Link
            </Button>
            <Button variant="primary" iconStart="Save" iconEnd="ChevronDown">
              Save Options
            </Button>
          </Stack>
          
          <Stack direction="row" gap="md" wrap align="center">
            <Button variant="ghost" iconStart="Settings" aria-label="Settings" />
            <Button variant="primary" iconStart="Plus" aria-label="Add new item" />
            <Button variant="destructive" iconStart="Trash" aria-label="Delete item" />
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Interactive States</Text>
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Default:</Text>
            <Button variant="primary">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Loading:</Text>
            <Button variant="primary" iconStart="Loader" disabled className="loading">
              Loading...
            </Button>
            <Button variant="secondary" className="loading skeleton">
              Processing
            </Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Success:</Text>
            <Button variant="success" iconStart="Check" className="success">
              Completed
            </Button>
            <Button variant="primary" iconStart="CheckCircle">
              Success
            </Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Error:</Text>
            <Button variant="destructive" iconStart="AlertTriangle" className="error">
              Error State
            </Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Disabled:</Text>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="secondary" disabled iconStart="Lock">Locked</Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Active:</Text>
            <Button variant="primary" className="active">Active</Button>
            <Button variant="outline" className="selected">Selected</Button>
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
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Futuristic Theme Enhanced</Text>
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="md" wrap align="center">
            <Box className="p-3">
              <Button variant="primary" glow iconStart="Zap">
                Primary Glow
              </Button>
            </Box>
            <Box className="p-3">
              <Button variant="secondary" glow iconStart="Star">
                Secondary Glow
              </Button>
            </Box>
            <Box className="p-3">
              <Button variant="destructive" glow iconStart="AlertTriangle">
                Danger Glow
              </Button>
            </Box>
            <Box className="p-3">
              <Button variant="success" glow iconStart="CheckCircle">
                Success Glow
              </Button>
            </Box>
          </Stack>
          
          <Stack direction="row" gap="md" wrap align="center">
            <Box className="p-3">
              <Button variant="primary" elevated iconStart="Rocket">
                Elevated
              </Button>
            </Box>
            <Box className="p-3">
              <Button variant="ghost" glow iconStart="Sparkles">
                Ghost Glow
              </Button>
            </Box>
            <Box className="p-3">
              <Button variant="outline" elevated iconEnd="ArrowRight">
                Outline Elevated
              </Button>
            </Box>
          </Stack>
          
          <Stack direction="row" gap="md" wrap align="center">
            <Box className="p-3">
              <Button variant="primary" glow className="loading" iconStart="Loader">
                Future Loading
              </Button>
            </Box>
            <Box className="p-3">
              <Button variant="secondary" className="notification" iconStart="Bell">
                Notification
              </Button>
            </Box>
          </Stack>
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

// Cyberpunk Variants
export const CyberpunkMatrix: Story = {
  args: { variant: 'cyberpunk-matrix', children: 'Matrix Button' },
};

export const CyberpunkDoom: Story = {
  args: { variant: 'cyberpunk-doom', children: 'DOOM Button' },
};

export const CyberpunkGhost: Story = {
  args: { variant: 'cyberpunk-ghost', children: 'Ghost Button' },
};

export const CyberpunkNeon: Story = {
  args: { variant: 'cyberpunk-neon', children: 'Neon Button' },
};

export const CyberpunkWithEffects: Story = {
  args: { 
    variant: 'cyberpunk-matrix', 
    children: 'Matrix Glow',
    cyberpunkGlow: 'intense',
    scanlines: true,
    iconStart: 'Zap'
  },
};

// Cyberpunk Showcase
export const CyberpunkShowcase: Story = {
  render: () => (
    <Stack gap="xl">
      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Cyberpunk Button Variants</Text>
        <Stack direction="row" gap="md" wrap align="center">
          <Button variant="cyberpunk-matrix" iconStart="Zap">Matrix</Button>
          <Button variant="cyberpunk-doom" iconStart="Target">DOOM</Button>
          <Button variant="cyberpunk-ghost" iconStart="Ghost">Ghost</Button>
          <Button variant="cyberpunk-neon" iconStart="Sparkles">Neon</Button>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">With Cyberpunk Effects</Text>
        <Stack direction="row" gap="md" wrap align="center">
          <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" iconStart="Zap">
            Intense Glow
          </Button>
          <Button variant="cyberpunk-doom" scanlines iconStart="Target">
            Scanlines
          </Button>
          <Button variant="cyberpunk-ghost" matrixRain iconStart="Ghost">
            Matrix Rain
          </Button>
          <Button variant="cyberpunk-neon" cyberpunkGlow="subtle" scanlines iconStart="Sparkles">
            Subtle Glow + Scanlines
          </Button>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Cyberpunk Sizes</Text>
        <Stack direction="row" gap="md" align="center">
          <Button variant="cyberpunk-matrix" size="sm" cyberpunkGlow="normal">Small</Button>
          <Button variant="cyberpunk-doom" size="md" cyberpunkGlow="normal">Medium</Button>
          <Button variant="cyberpunk-neon" size="lg" cyberpunkGlow="normal">Large</Button>
        </Stack>
      </Box>

      <Box>
        <Text as="h2" size="lg" color="emphasis" className="mb-3">Cyberpunk Interactive States</Text>
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Default:</Text>
            <Button variant="cyberpunk-matrix">Matrix</Button>
            <Button variant="cyberpunk-doom">DOOM</Button>
            <Button variant="cyberpunk-neon">Neon</Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">With Icons:</Text>
            <Button variant="cyberpunk-matrix" iconStart="Zap" cyberpunkGlow="intense">
              Matrix Power
            </Button>
            <Button variant="cyberpunk-doom" iconStart="Target" scanlines>
              DOOM Target
            </Button>
            <Button variant="cyberpunk-neon" iconStart="Sparkles" cyberpunkGlow="normal">
              Neon Sparkle
            </Button>
          </Stack>
          
          <Stack direction="row" gap="md" align="center">
            <Text size="sm" className="min-w-[80px]">Full Effects:</Text>
            <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" scanlines matrixRain iconStart="Zap">
              Ultimate Matrix
            </Button>
            <Button variant="cyberpunk-doom" cyberpunkGlow="intense" scanlines iconStart="Target">
              Ultimate DOOM
            </Button>
            <Button variant="cyberpunk-neon" cyberpunkGlow="intense" scanlines iconStart="Sparkles">
              Ultimate Neon
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive showcase of all cyberpunk button variants with effects and interactive states.'
      }
    }
  }
};
