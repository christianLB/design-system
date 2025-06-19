import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(<Spacer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
