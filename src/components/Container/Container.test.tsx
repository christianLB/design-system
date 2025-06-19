import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Container from './Container';
import { describe, it, expect } from 'vitest';

describe('Container', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(<Container>Content</Container>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
