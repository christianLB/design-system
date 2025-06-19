import type { Meta, StoryObj } from '@storybook/react';
import Container from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  argTypes: {
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { children: 'Container content', maxWidth: 'lg' },
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {};

export const Small: Story = {
  args: { maxWidth: 'sm' },
};
