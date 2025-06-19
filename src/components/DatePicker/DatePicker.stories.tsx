import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: { onDateChange: { action: 'changed' } },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  render: (args) => {
    const [date, setDate] = useState(new Date());
    return (
      <DatePicker {...args} value={date} onDateChange={setDate} />
    );
  },
};

export const InitialDate: Story = {
  render: (args) => {
    const [date, setDate] = useState(new Date('2020-01-01'));
    return (
      <DatePicker {...args} value={date} onDateChange={setDate} />
    );
  },
};
