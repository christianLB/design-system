import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '../../components/ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiftyPercent: Story = {
  args: {
    value: 50,
  },
};

export const SeventyFivePercent: Story = {
  args: {
    value: 75,
  },
};

export const TwentyPercent: Story = {
  args: {
    value: 20,
  },
};