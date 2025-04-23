import type { Meta, StoryObj } from '@storybook/react';

import Carousel from '../components/Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of React nodes to display in the carousel.',
    },
    itemsToShow: {
      control: 'number',
      description: 'The number of items to show at a time.',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      <div key={1} className="flex items-center justify-center bg-blue-200 h-32">Item 1</div>,
      <div key={2} className="flex items-center justify-center bg-green-200 h-32">Item 2</div>,
      <div key={3} className="flex items-center justify-center bg-yellow-200 h-32">Item 3</div>,
      <div key={4} className="flex items-center justify-center bg-red-200 h-32">Item 4</div>,
      <div key={5} className="flex items-center justify-center bg-purple-200 h-32">Item 5</div>,
    ],
    itemsToShow: 3,
  },
};