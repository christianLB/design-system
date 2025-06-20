import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders and handles change', async () => {
    const handle = vi.fn();
    const { container } = render(
      <TextField id="name" label="Name" value="" onChange={handle} />,
    );
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(handle).toHaveBeenCalled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
