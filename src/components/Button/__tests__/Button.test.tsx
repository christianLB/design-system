// Button component test using Vitest and React Testing Library
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button component', () => {
  it('renders with children correctly', () => {
    render(<Button>Click Me</Button>);
    
    // Find the button using accessible queries
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Click Me');
  });

  it('passes className prop to the button element', () => {
    const testClass = 'test-class';
    render(<Button className={testClass}>Test Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(testClass);
  });
  
  it('forwards additional props to the button element', () => {
    render(<Button data-testid="test-button">Props Test</Button>);
    
    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Props Test');
  });

  it('handles variant prop correctly', () => {
    // Note: This test should be updated when variant implementation is added
    // Currently the Button component doesn't actually do anything with the variant prop
    // This is where TDD comes in - first write the test for expected behavior
    render(<Button variant="secondary">Variant Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Once implemented, we'd add assertions like:
    // expect(button).toHaveClass('secondary');
  });
});
