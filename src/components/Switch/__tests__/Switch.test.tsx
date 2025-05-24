import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../Switch';

describe('Switch Component', () => {
  it('renders correctly', () => {
    render(<Switch data-testid="test-switch" />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('applies default unchecked state styling', () => {
    render(<Switch data-testid="test-switch" />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    expect(switchElement).toHaveClass('data-[state=unchecked]:bg-input');
  });

  it('applies checked state styling when defaultChecked is true', () => {
    render(<Switch data-testid="test-switch" defaultChecked />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
    expect(switchElement).toHaveClass('data-[state=checked]:bg-primary');
  });

  it('applies disabled styling', () => {
    render(<Switch data-testid="test-switch" disabled />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass('disabled:opacity-50');
  });

  it('toggles state when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch data-testid="test-switch" />);
    const switchElement = screen.getByTestId('test-switch');
    
    // Initial state should be unchecked
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    
    // Click to toggle
    await user.click(switchElement);
    
    // Should now be checked
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('calls onChange handler when toggled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Switch data-testid="test-switch" onCheckedChange={handleChange} />);
    const switchElement = screen.getByTestId('test-switch');
    
    // Click to toggle
    await user.click(switchElement);
    
    // Check that handler was called with the new state (true)
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Switch data-testid="test-switch" className="test-class" />);
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toHaveClass('test-class');
  });

  it('forwards ref to the switch element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} data-testid="test-switch" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('renders with thumb element correctly', () => {
    const { container } = render(<Switch data-testid="test-switch" />);
    const thumbElement = container.querySelector('[data-slot="switch-thumb"]');
    expect(thumbElement).toBeInTheDocument();
    expect(thumbElement).toHaveClass('rounded-full');
  });
});
