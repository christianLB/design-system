import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  args: {
    children: 'Sample text',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Typography sizes and weights use values from theme tokens.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'bold'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Bold: Story = {
  args: { weight: 'bold' },
};
