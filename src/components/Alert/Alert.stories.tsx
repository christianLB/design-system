import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    title: 'Heads up!',
    description: 'Something happened',
    variant: 'info',
  },
  argTypes: { onClose: { action: 'closed' } },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {};
export const Success: Story = { args: { variant: 'success' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
