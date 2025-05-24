import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('applies default type of text', () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('applies custom type', () => {
    render(<Input data-testid="test-input" type="email" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies placeholder text', () => {
    const placeholder = 'Enter your name';
    render(<Input data-testid="test-input" placeholder={placeholder} />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('applies disabled state', () => {
    render(<Input data-testid="test-input" disabled />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    const customClass = 'test-class';
    render(<Input data-testid="test-input" className={customClass} />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass(customClass);
  });

  it('handles value changes', () => {
    const value = 'test value';
    render(<Input data-testid="test-input" defaultValue={value} />);
    const input = screen.getByTestId('test-input') as HTMLInputElement;
    expect(input.value).toBe(value);
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Input data-testid="test-input" onChange={handleChange} />);
    const input = screen.getByTestId('test-input');
    
    // Use userEvent to simulate typing
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input data-testid="test-input" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('applies aria-invalid styling when aria-invalid is true', () => {
    render(<Input data-testid="test-input" aria-invalid={true} />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
