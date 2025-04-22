import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '../../components/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' },
      { name: 'Electronics', href: '/products/electronics' },
      { name: 'Smartphones', href: '/products/electronics/smartphones' },
    ],
  },
};