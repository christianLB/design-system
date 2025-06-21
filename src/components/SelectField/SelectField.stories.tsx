import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SelectField } from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'Inputs/SelectField',
  component: SelectField,
  argTypes: { error: { control: 'text' } },
};
export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  render: (args) => (
    <SelectField {...args}>
      <option value="1">One</option>
      <option value="2">Two</option>
    </SelectField>
  ),
  args: { id: 'num', label: 'Number' },
};

export const WithReactHookForm: Story = {
  render: (args) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ num: string }>();
    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-2">
        <SelectField
          {...args}
          {...register('num', { required: 'Required' })}
          error={errors.num?.message}
        >
          <option value="1">One</option>
          <option value="2">Two</option>
        </SelectField>
        <button type="submit" className="btn">Submit</button>
      </form>
    );
  },
  args: { id: 'num', label: 'Number' },
};
