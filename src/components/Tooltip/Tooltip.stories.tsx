import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Tooltip text',
    children: <button className="btn">Hover</button>,
    position: 'top',
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {};

export const Bottom: Story = { args: { position: 'bottom' } };
