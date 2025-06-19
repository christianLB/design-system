import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Grid from './Grid';
import { describe, it, expect } from 'vitest';

describe('Grid', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Grid columns={2}>
        <div>1</div>
        <div>2</div>
      </Grid>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
