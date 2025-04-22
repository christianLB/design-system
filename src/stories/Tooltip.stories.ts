import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '../../components/Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltipText: 'This is a tooltip!',
    children: <div>Hover me!</div>,
  },
};