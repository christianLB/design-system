import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumb from '../components/Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items, each with a name and href.',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Category',
        href: '/category',
      },
      {
        name: 'Product',
        href: '/category/product',
      },
    ],
  },
};