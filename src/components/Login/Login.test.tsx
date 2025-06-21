import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Login } from './Login';

describe('Login', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Login onSubmit={(e) => e.preventDefault()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
