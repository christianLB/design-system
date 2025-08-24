import React, { createContext, useContext, useState, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../../theme/ThemeContext';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  children: ReactNode;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ defaultValue, children, className, style, ...props }, ref) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const { activeTheme } = useTheme();
  
  const cssVars = {
    '--tabs-bg': 'var(--background)',
    '--tabs-border': 'var(--border)',
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div ref={ref} className={`tabs ${className || ''}`} style={{ ...cssVars, ...style }} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = 'Tabs';

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, style, ...props }, ref) => {
  const { activeTheme } = useTheme();
  
  const cssVars = {
    '--tabs-list-bg': 'var(--muted)',
    '--tabs-list-border': 'var(--border)',
  };
  
  return (
    <div ref={ref} role="tablist" className={`tabs-list ${className || ''}`} style={{ ...cssVars, ...style }} {...props} />
  );
});
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(({ value, className, style, ...props }, ref) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  const { activeTab, setActiveTab } = context;
  const { activeTheme } = useTheme();
  const isActive = activeTab === value;
  
  const cssVars = {
    '--tab-trigger-bg': isActive ? 'var(--background)' : 'transparent',
    '--tab-trigger-text': isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
    '--tab-trigger-border': isActive ? 'var(--primary)' : 'transparent',
    '--tab-trigger-hover-bg': 'var(--accent)',
    '--tab-trigger-hover-text': 'var(--accent-foreground)',
  };

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`tabs-trigger ${isActive ? 'tabs-trigger--active' : ''} ${className || ''}`}
      style={{ ...cssVars, ...style }}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(({ value, className, style, ...props }, ref) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  const { activeTheme } = useTheme();
  const isActive = context.activeTab === value;
  
  const cssVars = {
    '--tabs-content-bg': 'var(--background)',
    '--tabs-content-text': 'var(--foreground)',
    '--tabs-content-padding': 'var(--spacing-md)',
  };

  return isActive ? (
    <div ref={ref} role="tabpanel" className={`tabs-content ${className || ''}`} style={{ ...cssVars, ...style }} {...props} />
  ) : null;
});
TabsContent.displayName = 'TabsContent';

export { Tabs };
