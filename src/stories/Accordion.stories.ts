import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '../../components/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Content for item 1',
      },
      {
        title: 'Item 2',
        content: 'Content for item 2',
      },
      {
        title: 'Item 3',
        content: 'Content for item 3',
      },
    ],
  },
};