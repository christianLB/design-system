import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import HUDMetric from './HUDMetric';

const meta: Meta<typeof HUDMetric> = {
  title: 'Themes/Cyberpunk/Components/HUD Metric',
  component: HUDMetric,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Data display components for health, shields, ammo, and other vital statistics with real-time animations and threshold monitoring.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'health',
        'shields',
        'energy',
        'ammo',
        'armor',
        'oxygen',
        'temperature',
        'speed',
        'custom',
      ],
      description: 'Metric type (affects icon and default styling)',
    },
    variant: {
      control: 'select',
      options: ['matrix', 'doom', 'swordfish', 'neon', 'ghost'],
      description: 'Visual variant',
    },
    format: {
      control: 'select',
      options: ['percentage', 'fraction', 'decimal', 'integer', 'currency', 'time', 'custom'],
      description: 'Value display format',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Metric size',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HUDMetric>;

export const Default: Story = {
  args: {
    label: 'Health',
    value: 75,
    maxValue: 100,
    type: 'health',
    variant: 'matrix',
    format: 'percentage',
    showProgressBar: true,
    showChangeIndicator: true,
    onValueChange: action('value-changed'),
    onThresholdCross: action('threshold-crossed'),
  },
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      {[
        { type: 'health' as const, value: 85, label: 'Health', maxValue: 100 },
        { type: 'shields' as const, value: 42, label: 'Shields', maxValue: 100 },
        { type: 'energy' as const, value: 73, label: 'Energy', maxValue: 100 },
        { type: 'ammo' as const, value: 28, maxValue: 30, label: 'Ammunition' },
        { type: 'armor' as const, value: 67, label: 'Armor', maxValue: 100 },
        { type: 'oxygen' as const, value: 91, label: 'Oxygen', maxValue: 100 },
        { type: 'temperature' as const, value: 38, maxValue: 50, label: 'Temperature' },
        { type: 'speed' as const, value: 120, maxValue: 200, label: 'Speed' },
      ].map((metric) => (
        <HUDMetric
          key={metric.type}
          label={metric.label}
          value={metric.value}
          maxValue={metric.maxValue}
          type={metric.type}
          variant="matrix"
          showProgressBar
          showPercentage
        />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      {(['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const).map((variant) => (
        <HUDMetric
          key={variant}
          label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Health`}
          value={75}
          type="health"
          variant={variant}
          showProgressBar
          showPercentage
          animation={{
            enablePulse: variant === 'neon',
          }}
        />
      ))}
    </div>
  ),
};

export const Formats: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      <HUDMetric
        label="Percentage"
        value={75}
        variant="matrix"
        format="percentage"
        showProgressBar
      />
      <HUDMetric
        label="Fraction"
        value={28}
        maxValue={30}
        variant="matrix"
        format="fraction"
        showProgressBar
      />
      <HUDMetric label="Decimal" value={73.4} variant="matrix" format="decimal" showProgressBar />
      <HUDMetric
        label="Integer"
        value={156}
        maxValue={200}
        variant="matrix"
        format="integer"
        showProgressBar
      />
      <HUDMetric
        label="Currency"
        value={1250.75}
        maxValue={2000}
        variant="matrix"
        format="currency"
        showProgressBar
      />
      <HUDMetric
        label="Time"
        value={185}
        maxValue={300}
        variant="matrix"
        format="time"
        showProgressBar
      />
    </div>
  ),
};

export const ThresholdStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      <HUDMetric
        label="Critical State"
        value={12}
        type="health"
        variant="matrix"
        showProgressBar
        showPercentage
        critical
        animation={{ enableGlitch: true, enableFlicker: true }}
      />
      <HUDMetric
        label="Warning State"
        value={25}
        type="shields"
        variant="matrix"
        showProgressBar
        showPercentage
        warning
        animation={{ enablePulse: true }}
      />
      <HUDMetric
        label="Optimal State"
        value={95}
        type="energy"
        variant="matrix"
        showProgressBar
        showPercentage
        thresholds={{ optimal: 90 }}
      />
    </div>
  ),
};

export const WithSparklines: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
      }}
    >
      <HUDMetric
        label="CPU Usage"
        value={73}
        type="custom"
        icon="⚡"
        variant="matrix"
        showProgressBar
        showPercentage
        showSparkline
        sparklineData={[65, 70, 68, 75, 73, 78, 76, 74, 73]}
      />
      <HUDMetric
        label="Network Traffic"
        value={45}
        type="custom"
        icon="📡"
        variant="swordfish"
        showProgressBar
        showValue
        unit="MB/s"
        showSparkline
        sparklineData={[30, 35, 42, 38, 45, 48, 44, 46, 45]}
      />
      <HUDMetric
        label="Power Consumption"
        value={89}
        type="custom"
        icon="🔋"
        variant="doom"
        showProgressBar
        showPercentage
        showSparkline
        sparklineData={[85, 87, 89, 91, 88, 89, 90, 88, 89]}
        warning
      />
    </div>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <div>
        <h3 style={{ color: '#39ff14', marginBottom: 16 }}>Vertical (Default)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <HUDMetric
            label="Health"
            value={75}
            type="health"
            variant="matrix"
            orientation="vertical"
            showProgressBar
            showPercentage
          />
          <HUDMetric
            label="Shields"
            value={42}
            type="shields"
            variant="matrix"
            orientation="vertical"
            showProgressBar
            showPercentage
          />
        </div>
      </div>

      <div>
        <h3 style={{ color: '#39ff14', marginBottom: 16 }}>Horizontal</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <HUDMetric
            label="Health"
            value={75}
            type="health"
            variant="matrix"
            orientation="horizontal"
            showProgressBar
            showPercentage
            size="md"
          />
          <HUDMetric
            label="Shields"
            value={42}
            type="shields"
            variant="matrix"
            orientation="horizontal"
            showProgressBar
            showPercentage
            size="md"
          />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <HUDMetric
          key={size}
          label={`${size.toUpperCase()} Health`}
          value={75}
          type="health"
          variant="matrix"
          size={size}
          showProgressBar
          showPercentage
        />
      ))}
    </div>
  ),
};

export const AnimatedCounter: Story = {
  render: () => {
    const [health, setHealth] = useState(100);
    const [shields, setShields] = useState(100);
    const [ammo, setAmmo] = useState(30);

    useEffect(() => {
      const interval = setInterval(() => {
        setHealth((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
        setShields((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)));
        setAmmo((prev) => Math.max(0, Math.min(30, prev + (Math.random() - 0.5) * 3)));
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <div style={{ color: '#39ff14', marginBottom: 10 }}>
          Values update every 2 seconds with animated counters
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          <HUDMetric
            label="Health"
            value={health}
            previousValue={health}
            type="health"
            variant="matrix"
            showProgressBar
            showPercentage
            showChangeIndicator
            animation={{
              enableCounter: true,
              enablePulse: health < 30,
              enableGlitch: health < 15,
              duration: 500,
            }}
            onValueChange={action('health-changed')}
          />

          <HUDMetric
            label="Shields"
            value={shields}
            type="shields"
            variant="swordfish"
            showProgressBar
            showPercentage
            showChangeIndicator
            animation={{
              enableCounter: true,
              enableFlicker: shields < 20,
              duration: 300,
            }}
            warning={shields < 30}
            critical={shields < 15}
          />

          <HUDMetric
            label="Ammunition"
            value={ammo}
            maxValue={30}
            type="ammo"
            variant="doom"
            format="fraction"
            showProgressBar
            showChangeIndicator
            animation={{
              enableCounter: true,
              duration: 200,
            }}
            warning={ammo <= 10}
            critical={ammo <= 5}
          />
        </div>

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
            onClick={() => setShields(Math.max(0, shields - 30))}
            style={{
              padding: '8px 16px',
              background: '#ff6600',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Shield Hit
          </button>
          <button
            onClick={() => setAmmo(Math.max(0, ammo - 1))}
            style={{
              padding: '8px 16px',
              background: '#666',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Fire
          </button>
          <button
            onClick={() => setAmmo(30)}
            style={{
              padding: '8px 16px',
              background: '#0066ff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      </div>
    );
  },
};

export const CustomFormatting: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      <HUDMetric
        label="Temperature"
        value={37.6}
        maxValue={50}
        type="temperature"
        variant="matrix"
        formatFunction={(value) => `${value.toFixed(1)}°C`}
        showProgressBar
        unit="°C"
        thresholds={{ critical: 45, warning: 40 }}
      />

      <HUDMetric
        label="Bandwidth"
        value={847}
        maxValue={1000}
        type="custom"
        icon="📊"
        variant="swordfish"
        formatFunction={(value) => `${(value / 1000).toFixed(2)} Gbps`}
        showProgressBar
      />

      <HUDMetric
        label="Coordinates"
        value={127.453}
        type="custom"
        icon="📍"
        variant="neon"
        formatFunction={(value) => `${value.toFixed(3)}°N`}
        showProgressBar={false}
        showValue
      />

      <HUDMetric
        label="Pressure"
        value={1013.25}
        maxValue={1100}
        type="custom"
        icon="🌡"
        variant="ghost"
        formatFunction={(value) => `${value.toFixed(2)} hPa`}
        showProgressBar
      />
    </div>
  ),
};
