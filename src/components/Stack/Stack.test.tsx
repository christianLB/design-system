import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Stack from './Stack';
import { describe, it, expect } from 'vitest';

describe('Stack', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Stack direction="row">
        <div>1</div>
        <div>2</div>
      </Stack>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
