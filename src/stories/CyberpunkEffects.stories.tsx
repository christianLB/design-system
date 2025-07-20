import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card/Card';

const meta: Meta = {
  title: 'Themes/Cyberpunk/Effects',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cyberpunk effects and plugin system demonstration',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GlowEffects: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Glow Effects Plugin
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Glow Intensities
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
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Different Variants with Glow
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="cyberpunk-matrix" cyberpunkGlow="normal">
            Matrix Glow
          </Button>
          <Button variant="cyberpunk-doom" cyberpunkGlow="normal">
            DOOM Glow
          </Button>
          <Button variant="cyberpunk-ghost" cyberpunkGlow="normal">
            Ghost Glow
          </Button>
          <Button variant="cyberpunk-neon" cyberpunkGlow="normal">
            Neon Glow
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Cards with Glow Effects
        </h3>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          <Card variant="cyberpunk-matrix" cyberpunkGlow="subtle">
            <CardHeader>
              <CardTitle>Subtle Matrix Glow</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Low intensity glow effect for subtle enhancement</p>
            </CardContent>
          </Card>

          <Card variant="cyberpunk-doom" cyberpunkGlow="intense">
            <CardHeader>
              <CardTitle>Intense DOOM Glow</CardTitle>
            </CardHeader>
            <CardContent>
              <p>High intensity glow effect for maximum impact</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

export const ScanlineEffects: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Scanline Effects Plugin
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          CRT-Style Scanlines
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="cyberpunk-matrix" scanlines={true}>
            Matrix Scanlines
          </Button>
          <Button variant="cyberpunk-doom" scanlines={true}>
            DOOM Scanlines
          </Button>
          <Button variant="cyberpunk-ghost" scanlines={true}>
            Ghost Scanlines
          </Button>
          <Button variant="cyberpunk-neon" scanlines={true}>
            Neon Scanlines
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Cards with Scanlines
        </h3>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          <Card variant="cyberpunk-matrix" scanlines={true}>
            <CardHeader>
              <CardTitle>CRT Display Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Authentic retro monitor experience with moving scanlines</p>
              <p>Creates nostalgic terminal aesthetic</p>
            </CardContent>
          </Card>

          <Card variant="cyberpunk-swordfish" scanlines={true}>
            <CardHeader>
              <CardTitle>Hacker Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Professional penetration testing appearance</p>
              <p>Enhanced with CRT-style scanline overlay</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

export const MatrixRainEffects: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Matrix Rain Effects Plugin
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Digital Rain Background
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="cyberpunk-matrix" matrixRain={true}>
            Matrix Rain
          </Button>
          <Button variant="cyberpunk-ghost" matrixRain={true}>
            Stealth Rain
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Cards with Matrix Rain
        </h3>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          <Card variant="cyberpunk-matrix" matrixRain={true}>
            <CardHeader>
              <CardTitle>The Matrix Protocol</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Welcome to the Matrix</p>
              <p>Reality is an illusion</p>
              <p>Follow the white rabbit...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

export const CombinedEffects: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h2 style={{ color: '#39ff14', fontFamily: 'monospace', marginBottom: '2rem' }}>
        Combined Effects
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          All Effects Together
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant="cyberpunk-matrix"
            cyberpunkGlow="intense"
            scanlines={true}
            matrixRain={true}
          >
            Full Matrix Experience
          </Button>

          <Button variant="cyberpunk-doom" cyberpunkGlow="normal" scanlines={true}>
            Combat Interface
          </Button>

          <Button variant="cyberpunk-neon" cyberpunkGlow="intense" scanlines={true}>
            Night City Style
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ color: '#ffffff', fontFamily: 'monospace', marginBottom: '1rem' }}>
          Ultimate Cyberpunk Cards
        </h3>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          }}
        >
          <Card
            variant="cyberpunk-matrix"
            cyberpunkGlow="intense"
            scanlines={true}
            matrixRain={true}
          >
            <CardHeader>
              <CardTitle>Neural Interface Override</CardTitle>
            </CardHeader>
            <CardContent>
              <p>🔹 Glow: INTENSE</p>
              <p>🔹 Scanlines: ACTIVE</p>
              <p>🔹 Matrix Rain: ENABLED</p>
              <p>🔹 Status: FULLY ENHANCED</p>
            </CardContent>
          </Card>

          <Card variant="cyberpunk-neon" cyberpunkGlow="intense" scanlines={true}>
            <CardHeader>
              <CardTitle>Night City Access Terminal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>🔹 Glow: INTENSE</p>
              <p>🔹 Scanlines: ACTIVE</p>
              <p>🔹 Theme: NEON</p>
              <p>🔹 Status: PREMIUM ENHANCED</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};
