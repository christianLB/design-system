import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};
export const Secondary: Story = {
  args: { variant: 'secondary' },
};
export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Interactive: Story = {
  args: { variant: 'primary', children: 'Hover me' },
};
