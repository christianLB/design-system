import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Core Components/Forms/Checkbox',
  component: Checkbox,
  args: {
    label: 'Accept terms',
    checked: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {};

export const Checked: Story = { args: { checked: true } };
