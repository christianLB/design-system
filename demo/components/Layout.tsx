import React, { useState } from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Layout({ children, activeSection, onSectionChange }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sections = [
    { id: 'layout', name: 'Layout & Navigation' },
    { id: 'data', name: 'Data Display & Input' },
    { id: 'interactive', name: 'Interactive' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div 
        className={`bg-muted/50 border-r border-border transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-border">
          <h2 className="text-lg font-semibold">Components</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-muted rounded"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="p-2">
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-2">
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="border-b border-border p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Design System Demo</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
