import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('renders and changes', async () => {
    const handle = vi.fn();
    const { container } = render(
      <SelectField id="sel" label="Select" onChange={handle}>
        <option value="a">A</option>
        <option value="b">B</option>
      </SelectField>,
    );
    fireEvent.change(screen.getByLabelText('Select'), { target: { value: 'b' } });
    expect(handle).toHaveBeenCalled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
