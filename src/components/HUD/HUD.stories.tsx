import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import HUD from './HUD';
import HUDPanel from './HUDPanel';
import HUDMetric from './HUDMetric';
import HUDRadar from './HUDRadar';
import HUDProgressBar from './HUDProgressBar';
import { HUDNotificationManager } from './HUDNotification';
import type { HUDNotificationData, RadarContact } from './index';

const meta: Meta<typeof HUD> = {
  title: 'Cyberpunk/HUD/HUD Container',
  component: HUD,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main HUD container component providing immersive cyberpunk interface capabilities with floating overlay system, real-time data updates, and advanced effects.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'object',
      description: 'Layout configuration for HUD positioning and orientation',
    },
    theme: {
      control: 'object',
      description: 'Theme configuration for visual effects and styling',
    },
    config: {
      control: 'object',
      description: 'Behavior configuration for auto-hide, dragging, etc.',
    },
    visible: {
      control: 'boolean',
      description: 'Whether HUD is visible',
    },
    active: {
      control: 'boolean',
      description: 'Whether HUD is active/focused',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HUD>;

// Sample data for stories
const sampleRadarContacts: RadarContact[] = [
  { id: '1', x: 0.3, y: -0.4, type: 'friendly', label: 'Alpha Squad' },
  { id: '2', x: -0.6, y: 0.2, type: 'hostile', label: 'Enemy Unit' },
  { id: '3', x: 0.1, y: 0.7, type: 'neutral', label: 'Civilian' },
  { id: '4', x: -0.3, y: -0.8, type: 'objective', label: 'Target' },
];

const sampleNotifications: HUDNotificationData[] = [
  {
    id: '1',
    type: 'success',
    title: 'Mission Complete',
    message: 'Objective Alpha secured successfully',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Ammunition',
    message: 'Primary weapon at 15% capacity',
    timestamp: new Date(),
  },
  {
    id: '3',
    type: 'error',
    title: 'System Malfunction',
    message: 'Shield generators offline',
    timestamp: new Date(),
  },
];

export const Default: Story = {
  args: {
    layout: {
      position: 'top-left',
      orientation: 'vertical',
      gap: 16,
      padding: 20,
    },
    theme: {
      variant: 'matrix',
      opacity: 0.9,
      blur: 8,
      glow: true,
      scanlines: true,
    },
    config: {
      autoHide: false,
      draggable: false,
      collapsible: true,
      zIndex: 1000,
    },
    visible: true,
    active: false,
    onVisibilityChange: action('visibility-changed'),
    onClick: action('hud-clicked'),
    onHover: action('hud-hovered'),
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
      <HUD {...args}>
        <HUDPanel title="System Status" size="md" variant="matrix">
          <HUDMetric
            label="Health"
            value={85}
            type="health"
            showProgressBar
            showChangeIndicator
            variant="matrix"
          />
          <HUDMetric
            label="Shield"
            value={42}
            type="shields"
            showProgressBar
            critical
            variant="matrix"
          />
          <HUDMetric
            label="Energy"
            value={73}
            type="energy"
            showProgressBar
            variant="matrix"
          />
        </HUDPanel>
      </HUD>
    </div>
  ),
};

export const GamingHUD: Story = {
  args: {
    ...Default.args,
    layout: {
      position: 'custom',
      customPosition: { x: 20, y: 20 },
      orientation: 'vertical',
    },
    theme: {
      variant: 'matrix',
      glow: true,
      scanlines: true,
      matrixRain: false,
      pulseEffect: true,
    },
  },
  render: (args) => {
    const [health, setHealth] = useState(85);
    const [shields, setShields] = useState(42);
    const [ammo, setAmmo] = useState(28);

    return (
      <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
        {/* Main HUD */}
        <HUD {...args}>
          <HUDPanel title="Vital Signs" size="md" variant="matrix" showStatus status="online">
            <HUDMetric
              label="Health"
              value={health}
              maxValue={100}
              type="health"
              showProgressBar
              showPercentage
              variant="matrix"
              thresholds={{
                critical: 20,
                warning: 40
              }}
            />
            <HUDMetric
              label="Shields"
              value={shields}
              maxValue={100}
              type="shields"
              showProgressBar
              showPercentage
              variant="matrix"
              critical={shields <= 20}
            />
          </HUDPanel>
        </HUD>

        {/* Weapons HUD */}
        <HUD
          layout={{ position: 'bottom-right', padding: 20 }}
          theme={{ variant: 'doom', glow: true }}
          visible
        >
          <HUDPanel title="Weapons" size="md" variant="doom">
            <HUDMetric
              label="Primary Ammo"
              value={ammo}
              maxValue={30}
              type="ammo"
              format="fraction"
              showProgressBar
              variant="doom"
              warning={ammo <= 10}
            />
            <HUDProgressBar
              label="Reload Progress"
              value={0}
              variant="doom"
              mode="indeterminate"
              size="sm"
            />
          </HUDPanel>
        </HUD>

        {/* Radar HUD */}
        <HUD
          layout={{ position: 'bottom-left', padding: 20 }}
          theme={{ variant: 'swordfish', glow: true }}
          visible
        >
          <HUDRadar
            contacts={sampleRadarContacts}
            variant="swordfish"
            size="md"
            mode="sweep"
            showCompass
            showContactLabels
            enablePingAnimation
            title="Tactical Overview"
            onContactClick={action('contact-clicked')}
          />
        </HUD>

        {/* Notifications */}
        <HUDNotificationManager
          notifications={sampleNotifications}
          position="top-right"
          variant="matrix"
          maxVisible={3}
          onNotificationRemove={action('notification-removed')}
        />

        {/* Control buttons for demo */}
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10000 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setHealth(Math.max(0, health - 10))}>Damage</button>
            <button onClick={() => setHealth(Math.min(100, health + 10))}>Heal</button>
            <button onClick={() => setShields(Math.max(0, shields - 15))}>Shield Down</button>
            <button onClick={() => setShields(Math.min(100, shields + 15))}>Shield Up</button>
            <button onClick={() => setAmmo(Math.max(0, ammo - 1))}>Fire</button>
            <button onClick={() => setAmmo(30)}>Reload</button>
          </div>
        </div>
      </div>
    );
  },
};

export const TacticalHUD: Story = {
  args: {
    ...Default.args,
    theme: {
      variant: 'doom',
      glow: true,
      scanlines: false,
      glitchEffect: true,
    },
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
      <HUD {...args}>
        <HUDPanel title="Mission Control" size="lg" variant="doom" showStatus status="warning">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <HUDMetric
              label="Armor"
              value={67}
              type="armor"
              showProgressBar
              showPercentage
              variant="doom"
              size="lg"
            />
            <HUDMetric
              label="Ammunition"
              value={234}
              maxValue={500}
              type="ammo"
              format="fraction"
              showProgressBar
              variant="doom"
              size="lg"
            />
          </div>
          <HUDProgressBar
            label="Mission Progress"
            value={34}
            variant="doom"
            enableGradient
            showPercentage
            size="lg"
          />
        </HUDPanel>
      </HUD>
    </div>
  ),
};

export const CyberpunkStyle: Story = {
  args: {
    ...Default.args,
    theme: {
      variant: 'neon',
      glow: true,
      scanlines: true,
      matrixRain: true,
      pulseEffect: true,
    },
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
      <HUD {...args}>
        <HUDPanel 
          title="Neural Interface" 
          subtitle="v2.4.7"
          size="xl" 
          variant="neon" 
          showStatus 
          status="online"
          enablePulse
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <HUDMetric
                label="CPU Load"
                value={73}
                type="custom"
                icon="⚡"
                showProgressBar
                showPercentage
                variant="neon"
                animation={{
                  enablePulse: true
                }}
                showSparkline
                sparklineData={[65, 70, 68, 75, 73]}
              />
              <HUDMetric
                label="Memory"
                value={89}
                type="custom"
                icon="💾"
                showProgressBar
                showPercentage
                variant="neon"
                warning
              />
            </div>
            <HUDProgressBar
              label="Data Transfer"
              value={45}
              variant="neon"
              enableDataStream
              enableGradient
              showPercentage
              size="lg"
              enablePulse
            />
          </div>
        </HUDPanel>
      </HUD>
    </div>
  ),
};

export const MinimalHUD: Story = {
  args: {
    ...Default.args,
    theme: {
      variant: 'ghost',
      opacity: 0.7,
      blur: 12,
      glow: false,
      scanlines: false,
    },
    config: {
      autoHide: true,
      autoHideDelay: 2000,
      collapsible: false,
    },
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
      <HUD {...args}>
        <HUDPanel title="Status" size="sm" variant="ghost" showHeader={false}>
          <HUDMetric
            label="Health"
            value={95}
            showProgressBar={false}
            showValue
            variant="ghost"
            size="sm"
            orientation="horizontal"
          />
          <HUDMetric
            label="Power"
            value={78}
            showProgressBar={false}
            showPercentage
            variant="ghost"
            size="sm"
            orientation="horizontal"
          />
        </HUDPanel>
      </HUD>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    ...Default.args,
    config: {
      draggable: true,
      resizable: true,
      collapsible: true,
    },
  },
  render: (args) => {
    const [hudVisible, setHudVisible] = useState(true);
    const [activeVariant, setActiveVariant] = useState<'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost'>('matrix');

    return (
      <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
        {/* Controls */}
        <div style={{ 
          position: 'fixed', 
          top: 20, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 10000,
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap'
        }}>
          <button onClick={() => setHudVisible(!hudVisible)}>
            {hudVisible ? 'Hide HUD' : 'Show HUD'}
          </button>
          {(['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const).map(variant => (
            <button
              key={variant}
              onClick={() => setActiveVariant(variant)}
              style={{ 
                background: activeVariant === variant ? '#39ff14' : 'transparent',
                color: activeVariant === variant ? '#000' : '#39ff14',
                border: '1px solid #39ff14',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              {variant}
            </button>
          ))}
        </div>

        <HUD
          {...args}
          visible={hudVisible}
          theme={{ ...args.theme, variant: activeVariant }}
          onDrag={action('hud-dragged')}
          onResize={action('hud-resized')}
        >
          <HUDPanel 
            title="Interactive HUD" 
            size="md" 
            variant={activeVariant}
            draggable
            collapsible
          >
            <HUDMetric
              label="System Load"
              value={Math.random() * 100}
              showProgressBar
              showPercentage
              variant={activeVariant}
              animation={{ enableCounter: true, enablePulse: true }}
            />
            <HUDProgressBar
              label="Processing"
              value={Math.random() * 100}
              variant={activeVariant}
              animated
              enableGlow
            />
          </HUDPanel>
        </HUD>
      </div>
    );
  },
};