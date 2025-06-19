import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'Star' },
  parameters: {
    docs: {
      description: {
        component: 'Icon sizes map to spacing tokens sm/md/lg.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'color' },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const LargeColored: Story = {
  args: { size: 'lg', color: '#1e40af' },
};
