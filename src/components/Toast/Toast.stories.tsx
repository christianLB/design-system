import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    message: 'Saved successfully',
    variant: 'info',
  },
  argTypes: {
    onClose: { action: 'closed' },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {};
export const Success: Story = { args: { variant: 'success' } };
export const Error: Story = { args: { variant: 'error' } };
export const Warning: Story = { args: { variant: 'warning' } };
