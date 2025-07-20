import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import HUDPanel from './HUDPanel';

const meta: Meta<typeof HUDPanel> = {
  title: 'Themes/Cyberpunk/Components/HUD Panel',
  component: HUDPanel,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Individual HUD panels/widgets with transparent glass-morphism styling, collapsible functionality, and cyberpunk visual effects.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['matrix', 'doom', 'swordfish', 'neon', 'ghost'],
      description: 'Visual variant of the panel',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Panel size',
    },
    shape: {
      control: 'select',
      options: ['rectangular', 'rounded', 'hexagonal', 'circular'],
      description: 'Panel shape style',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'warning', 'error', 'loading'],
      description: 'Status indicator type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HUDPanel>;

const SampleContent = () => (
  <div style={{ padding: '8px 0' }}>
    <p style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '0.875rem' }}>
      Neural interface connection established. All systems operational.
    </p>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#999',
      }}
    >
      <span>Uptime: 14:32:18</span>
      <span>Load: 67%</span>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    title: 'System Panel',
    subtitle: 'v2.4.1',
    variant: 'matrix',
    size: 'md',
    shape: 'rectangular',
    showHeader: true,
    showStatus: true,
    status: 'online',
    enableGlow: true,
    enableScanlines: true,
    onClick: action('panel-clicked'),
    onCollapse: action('panel-collapsed'),
    onHover: action('panel-hovered'),
    children: <SampleContent />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
      }}
    >
      {(['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const).map((variant) => (
        <HUDPanel
          key={variant}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Panel`}
          subtitle="Active"
          variant={variant}
          size="md"
          showStatus
          status="online"
          enableGlow
        >
          <SampleContent />
        </HUDPanel>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <HUDPanel
          key={size}
          title={`${size.toUpperCase()} Panel`}
          variant="matrix"
          size={size}
          showStatus
          status="online"
        >
          <SampleContent />
        </HUDPanel>
      ))}
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 16,
      }}
    >
      {(['online', 'offline', 'warning', 'error', 'loading'] as const).map((status) => (
        <HUDPanel
          key={status}
          title={`${status.charAt(0).toUpperCase() + status.slice(1)} Status`}
          variant="matrix"
          size="md"
          showStatus
          status={status}
          enableGlow
        >
          <div style={{ padding: '8px 0', color: '#fff', fontSize: '0.875rem' }}>
            System is currently in {status} state.
          </div>
        </HUDPanel>
      ))}
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <HUDPanel
        title="Collapsible Panel"
        subtitle="Click to expand/collapse"
        variant="matrix"
        size="md"
        collapsible
        defaultCollapsed={false}
        showStatus
        status="online"
        enableGlow
        enableScanlines
        onCollapse={setCollapsed}
      >
        <div style={{ padding: '16px 0' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#39ff14', fontSize: '1rem' }}>
            Detailed Information
          </h4>
          <p style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '0.875rem', lineHeight: 1.4 }}>
            This content can be hidden when the panel is collapsed. The panel maintains its header
            while hiding the content area.
          </p>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.75rem' }}
          >
            <div style={{ color: '#999' }}>CPU Usage:</div>
            <div style={{ color: '#39ff14' }}>67%</div>
            <div style={{ color: '#999' }}>Memory:</div>
            <div style={{ color: '#39ff14' }}>4.2GB</div>
            <div style={{ color: '#999' }}>Network:</div>
            <div style={{ color: '#39ff14' }}>Online</div>
          </div>
        </div>
      </HUDPanel>
    );
  },
};

export const WithEffects: Story = {
  args: {
    title: 'Enhanced Panel',
    subtitle: 'With visual effects',
    variant: 'neon',
    size: 'lg',
    enableGlow: true,
    enableScanlines: true,
    enablePulse: true,
    enableGlitch: false,
    showStatus: true,
    status: 'online',
    children: (
      <div style={{ padding: '16px 0' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#ff1493', fontSize: '1rem' }}>
          Neural Network Status
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: '0.875rem' }}>Synaptic Load</span>
            <span style={{ color: '#ff1493', fontSize: '0.875rem', fontWeight: 'bold' }}>89%</span>
          </div>
          <div
            style={{
              height: 4,
              background: '#333',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '89%',
                height: '100%',
                background: 'linear-gradient(90deg, #ff1493, #6a0dad)',
                boxShadow: '0 0 8px #ff1493',
              }}
            />
          </div>
        </div>
      </div>
    ),
  },
};

export const CustomContent: Story = {
  render: () => (
    <HUDPanel
      title="Mission Briefing"
      subtitle="Operation: Ghost Protocol"
      variant="doom"
      size="lg"
      showStatus
      status="warning"
      enableGlow
    >
      <div style={{ padding: '16px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#ff0000', fontSize: '1rem' }}>
            CLASSIFIED - LEVEL 5
          </h4>
          <p style={{ margin: '0 0 12px 0', color: '#fff', fontSize: '0.875rem', lineHeight: 1.4 }}>
            Infiltrate enemy compound and extract valuable intelligence. Exercise extreme caution.
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#ff0000', fontSize: '0.875rem' }}>
            Objectives:
          </h5>
          <ul style={{ margin: 0, paddingLeft: 16, color: '#fff', fontSize: '0.8rem' }}>
            <li style={{ marginBottom: 4 }}>Secure primary server room</li>
            <li style={{ marginBottom: 4 }}>Download classified files</li>
            <li style={{ marginBottom: 4 }}>Eliminate security traces</li>
            <li>Extract without detection</li>
          </ul>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 8,
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid #ff0000',
            borderRadius: 4,
            fontSize: '0.75rem',
          }}
        >
          <span style={{ color: '#ff0000' }}>Time Limit:</span>
          <span style={{ color: '#fff', fontWeight: 'bold' }}>23:45:12</span>
        </div>
      </div>
    </HUDPanel>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [variant, setVariant] = useState<'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost'>(
      'matrix',
    );
    const [enableEffects, setEnableEffects] = useState(true);
    const [status, setStatus] = useState<'online' | 'offline' | 'warning' | 'error' | 'loading'>(
      'online',
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            style={{ padding: 4, background: '#333', color: '#fff', border: '1px solid #555' }}
          >
            <option value="matrix">Matrix</option>
            <option value="doom">Doom</option>
            <option value="swordfish">Swordfish</option>
            <option value="neon">Neon</option>
            <option value="ghost">Ghost</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            style={{ padding: 4, background: '#333', color: '#fff', border: '1px solid #555' }}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="loading">Loading</option>
          </select>

          <label style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={enableEffects}
              onChange={(e) => setEnableEffects(e.target.checked)}
            />
            Enable Effects
          </label>
        </div>

        {/* Panel */}
        <HUDPanel
          title="Interactive Panel"
          subtitle={`${variant} variant`}
          variant={variant}
          size="md"
          showStatus
          status={status}
          enableGlow={enableEffects}
          enableScanlines={enableEffects}
          enablePulse={enableEffects && status === 'online'}
          enableGlitch={enableEffects && status === 'error'}
          onClick={action('panel-clicked')}
          onHover={action('panel-hovered')}
        >
          <SampleContent />
        </HUDPanel>
      </div>
    );
  },
};
