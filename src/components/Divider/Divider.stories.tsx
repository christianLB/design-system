import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: args => <Divider {...args} />,
};

export const Vertical: Story = {
  args: { orientation: 'vertical', style: { height: '2rem' } },
  render: args => <Divider {...args} />,
};
