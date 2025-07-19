import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Generated/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button is an interactive button component that provides consistent styling and behavior across the application. Use it for actions, form submissions, and navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ref: {
      description: 'React ref to the HTML button element',
      control: { type: 'text' },
    },
    variant: {
      description: 'Property variant',
      control: { type: 'text' },
    },
    size: {
      description: 'Property size',
      control: { type: 'text' },
    },
    fullWidth: {
      description: 'Property fullWidth',
      control: { type: 'boolean' },
    },
    glow: {
      description: 'Adds a subtle glow effect, great for futuristic themes',
      control: { type: 'boolean' },
    },
    elevated: {
      description: "Makes the button look like it's elevated from the surface",
      control: { type: 'boolean' },
    },
    scanlines: {
      description: 'Adds cyberpunk scanline effects',
      control: { type: 'boolean' },
    },
    matrixRain: {
      description: 'Adds Matrix-style digital rain effect',
      control: { type: 'boolean' },
    },
    cyberpunkGlow: {
      description: 'Cyberpunk glow intensity',
      control: { type: 'select' },
    },
    vital: {
      description: 'Adds pulsing/breathing effects for alien theme variants',
      control: { type: 'boolean' },
    },
    atmospheric: {
      description: 'Adds neural pathway effects for alien theme variants',
      control: { type: 'boolean' },
    },
    iconStart: {
      description: 'Icon to display before button content',
      control: { type: 'text' },
    },
    iconEnd: {
      description: 'Icon to display after button content',
      control: { type: 'text' },
    },
    iconSize: {
      description: 'Size for any icons',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// Example from documentation
export const Example: Story = {
  render: () => (
    <div>
      <Button />
    </div>
  ),
};
