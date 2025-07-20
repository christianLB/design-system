import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Core Components/Forms/Textarea',
  component: Textarea,
  args: { placeholder: 'Enter text' },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {};

export const Disabled: Story = { args: { disabled: true } };
