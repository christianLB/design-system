/**
 * Example dashboard page combining multiple components.
 * Useful for validating overall look & feel across themes.
 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/Heading';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/Card/Card';
import { DataTable } from '@/components/DataTable';
import { Alert } from '@/components/Alert';
import Button from '@/components/Button/Button';
import { Stack } from '@/components/Stack';
import { Grid } from '@/components/Grid';
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

const meta: Meta = {
  title: 'Examples/VisualMockup',
  parameters: {
    docs: {
      description: {
        component:
          'Combines multiple components in a dashboard-like view to validate cohesive theming and subtle animations.',
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
  const shouldAnimate = theme === 'futuristic';

  const content = (
    <Stack gap="lg">
      <Heading as="h1" size={1}>
        Dashboard
      </Heading>
      <Grid columns={1} responsive={[2]} gap="lg">
        <Card>
          <CardHeader>
            <CardTitle>Visits today</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: 'var(--heading-size-2)', fontWeight: 600 }}>
              10,234
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="primary">View report</Button>
          </CardFooter>
        </Card>
        <DataTable columns={columns} data={data} striped hover />
      </Grid>
      <Alert variant="info" title="Demo notice">
        This mockup demonstrates component cohesion.
      </Alert>
      <Button>Primary Action</Button>
    </Stack>
  );

  return shouldAnimate ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {content}
    </motion.div>
  ) : (
    <div>{content}</div>
  );
};
