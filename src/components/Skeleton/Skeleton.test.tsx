import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(<Skeleton width="100%" height="1rem" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
