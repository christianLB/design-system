import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: { error: { control: 'text' } },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: (args) => (
    <TextField {...args} />
  ),
  args: { id: 'first', label: 'First name' },
};

export const WithReactHookForm: Story = {
  render: (args) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>();
    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-2">
        <TextField
          {...args}
          {...register('name', { required: 'Required' })}
          error={errors.name?.message}
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    );
  },
  args: { id: 'name', label: 'Name' },
};
