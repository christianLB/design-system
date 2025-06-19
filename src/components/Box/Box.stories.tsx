import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  argTypes: {
    p: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { children: 'Box content', p: 'md', bg: 'secondary' },
};
export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {};

export const Padded: Story = {
  args: { p: 'lg' },
};
