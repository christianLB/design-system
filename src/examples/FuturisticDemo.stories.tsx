import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from '@/theme/ThemeContext';
import Button from '@/components/Button/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/Card/Card';
import { Dialog, DialogTitle, DialogDescription, DialogFooter as ModalFooter } from '@/components/Dialog/Dialog';
import { Loader } from '@/components/Loader';
import { Alert } from '@/components/Alert';
import { Stack } from '@/components/Stack';

const meta: Meta = {
  title: 'Examples/Futuristic Demo',
  parameters: {
    docs: {
      description: {
        component: 'Demonstrates a small UI flow with futuristic animations.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const FuturisticDemo: Story = {
  render: () => <DemoFlow />,
};

const DemoFlow = () => {
  useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setOpen(false);
    }, 1000);
  };

  return (
    <Stack gap="md">
      <Card>
        <CardHeader>
          <CardTitle>Launch sequence</CardTitle>
        </CardHeader>
        <CardContent>Press the button to start the demo.</CardContent>
        <CardFooter>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
        </CardFooter>
      </Card>

      {done && (
        <Alert variant="success" title="All good">
          Demo complete!
        </Alert>
      )}

      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <DialogTitle>Proceed?</DialogTitle>
        <DialogDescription>Confirm to view loader.</DialogDescription>
        <ModalFooter>
          <Button onClick={handleConfirm}>Confirm</Button>
        </ModalFooter>
      </Dialog>

      {loading && <Loader center />}
    </Stack>
  );
};
