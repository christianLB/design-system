import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Carousel } from './Carousel';

const items = [
  <div className="p-4 bg-gray-200" key="1">
    Slide 1
  </div>,
  <div className="p-4 bg-gray-300" key="2">
    Slide 2
  </div>,
  <div className="p-4 bg-gray-400" key="3">
    Slide 3
  </div>,
];

const meta: Meta<typeof Carousel> = {
  title: 'Core Components/Media/Carousel',
  component: Carousel,
  args: {
    items,
    itemsToShow: 1,
  },
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {};

export const MultipleVisible: Story = { args: { itemsToShow: 2 } };
