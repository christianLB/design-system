import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Loader } from './Loader';

describe('Loader', () => {
  it('is accessible', async () => {
    const { container } = render(<Loader decorative />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
