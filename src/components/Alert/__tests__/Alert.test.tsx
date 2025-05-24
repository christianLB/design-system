import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from '../Alert';

describe('Alert Component', () => {
  it('renders children correctly', () => {
    const alertText = 'This is an alert message';
    render(<Alert>{alertText}</Alert>);
    
    expect(screen.getByText(alertText)).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const title = 'Alert Title';
    const alertText = 'This is an alert message';
    
    render(<Alert title={title}>{alertText}</Alert>);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(alertText)).toBeInTheDocument();
  });

  it('applies the correct role for accessibility', () => {
    render(<Alert>Alert message</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('applies different variant classes correctly', () => {
    const { rerender } = render(<Alert data-testid="alert">Alert</Alert>);
    
    // Default variant
    let alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('bg-background', 'text-foreground');
    
    // Destructive variant
    rerender(<Alert variant="destructive" data-testid="alert">Alert</Alert>);
    alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('text-destructive', 'bg-destructive/10');
    
    // Success variant
    rerender(<Alert variant="success" data-testid="alert">Alert</Alert>);
    alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('text-success', 'bg-success/10');
    
    // Warning variant
    rerender(<Alert variant="warning" data-testid="alert">Alert</Alert>);
    alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('text-warning', 'bg-warning/10');
    
    // Info variant
    rerender(<Alert variant="info" data-testid="alert">Alert</Alert>);
    alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('text-info', 'bg-info/10');
  });

  it('applies custom className', () => {
    const customClass = 'custom-alert';
    render(<Alert className={customClass}>Alert message</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass(customClass);
  });

  it('forwards additional props to the root element', () => {
    const dataTestId = 'test-alert';
    render(<Alert data-testid={dataTestId}>Alert message</Alert>);
    
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('passes through ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Alert message</Alert>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders title with appropriate styling', () => {
    render(<Alert title="Important">Alert message</Alert>);
    
    const title = screen.getByText('Important');
    expect(title.tagName).toBe('H5');
    expect(title).toHaveClass('mb-1', 'font-medium');
  });

  it('renders content in a text-sm div', () => {
    render(<Alert>Alert message</Alert>);
    
    const content = screen.getByText('Alert message');
    expect(content.tagName).toBe('DIV');
    expect(content).toHaveClass('text-sm');
  });
});
