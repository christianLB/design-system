import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import HUDProgressBar from './HUDProgressBar';

const meta: Meta<typeof HUDProgressBar> = {
  title: 'Themes/Cyberpunk/Components/HUD Progress Bar',
  component: HUDProgressBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Cyberpunk-styled progress bars with glow effects, animated fills, threshold markers, and advanced visual effects.',
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
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Progress bar size',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Bar orientation',
    },
    shape: {
      control: 'select',
      options: ['rectangular', 'rounded', 'pill', 'hexagonal'],
      description: 'Bar shape style',
    },
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      description: 'Progress mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HUDProgressBar>;

export const Default: Story = {
  args: {
    value: 65,
    label: 'Progress',
    variant: 'matrix',
    size: 'md',
    orientation: 'horizontal',
    shape: 'rectangular',
    mode: 'determinate',
    showPercentage: true,
    animated: true,
    enableGlow: true,
    enableScanlines: true,
    onProgressChange: action('progress-changed'),
    onThresholdCross: action('threshold-crossed'),
    onAnimationComplete: action('animation-complete'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      {(['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const).map((variant) => (
        <HUDProgressBar
          key={variant}
          value={65}
          label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Progress`}
          variant={variant}
          size="md"
          showPercentage
          enableGlow
          enableScanlines
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <HUDProgressBar
          key={size}
          value={65}
          label={`${size.toUpperCase()} Progress Bar`}
          variant="matrix"
          size={size}
          showPercentage
          enableGlow
        />
      ))}
    </div>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ color: '#39ff14', marginBottom: 16 }}>Horizontal</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
          <HUDProgressBar
            value={45}
            label="Health"
            variant="matrix"
            orientation="horizontal"
            showPercentage
            enableGlow
          />
          <HUDProgressBar
            value={78}
            label="Shields"
            variant="swordfish"
            orientation="horizontal"
            showPercentage
            enableGlow
          />
          <HUDProgressBar
            value={23}
            label="Ammunition"
            variant="doom"
            orientation="horizontal"
            showPercentage
            enableGlow
            critical
          />
        </div>
      </div>

      <div>
        <h4 style={{ color: '#39ff14', marginBottom: 16 }}>Vertical</h4>
        <div style={{ display: 'flex', gap: 16 }}>
          <HUDProgressBar
            value={45}
            label="Health"
            variant="matrix"
            orientation="vertical"
            height={200}
            showPercentage
            enableGlow
          />
          <HUDProgressBar
            value={78}
            label="Shields"
            variant="swordfish"
            orientation="vertical"
            height={200}
            showPercentage
            enableGlow
          />
          <HUDProgressBar
            value={23}
            label="Ammo"
            variant="doom"
            orientation="vertical"
            height={200}
            showPercentage
            enableGlow
            critical
          />
        </div>
      </div>
    </div>
  ),
};

export const Modes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: 400 }}>
      <div>
        <h4 style={{ color: '#39ff14', marginBottom: 10 }}>Determinate</h4>
        <HUDProgressBar
          value={65}
          label="Download Progress"
          variant="matrix"
          mode="determinate"
          showPercentage
          enableGlow
          enableDataStream
        />
      </div>

      <div>
        <h4 style={{ color: '#00ffff', marginBottom: 10 }}>Indeterminate</h4>
        <HUDProgressBar
          label="Processing..."
          variant="swordfish"
          mode="indeterminate"
          enableGlow
          loading
        />
      </div>

      <div>
        <h4 style={{ color: '#ff6600', marginBottom: 10 }}>Buffer</h4>
        <HUDProgressBar
          value={45}
          bufferValue={75}
          label="Streaming"
          variant="doom"
          mode="buffer"
          showPercentage
          enableGlow
        />
      </div>

      <div>
        <h4 style={{ color: '#ff1493', marginBottom: 10 }}>Query</h4>
        <HUDProgressBar
          label="Querying database..."
          variant="neon"
          mode="query"
          enableGlow
          enablePulse
          loading
        />
      </div>
    </div>
  ),
};

export const WithThresholds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <div>
        <h4 style={{ color: '#39ff14', marginBottom: 10 }}>Optimal State (85%)</h4>
        <HUDProgressBar
          value={85}
          label="System Health"
          variant="matrix"
          showPercentage
          enableGlow
          criticalThreshold={20}
          warningThreshold={40}
          optimalThreshold={80}
        />
      </div>

      <div>
        <h4 style={{ color: '#ff6600', marginBottom: 10 }}>Warning State (25%)</h4>
        <HUDProgressBar
          value={25}
          label="Battery Level"
          variant="matrix"
          showPercentage
          enableGlow
          criticalThreshold={20}
          warningThreshold={40}
          optimalThreshold={80}
        />
      </div>

      <div>
        <h4 style={{ color: '#ff0000', marginBottom: 10 }}>Critical State (15%)</h4>
        <HUDProgressBar
          value={15}
          label="Hull Integrity"
          variant="doom"
          showPercentage
          enableGlow
          enablePulse
          criticalThreshold={20}
          warningThreshold={40}
          optimalThreshold={80}
          critical
        />
      </div>
    </div>
  ),
};

export const WithSegments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <div>
        <h4 style={{ color: '#39ff14', marginBottom: 10 }}>Multi-Segment Progress</h4>
        <HUDProgressBar
          segments={[
            { value: 30, color: '#39ff14', label: 'Complete' },
            { value: 20, color: '#ff6600', label: 'In Progress' },
            { value: 15, color: '#ff0000', label: 'Failed', critical: true },
          ]}
          label="Mission Status"
          variant="matrix"
          maxValue={100}
          enableGlow
        />
      </div>

      <div>
        <h4 style={{ color: '#00ffff', marginBottom: 10 }}>Resource Allocation</h4>
        <HUDProgressBar
          segments={[
            { value: 40, color: '#00ffff', label: 'CPU' },
            { value: 25, color: '#ff1493', label: 'Memory' },
            { value: 15, color: '#39ff14', label: 'Network' },
            { value: 10, color: '#ff6600', label: 'Storage' },
          ]}
          label="System Resources"
          variant="swordfish"
          maxValue={100}
          enableGlow
          size="lg"
        />
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <HUDProgressBar
        value={75}
        label="Default Gradient"
        variant="matrix"
        showPercentage
        enableGradient
        enableGlow
      />

      <HUDProgressBar
        value={60}
        label="Custom Gradient"
        variant="neon"
        showPercentage
        enableGradient
        gradientColors={['#ff1493', '#6a0dad', '#00ffff']}
        enableGlow
      />

      <HUDProgressBar
        value={45}
        label="Fire Gradient"
        variant="doom"
        showPercentage
        enableGradient
        gradientColors={['#ff0000', '#ff6600', '#ffff00']}
        enableGlow
      />

      <HUDProgressBar
        value={85}
        label="Ocean Gradient"
        variant="swordfish"
        showPercentage
        enableGradient
        gradientColors={['#000080', '#0066ff', '#00ffff']}
        enableGlow
      />
    </div>
  ),
};

export const AnimatedDemo: Story = {
  render: () => {
    const [health, setHealth] = useState(100);
    const [shields, setShields] = useState(75);
    const [energy, setEnergy] = useState(50);
    const [loading, setLoading] = useState(false);

    // Auto-update values
    useEffect(() => {
      const interval = setInterval(() => {
        setHealth((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
        setShields((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
        setEnergy((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    const simulateLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
        <h4 style={{ color: '#39ff14', marginBottom: 10 }}>Real-time Animated Progress</h4>

        <HUDProgressBar
          value={health}
          label="Health"
          variant="matrix"
          showPercentage
          animated
          enableGlow
          enableDataStream
          criticalThreshold={20}
          warningThreshold={40}
          critical={health <= 20}
          onProgressChange={action('health-changed')}
        />

        <HUDProgressBar
          value={shields}
          label="Shields"
          variant="swordfish"
          showPercentage
          animated
          enableGlow
          enablePulse={shields <= 30}
          criticalThreshold={15}
          warningThreshold={30}
          critical={shields <= 15}
        />

        <HUDProgressBar
          value={energy}
          label="Energy"
          variant="neon"
          showPercentage
          animated
          enableGlow
          enableGradient
          criticalThreshold={25}
          warningThreshold={50}
          critical={energy <= 25}
        />

        <HUDProgressBar
          label="System Scan"
          variant="doom"
          mode={loading ? 'indeterminate' : 'determinate'}
          value={loading ? 0 : 100}
          showPercentage={!loading}
          enableGlow
          loading={loading}
        />

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={() => setHealth(Math.max(0, health - 20))}
            style={{
              padding: '8px 16px',
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Damage
          </button>
          <button
            onClick={() => setHealth(Math.min(100, health + 25))}
            style={{
              padding: '8px 16px',
              background: '#39ff14',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Heal
          </button>
          <button
            onClick={() => setShields(0)}
            style={{
              padding: '8px 16px',
              background: '#ff6600',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Shield Down
          </button>
          <button
            onClick={() => setShields(100)}
            style={{
              padding: '8px 16px',
              background: '#00ffff',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Shield Up
          </button>
          <button
            onClick={simulateLoading}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: loading ? '#666' : '#6a0dad',
              color: '#fff',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </div>
    );
  },
};

export const CustomFormatting: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <HUDProgressBar
        value={2.5}
        maxValue={4}
        label="Memory Usage"
        variant="matrix"
        formatValue={(value, max) => `${value.toFixed(1)}GB / ${max.toFixed(1)}GB`}
        enableGlow
      />

      <HUDProgressBar
        value={847}
        maxValue={1000}
        label="Network Speed"
        variant="swordfish"
        formatValue={(value) => `${value} Mbps`}
        enableGlow
        enableDataStream
      />

      <HUDProgressBar
        value={185}
        maxValue={300}
        label="Mission Timer"
        variant="doom"
        formatValue={(value) => {
          const minutes = Math.floor(value / 60);
          const seconds = Math.floor(value % 60);
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }}
        enableGlow
      />

      <HUDProgressBar
        value={73.6}
        maxValue={100}
        label="Temperature"
        variant="neon"
        formatValue={(value) => `${value.toFixed(1)}°C`}
        unit="°C"
        enableGlow
        criticalThreshold={85}
        warningThreshold={75}
      />
    </div>
  ),
};
