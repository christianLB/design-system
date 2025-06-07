import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {}
};

