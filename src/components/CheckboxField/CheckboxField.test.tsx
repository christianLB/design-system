import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { CheckboxField } from './CheckboxField';

describe('CheckboxField', () => {
  it('renders and toggles', async () => {
    const handle = vi.fn();
    const { container } = render(
      <CheckboxField id="cb" label="Check" checked={false} onChange={handle} />
    );
    const cb = screen.getByLabelText('Check');
    fireEvent.click(cb);
    expect(handle).toHaveBeenCalled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
