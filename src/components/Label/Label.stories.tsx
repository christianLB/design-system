import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'Label text',
    htmlFor: 'input-id',
  },
  parameters: {
    docs: {
      description: {
        component: 'Label font sizes rely on tokens under --font-size-*.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 'lg' },
};
