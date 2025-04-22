import type { Meta, StoryObj } from '@storybook/react';
import Card from '../../components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const FullCard: Story = {
  args: {
    title: 'Card Title',
    header: <div>Card Header</div>,
    content: <div>Card Content</div>,
    footer: <div>Card Footer</div>,
  },
};

export const MinimalCard: Story = {
  args: {
    title: 'Card Title',
    content: <div>Card Content without header and footer</div>,
  },
};