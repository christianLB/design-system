import * as React from 'react';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import { Badge } from '../components/Badge';
import { Table } from '../components/Table';
import { Input } from '../components/Input';
import { Alert } from '../components/Alert';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/Dialog';
import type { ColumnDef } from '@tanstack/react-table';

/**
 * A test component to verify the styling consistency across all updated components.
 * This component displays the Card, Badge, and Button components with various variants
 * to ensure they work properly together and with both light and dark themes.
 */
// Sample data for the Table component
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'User' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'inactive', role: 'User' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'pending', role: 'Editor' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'active', role: 'Admin' },
];

// Table example component
function TableExample() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as 'active' | 'inactive' | 'pending';
        return (
          <Badge
            variant={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'destructive'}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => {
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      data={users}
      columns={columns}
      emptyMessage="No users found"
    />
  );
}

export function ComponentStyleTest() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">Component Style Consistency Test</h1>
      
      {/* Card component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Using standardized CSS variables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">This card uses the default variant with standardized colors.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="muted">
            <CardHeader>
              <CardTitle>Muted Card</CardTitle>
              <CardDescription>Using standardized CSS variables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">This card uses the muted variant with standardized colors.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="destructive">
            <CardHeader>
              <CardTitle>Destructive Card</CardTitle>
              <CardDescription>Using standardized CSS variables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">This card uses the destructive variant with standardized colors.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="destructive">Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>Using standardized CSS variables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">This card uses the outline variant with standardized colors.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="ghost">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Badge component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Badge Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      </section>
      
      {/* Button component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Button>
        </div>
      </section>
      
      {/* Alert component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Alert Variants</h2>
        <div className="space-y-4">
          <Alert variant="default" title="Default Alert">
            This is a default alert with standardized styling.
          </Alert>
          
          <Alert variant="info" title="Information">
            This is an informational alert with standardized styling.
          </Alert>
          
          <Alert variant="success" title="Success">
            This is a success alert with standardized styling.
          </Alert>
          
          <Alert variant="warning" title="Warning">
            This is a warning alert with standardized styling.
          </Alert>
          
          <Alert variant="destructive" title="Error">
            This is an error alert with standardized styling.
          </Alert>
        </div>
      </section>

      {/* Input component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Input Component</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label htmlFor="default-input" className="block text-sm font-medium text-foreground mb-2">Default Input</label>
            <Input id="default-input" placeholder="Enter text here..." />
          </div>
          
          <div>
            <label htmlFor="disabled-input" className="block text-sm font-medium text-foreground mb-2">Disabled Input</label>
            <Input id="disabled-input" placeholder="Disabled input" disabled />
          </div>
          
          <div>
            <label htmlFor="invalid-input" className="block text-sm font-medium text-foreground mb-2">Invalid Input</label>
            <Input id="invalid-input" placeholder="Invalid input" aria-invalid="true" />
          </div>
        </div>
      </section>

      {/* Dialog component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Dialog Component</h2>
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Example</DialogTitle>
                <DialogDescription>
                  This is an example of the Dialog component with standardized styling.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-foreground">This Dialog uses our standardized CSS variables and styling patterns. It's designed to work consistently with our other components across both light and dark themes.</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Table component test */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Table Component</h2>
        <TableExample />
      </section>

      {/* Component combinations */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Component Combinations</h2>
        <Card>
          <CardHeader>
            <CardTitle>
              Complex Example
              <Badge variant="secondary" className="ml-2">New</Badge>
            </CardTitle>
            <CardDescription>
              Testing multiple components working together
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              This example demonstrates how different components work together using our
              standardized styling approach.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Status</Badge>
              <Badge variant="outline">Category</Badge>
              <Badge variant="destructive">Important</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* Theme test section */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Theme Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-background border border-border rounded-md">Background</div>
          <div className="p-4 bg-foreground text-background border border-border rounded-md">Foreground</div>
          <div className="p-4 bg-primary text-primary-foreground border border-border rounded-md">Primary</div>
          <div className="p-4 bg-secondary text-secondary-foreground border border-border rounded-md">Secondary</div>
          <div className="p-4 bg-muted text-muted-foreground border border-border rounded-md">Muted</div>
          <div className="p-4 bg-accent text-accent-foreground border border-border rounded-md">Accent</div>
          <div className="p-4 bg-destructive text-destructive-foreground border border-border rounded-md">Destructive</div>
          <div className="p-4 bg-success text-success-foreground border border-border rounded-md">Success</div>
        </div>
      </section>
    </div>
  );
}

export default ComponentStyleTest;
