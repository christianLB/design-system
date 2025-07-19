import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentName } from './ComponentName';

// Mock any external dependencies
vi.mock('external-library', () => ({
  someFunction: vi.fn(),
}));

describe('ComponentName Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('integrates with theme context', () => {
    // Test theme integration
    render(
      <div className="theme-light">
        <ComponentName>Themed Content</ComponentName>
      </div>,
    );

    expect(screen.getByText('Themed Content')).toBeInTheDocument();
  });

  it('handles async operations', async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue('success');

    render(<ComponentName onAsyncAction={mockAsyncFunction}>Async Component</ComponentName>);

    const user = userEvent.setup();
    const button = screen.getByText('Async Component');

    await user.click(button);

    await waitFor(() => {
      expect(mockAsyncFunction).toHaveBeenCalled();
    });
  });

  it('handles form integration', async () => {
    const mockSubmit = vi.fn();

    render(
      <form onSubmit={mockSubmit}>
        <ComponentName name="test-field" />
        <button type="submit">Submit</button>
      </form>,
    );

    const user = userEvent.setup();
    const submitButton = screen.getByText('Submit');

    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
  });

  it('handles keyboard navigation', async () => {
    render(
      <div>
        <ComponentName>First</ComponentName>
        <ComponentName>Second</ComponentName>
        <ComponentName>Third</ComponentName>
      </div>,
    );

    const user = userEvent.setup();

    // Test Tab navigation
    await user.tab();
    expect(screen.getByText('First')).toHaveFocus();

    await user.tab();
    expect(screen.getByText('Second')).toHaveFocus();

    // Test Shift+Tab
    await user.tab({ shift: true });
    expect(screen.getByText('First')).toHaveFocus();
  });

  it('handles error states gracefully', async () => {
    const mockErrorFunction = vi.fn().mockRejectedValue(new Error('Test error'));

    render(<ComponentName onError={mockErrorFunction}>Error Component</ComponentName>);

    const user = userEvent.setup();
    const element = screen.getByText('Error Component');

    await user.click(element);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('respects reduced motion preferences', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<ComponentName animated>Animated Content</ComponentName>);

    const element = screen.getByText('Animated Content');
    expect(element).toHaveClass('motion-safe:animate-none');
  });
});
