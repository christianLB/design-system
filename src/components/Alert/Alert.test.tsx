import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and description', async () => {
    const { container } = render(
      <Alert title="Error" variant="destructive" description="Oops" />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Oops')).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
