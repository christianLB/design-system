import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '../components/Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL.',
    },
    alt: {
      control: 'text',
      description: 'The alt text for the image.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the avatar.',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'The shape of the avatar.',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'User Avatar',
  },
};

export const Placeholder: Story = {
    args: {
        alt: 'User Name',
    }
};

export const Small: Story = {
    args: {
        src: 'https://via.placeholder.com/150',
        alt: 'User Avatar',
        size: 'small',
    }
};

export const Large: Story = {
    args: {
        src: 'https://via.placeholder.com/150',
        alt: 'User Avatar',
        size: 'large',
    }
};

export const Square: Story = {
    args: {
        src: 'https://via.placeholder.com/150',
        alt: 'User Avatar',
        shape: 'square',
    }
};