import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders message and is accessible', async () => {
    const { container } = render(<Toast message="Saved" />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
