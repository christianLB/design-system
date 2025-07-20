import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DateField } from './DateField';

const meta: Meta<typeof DateField> = {
  title: 'Core Components/Forms/Date Field',
  component: DateField,
  argTypes: { error: { control: 'text' } },
};
export default meta;

type Story = StoryObj<typeof DateField>;

export const Default: Story = {
  render: (args) => <DateField {...args} />,
  args: { id: 'dob', label: 'Birth date' },
};

export const WithReactHookForm: Story = {
  render: (args) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<{ dob: string }>();
    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-2">
        <DateField
          {...args}
          {...register('dob', { required: 'Required' })}
          error={errors.dob?.message}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    );
  },
  args: { id: 'dob', label: 'Birth date' },
};
