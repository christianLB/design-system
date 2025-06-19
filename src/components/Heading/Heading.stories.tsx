import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  args: {
    children: 'Heading',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const SizeOne: Story = {
  args: { as: 'h1', size: 1 },
};
