import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
];

describe('RadioGroup', () => {
  it('changes selection', async () => {
    const handle = vi.fn();
    const { container } = render(
      <RadioGroup
        options={OPTIONS}
        name="grp"
        legend="Pick"
        value="1"
        onChange={handle}
      />
    );
    fireEvent.click(screen.getByLabelText('Two'));
    expect(handle).toHaveBeenCalledWith('2');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
