import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Core Components/Data Display/Empty State',
  component: EmptyState,
  args: {
    title: 'No items',
    description: 'Add some new entries to get started',
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
