import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { DateField } from './DateField';

describe('DateField', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(
      <DateField id="date" label="Date" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
