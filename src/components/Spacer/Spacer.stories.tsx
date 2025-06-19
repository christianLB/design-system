import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Components/Spacer',
  component: Spacer,
  parameters: {
    docs: {
      description: {
        component: 'Spacer height uses spacing tokens xs-xl.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};
export default meta;

type Story = StoryObj<typeof Spacer>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 'lg' },
};
