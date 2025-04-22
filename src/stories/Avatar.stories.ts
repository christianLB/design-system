import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '../../components/Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    shape: 'circle',
  },
};

export const SmallCircle: Story = {
  args: {
    size: 'small',
    shape: 'circle',
  },
};

export const LargeSquare: Story = {
  args: {
    size: 'large',
    shape: 'square',
  },
};

export const WithSrc: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    size: 'medium',
    shape: 'circle',
  },
};

export const WithAlt: Story = {
  args: {
    alt: 'User',
    size: 'medium',
    shape: 'circle',
  },
};