import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '../components/Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of accordion items, each with a title and content.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Section 1',
        content: 'Content for section 1.',
      },
      {
        title: 'Section 2',
        content: 'Content for section 2.',
      },
      {
        title: 'Section 3',
        content: 'Content for section 3.',
      },
    ],
  },
};