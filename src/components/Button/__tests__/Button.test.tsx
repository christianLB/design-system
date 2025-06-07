// Button component test using Vitest and React Testing Library
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="test-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('test-class');
  });

  it('forwards props to the button element', () => {
    render(<Button data-testid="test-button">Props Test</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<Button variant="secondary">Variant</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('bg-secondary');
  });
});
