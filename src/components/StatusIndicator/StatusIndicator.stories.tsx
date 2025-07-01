import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'idle', 'busy', 'away'],
    },
    withLabel: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    status: 'online',
  },
};

export const WithLabel: Story = {
  args: {
    status: 'online',
    withLabel: true,
  },
};

export const Animated: Story = {
  args: {
    status: 'online',
    animated: true,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <StatusIndicator status="online" />
        <span>Online</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="offline" />
        <span>Offline</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="idle" />
        <span>Idle</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="busy" />
        <span>Busy</span>
      </div>
      <div className="flex items-center gap-4">
        <StatusIndicator status="away" />
        <span>Away</span>
      </div>
    </div>
  ),
};

export const SystemHealthExample: Story = {
  render: () => (
    <div className="p-6 border rounded-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">System Health</h3>
        <StatusIndicator status="online" withLabel animated />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Database</span>
          <StatusIndicator status="online" withLabel />
        </div>
        <div className="flex items-center justify-between">
          <span>API Server</span>
          <StatusIndicator status="online" withLabel />
        </div>
        <div className="flex items-center justify-between">
          <span>Cache</span>
          <StatusIndicator status="idle" withLabel />
        </div>
        <div className="flex items-center justify-between">
          <span>Background Jobs</span>
          <StatusIndicator status="busy" withLabel />
        </div>
      </div>
    </div>
  ),
};