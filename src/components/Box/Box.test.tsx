import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Box from './Box';
import { describe, it, expect } from 'vitest';

describe('Box', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(<Box p="md">Content</Box>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
