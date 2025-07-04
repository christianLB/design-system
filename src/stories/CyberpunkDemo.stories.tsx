import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card/Card';
import { DarkThemeToggle } from '../components/DarkThemeToggle/DarkThemeToggle';

const meta: Meta = {
  title: 'Cyberpunk/Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cyberpunk theme showcase for v3.5.0 - demonstrating all cyberpunk variants and effects.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CyberpunkButtons: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Cyberpunk Button Variants
      </h2>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Button variant="cyberpunk-matrix">Matrix Button</Button>
        <Button variant="cyberpunk-doom">DOOM Button</Button>
        <Button variant="cyberpunk-ghost">Ghost Button</Button>
        <Button variant="cyberpunk-neon">Neon Button</Button>
      </div>

      <h3 style={{ color: '#39ff14', fontFamily: 'monospace', marginTop: '2rem', marginBottom: '1rem' }}>
        With Effects
      </h3>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Button variant="cyberpunk-matrix" scanlines={true}>With Scanlines</Button>
        <Button variant="cyberpunk-doom" cyberpunkGlow="intense">Intense Glow</Button>
        <Button variant="cyberpunk-ghost" matrixRain={true}>Matrix Rain</Button>
        <Button variant="cyberpunk-neon" scanlines={true} cyberpunkGlow="normal">All Effects</Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const CyberpunkCards: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Cyberpunk Card Variants
      </h2>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Card variant="cyberpunk-matrix">
          <CardHeader>
            <CardTitle>Matrix Protocol</CardTitle>
          </CardHeader>
          <CardContent>
            <p>System status: ONLINE</p>
            <p>Encryption: AES-256</p>
            <p>Last sync: 2 minutes ago</p>
          </CardContent>
          <CardFooter>
            <Button variant="cyberpunk-matrix" size="sm">Access</Button>
          </CardFooter>
        </Card>

        <Card variant="cyberpunk-doom">
          <CardHeader>
            <CardTitle>ALERT: Intrusion Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Threat level: CRITICAL</p>
            <p>Source: 192.168.1.1</p>
            <p>Action required: IMMEDIATE</p>
          </CardContent>
          <CardFooter>
            <Button variant="cyberpunk-doom" size="sm">Neutralize</Button>
          </CardFooter>
        </Card>

        <Card variant="cyberpunk-ghost">
          <CardHeader>
            <CardTitle>Stealth Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: INVISIBLE</p>
            <p>Proxy chains: 7</p>
            <p>Location: UNKNOWN</p>
          </CardContent>
          <CardFooter>
            <Button variant="cyberpunk-ghost" size="sm">Disconnect</Button>
          </CardFooter>
        </Card>

        <Card variant="cyberpunk-neon">
          <CardHeader>
            <CardTitle>Night City Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p>District: Watson</p>
            <p>Reputation: Street Kid</p>
            <p>Eddies: 12,500</p>
          </CardContent>
          <CardFooter>
            <Button variant="cyberpunk-neon" size="sm">Enter</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ThemeSelector: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Theme Selector (4 Themes)
      </h2>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>Toggle through themes:</span>
        <DarkThemeToggle />
      </div>

      <div style={{ color: '#ffffff', fontFamily: 'monospace', lineHeight: '1.6' }}>
        <p>• Light → Dark → Futuristic → Cyberpunk → Light</p>
        <p>• Click the toggle to cycle through all 4 themes</p>
        <p>• Each theme provides unique visual styling</p>
        <p>• Cyberpunk theme includes special effects and animations</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const AllTogether: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#39ff14', fontFamily: 'monospace' }}>
          Cyberpunk v3.5.0 Showcase
        </h1>
        <DarkThemeToggle />
      </div>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Buttons Section */}
        <section>
          <h3 style={{ color: '#00ffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
            Interactive Controls
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="cyberpunk-matrix" cyberpunkGlow="normal">Access Matrix</Button>
            <Button variant="cyberpunk-doom" scanlines={true}>Emergency Protocol</Button>
            <Button variant="cyberpunk-ghost" matrixRain={true}>Ghost Mode</Button>
            <Button variant="cyberpunk-neon" cyberpunkGlow="intense">Night City</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h3 style={{ color: '#ff0040', fontFamily: 'monospace', marginBottom: '1rem' }}>
            System Panels
          </h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <Card variant="cyberpunk-matrix" cyberpunkGlow="subtle">
              <CardHeader>
                <CardTitle>Neural Link</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connection: STABLE</p>
                <p>Bandwidth: 847.2 MB/s</p>
              </CardContent>
            </Card>

            <Card variant="cyberpunk-doom" scanlines={true}>
              <CardHeader>
                <CardTitle>Security Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Firewall breach detected</p>
                <p>Threat level: HIGH</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};