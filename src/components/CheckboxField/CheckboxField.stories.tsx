import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckboxField } from './CheckboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/CheckboxField',
  component: CheckboxField,
  argTypes: {
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckboxField
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { id: 'agree', label: 'I agree', helperText: 'Required to continue' },
};

export const WithError: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckboxField
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        error="You must agree"
      />
    );
  },
  args: { id: 'agree2', label: 'I agree' },
};
