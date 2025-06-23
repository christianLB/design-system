/**
 * A full-page example dashboard to validate component cohesion and theming.
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import {
  AppLayout,
  Heading,
  Stack,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  DataTable,
  Alert,
  Button,
  Input,
  Label,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Navbar,
  Header,
  Box,
  Text,
  Icon,
} from '@/components';
import { Link } from '@/components/Link';
import { Sidebar, type SidebarItem } from '@/components/Sidebar';
import type { ColumnDef } from '@tanstack/react-table';

interface Row {
  id: number;
  name: string;
  status: string;
  lastLogin: string;
  visits: number;
}

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'User' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'lastLogin', header: 'Last Login' },
  { accessorKey: 'visits', header: 'Sessions' },
];

const statuses = ['Active', 'Idle', 'Offline'];
const dates = ['Today', 'Yesterday', '3 days ago', 'Last week', '2 weeks ago'];

const data: Row[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  lastLogin: dates[Math.floor(Math.random() * dates.length)],
  visits: Math.floor(Math.random() * 200),
}));

const sidebarItems: SidebarItem[] = [
  { 
    label: 'Dashboard', 
    href: '#dashboard', 
    icon: <Icon name="Home" size="sm" /> 
  },
  { 
    label: 'Analytics', 
    href: '#analytics', 
    icon: <Icon name="BarChart2" size="sm" /> 
  },
  { 
    label: 'Users', 
    href: '#users',
    icon: <Icon name="Users" size="sm" />,
    items: [
      { label: 'User List', href: '#user-list' },
      { label: 'Add User', href: '#add-user' },
      { label: 'User Groups', href: '#user-groups' },
    ] 
  },
  { 
    label: 'Content', 
    href: '#content', 
    icon: <Icon name="FileText" size="sm" /> 
  },
  { 
    label: 'Reports', 
    href: '#reports', 
    icon: <Icon name="PieChart" size="sm" /> 
  },
  { 
    label: 'Settings', 
    href: '#settings', 
    icon: <Icon name="Settings" size="sm" /> 
  },
];

const navItems = [
  { label: 'Dashboard', href: '#', icon: <Icon name="Home" size="sm" /> },
  { label: 'Analytics', href: '#/analytics', icon: <Icon name="BarChart2" size="sm" /> },
  { label: 'Support', href: '#/support', icon: <Icon name="HelpCircle" size="sm" /> },
  { label: 'Documentation', href: '#/docs', icon: <Icon name="BookOpen" size="sm" /> },
];

const meta: Meta<typeof VisualMockupDemo> = {
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
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    },
  },
};

const VisualMockupDemo = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Analytics mock data
  const visitStats = [
    { label: 'Today', count: 2456, change: +12.5 },
    { label: 'Week', count: 12500, change: +7.2 },
    { label: 'Month', count: 48200, change: -3.4 },
  ];
  
  // Note: chartData would be used for a chart component in the future
  // Currently commented out to avoid linting errors
  // const chartData = [
  //   { name: 'Jan', value: 2400 },
  //   { name: 'Feb', value: 1398 },
  //   { name: 'Mar', value: 9800 },
  //   { name: 'Apr', value: 3908 },
  //   { name: 'May', value: 4800 },
  //   { name: 'Jun', value: 3800 },
  // ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, easing: 'easeInOut' }}
      className="min-h-screen"
    >
      <AppLayout
        sidebar={<Sidebar items={sidebarItems} header={
          <Box p="md">
            <Stack direction="row" align="center" gap="sm">
              <Icon name="Zap" size="lg" />
              <Text weight="bold">FutureDash</Text>
            </Stack>
          </Box>
        } />}
        header={
          <Header padding="md">
            <Navbar 
              layout="row"
              items={navItems} 
              logo={
                <Stack direction="row" align="center" gap="sm">
                  <Icon name="Zap" size="lg" />
                  <Text weight="bold" className="text-lg">FutureDash</Text>
                </Stack>
              }
              cta={
                <Stack direction="row" gap="sm">
                  <Button variant="ghost" size="sm">
                    <Icon name="Bell" size="sm" />
                  </Button>
                  <Button variant="primary" size="sm">
                    <Icon name="User" size="sm" />
                    <span className="ml-2">Profile</span>
                  </Button>
                </Stack>
              }
            />
          </Header>
        }
        stickyHeader
        className="bg-background"
      >
        <Stack gap="lg" className="p-6">
          {/* Dashboard Header */}
          <Stack direction="row" align="center" justify="between" className="mb-4">
            <Stack gap="xs">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Heading as="h1" size={1}>
                  Dashboard Overview
                </Heading>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Text color="subtle">Welcome back, Admin. Here&apos;s your latest analytics.</Text>
              </motion.div>
            </Stack>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
            <Button variant="primary">
              <Icon name="Plus" size="sm" />
              <span className="ml-2">Add Widget</span>
            </Button>
          </motion.div>
          </Stack>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Grid columns={3} gap="md">
            {visitStats.map((stat, i) => (
              <Card key={i}>
                <CardContent>
                  <Stack gap="xs">
                    <Text color="subtle">{stat.label} Sessions</Text>
                <Stack direction="row" align="center" gap="sm">
                  <Heading as="h3" size={2}>
                    {stat.count.toLocaleString()}
                  </Heading>
                  <Text 
                    color={stat.change > 0 ? "success" : "error"} 
                    size="sm"
                    className="font-medium"
                  >
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </Text>
                </Stack>
                    <Text color={i === 0 ? 'success' : 'subtle'} size="sm">
                      <Icon name={i === 0 ? 'ArrowUp' : 'ArrowRight'} size="sm" />
                      <span className="ml-1">
                        {i === 0 ? '+12%' : i === 1 ? '+8%' : '+3%'} from previous period
                      </span>
                    </Text>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
          </motion.div>

          {/* Main Dashboard Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Grid columns={2} gap="lg">
            {/* Data Table */}
            <Box style={{ gridColumn: 'span 2' }}>
              <Card>
                <CardHeader>
                  <Stack direction="row" align="center" justify="between" className="w-full">
                    <CardTitle>Active Users</CardTitle>
                    <Link href="#" variant="subtle">
                      <Stack direction="row" align="center" gap="xs">
                        <span>View All</span>
                        <Icon name="ArrowRight" size="sm" />
                      </Stack>
                    </Link>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <DataTable columns={columns} data={data} striped hover />
                </CardContent>
                <CardFooter>
                  <Text size="sm" color="subtle">Showing {data.length} of {data.length} users</Text>
                </CardFooter>
              </Card>
            </Box>

            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack gap="md">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter new password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                </Stack>
              </CardContent>
              <CardFooter>
                <Stack direction="row" gap="sm">
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="primary">Save Changes</Button>
                </Stack>
              </CardFooter>
            </Card>
          </Grid>
          </motion.div>

          {/* System Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Alert variant="info" title="System Notification">
              The futuristic theme has been applied across all components. New features available.
            </Alert>
          </motion.div>

          {/* System Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card>
            <CardHeader>
              <CardTitle>System Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack direction="row" gap="md" wrap>
                <Button onClick={() => setIsDialogOpen(true)} variant="primary">
                  <Icon name="Settings" size="sm" />
                  <span className="ml-2">Configure System</span>
                </Button>
                <Button variant="secondary">
                  <Icon name="RefreshCw" size="sm" />
                  <span className="ml-2">Refresh Data</span>
                </Button>
                <Button variant="ghost">
                  <Icon name="HelpCircle" size="sm" />
                  <span className="ml-2">Help</span>
                </Button>
              </Stack>
            </CardContent>
          </Card>
          </motion.div>

          {/* Confirmation Dialog */}
          <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogHeader>
              <DialogTitle>System Configuration</DialogTitle>
            </DialogHeader>
            <Box p="md">
              <Text>Are you sure you want to modify system configuration settings? This action may require a system restart.</Text>
            </Box>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Proceed</Button>
            </DialogFooter>
          </Dialog>
        </Stack>
      </AppLayout>
    </motion.div>
  );
};
