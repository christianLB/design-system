import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with label and responds to change', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input id="test" label="Test" value="" onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Test') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange).toHaveBeenCalled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
