import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge Component', () => {
  it('renders with children correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant styling', () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.firstChild;
    // Should have the primary background class
    expect(badge).toHaveClass('bg-primary');
  });

  it('applies secondary variant styling', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-secondary');
  });

  it('applies destructive variant styling', () => {
    const { container } = render(<Badge variant="destructive">Destructive</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-destructive');
  });

  it('applies success variant styling', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-success');
  });

  it('applies warning variant styling', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-warning');
  });

  it('applies info variant styling', () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-info');
  });

  it('applies outline variant styling', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('text-foreground');
    expect(badge).toHaveClass('border-border');
  });

  it('applies muted variant styling', () => {
    const { container } = render(<Badge variant="muted">Muted</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-muted');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="test-class">With Class</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('test-class');
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Badge ref={ref}>With Ref</Badge>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
