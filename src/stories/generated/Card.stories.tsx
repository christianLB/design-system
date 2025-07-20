import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../components/Card/Card';

const meta: Meta<typeof Card> = {
  title: 'Examples/Generated/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card is a layout component that provides consistent spacing, borders, and styling for content containers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ref: {
      description: 'React ref to the HTML div element',
      control: { type: 'text' },
    },
    variant: {
      description: 'Card visual variant',
      control: { type: 'text' },
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
    glow: {
      description: 'Adds a subtle glow effect',
      control: { type: 'boolean' },
    },
    elevated: {
      description: 'Makes the card look elevated from the surface',
      control: { type: 'boolean' },
    },
    vital: {
      description: 'Adds atmospheric alien breathing effects',
      control: { type: 'boolean' },
    },
    neural: {
      description: 'Enables neural pathways effect for alien theme',
      control: { type: 'boolean' },
    },
    atmospheric: {
      description: 'Adds alien atmospheric effects',
      control: { type: 'boolean' },
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
      <Card />
    </div>
  ),
};
