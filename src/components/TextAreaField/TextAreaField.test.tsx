import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { TextAreaField } from './TextAreaField';

describe('TextAreaField', () => {
  it('renders and handles change', async () => {
    const handle = vi.fn();
    const { container } = render(
      <TextAreaField id="bio" label="Bio" value="" onChange={handle} />
    );
    const textarea = screen.getByLabelText('Bio');
    fireEvent.change(textarea, { target: { value: 'a' } });
    expect(handle).toHaveBeenCalled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
