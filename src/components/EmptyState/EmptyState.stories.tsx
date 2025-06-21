import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  args: {
    title: 'No items',
    description: 'Add some new entries to get started',
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
