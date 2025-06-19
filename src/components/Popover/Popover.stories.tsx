import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  args: {
    trigger: <button className="btn">Open</button>,
    children: <div className="p-4">Content</div>,
    align: 'center',
  },
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Primary: Story = {};

export const AlignRight: Story = { args: { align: 'right' } };
