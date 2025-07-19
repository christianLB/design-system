import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import { Terminal } from '../components/Terminal';
import { HUD, HUDPanel, HUDMetric, HUDRadar, HUDProgressBar } from '../components/HUD';
import { DarkThemeToggle } from '../components/DarkThemeToggle';
import { ThemeProvider } from '../theme';

const meta: Meta = {
  title: 'Cyberpunk/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Cyberpunk Theme Showcase

Welcome to the Cyberpunk Design System - a comprehensive collection of components, themes, and effects inspired by iconic cyberpunk aesthetics from The Matrix, DOOM, Swordfish, and Neon-style interfaces.

## What's New in v3.5.0

### 🎨 Four Cyberpunk Variants
- **Matrix**: Green digital rain aesthetic inspired by The Matrix
- **DOOM**: Red combat interface with aggressive styling  
- **Ghost**: Stealth gray theme for subtle cyberpunk elements
- **Neon**: Pink/purple Night City inspired interface

### ⚡ Advanced Plugin System
- **Glow Effects**: Configurable neon glow with 3 intensity levels
- **Scanlines**: CRT monitor scanline effects for retro feel
- **Matrix Rain**: Animated digital rain background overlay

### 🚀 Enhanced Components
- **Terminal**: Complete terminal with typewriter effects and 4 variants
- **HUD System**: Gaming-style HUD components with real-time data
- **Buttons & Cards**: All components support cyberpunk variants
- **Theme Toggle**: Now cycles through 4 themes: Light → Dark → Futuristic → Cyberpunk

### 🎮 Immersive Features
- Real-time data updates and animations
- Interactive hover states and micro-interactions  
- Accessibility support with reduced motion preferences
- Performance optimized with CSS custom properties
- Responsive design across all screen sizes

## Color System

The cyberpunk theme uses a carefully crafted color palette:

- **Matrix Green** (#39ff14): Primary actions and success states
- **DOOM Red** (#ff0000): Danger states and combat interfaces
- **Swordfish Cyan** (#00ffff): Information and accent elements  
- **Neon Pink** (#ff1493): Interactive elements and highlights
- **Tech Orange** (#ff6600): Warning states
- **Deep Void** (#000000): Primary background
- **Charcoal Grays** (#1a1a1a - #3a3a3a): Secondary backgrounds

## Best Practices

### Performance
- Use \`transform\` instead of changing box-shadow for animations
- Limit glowing elements visible simultaneously
- Enable reduced motion preferences for accessibility
- Use \`will-change\` property sparingly

### Accessibility  
- All components support screen readers
- Keyboard navigation is fully implemented
- Color contrast meets WCAG AA standards
- Reduced motion preferences are respected

### Usage Guidelines
- Cyberpunk themes work best on dark backgrounds
- Use glow effects sparingly to maintain readability
- Combine effects thoughtfully to avoid visual overload
- Test in different lighting conditions

Explore the stories below to see all cyberpunk components in action!
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample data for demonstrations
const sampleRadarContacts = [
  { id: '1', x: 0.3, y: -0.4, type: 'friendly' as const, label: 'Alpha Squad' },
  { id: '2', x: -0.6, y: 0.2, type: 'hostile' as const, label: 'Enemy Unit' },
  { id: '3', x: 0.1, y: 0.7, type: 'neutral' as const, label: 'Civilian' },
  { id: '4', x: -0.3, y: -0.8, type: 'objective' as const, label: 'Target' },
];

const sampleTerminalCommands = [
  {
    id: '1',
    command: 'cyberpunk --initialize',
    output: `Cyberpunk Design System v3.5.0 initialized...
    
✓ Matrix protocols loaded
✓ DOOM combat systems online  
✓ Ghost stealth mode activated
✓ Neon interface ready

Welcome to the digital reality.`,
    timestamp: new Date(),
    status: 'success' as const,
  },
];

// Main Overview Story
export const CyberpunkOverview: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState('components');
    const [health, setHealth] = useState(85);
    const [shields, setShields] = useState(67);
    const [ammo, setAmmo] = useState(234);

    useEffect(() => {
      const interval = setInterval(() => {
        setHealth(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 10)));
        setShields(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)));
        setAmmo(prev => Math.max(0, Math.min(500, prev + (Math.random() - 0.5) * 20)));
      }, 2000);
      
      return () => clearInterval(interval);
    }, []);

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          {/* Matrix Rain Background */}
          <div className="cyber-matrix-overlay opacity-20 pointer-events-none"></div>
          
          {/* Header */}
          <div className="relative z-10 p-6 border-b border-green-500/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-green-400 cyber-text-glow">
                    CYBERPUNK DESIGN SYSTEM
                  </h1>
                  <p className="text-lg text-green-300 mt-2">
                    v3.5.0 - Digital Reality Interface
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <DarkThemeToggle />
                  <div className="text-xs text-green-400">
                    <div>SYSTEM STATUS: <span className="text-green-300">ONLINE</span></div>
                    <div>SECURITY: <span className="text-green-300">MAXIMUM</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="relative z-10 p-6 border-b border-green-500/20">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-2">
                {[
                  { id: 'components', label: 'Components', icon: '⚡' },
                  { id: 'hud', label: 'HUD System', icon: '🎮' },
                  { id: 'terminal', label: 'Terminal', icon: '💻' },
                  { id: 'effects', label: 'Effects', icon: '✨' },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeDemo === tab.id ? 'cyberpunk-matrix' : 'cyberpunk-ghost'}
                    cyberpunkGlow={activeDemo === tab.id ? 'normal' : undefined}
                    onClick={() => setActiveDemo(tab.id)}
                    className="cyber-pulse"
                  >
                    {tab.icon} {tab.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 p-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Components Demo */}
              {activeDemo === 'components' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-green-400 mb-6">Cyberpunk Components</h2>
                    
                    {/* Button Variants */}
                    <div className="mb-8">
                      <h3 className="text-xl text-green-300 mb-4">Button Variants</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" iconStart="Zap">
                          Matrix Power
                        </Button>
                        <Button variant="cyberpunk-doom" scanlines iconStart="Target">
                          DOOM Combat
                        </Button>
                        <Button variant="cyberpunk-ghost" iconStart="Ghost">
                          Ghost Mode
                        </Button>
                        <Button variant="cyberpunk-neon" cyberpunkGlow="normal" iconStart="Sparkles">
                          Neon Style
                        </Button>
                      </div>
                    </div>

                    {/* Card Variants */}
                    <div>
                      <h3 className="text-xl text-green-300 mb-4">Card Variants</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card variant="cyberpunk-matrix" cyberpunkGlow="normal" scanlines>
                          <CardHeader>
                            <CardTitle>Matrix</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>CPU: <span className="text-green-400">73%</span></p>
                            <p>RAM: <span className="text-green-400">8.2GB</span></p>
                          </CardContent>
                        </Card>
                        
                        <Card variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
                          <CardHeader>
                            <CardTitle>DOOM</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Health: <span className="text-red-400">{health}%</span></p>
                            <p>Armor: <span className="text-red-400">{shields}%</span></p>
                          </CardContent>
                        </Card>
                        
                        <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
                          <CardHeader>
                            <CardTitle>Ghost</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Stealth: <span className="text-gray-400">ACTIVE</span></p>
                            <p>Visibility: <span className="text-gray-400">12%</span></p>
                          </CardContent>
                        </Card>
                        
                        <Card variant="cyberpunk-neon" cyberpunkGlow="normal" scanlines>
                          <CardHeader>
                            <CardTitle>Neon</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Neural: <span className="text-pink-400">89%</span></p>
                            <p>Bandwidth: <span className="text-pink-400">1.2GB/s</span></p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* HUD Demo */}
              {activeDemo === 'hud' && (
                <div className="relative min-h-[600px]">
                  <h2 className="text-2xl font-bold text-green-400 mb-6">HUD System Demonstration</h2>
                  
                  {/* Main HUD */}
                  <HUD
                    layout={{ position: 'top-left', padding: 20 }}
                    theme={{ variant: 'matrix', glow: true, scanlines: true }}
                    visible
                  >
                    <HUDPanel title="Vital Signs" size="md" variant="matrix">
                      <HUDMetric
                        label="Health"
                        value={health}
                        type="health"
                        showProgressBar
                        showPercentage
                        variant="matrix"
                      />
                      <HUDMetric
                        label="Shields"
                        value={shields}
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
                    <HUDPanel title="Combat" size="md" variant="doom">
                      <HUDMetric
                        label="Ammo"
                        value={ammo}
                        maxValue={500}
                        type="ammo"
                        format="fraction"
                        showProgressBar
                        variant="doom"
                      />
                      <HUDProgressBar
                        label="Reload"
                        value={Math.random() * 100}
                        variant="doom"
                        animated
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
                      enablePingAnimation
                      title="Tactical"
                    />
                  </HUD>

                  {/* Center Info */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Card variant="cyberpunk-neon" cyberpunkGlow="intense" className="text-center">
                      <CardContent>
                        <h3 className="text-xl text-pink-400 mb-2">HUD ACTIVE</h3>
                        <p className="text-pink-300">Real-time data display</p>
                        <p className="text-xs text-pink-400 mt-2">Values update every 2 seconds</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Terminal Demo */}
              {activeDemo === 'terminal' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-green-400 mb-6">Terminal Interface</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Terminal
                      variant="matrix"
                      title="MATRIX TERMINAL"
                      height="400px"
                      enableScanlines
                      enableMatrixRain
                      initialCommands={sampleTerminalCommands}
                      enableTypewriter
                    />
                    
                    <Terminal
                      variant="doom"
                      title="DOOM TERMINAL"
                      height="400px"
                      enableScanlines
                      prompt="DOOM> "
                      initialCommands={[
                        {
                          id: '1',
                          command: 'rip and tear',
                          output: 'BFG-9000 loaded and ready...\nDemons eliminated.\nHell secured.',
                          timestamp: new Date(),
                          status: 'success' as const,
                        },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* Effects Demo */}
              {activeDemo === 'effects' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-green-400 mb-6">Visual Effects Showcase</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card variant="cyberpunk-matrix" cyberpunkGlow="intense" className="cyber-pulse">
                      <CardHeader>
                        <CardTitle>Glow Effects</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Configurable neon glow with 3 intensity levels:</p>
                        <div className="space-y-2">
                          <Button variant="cyberpunk-matrix" cyberpunkGlow="subtle" size="sm">Subtle</Button>
                          <Button variant="cyberpunk-matrix" cyberpunkGlow="normal" size="sm">Normal</Button>
                          <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" size="sm">Intense</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="cyberpunk-doom" scanlines elevated>
                      <CardHeader>
                        <CardTitle>Scanlines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">CRT monitor style scanlines for retro feel.</p>
                        <div className="cyber-scanlines p-4 border border-red-500/30 rounded">
                          <p className="text-red-400">Scanline overlay active</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="cyberpunk-neon" matrixRain cyberpunkGlow="normal">
                      <CardHeader>
                        <CardTitle>Matrix Rain</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Animated digital rain background overlay.</p>
                        <div className="relative">
                          <div className="cyber-matrix-overlay opacity-30 h-20 rounded"></div>
                          <p className="text-pink-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            Digital Rain
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Notes */}
                  <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
                    <CardHeader>
                      <CardTitle>Performance & Accessibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-gray-300 mb-2">Performance Tips:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-400">
                            <li>Use transform for animations</li>
                            <li>Limit simultaneous glow effects</li>
                            <li>Use will-change sparingly</li>
                            <li>Test on mobile devices</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300 mb-2">Accessibility:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-400">
                            <li>Reduced motion support</li>
                            <li>Screen reader compatible</li>
                            <li>Keyboard navigation</li>
                            <li>WCAG AA contrast ratios</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-12 p-6 border-t border-green-500/30">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-green-400">
                Cyberpunk Design System v3.5.0 - Ready for digital reality
              </p>
              <p className="text-green-300 text-sm mt-2">
                Explore individual component stories for detailed documentation and examples
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete overview of the Cyberpunk Design System with interactive demonstrations of all components, effects, and themes.'
      }
    }
  }
};

// Quick Start Guide
export const QuickStart: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-4">Quick Start Guide</h1>
        <p className="text-green-300 text-lg">Get started with the Cyberpunk Design System in minutes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="cyberpunk-matrix" cyberpunkGlow="normal">
          <CardHeader>
            <CardTitle>1. Basic Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-300 mb-2">Button with Cyberpunk Variant:</h4>
              <pre className="bg-black p-3 rounded text-xs text-green-400 overflow-x-auto">
{`<Button 
  variant="cyberpunk-matrix"
  cyberpunkGlow="normal"
  iconStart="Zap"
>
  Matrix Button
</Button>`}
              </pre>
            </div>
            <Button variant="cyberpunk-matrix" cyberpunkGlow="normal" iconStart="Zap">
              Matrix Button
            </Button>
          </CardContent>
        </Card>

        <Card variant="cyberpunk-doom" cyberpunkGlow="normal">
          <CardHeader>
            <CardTitle>2. Card with Effects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Card with Scanlines:</h4>
              <pre className="bg-black p-3 rounded text-xs text-red-400 overflow-x-auto">
{`<Card 
  variant="cyberpunk-doom"
  scanlines
  cyberpunkGlow="normal"
>
  <CardContent>
    DOOM Style Card
  </CardContent>
</Card>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
          <CardHeader>
            <CardTitle>3. Theme Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-300 mb-2">Theme Provider Setup:</h4>
              <pre className="bg-black p-3 rounded text-xs text-gray-400 overflow-x-auto">
{`<ThemeProvider>
  <DarkThemeToggle />
  <YourApp />
</ThemeProvider>`}
              </pre>
            </div>
            <p className="text-gray-400 text-sm">
              The theme toggle cycles through Light → Dark → Futuristic → Cyberpunk
            </p>
          </CardContent>
        </Card>

        <Card variant="cyberpunk-neon" cyberpunkGlow="normal">
          <CardHeader>
            <CardTitle>4. Advanced Effects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-pink-300 mb-2">Multiple Effects:</h4>
              <pre className="bg-black p-3 rounded text-xs text-pink-400 overflow-x-auto">
{`<Card 
  variant="cyberpunk-neon"
  cyberpunkGlow="intense"
  scanlines
  matrixRain
>
  Ultimate Cyberpunk
</Card>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant="cyberpunk-matrix" cyberpunkGlow="subtle" className="text-center">
        <CardContent>
          <h3 className="text-xl text-green-400 mb-4">Ready to Start?</h3>
          <p className="text-green-300 mb-4">
            Explore the component stories for detailed examples and documentation.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="cyberpunk-matrix" cyberpunkGlow="normal">
              View Components
            </Button>
            <Button variant="cyberpunk-doom" cyberpunkGlow="normal">
              See Examples
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Quick start guide showing basic usage patterns and code examples for the Cyberpunk Design System.'
      }
    }
  }
};