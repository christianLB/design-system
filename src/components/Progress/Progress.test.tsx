import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(<Progress value={50} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
