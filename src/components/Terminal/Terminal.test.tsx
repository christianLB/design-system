import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Terminal, TerminalCommand } from './Terminal';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Terminal Component', () => {
  const mockCommands: TerminalCommand[] = [
    {
      id: '1',
      command: 'ls -la',
      output: 'total 24\ndrwxr-xr-x  6 user  staff   192 Oct 24 14:30 .',
      timestamp: new Date('2023-10-24T14:30:00Z'),
      status: 'success',
    },
  ];

  it('renders without crashing', () => {
    render(<Terminal />);
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  it('renders with initial commands', () => {
    render(<Terminal initialCommands={mockCommands} />);
    expect(screen.getByText('ls -la')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Terminal title="Custom Terminal" />);
    expect(screen.getByText('Custom Terminal')).toBeInTheDocument();
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Terminal variant="matrix" />);
    expect(document.querySelector('.terminal--matrix')).toBeInTheDocument();

    rerender(<Terminal variant="doom" />);
    expect(document.querySelector('.terminal--doom')).toBeInTheDocument();

    rerender(<Terminal variant="swordfish" />);
    expect(document.querySelector('.terminal--swordfish')).toBeInTheDocument();

    rerender(<Terminal variant="neon" />);
    expect(document.querySelector('.terminal--neon')).toBeInTheDocument();
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Terminal size="sm" />);
    expect(document.querySelector('.terminal--sm')).toBeInTheDocument();

    rerender(<Terminal size="md" />);
    expect(document.querySelector('.terminal--md')).toBeInTheDocument();

    rerender(<Terminal size="lg" />);
    expect(document.querySelector('.terminal--lg')).toBeInTheDocument();

    rerender(<Terminal size="xl" />);
    expect(document.querySelector('.terminal--xl')).toBeInTheDocument();
  });

  it('handles input when enabled', () => {
    const mockOnCommandExecute = vi.fn();
    render(
      <Terminal
        enableInput={true}
        onCommandExecute={mockOnCommandExecute}
      />
    );

    const input = screen.getByPlaceholderText('Enter command...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test command' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnCommandExecute).toHaveBeenCalledWith('test command');
  });

  it('does not render input when disabled', () => {
    render(<Terminal enableInput={false} />);
    expect(screen.queryByPlaceholderText('Enter command...')).not.toBeInTheDocument();
  });

  it('shows line numbers when enabled', () => {
    render(
      <Terminal
        showLineNumbers={true}
        initialCommands={mockCommands}
      />
    );
    expect(screen.getByText('001')).toBeInTheDocument();
  });

  it('does not show header when disabled', () => {
    render(<Terminal showHeader={false} />);
    expect(screen.queryByText('Terminal')).not.toBeInTheDocument();
  });

  it('handles clear command', () => {
    const mockOnClear = vi.fn();
    render(
      <Terminal
        showControls={true}
        onClear={mockOnClear}
        initialCommands={mockCommands}
      />
    );

    const closeButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(closeButton);

    expect(mockOnClear).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Terminal className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies custom dimensions', () => {
    render(<Terminal height="500px" width="800px" />);
    const terminal = document.querySelector('.terminal');
    expect(terminal).toHaveStyle({
      height: '500px',
      width: '800px',
    });
  });
});