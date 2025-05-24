import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';

describe('Tabs Component', () => {
  const createTabs = () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Tab 1 Content</TabsContent>
      <TabsContent value="tab2">Tab 2 Content</TabsContent>
      <TabsContent value="tab3">Tab 3 Content</TabsContent>
    </Tabs>
  );

  it('renders tabs with correct default active tab', () => {
    render(createTabs());
    
    // Check if all tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Check if tab content is rendered correctly
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    
    // These contents should not be in the document or should be hidden
    const tab2Content = screen.queryByText('Tab 2 Content');
    const tab3Content = screen.queryByText('Tab 3 Content');
    
    // Either the elements are null (not rendered) or they're hidden
    if (tab2Content) expect(tab2Content).not.toBeVisible();
    else expect(tab2Content).toBeNull();
    
    if (tab3Content) expect(tab3Content).not.toBeVisible();
    else expect(tab3Content).toBeNull();
  });

  it('switches to clicked tab', async () => {
    const user = userEvent.setup();
    render(createTabs());
    
    // Click the second tab
    await user.click(screen.getByText('Tab 2'));
    
    // Check if content switched properly
    const tab1Content = screen.queryByText('Tab 1 Content');
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    const tab3Content = screen.queryByText('Tab 3 Content');
    
    // Either the elements are null (not rendered) or they're hidden
    if (tab1Content) expect(tab1Content).not.toBeVisible();
    else expect(tab1Content).toBeNull();
    
    if (tab3Content) expect(tab3Content).not.toBeVisible();
    else expect(tab3Content).toBeNull();
  });

  it('handles disabled tabs correctly', async () => {
    const user = userEvent.setup();
    render(createTabs());
    
    // Try to click the disabled tab
    await user.click(screen.getByText('Tab 3'));
    
    // Check if content did not change
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    const tab3Content = screen.queryByText('Tab 3 Content');
    
    // Either the element is null (not rendered) or it's hidden
    if (tab3Content) expect(tab3Content).not.toBeVisible();
    else expect(tab3Content).toBeNull();
    
    // Check if tab has disabled attribute
    const disabledTab = screen.getByText('Tab 3').closest('button');
    expect(disabledTab).toBeDisabled();
  });

  it('applies custom className to components', () => {
    render(
      <Tabs defaultValue="tab1" className="custom-tabs">
        <TabsList className="custom-tabs-list">
          <TabsTrigger value="tab1" className="custom-trigger">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">Content</TabsContent>
      </Tabs>
    );
    
    // Check if custom classes are applied
    expect(screen.getByRole('tablist')).toHaveClass('custom-tabs-list');
    expect(screen.getByRole('tab')).toHaveClass('custom-trigger');
    expect(screen.getByText('Content').closest('div')).toHaveClass('custom-content');
  });

  it('forwards additional props to components', () => {
    render(
      <Tabs defaultValue="tab1" data-testid="tabs">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1" data-testid="tab-trigger">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="tab-content">Content</TabsContent>
      </Tabs>
    );
    
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
    expect(screen.getByTestId('tab-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('tab-content')).toBeInTheDocument();
  });

  it('passes through refs to components', () => {
    const tabsRef = React.createRef<HTMLDivElement>();
    const tabsListRef = React.createRef<HTMLDivElement>();
    const tabsTriggerRef = React.createRef<HTMLButtonElement>();
    const tabsContentRef = React.createRef<HTMLDivElement>();
    
    render(
      <Tabs defaultValue="tab1" ref={tabsRef}>
        <TabsList ref={tabsListRef}>
          <TabsTrigger value="tab1" ref={tabsTriggerRef}>Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" ref={tabsContentRef}>Content</TabsContent>
      </Tabs>
    );
    
    expect(tabsRef.current).not.toBeNull();
    expect(tabsListRef.current).not.toBeNull();
    expect(tabsTriggerRef.current).not.toBeNull();
    expect(tabsContentRef.current).not.toBeNull();
  });

  it('has correct data-state for active and inactive tabs', async () => {
    const user = userEvent.setup();
    render(createTabs());
    
    const tab1 = screen.getByText('Tab 1').closest('button');
    const tab2 = screen.getByText('Tab 2').closest('button');
    
    // Initial state
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(tab2).toHaveAttribute('data-state', 'inactive');
    
    // After clicking tab2
    await user.click(screen.getByText('Tab 2'));
    expect(tab1).toHaveAttribute('data-state', 'inactive');
    expect(tab2).toHaveAttribute('data-state', 'active');
  });
});
