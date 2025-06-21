import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { TextField } from './TextField';

const HookFormExample = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>();
  return (
    <form onSubmit={handleSubmit(() => {})}>
      <TextField
        id="name"
        label="Name"
        {...register('name', { required: 'Required' })}
        error={errors.name?.message}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('TextField with react-hook-form', () => {
  it('shows validation error on submit', async () => {
    const { container } = render(<HookFormExample />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText('Required')).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
