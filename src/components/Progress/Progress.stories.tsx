import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    value: 40,
    maxValue: 100,
    variant: 'primary',
  },
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};
export const Success: Story = { args: { variant: 'success', value: 80 } };
export const Indeterminate: Story = { args: { isIndeterminate: true } };
