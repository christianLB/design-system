import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<ComponentName onClick={handleClick}>Click me</ComponentName>);

    const element = screen.getByText('Click me');
    await user.click(element);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<ComponentName className="custom-class">Test</ComponentName>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref).toHaveBeenCalled();
  });

  it('handles different variants', () => {
    const { rerender } = render(<ComponentName variant="primary">Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(<ComponentName variant="secondary">Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<ComponentName disabled>Disabled</ComponentName>);
    const element = screen.getByText('Disabled');
    expect(element).toBeDisabled();
  });

  it('supports accessibility attributes', () => {
    render(
      <ComponentName aria-label="Test component" aria-describedby="description">
        Test
      </ComponentName>,
    );

    const element = screen.getByLabelText('Test component');
    expect(element).toHaveAttribute('aria-describedby', 'description');
  });
});
