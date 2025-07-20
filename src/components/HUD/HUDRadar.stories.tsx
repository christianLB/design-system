import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import HUDRadar from './HUDRadar';
import type { RadarContact, RadarZone } from './HUDRadar';

const meta: Meta<typeof HUDRadar> = {
  title: 'Themes/Cyberpunk/Components/HUD Radar',
  component: HUDRadar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Circular radar/minimap component with rotating sweep animation, contact tracking, and tactical zone display.',
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
      description: 'Radar size',
    },
    mode: {
      control: 'select',
      options: ['sweep', 'pulse', 'scan', 'static'],
      description: 'Radar operation mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HUDRadar>;

// Sample data
const sampleContacts: RadarContact[] = [
  {
    id: 'alpha-1',
    x: 0.3,
    y: -0.4,
    type: 'friendly',
    distance: 0.5,
    angle: 323,
    strength: 0.9,
    label: 'Alpha Squad',
  },
  {
    id: 'hostile-1',
    x: -0.6,
    y: 0.2,
    type: 'hostile',
    distance: 0.63,
    angle: 162,
    strength: 0.8,
    label: 'Enemy Tank',
  },
  {
    id: 'neutral-1',
    x: 0.1,
    y: 0.7,
    type: 'neutral',
    distance: 0.71,
    angle: 82,
    strength: 0.6,
    label: 'Civilian',
  },
  {
    id: 'objective-1',
    x: -0.3,
    y: -0.8,
    type: 'objective',
    distance: 0.85,
    angle: 249,
    strength: 1.0,
    label: 'Primary Target',
  },
  {
    id: 'unknown-1',
    x: 0.8,
    y: -0.1,
    type: 'unknown',
    distance: 0.81,
    angle: 7,
    strength: 0.4,
    label: 'Unknown Signal',
  },
];

const sampleZones: RadarZone[] = [
  {
    id: 'danger-zone',
    centerX: -0.4,
    centerY: 0.3,
    radius: 0.3,
    type: 'danger',
    opacity: 0.15,
    label: 'Hot Zone',
  },
  {
    id: 'safe-zone',
    centerX: 0.5,
    centerY: -0.6,
    radius: 0.25,
    type: 'safe',
    opacity: 0.1,
    label: 'Safe House',
  },
  {
    id: 'patrol-zone',
    centerX: 0,
    centerY: 0.8,
    radius: 0.2,
    type: 'patrol',
    opacity: 0.08,
    label: 'Patrol Route',
  },
];

export const Default: Story = {
  args: {
    contacts: sampleContacts,
    zones: sampleZones,
    variant: 'matrix',
    size: 'md',
    mode: 'sweep',
    sweepSpeed: 90,
    showRangeRings: true,
    showGrid: true,
    showContactLabels: false,
    showCompass: true,
    showScanLines: true,
    title: 'Tactical Radar',
    active: true,
    enableContactFade: true,
    enablePingAnimation: true,
    onContactClick: action('contact-clicked'),
    onRadarClick: action('radar-clicked'),
    onSweepComplete: action('sweep-complete'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
      }}
    >
      {(['matrix', 'doom', 'swordfish', 'neon', 'ghost'] as const).map((variant) => (
        <HUDRadar
          key={variant}
          contacts={sampleContacts.slice(0, 3)}
          variant={variant}
          size="md"
          mode="sweep"
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Radar`}
          showCompass
          active
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#39ff14', marginBottom: 10 }}>{size.toUpperCase()}</h4>
          <HUDRadar
            contacts={sampleContacts}
            variant="matrix"
            size={size}
            mode="sweep"
            showCompass
            active
          />
        </div>
      ))}
    </div>
  ),
};

export const Modes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#39ff14', marginBottom: 10 }}>Sweep Mode</h4>
        <HUDRadar
          contacts={sampleContacts}
          variant="matrix"
          size="lg"
          mode="sweep"
          sweepSpeed={120}
          title="Sweep Radar"
          showCompass
          enableContactFade
          active
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#00ffff', marginBottom: 10 }}>Pulse Mode</h4>
        <HUDRadar
          contacts={sampleContacts}
          variant="swordfish"
          size="lg"
          mode="pulse"
          pulseFrequency={0.5}
          title="Pulse Radar"
          showCompass
          enablePingAnimation
          active
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#ff0000', marginBottom: 10 }}>Scan Mode</h4>
        <HUDRadar
          contacts={sampleContacts}
          variant="doom"
          size="lg"
          mode="scan"
          title="Scan Radar"
          showCompass
          showScanLines
          active
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#ff1493', marginBottom: 10 }}>Static Mode</h4>
        <HUDRadar
          contacts={sampleContacts}
          variant="neon"
          size="lg"
          mode="static"
          title="Static Radar"
          showCompass
          showContactLabels
          active
        />
      </div>
    </div>
  ),
};

export const ContactTypes: Story = {
  render: () => {
    const contactsByType: RadarContact[] = [
      { id: '1', x: 0.3, y: -0.3, type: 'friendly', label: 'Friendly Unit' },
      { id: '2', x: -0.3, y: -0.3, type: 'hostile', label: 'Enemy' },
      { id: '3', x: 0.3, y: 0.3, type: 'neutral', label: 'Civilian' },
      { id: '4', x: -0.3, y: 0.3, type: 'unknown', label: 'Unknown' },
      { id: '5', x: 0, y: 0.6, type: 'objective', label: 'Objective' },
    ];

    return (
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#39ff14', marginBottom: 20 }}>Contact Types</h4>
        <HUDRadar
          contacts={contactsByType}
          variant="matrix"
          size="xl"
          mode="static"
          title="Contact Classification"
          showContactLabels
          showCompass
          enablePingAnimation
          active
          onContactClick={action('contact-clicked')}
        />
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#39ff14' }} />
            <span style={{ color: '#fff', fontSize: '0.875rem' }}>Friendly</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff0000' }} />
            <span style={{ color: '#fff', fontSize: '0.875rem' }}>Hostile</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ffff' }} />
            <span style={{ color: '#fff', fontSize: '0.875rem' }}>Neutral</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6600' }} />
            <span style={{ color: '#fff', fontSize: '0.875rem' }}>Unknown</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff1493' }} />
            <span style={{ color: '#fff', fontSize: '0.875rem' }}>Objective</span>
          </div>
        </div>
      </div>
    );
  },
};

export const WithZones: Story = {
  render: () => (
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ color: '#39ff14', marginBottom: 20 }}>Tactical Zones</h4>
      <HUDRadar
        contacts={sampleContacts}
        zones={sampleZones}
        variant="matrix"
        size="xl"
        mode="sweep"
        title="Zone Awareness"
        showCompass
        showContactLabels
        enableContactFade
        enablePingAnimation
        active
        onContactClick={action('contact-clicked')}
      />
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 12,
              height: 12,
              border: '2px solid #ff0000',
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
          <span style={{ color: '#fff', fontSize: '0.875rem' }}>Danger Zone</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 12,
              height: 12,
              border: '2px solid #39ff14',
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
          <span style={{ color: '#fff', fontSize: '0.875rem' }}>Safe Zone</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 12,
              height: 12,
              border: '2px solid #00ffff',
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
          <span style={{ color: '#fff', fontSize: '0.875rem' }}>Patrol Zone</span>
        </div>
      </div>
    </div>
  ),
};

export const JammedRadar: Story = {
  render: () => (
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ color: '#ff0000', marginBottom: 20 }}>Jammed Radar</h4>
      <HUDRadar
        contacts={sampleContacts.slice(0, 2)}
        variant="doom"
        size="lg"
        mode="sweep"
        title="Radar System"
        jammed
        noiseIntensity={0.7}
        showCompass
        active={false}
      />
      <p style={{ color: '#ff0000', marginTop: 10, fontSize: '0.875rem' }}>
        SIGNAL INTERFERENCE DETECTED - CONTACT DATA UNRELIABLE
      </p>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [contacts, setContacts] = useState<RadarContact[]>(sampleContacts);
    const [mode, setMode] = useState<'sweep' | 'pulse' | 'scan' | 'static'>('sweep');
    const [variant, setVariant] = useState<'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost'>(
      'matrix',
    );
    const [showLabels, setShowLabels] = useState(false);
    const [jammed, setJammed] = useState(false);

    // Simulate moving contacts
    useEffect(() => {
      if (mode === 'static') return;

      const interval = setInterval(() => {
        setContacts((prev) =>
          prev.map((contact) => ({
            ...contact,
            x: Math.max(-1, Math.min(1, contact.x + (Math.random() - 0.5) * 0.1)),
            y: Math.max(-1, Math.min(1, contact.y + (Math.random() - 0.5) * 0.1)),
          })),
        );
      }, 2000);

      return () => clearInterval(interval);
    }, [mode]);

    const addContact = () => {
      const newContact: RadarContact = {
        id: `contact-${Date.now()}`,
        x: (Math.random() - 0.5) * 1.8,
        y: (Math.random() - 0.5) * 1.8,
        type: ['friendly', 'hostile', 'neutral', 'unknown'][Math.floor(Math.random() * 4)] as any,
        label: `Contact ${contacts.length + 1}`,
        strength: Math.random(),
      };
      setContacts((prev) => [...prev, newContact]);
    };

    const removeContact = () => {
      setContacts((prev) => prev.slice(0, -1));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            style={{ padding: 4, background: '#333', color: '#fff', border: '1px solid #555' }}
          >
            <option value="sweep">Sweep</option>
            <option value="pulse">Pulse</option>
            <option value="scan">Scan</option>
            <option value="static">Static</option>
          </select>

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

          <label style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            Show Labels
          </label>

          <label style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={jammed} onChange={(e) => setJammed(e.target.checked)} />
            Jammed
          </label>

          <button
            onClick={addContact}
            style={{
              padding: '4px 8px',
              background: '#39ff14',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Add Contact
          </button>

          <button
            onClick={removeContact}
            style={{
              padding: '4px 8px',
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Remove Contact
          </button>
        </div>

        {/* Radar */}
        <HUDRadar
          contacts={contacts}
          zones={sampleZones}
          variant={variant}
          size="xl"
          mode={mode}
          title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Radar`}
          showContactLabels={showLabels}
          showCompass
          showContactTrails={mode === 'sweep'}
          enableContactFade={mode === 'sweep'}
          enablePingAnimation
          jammed={jammed}
          noiseIntensity={jammed ? 0.8 : 0}
          active={!jammed}
          onContactClick={action('contact-clicked')}
          onRadarClick={action('radar-clicked')}
          onSweepComplete={action('sweep-complete')}
        />

        {/* Info */}
        <div style={{ textAlign: 'center', color: '#fff', fontSize: '0.875rem' }}>
          <p>Contacts: {contacts.length}</p>
          <p>Click on radar to simulate radar ping at location</p>
          <p>Click on contacts to select them</p>
        </div>
      </div>
    );
  },
};
