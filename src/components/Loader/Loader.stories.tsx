import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Feedback/Loader',
  component: Loader,
  args: {
    size: 'md',
    variant: 'primary',
  },
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
