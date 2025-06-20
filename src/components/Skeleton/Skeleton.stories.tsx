import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: { width: '100%', height: '1rem' },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};
