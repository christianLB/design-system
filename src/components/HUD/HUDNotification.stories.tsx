import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import HUDNotification, { HUDNotificationManager } from './HUDNotification';
import type { HUDNotificationData } from './HUDNotification';

const meta: Meta<typeof HUDNotification> = {
  title: 'Cyberpunk/HUD/HUDNotification',
  component: HUDNotification,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Floating notification system with queue management, auto-dismiss functionality, and immersive cyberpunk styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['matrix', 'doom', 'swordfish', 'neon', 'ghost'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Notification size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HUDNotification>;

// Sample notification data
const sampleNotification: HUDNotificationData = {
  id: 'sample-1',
  type: 'success',
  title: 'Mission Complete',
  message: 'Primary objective secured successfully. All team members accounted for.',
  timestamp: new Date(),
  source: 'Mission Control',
  priority: 2,
  actions: [
    { id: 'view', label: 'View Report', variant: 'primary', callback: () => action('view-clicked')() },
    { id: 'dismiss', label: 'Dismiss', variant: 'secondary', callback: () => action('dismiss-clicked')() },
  ],
};

export const Default: Story = {
  args: {
    notification: sampleNotification,
    variant: 'matrix',
    size: 'md',
    showCloseButton: true,
    showTimestamp: true,
    showSource: true,
    autoDismiss: false,
    enableGlow: true,
    enablePulse: false,
    onDismiss: action('notification-dismissed'),
    onActionClick: action('action-clicked'),
    onClick: action('notification-clicked'),
  },
};

export const AllTypes: Story = {
  render: () => {
    const types = [
      { type: 'info', title: 'System Update', message: 'New security patches have been installed.' },
      { type: 'success', title: 'Mission Complete', message: 'All objectives completed successfully.' },
      { type: 'warning', title: 'Low Ammunition', message: 'Primary weapon at 15% capacity.' },
      { type: 'error', title: 'System Error', message: 'Critical system failure detected.' },
      { type: 'critical', title: 'CRITICAL ALERT', message: 'Immediate evacuation required!' },
      { type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance in 5 minutes.' },
      { type: 'combat', title: 'Enemy Contact', message: 'Hostile forces detected in sector 7.' },
      { type: 'objective', title: 'New Objective', message: 'Secondary target has been identified.' },
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        {types.map(({ type, title, message }, index) => (
          <HUDNotification
            key={type}
            notification={{
              id: `notification-${index}`,
              type,
              title,
              message,
              timestamp: new Date(),
            }}
            variant="matrix"
            size="md"
            showCloseButton
            autoDismiss={false}
            enableGlow
          />
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      {(['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const).map(variant => (
        <HUDNotification
          key={variant}
          notification={{
            id: `${variant}-notification`,
            type: 'success',
            title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
            message: `This is a ${variant} styled notification with cyberpunk effects.`,
            timestamp: new Date(),
          }}
          variant={variant}
          size="md"
          showCloseButton
          autoDismiss={false}
          enableGlow
        />
      ))}
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <HUDNotification
      notification={{
        id: 'action-notification',
        type: 'warning',
        title: 'Mission Brief Update',
        message: 'New intelligence available. Enemy patrol patterns have changed. Recommend strategy revision.',
        timestamp: new Date(),
        source: 'Intel Division',
        priority: 3,
        actions: [
          { id: 'accept', label: 'Accept', variant: 'primary', callback: () => action('accept-clicked')() },
          { id: 'review', label: 'Review', variant: 'secondary', callback: () => action('review-clicked')() },
          { id: 'reject', label: 'Reject', variant: 'danger', callback: () => action('reject-clicked')() },
        ],
      }}
      variant="doom"
      size="lg"
      showCloseButton
      showTimestamp
      showSource
      autoDismiss={false}
      enableGlow
      onActionClick={action('action-clicked')}
    />
  ),
};

export const CriticalAlert: Story = {
  render: () => (
    <HUDNotification
      notification={{
        id: 'critical-alert',
        type: 'critical',
        title: 'HULL BREACH DETECTED',
        message: 'Emergency protocols activated. Immediate action required to prevent catastrophic failure.',
        timestamp: new Date(),
        source: 'Emergency System',
        priority: 5,
        actions: [
          { id: 'emergency', label: 'Emergency Seal', variant: 'danger', callback: () => action('emergency-clicked')() },
          { id: 'evacuate', label: 'Evacuate', variant: 'primary', callback: () => action('evacuate-clicked')() },
        ],
      }}
      variant="doom"
      size="lg"
      showCloseButton={false}
      showTimestamp
      showSource
      autoDismiss={false}
      enableGlow
      enablePulse
      enableGlitch
      onActionClick={action('critical-action-clicked')}
    />
  ),
};

export const NotificationManager: StoryObj<typeof HUDNotificationManager> = {
  render: () => {
    const [notifications, setNotifications] = useState<HUDNotificationData[]>([]);
    const [nextId, setNextId] = useState(1);

    const notificationTypes = ['info', 'success', 'warning', 'error', 'critical', 'system', 'combat', 'objective'] as const;
    const variants = ['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const;
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'] as const;

    const [currentVariant, setCurrentVariant] = useState<typeof variants[number]>('matrix');
    const [currentPosition, setCurrentPosition] = useState<typeof positions[number]>('top-right');

    const addNotification = (type?: typeof notificationTypes[number]) => {
      const randomType = type || notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const messages = {
        info: 'System information update available.',
        success: 'Operation completed successfully.',
        warning: 'Resource levels approaching critical threshold.',
        error: 'System malfunction detected.',
        critical: 'IMMEDIATE ATTENTION REQUIRED!',
        system: 'System maintenance scheduled.',
        combat: 'Enemy forces detected in proximity.',
        objective: 'New mission parameters received.',
      };

      const newNotification: HUDNotificationData = {
        id: `notification-${nextId}`,
        type: randomType,
        title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Alert`,
        message: messages[randomType],
        timestamp: new Date(),
        source: randomType === 'critical' ? 'EMERGENCY SYSTEM' : 'System',
        priority: randomType === 'critical' ? 5 : Math.floor(Math.random() * 3) + 1,
        duration: randomType === 'critical' ? 0 : 5000,
        ...(Math.random() > 0.7 && {
          actions: [
            { id: 'confirm', label: 'Confirm', variant: 'primary', callback: () => console.log('Confirmed') },
            { id: 'dismiss', label: 'Dismiss', variant: 'secondary', callback: () => console.log('Dismissed') },
          ],
        }),
      };

      setNotifications(prev => [...prev, newNotification]);
      setNextId(prev => prev + 1);
    };

    const removeNotification = (id: string) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAll = () => {
      setNotifications([]);
    };

    return (
      <div style={{ minHeight: '100vh', position: 'relative', padding: 20 }}>
        {/* Controls */}
        <div style={{ 
          position: 'fixed', 
          top: 20, 
          left: 20, 
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'rgba(0, 0, 0, 0.8)',
          padding: 16,
          borderRadius: 8,
          border: '1px solid #39ff14'
        }}>
          <h4 style={{ margin: 0, color: '#39ff14' }}>Notification Controls</h4>
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => addNotification('info')} style={{ padding: '4px 8px', background: '#00ffff', color: '#000', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
              Info
            </button>
            <button onClick={() => addNotification('success')} style={{ padding: '4px 8px', background: '#39ff14', color: '#000', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
              Success
            </button>
            <button onClick={() => addNotification('warning')} style={{ padding: '4px 8px', background: '#ff6600', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
              Warning
            </button>
            <button onClick={() => addNotification('error')} style={{ padding: '4px 8px', background: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
              Error
            </button>
            <button onClick={() => addNotification('critical')} style={{ padding: '4px 8px', background: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
              CRITICAL
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => addNotification()} style={{ padding: '4px 8px', background: '#6a0dad', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
              Random
            </button>
            <button onClick={clearAll} style={{ padding: '4px 8px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
              Clear All
            </button>
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Variant:</label>
            <select 
              value={currentVariant} 
              onChange={(e) => setCurrentVariant(e.target.value as any)}
              style={{ padding: 2, background: '#333', color: '#fff', border: '1px solid #555', fontSize: '0.75rem' }}
            >
              {variants.map(variant => (
                <option key={variant} value={variant}>{variant}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Position:</label>
            <select 
              value={currentPosition} 
              onChange={(e) => setCurrentPosition(e.target.value as any)}
              style={{ padding: 2, background: '#333', color: '#fff', border: '1px solid #555', fontSize: '0.75rem' }}
            >
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          <div style={{ color: '#999', fontSize: '0.7rem' }}>
            Active: {notifications.length}
          </div>
        </div>

        {/* Notification Manager */}
        <HUDNotificationManager
          notifications={notifications}
          position={currentPosition}
          variant={currentVariant}
          maxVisible={5}
          stacked
          gap={12}
          defaultDuration={5000}
          enableQueue
          onNotificationRemove={removeNotification}
          onNotificationAdd={action('notification-added')}
          onQueueChange={action('queue-changed')}
        />

        {/* Demo content */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#39ff14'
        }}>
          <h2>HUD Notification System Demo</h2>
          <p>Use the controls in the top-left to test notifications</p>
          <p>Notifications will auto-dismiss after 5 seconds (except critical)</p>
        </div>
      </div>
    );
  },
};

export const AutoDismissDemo: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<HUDNotificationData[]>([]);

    const addTimedNotification = (duration: number) => {
      const notification: HUDNotificationData = {
        id: `timed-${Date.now()}`,
        type: 'info',
        title: `Auto-dismiss in ${duration/1000}s`,
        message: `This notification will automatically dismiss after ${duration/1000} seconds.`,
        timestamp: new Date(),
        duration,
      };

      setNotifications(prev => [...prev, notification]);
    };

    const removeNotification = (id: string) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
      <div style={{ minHeight: '100vh', position: 'relative', padding: 20 }}>
        <div style={{ 
          position: 'fixed', 
          top: 20, 
          left: 20, 
          zIndex: 10000,
          display: 'flex',
          gap: 10,
          flexDirection: 'column'
        }}>
          <h4 style={{ margin: 0, color: '#39ff14' }}>Auto-dismiss Test</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => addTimedNotification(2000)} style={{ padding: '4px 8px', background: '#39ff14', color: '#000', border: 'none', cursor: 'pointer' }}>
              2s
            </button>
            <button onClick={() => addTimedNotification(5000)} style={{ padding: '4px 8px', background: '#00ffff', color: '#000', border: 'none', cursor: 'pointer' }}>
              5s
            </button>
            <button onClick={() => addTimedNotification(10000)} style={{ padding: '4px 8px', background: '#ff6600', color: '#fff', border: 'none', cursor: 'pointer' }}>
              10s
            </button>
            <button onClick={() => addTimedNotification(0)} style={{ padding: '4px 8px', background: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Persistent
            </button>
          </div>
        </div>

        <HUDNotificationManager
          notifications={notifications}
          position="top-right"
          variant="matrix"
          maxVisible={5}
          onNotificationRemove={removeNotification}
        />
      </div>
    );
  },
};