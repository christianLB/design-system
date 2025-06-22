/**
 * A full-page example dashboard to validate component cohesion and theming.
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { AppLayout, Heading, Stack, Grid, Card, CardHeader, CardTitle, CardContent, CardFooter, DataTable, Alert, Button, Input, Label, Dialog, DialogHeader, DialogTitle, DialogFooter } from '@/components';
import { Sidebar, type SidebarItem } from '@/components/Sidebar';
import { useTheme } from '@/theme/ThemeContext';
import type { ColumnDef } from '@tanstack/react-table';

interface Row {
  id: number;
  name: string;
  visits: number;
}

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'visits', header: 'Visits' },
];

const data: Row[] = [
  { id: 1, name: 'Alice', visits: 120 },
  { id: 2, name: 'Bob', visits: 70 },
  { id: 3, name: 'Charlie', visits: 32 },
];

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Settings', href: '#settings' },
];

const meta: Meta = {
  title: 'Examples/VisualMockup',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-page showcase using AppLayout, Sidebar, forms, and modals to test theme cohesion.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const VisualMockup: Story = {
  render: () => <VisualMockupDemo />,
};

const VisualMockupDemo = () => {
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const shouldAnimate = theme === 'futuristic';

  const content = (
    <AppLayout sidebar={<Sidebar items={sidebarItems} />}>
      <Stack gap="lg">
        <Heading as="h1" size={1}>
          Full-Page Showcase
        </Heading>
        <Grid columns={1} responsive={[2]} gap="lg">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </Stack>
            </CardContent>
            <CardFooter>
              <Button variant="primary">Save Changes</Button>
            </CardFooter>
          </Card>
          <DataTable columns={columns} data={data} striped hover />
        </Grid>
        <Alert variant="info" title="System Update">
          The futuristic theme is now live across all components.
        </Alert>
        <Button onClick={() => setIsDialogOpen(true)}>Open Modal</Button>
        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to proceed with this action?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Confirm</Button>
          </DialogFooter>
        </Dialog>
      </Stack>
    </AppLayout>
  );

  return shouldAnimate ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  ) : (
    <div>{content}</div>
  );
};
