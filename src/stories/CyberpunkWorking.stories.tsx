import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card/Card';

const meta: Meta = {
  title: 'Cyberpunk/Working Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Working cyberpunk theme examples without complex theme providers',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicButtons: Story = {
  render: () => {
    // Manually set theme on mount
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'cyberpunk');
    }, []);

    return (
      <div style={{ 
        padding: '2rem', 
        backgroundColor: '#0a0a0a', 
        minHeight: '100vh',
        color: '#ffffff'
      }}>
        <h2 style={{ 
          color: '#39ff14', 
          fontFamily: 'monospace', 
          marginBottom: '2rem',
          fontSize: '1.5rem'
        }}>
          Cyberpunk Buttons - All Variants
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          marginBottom: '2rem'
        }}>
          <Button variant="cyberpunk-matrix">Matrix Terminal</Button>
          <Button variant="cyberpunk-doom">DOOM Protocol</Button>
          <Button variant="cyberpunk-ghost">Ghost Mode</Button>
          <Button variant="cyberpunk-neon">Night City</Button>
        </div>

        <h3 style={{ 
          color: '#00ffff', 
          fontFamily: 'monospace', 
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}>
          With Cyberpunk Effects
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gap: '1rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
        }}>
          <Button variant="cyberpunk-matrix" scanlines={true}>
            Matrix + Scanlines
          </Button>
          <Button variant="cyberpunk-doom" cyberpunkGlow="intense">
            DOOM + Intense Glow
          </Button>
          <Button variant="cyberpunk-ghost" matrixRain={true}>
            Ghost + Matrix Rain
          </Button>
          <Button 
            variant="cyberpunk-neon" 
            scanlines={true} 
            cyberpunkGlow="normal"
          >
            Neon + All Effects
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const BasicCards: Story = {
  render: () => {
    // Manually set theme on mount
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'cyberpunk');
    }, []);

    return (
      <div style={{ 
        padding: '2rem', 
        backgroundColor: '#0a0a0a', 
        minHeight: '100vh',
        color: '#ffffff'
      }}>
        <h2 style={{ 
          color: '#39ff14', 
          fontFamily: 'monospace', 
          marginBottom: '2rem',
          fontSize: '1.5rem'
        }}>
          Cyberpunk Cards - All Variants
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <Card variant="cyberpunk-matrix">
            <CardHeader>
              <CardTitle>Neural Interface</CardTitle>
            </CardHeader>
            <CardContent style={{ lineHeight: '1.6' }}>
              <p>🔹 Status: CONNECTED</p>
              <p>🔹 Bandwidth: 2.4 TB/s</p>
              <p>🔹 Latency: 0.3ms</p>
              <p>🔹 Security: AES-256</p>
            </CardContent>
            <CardFooter>
              <Button variant="cyberpunk-matrix" size="sm">Access Matrix</Button>
            </CardFooter>
          </Card>

          <Card variant="cyberpunk-doom">
            <CardHeader>
              <CardTitle>🚨 SECURITY ALERT</CardTitle>
            </CardHeader>
            <CardContent style={{ lineHeight: '1.6' }}>
              <p>⚠️ Intrusion detected</p>
              <p>⚠️ Threat level: CRITICAL</p>
              <p>⚠️ Source: 192.168.1.666</p>
              <p>⚠️ Action: TERMINATE</p>
            </CardContent>
            <CardFooter>
              <Button variant="cyberpunk-doom" size="sm">Neutralize</Button>
            </CardFooter>
          </Card>

          <Card variant="cyberpunk-ghost">
            <CardHeader>
              <CardTitle>👻 Stealth Protocol</CardTitle>
            </CardHeader>
            <CardContent style={{ lineHeight: '1.6' }}>
              <p>💭 Status: INVISIBLE</p>
              <p>💭 Proxy chains: 7</p>
              <p>💭 Encryption: Triple DES</p>
              <p>💭 Location: UNKNOWN</p>
            </CardContent>
            <CardFooter>
              <Button variant="cyberpunk-ghost" size="sm">Ghost Mode</Button>
            </CardFooter>
          </Card>

          <Card variant="cyberpunk-neon">
            <CardHeader>
              <CardTitle>🌃 Night City Access</CardTitle>
            </CardHeader>
            <CardContent style={{ lineHeight: '1.6' }}>
              <p>🏙️ District: Watson</p>
              <p>🏙️ Reputation: Street Kid</p>
              <p>🏙️ Eddies: 25,750</p>
              <p>🏙️ Heat Level: LOW</p>
            </CardContent>
            <CardFooter>
              <Button variant="cyberpunk-neon" size="sm">Enter City</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const EffectsShowcase: Story = {
  render: () => {
    // Manually set theme on mount
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'cyberpunk');
    }, []);

    return (
      <div style={{ 
        padding: '2rem', 
        backgroundColor: '#0a0a0a', 
        minHeight: '100vh',
        color: '#ffffff'
      }}>
        <h2 style={{ 
          color: '#39ff14', 
          fontFamily: 'monospace', 
          marginBottom: '2rem',
          fontSize: '1.5rem'
        }}>
          Cyberpunk Effects Showcase
        </h2>
        
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            color: '#ff0040', 
            fontFamily: 'monospace', 
            marginBottom: '1rem',
            fontSize: '1.2rem'
          }}>
            Glow Effects (3 Intensities)
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="cyberpunk-matrix" cyberpunkGlow="subtle">
              Subtle Glow
            </Button>
            <Button variant="cyberpunk-matrix" cyberpunkGlow="normal">
              Normal Glow
            </Button>
            <Button variant="cyberpunk-matrix" cyberpunkGlow="intense">
              Intense Glow
            </Button>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            color: '#00ffff', 
            fontFamily: 'monospace', 
            marginBottom: '1rem',
            fontSize: '1.2rem'
          }}>
            Scanline Effects (CRT Style)
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="cyberpunk-matrix" scanlines={true}>
              Matrix Scanlines
            </Button>
            <Button variant="cyberpunk-doom" scanlines={true}>
              DOOM Scanlines
            </Button>
            <Button variant="cyberpunk-neon" scanlines={true}>
              Neon Scanlines
            </Button>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            color: '#ff1493', 
            fontFamily: 'monospace', 
            marginBottom: '1rem',
            fontSize: '1.2rem'
          }}>
            Combined Effects (Ultimate Cyberpunk)
          </h3>
          <div style={{ 
            display: 'grid', 
            gap: '1rem', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}>
            <Button 
              variant="cyberpunk-matrix" 
              cyberpunkGlow="intense" 
              scanlines={true} 
              matrixRain={true}
            >
              🔹 FULL MATRIX PROTOCOL
            </Button>
            
            <Button 
              variant="cyberpunk-doom" 
              cyberpunkGlow="intense" 
              scanlines={true}
            >
              ⚡ COMBAT SYSTEM ONLINE
            </Button>
          </div>
        </section>

        <section>
          <h3 style={{ 
            color: '#ffffff', 
            fontFamily: 'monospace', 
            marginBottom: '1rem',
            fontSize: '1.2rem'
          }}>
            Cards with Combined Effects
          </h3>
          <div style={{ 
            display: 'grid', 
            gap: '1.5rem', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
          }}>
            <Card 
              variant="cyberpunk-matrix" 
              cyberpunkGlow="intense" 
              scanlines={true}
            >
              <CardHeader>
                <CardTitle>🔹 ENHANCED NEURAL LINK</CardTitle>
              </CardHeader>
              <CardContent>
                <p>◦ Glow: INTENSE MATRIX</p>
                <p>◦ Scanlines: ACTIVE</p>
                <p>◦ Enhancement: 300%</p>
                <p>◦ Status: LEGENDARY</p>
              </CardContent>
            </Card>

            <Card 
              variant="cyberpunk-neon" 
              cyberpunkGlow="normal" 
              scanlines={true}
            >
              <CardHeader>
                <CardTitle>🌈 NIGHT CITY PREMIUM</CardTitle>
              </CardHeader>
              <CardContent>
                <p>◦ Glow: NEON PULSE</p>
                <p>◦ Scanlines: CRT MODE</p>
                <p>◦ Enhancement: 250%</p>
                <p>◦ Status: VIP ACCESS</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

