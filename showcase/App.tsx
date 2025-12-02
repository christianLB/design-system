/**
 * Design System Showcase
 * Interactive demo of all components + Dashboard Demo
 */

import React, { useState } from 'react';
import { ThemeProvider } from '../src/theme/ThemeContext';
import { ThemeSwitcher } from '../src/components/ThemeSwitcher';
import { List, type ListItem } from '../src/components/List';
import { Tree, type TreeNode } from '../src/components/Tree';
import { Animate, AnimateGroup } from '../src/components/Animate';
import { DataGrid, type DataGridColumn } from '../src/components/DataGrid';
import { Form, FormField, FormActions } from '../src/components/Form';
import {
  useFormValidation,
  createValidationRules,
  combineRules,
} from '../src/hooks/useFormValidation';
import { Button } from '../src/components/Button/Button';
import { Input } from '../src/components/Input/Input';
import { Card } from '../src/components/Card/Card';
import {
  User,
  Mail,
  Star,
  Folder,
  Settings,
  Bell,
  Code,
  Layers,
  Palette,
  Zap,
  LayoutDashboard,
  Component,
} from 'lucide-react';
import { DashboardDemo } from './DashboardDemo';

// Sample data
const listItems: ListItem[] = [
  {
    id: '1',
    title: 'John Doe',
    description: 'Software Engineer',
    icon: <User className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Jane Smith',
    description: 'Product Manager',
    icon: <User className="h-4 w-4" />,
  },
  { id: '3', title: 'Bob Johnson', description: 'Designer', icon: <User className="h-4 w-4" /> },
  {
    id: '4',
    title: 'Alice Brown',
    description: 'DevOps Engineer',
    icon: <User className="h-4 w-4" />,
  },
];

const menuItems: ListItem[] = [
  {
    id: '1',
    title: 'Inbox',
    description: '12 unread',
    icon: <Mail className="h-4 w-4" />,
    meta: '12',
  },
  { id: '2', title: 'Starred', icon: <Star className="h-4 w-4" />, meta: '5' },
  { id: '3', title: 'Notifications', icon: <Bell className="h-4 w-4" />, meta: '3' },
  { id: '4', title: 'Settings', icon: <Settings className="h-4 w-4" /> },
];

const treeNodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'Button.tsx', label: 'Button.tsx' },
          { id: 'Card.tsx', label: 'Card.tsx' },
          { id: 'Input.tsx', label: 'Input.tsx' },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        children: [
          { id: 'useTheme.ts', label: 'useTheme.ts' },
          { id: 'useAnimation.ts', label: 'useAnimation.ts' },
        ],
      },
      { id: 'index.ts', label: 'index.ts' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'README.md', label: 'README.md' },
];

interface GridRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const gridData: GridRow[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
];

const gridColumns: DataGridColumn<GridRow>[] = [
  { key: 'name', header: 'Name', sortable: true, editable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (v) => (
      <span
        className={`px-2 py-0.5 rounded-full text-xs ${v === 'Active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}
      >
        {v as string}
      </span>
    ),
  },
];

// Section component
const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children,
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
      {icon}
      {title}
    </h2>
    {children}
  </div>
);

// Form demo
const FormDemo: React.FC = () => {
  const form = useFormValidation<{ email: string; password: string }>();

  return (
    <Form
      form={form}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      className="max-w-sm"
    >
      <FormField name="email" label="Email" required>
        <Input
          type="email"
          placeholder="you@example.com"
          {...form.register(
            'email',
            combineRules(createValidationRules.required(), createValidationRules.email()),
          )}
        />
      </FormField>
      <FormField name="password" label="Password" required hint="At least 8 characters">
        <Input
          type="password"
          placeholder="••••••••"
          {...form.register(
            'password',
            combineRules(createValidationRules.required(), createValidationRules.minLength(8)),
          )}
        />
      </FormField>
      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </Form>
  );
};

// Animation demo
const AnimationDemo: React.FC = () => {
  const [show, setShow] = useState(true);
  const types = ['fade', 'slide-up', 'scale', 'bounce', 'rotate', 'flip'] as const;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => setShow(!show)} size="sm">
          Toggle All ({show ? 'Hide' : 'Show'})
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {types.map((type, i) => (
          <Animate key={type} type={type} show={show} delay={i * 0.05}>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <span className="text-sm font-medium">{type}</span>
            </div>
          </Animate>
        ))}
      </div>
    </div>
  );
};

// Component Showcase Page
const ComponentShowcase: React.FC = () => {
  const [listSelected, setListSelected] = useState<string[]>([]);
  const [treeSelected, setTreeSelected] = useState<string[]>([]);
  const [treeExpanded, setTreeExpanded] = useState<string[]>(['src', 'components']);
  const [gridSelected, setGridSelected] = useState<string[]>([]);

  return (
    <>
      {/* Hero */}
      <Animate type="slide-up" className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Component Showcase</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the new features: Advanced Theming, Data Display, Animation System, and Form
            Validation.
          </p>
        </div>
      </Animate>

      {/* Theme Switcher Section */}
      <Section title="Theme Switcher" icon={<Palette className="h-5 w-5" />}>
        <Card className="p-6">
          <p className="text-muted-foreground mb-4">
            Switch between 6 built-in themes. The switcher respects system preferences and persists
            your choice.
          </p>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Small</p>
              <ThemeSwitcher size="sm" />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Medium (default)</p>
              <ThemeSwitcher size="md" />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Large</p>
              <ThemeSwitcher size="lg" />
            </div>
          </div>
        </Card>
      </Section>

      {/* List Section */}
      <Section title="List Component" icon={<Code className="h-5 w-5" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Default List</h3>
            <List items={listItems} showChevron />
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Multi-Select List</h3>
            <List
              items={menuItems}
              variant="bordered"
              selectionMode="multiple"
              selected={listSelected}
              onSelect={(items) => setListSelected(items.map((i) => i.id))}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Selected: {listSelected.join(', ') || 'none'}
            </p>
          </Card>
        </div>
      </Section>

      {/* Tree Section */}
      <Section title="Tree Component" icon={<Folder className="h-5 w-5" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">File Explorer</h3>
            <Tree
              nodes={treeNodes}
              variant="bordered"
              expanded={treeExpanded}
              onExpand={setTreeExpanded}
              selectionMode="single"
              selected={treeSelected}
              onSelect={(ids) => setTreeSelected(ids)}
            />
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-3">With Lines</h3>
            <Tree nodes={treeNodes} showLines defaultExpanded="all" selectionMode="multiple" />
          </Card>
        </div>
      </Section>

      {/* DataGrid Section */}
      <Section title="DataGrid Component" icon={<Layers className="h-5 w-5" />}>
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Editable Grid with Selection</h3>
          <DataGrid
            data={gridData}
            columns={gridColumns}
            rowKey="id"
            selectable
            selectedRows={gridSelected}
            onSelectionChange={setGridSelected}
            striped
            onCellEdit={(rowKey, colKey, value) => console.log('Edit:', rowKey, colKey, value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Selected rows: {gridSelected.join(', ') || 'none'}. Click the edit icon to modify cells.
          </p>
        </Card>
      </Section>

      {/* Animation Section */}
      <Section title="Animation System" icon={<Zap className="h-5 w-5" />}>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Entrance Animations</h3>
          <AnimationDemo />
        </Card>
      </Section>

      {/* Form Section */}
      <Section title="Form Validation" icon={<Mail className="h-5 w-5" />}>
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Login Form with Validation</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Try submitting with invalid data to see validation errors.
          </p>
          <FormDemo />
        </Card>
      </Section>

      {/* Staggered Animation Demo */}
      <Section title="Staggered Animations" icon={<Zap className="h-5 w-5" />}>
        <AnimateGroup type="slide-up" stagger={0.08}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {i}
                </div>
                <div>
                  <p className="font-medium">Staggered Item {i}</p>
                  <p className="text-sm text-muted-foreground">Animated with 80ms delay</p>
                </div>
              </div>
            </Card>
          ))}
        </AnimateGroup>
      </Section>
    </>
  );
};

// Main App with Navigation
export default function App() {
  const [currentView, setCurrentView] = useState<'components' | 'dashboard'>('components');

  return (
    <ThemeProvider defaultTheme="dark">
      {currentView === 'dashboard' ? (
        <>
          {/* Navigation Bar for Dashboard */}
          <div
            style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              zIndex: 100,
              display: 'flex',
              gap: '8px',
            }}
          >
            <button
              onClick={() => setCurrentView('components')}
              style={{
                background: 'rgba(255,255,255,0.9)',
                color: '#333',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Component className="w-4 h-4" />
              Components
            </button>
            <ThemeSwitcher size="sm" />
          </div>
          <DashboardDemo />
        </>
      ) : (
        <div className="min-h-screen bg-background text-foreground">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Foundry Design System v4.1</h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Demo
                </button>
                <ThemeSwitcher size="sm" />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="container mx-auto px-4 py-8">
            <ComponentShowcase />
          </main>

          {/* Footer */}
          <footer className="border-t border-border py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              @christianlb/design-system v4.1.0 — Built with React, TypeScript, Tailwind CSS
            </div>
          </footer>
        </div>
      )}
    </ThemeProvider>
  );
}
