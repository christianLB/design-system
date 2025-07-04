import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Simple terminal placeholder to avoid TypeScript errors
const TerminalPlaceholder = ({ variant = 'matrix', title = 'Terminal' }: { variant?: string; title?: string }) => (
  <div style={{
    background: variant === 'matrix' ? '#000000' : 
                variant === 'doom' ? '#1a0000' :
                variant === 'swordfish' ? '#001a1a' : '#1a001a',
    border: `1px solid ${variant === 'matrix' ? '#39ff14' : 
                        variant === 'doom' ? '#ff0000' :
                        variant === 'swordfish' ? '#00ffff' : '#ff1493'}`,
    borderRadius: '8px',
    padding: '1rem',
    fontFamily: 'monospace',
    color: variant === 'matrix' ? '#39ff14' : 
           variant === 'doom' ? '#ff0000' :
           variant === 'swordfish' ? '#00ffff' : '#ff1493',
    minHeight: '300px',
    boxShadow: `0 0 20px ${variant === 'matrix' ? 'rgba(57, 255, 20, 0.3)' : 
                           variant === 'doom' ? 'rgba(255, 0, 0, 0.3)' :
                           variant === 'swordfish' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 20, 147, 0.3)'}`,
  }}>
    <div style={{ 
      borderBottom: `1px solid ${variant === 'matrix' ? '#39ff14' : 
                                 variant === 'doom' ? '#ff0000' :
                                 variant === 'swordfish' ? '#00ffff' : '#ff1493'}`, 
      paddingBottom: '0.5rem', 
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{title}</span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
      </div>
    </div>
    
    <div style={{ lineHeight: '1.4' }}>
      <div>$ cyberpunk-terminal --theme={variant}</div>
      <div>Initializing {variant} protocol...</div>
      <div>Loading cyberpunk interface...</div>
      <div style={{ color: '#888', fontSize: '0.9em' }}>System ready. Type 'help' for commands.</div>
      <div style={{ marginTop: '1rem', opacity: 0.7 }}>
        <span style={{ animation: 'blink 1s infinite' }}>█</span>
      </div>
    </div>
    
    <style jsx>{`
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `}</style>
  </div>
);

const meta: Meta = {
  title: 'Cyberpunk/Terminal',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cyberpunk Terminal component with typewriter effects (Demo version)',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MatrixTerminal: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Matrix Terminal
      </h2>
      <TerminalPlaceholder variant="matrix" title="MATRIX_PROTOCOL.exe" />
    </div>
  ),
};

export const DoomTerminal: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff0000', fontFamily: 'monospace', marginBottom: '2rem' }}>
        DOOM Terminal
      </h2>
      <TerminalPlaceholder variant="doom" title="COMBAT_PROTOCOL.exe" />
    </div>
  ),
};

export const SwordfishTerminal: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#00ffff', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Swordfish Terminal
      </h2>
      <TerminalPlaceholder variant="swordfish" title="HACKER_INTERFACE.exe" />
    </div>
  ),
};

export const NeonTerminal: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff1493', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Neon Terminal
      </h2>
      <TerminalPlaceholder variant="neon" title="NIGHT_CITY.exe" />
    </div>
  ),
};

export const AllTerminals: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '2rem' }}>
        All Terminal Variants
      </h2>
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <TerminalPlaceholder variant="matrix" title="Matrix" />
        <TerminalPlaceholder variant="doom" title="DOOM" />
        <TerminalPlaceholder variant="swordfish" title="Swordfish" />
        <TerminalPlaceholder variant="neon" title="Neon" />
      </div>
    </div>
  ),
};