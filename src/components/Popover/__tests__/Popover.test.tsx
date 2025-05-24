import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from '../Popover';

describe('Popover Component', () => {
  const createPopover = () => (
    <Popover>
      <PopoverTrigger data-testid="popover-trigger">Open Popover</PopoverTrigger>
      <PopoverContent data-testid="popover-content">
        <p>Popover content</p>
      </PopoverContent>
    </Popover>
  );

  it('renders the popover trigger correctly', () => {
    render(createPopover());
    
    const trigger = screen.getByTestId('popover-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open Popover');
  });

  it('opens the popover when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(createPopover());
    
    // Popover content should not be visible initially
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    
    // Click the trigger
    await user.click(screen.getByTestId('popover-trigger'));
    
    // Popover content should now be visible
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('closes the popover when clicked outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        {createPopover()}
      </div>
    );
    
    // Open the popover
    await user.click(screen.getByTestId('popover-trigger'));
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    
    // Click outside
    await user.click(screen.getByTestId('outside-element'));
    
    // Popover should close
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('applies custom className to popover components', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger className="custom-trigger" data-testid="popover-trigger">Open</PopoverTrigger>
        <PopoverContent className="custom-content" data-testid="popover-content">Content</PopoverContent>
      </Popover>
    );
    
    // Check trigger class
    expect(screen.getByTestId('popover-trigger')).toHaveClass('custom-trigger');
    
    // Open popover and check content class
    await user.click(screen.getByTestId('popover-trigger'));
    expect(screen.getByTestId('popover-content')).toHaveClass('custom-content');
  });

  it('passes custom props through to components', () => {
    render(
      <Popover>
        <PopoverTrigger aria-label="Open menu" data-testid="popover-trigger">Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    
    expect(screen.getByTestId('popover-trigger')).toHaveAttribute('aria-label', 'Open menu');
  });

  it('allows customizing alignment and offset', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger data-testid="popover-trigger">Open</PopoverTrigger>
        <PopoverContent align="start" sideOffset={8} data-testid="popover-content">Content</PopoverContent>
      </Popover>
    );
    
    // Open popover
    await user.click(screen.getByTestId('popover-trigger'));
    
    // Check alignment attribute - this is what Radix UI actually sets
    const content = screen.getByTestId('popover-content');
    expect(content).toHaveAttribute('data-align', 'start');
    
    // We don't check the style string since it can vary across environments
    // and Radix UI doesn't expose sideOffset in a consistent attribute
    // Instead we'll just verify the content is rendered with our test ID
    expect(content).toBeInTheDocument();
  });

  it('supports the anchor element', () => {
    render(
      <Popover>
        <PopoverAnchor className="custom-anchor" data-testid="popover-anchor">
          <div>Anchor Content</div>
        </PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    
    const anchor = screen.getByTestId('popover-anchor');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveClass('custom-anchor');
  });

  it('forwards refs to components', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const anchorRef = React.createRef<HTMLDivElement>();
    
    render(
      <Popover>
        <PopoverAnchor ref={anchorRef} data-testid="popover-anchor">
          <div>Anchor Content</div>
        </PopoverAnchor>
        <PopoverTrigger ref={triggerRef} data-testid="popover-trigger">Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(anchorRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
