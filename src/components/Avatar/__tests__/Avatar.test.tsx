import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';

describe('Avatar Component', () => {
  it('renders with an image when src is provided', () => {
    render(<Avatar src="/test-image.jpg" alt="Test User" />);
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
    expect(img).toHaveAttribute('alt', 'Test User');
  });

  it('renders with a fallback when no src is provided', () => {
    render(<Avatar alt="Test User" />);
    
    // Should not render an image
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    
    // Should render the first letter of the alt text
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('applies correct size classes based on size prop', () => {
    const { rerender } = render(<Avatar alt="Test User" size="sm" data-testid="avatar" />);
    let avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-8 w-8');
    
    rerender(<Avatar alt="Test User" size="md" data-testid="avatar" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-10 w-10');
    
    rerender(<Avatar alt="Test User" size="lg" data-testid="avatar" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-14 w-14');
    
    rerender(<Avatar alt="Test User" size="xl" data-testid="avatar" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-20 w-20');
  });

  it('applies correct shape classes based on shape prop', () => {
    const { rerender } = render(<Avatar alt="Test User" shape="circle" data-testid="avatar" />);
    let avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('rounded-full');
    
    rerender(<Avatar alt="Test User" shape="square" data-testid="avatar" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('rounded-md');
  });

  it('uses md size by default', () => {
    render(<Avatar alt="Test User" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('h-10 w-10');
  });

  it('uses circle shape by default', () => {
    render(<Avatar alt="Test User" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('rounded-full');
  });

  it('forwards a ref to the root div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Avatar alt="Test User" ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Avatar alt="Test User" className="custom-class" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('custom-class');
  });

  it('spreads additional props to the root element', () => {
    render(<Avatar alt="Test User" data-testid="avatar" aria-label="User avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('aria-label', 'User avatar');
  });

  it('handles empty alt text gracefully', () => {
    render(<Avatar data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    // Should not show a fallback initial
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});
