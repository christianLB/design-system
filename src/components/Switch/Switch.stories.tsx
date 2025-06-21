import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
};

export const Disabled: Story = {
  render: (args) => <Switch {...args} disabled />,
};
