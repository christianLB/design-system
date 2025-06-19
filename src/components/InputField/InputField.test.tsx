import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders and handles change', async () => {
    const handle = vi.fn();
    const { container } = render(
      <InputField id="test" label="Test" value="" onChange={handle} />
    );
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(handle).toHaveBeenCalled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
