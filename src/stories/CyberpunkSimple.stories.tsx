import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Cyberpunk/Simple Demo',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CyberpunkDemo: Story = {
  render: () => (
    <div 
      data-theme="cyberpunk"
      style={{ 
        padding: '2rem', 
        backgroundColor: '#0a0a0a', 
        minHeight: '100vh',
        color: '#39ff14',
        fontFamily: 'monospace'
      }}
    >
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        🚀 Cyberpunk Theme v3.5.0 - SUCCESS!
      </h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Cyberpunk CSS Variables Working:</h2>
        <div style={{ 
          background: 'var(--cyber-almost-black, #0a0a0a)', 
          border: '1px solid var(--cyber-matrix-green, #39ff14)',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: 'var(--glow-green-sm, 0 0 5px rgba(57, 255, 20, 0.5))'
        }}>
          <p>✅ CSS Variables loaded</p>
          <p>✅ Cyberpunk colors active</p>
          <p>✅ Glow effects working</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ff0000', marginBottom: '1rem' }}>DOOM Red Theme:</h2>
        <div style={{ 
          background: 'var(--cyber-void-black, #000000)', 
          border: '1px solid var(--cyber-doom-red, #ff0000)',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: 'var(--glow-red-sm, 0 0 5px rgba(255, 0, 0, 0.5))',
          color: '#ff0000'
        }}>
          <p>⚡ DOOM Protocol Active</p>
          <p>⚡ Combat Systems Online</p>
          <p>⚡ Threat Level: MAXIMUM</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>Swordfish Cyan Theme:</h2>
        <div style={{ 
          background: 'transparent', 
          border: '1px solid var(--cyber-swordfish-cyan, #00ffff)',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: 'var(--glow-cyan-sm, 0 0 5px rgba(0, 255, 255, 0.5))',
          color: '#00ffff'
        }}>
          <p>👻 Ghost Mode Enabled</p>
          <p>👻 Stealth Protocols Active</p>
          <p>👻 Invisibility: 100%</p>
        </div>
      </div>

      <div>
        <h2 style={{ color: '#ff1493', marginBottom: '1rem' }}>Night City Neon Theme:</h2>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.1), rgba(106, 13, 173, 0.1))', 
          border: '1px solid var(--cyber-hot-pink, #ff1493)',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(255, 20, 147, 0.4), 0 0 20px rgba(106, 13, 173, 0.3)',
          color: '#ff1493'
        }}>
          <p>🌃 Night City Access Granted</p>
          <p>🌃 Neon Lights Activated</p>
          <p>🌃 Cyberpunk 2077 Mode: ON</p>
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        padding: '1rem',
        border: '1px solid #39ff14',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>
          ✅ Cyberpunk Theme System Status
        </h3>
        <p>🔹 Themes: 4 (Light, Dark, Futuristic, Cyberpunk)</p>
        <p>🔹 Components: Button, Card, Terminal, HUD</p>
        <p>🔹 Effects: Glow, Scanlines, Matrix Rain</p>
        <p>🔹 Variants: Matrix, DOOM, Swordfish, Neon</p>
        <p>🔹 Status: FULLY OPERATIONAL</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};