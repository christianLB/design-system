import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import { Terminal } from '../components/Terminal';
import { Switch } from '../components/Switch';
import { Badge } from '../components/Badge';
import { Alert } from '../components/Alert';
import { Progress } from '../components/Progress';
import { ThemeProvider } from '../theme';

const meta: Meta = {
  title: 'Themes/Cyberpunk/Plugin System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Cyberpunk Plugin System Showcase

The Cyberpunk Design System features a powerful plugin architecture that adds visual effects and enhancements to components. This showcase demonstrates all available plugins and their configurations.

## Available Plugins

### 🌟 Glow Effects Plugin
Creates dynamic neon glow effects with configurable intensity levels:
- **Subtle**: Minimal glow for professional interfaces
- **Normal**: Standard cyberpunk glow effect  
- **Intense**: Maximum intensity for dramatic impact

Features:
- Multi-color support (Matrix Green, DOOM Red, Swordfish Cyan)
- Pulse animations with customizable duration
- Hover state enhancements
- Performance optimized with CSS custom properties
- Reduced motion support for accessibility

### 📺 Scanline Effects Plugin  
Adds retro CRT monitor scanlines for authentic cyberpunk feel:
- Configurable line density and opacity
- Animated scrolling effects
- Compatible with all component variants
- Performance optimized with CSS patterns
- Can be combined with other effects

### 💧 Matrix Rain Plugin
Creates the iconic digital rain effect from The Matrix:
- Animated character streams falling from top to bottom
- Configurable speed and density
- Background overlay that doesn't interfere with content
- Uses CSS animations for smooth performance
- Respects reduced motion preferences

## Plugin Configuration

All plugins support:
- **Enable/Disable**: Toggle effects on/off
- **Intensity Control**: Adjust effect strength
- **Performance Mode**: Optimize for mobile devices
- **Accessibility**: Respect user motion preferences
- **Custom Colors**: Override default color schemes

## Performance Considerations

- Effects use CSS transforms and filters for hardware acceleration
- Plugins automatically optimize based on device capabilities
- Reduced motion preferences disable animations
- Will-change properties are managed automatically
- Memory usage is optimized with efficient CSS patterns

## Best Practices

1. **Don't Overuse**: Limit glowing elements visible simultaneously
2. **Test Performance**: Verify smooth performance on target devices
3. **Consider Context**: Match effect intensity to interface purpose
4. **Accessibility First**: Always test with reduced motion enabled
5. **Mobile Optimization**: Use subtle effects on mobile devices

Explore the interactive examples below to see all plugins in action!
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Interactive Plugin Configurator
export const PluginConfigurator: Story = {
  render: () => {
    const [glowEnabled, setGlowEnabled] = useState(true);
    const [glowIntensity, setGlowIntensity] = useState<'subtle' | 'normal' | 'intense'>('normal');
    const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
    const [matrixRainEnabled, setMatrixRainEnabled] = useState(false);
    const [pulseEnabled, setPulseEnabled] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Sample component to demonstrate effects
    const DemoComponent = ({
      variant,
      children,
    }: {
      variant: string;
      children: React.ReactNode;
    }) => (
      <Card
        variant={variant as any}
        cyberpunkGlow={glowEnabled ? glowIntensity : undefined}
        scanlines={scanlinesEnabled}
        matrixRain={matrixRainEnabled}
        className={`${pulseEnabled ? 'cyber-pulse' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}
      >
        <CardContent className="text-center py-8">{children}</CardContent>
      </Card>
    );

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-green-400 cyber-text-glow mb-4">
                CYBERPUNK PLUGIN SYSTEM
              </h1>
              <p className="text-green-300 text-lg">
                Interactive demonstration of all cyberpunk visual effects and plugins
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Control Panel */}
              <Card
                variant="cyberpunk-matrix"
                cyberpunkGlow="normal"
                scanlines
                className="xl:col-span-1"
              >
                <CardHeader>
                  <CardTitle>Plugin Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Glow Effects */}
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">Glow Effects</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Glow</span>
                        <Switch checked={glowEnabled} onCheckedChange={setGlowEnabled} />
                      </div>

                      {glowEnabled && (
                        <div>
                          <label className="text-sm text-green-300 block mb-2">Intensity</label>
                          <div className="grid grid-cols-3 gap-1">
                            {(['subtle', 'normal', 'intense'] as const).map((intensity) => (
                              <Button
                                key={intensity}
                                variant={
                                  glowIntensity === intensity
                                    ? 'cyberpunk-matrix'
                                    : 'cyberpunk-ghost'
                                }
                                cyberpunkGlow={glowIntensity === intensity ? 'normal' : undefined}
                                size="sm"
                                onClick={() => setGlowIntensity(intensity)}
                              >
                                {intensity}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scanlines */}
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">Scanlines</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable Scanlines</span>
                      <Switch checked={scanlinesEnabled} onCheckedChange={setScanlinesEnabled} />
                    </div>
                    <p className="text-xs text-green-300 mt-2">Retro CRT monitor effect</p>
                  </div>

                  {/* Matrix Rain */}
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">Matrix Rain</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable Matrix Rain</span>
                      <Switch checked={matrixRainEnabled} onCheckedChange={setMatrixRainEnabled} />
                    </div>
                    <p className="text-xs text-green-300 mt-2">Digital rain background overlay</p>
                  </div>

                  {/* Pulse Animation */}
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">Animations</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pulse Effect</span>
                      <Switch checked={pulseEnabled} onCheckedChange={setPulseEnabled} />
                    </div>
                    <p className="text-xs text-green-300 mt-2">Breathing glow animation</p>
                  </div>

                  {/* Accessibility */}
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">Accessibility</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reduced Motion</span>
                      <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                    </div>
                    <p className="text-xs text-green-300 mt-2">
                      Disable animations for accessibility
                    </p>
                  </div>

                  {/* Reset Button */}
                  <Button
                    variant="cyberpunk-doom"
                    cyberpunkGlow="normal"
                    fullWidth
                    onClick={() => {
                      setGlowEnabled(true);
                      setGlowIntensity('normal');
                      setScanlinesEnabled(true);
                      setMatrixRainEnabled(false);
                      setPulseEnabled(true);
                      setReducedMotion(false);
                    }}
                  >
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>

              {/* Demo Area */}
              <div className="xl:col-span-3 space-y-6">
                {/* Current Configuration Display */}
                <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
                  <CardHeader>
                    <CardTitle>Current Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <strong className="text-gray-300">Glow:</strong>
                        <div className={glowEnabled ? 'text-green-400' : 'text-red-400'}>
                          {glowEnabled ? `${glowIntensity}` : 'disabled'}
                        </div>
                      </div>
                      <div>
                        <strong className="text-gray-300">Scanlines:</strong>
                        <div className={scanlinesEnabled ? 'text-green-400' : 'text-red-400'}>
                          {scanlinesEnabled ? 'enabled' : 'disabled'}
                        </div>
                      </div>
                      <div>
                        <strong className="text-gray-300">Matrix Rain:</strong>
                        <div className={matrixRainEnabled ? 'text-green-400' : 'text-red-400'}>
                          {matrixRainEnabled ? 'enabled' : 'disabled'}
                        </div>
                      </div>
                      <div>
                        <strong className="text-gray-300">Pulse:</strong>
                        <div className={pulseEnabled ? 'text-green-400' : 'text-red-400'}>
                          {pulseEnabled ? 'enabled' : 'disabled'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Variant Demos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DemoComponent variant="cyberpunk-matrix">
                    <div className="text-green-400 text-xl mb-2">⚡</div>
                    <div className="text-green-300 font-semibold">Matrix</div>
                    <div className="text-green-400 text-sm">Green Theme</div>
                  </DemoComponent>

                  <DemoComponent variant="cyberpunk-doom">
                    <div className="text-red-400 text-xl mb-2">🎯</div>
                    <div className="text-red-300 font-semibold">DOOM</div>
                    <div className="text-red-400 text-sm">Combat Theme</div>
                  </DemoComponent>

                  <DemoComponent variant="cyberpunk-ghost">
                    <div className="text-gray-400 text-xl mb-2">👻</div>
                    <div className="text-gray-300 font-semibold">Ghost</div>
                    <div className="text-gray-400 text-sm">Stealth Theme</div>
                  </DemoComponent>

                  <DemoComponent variant="cyberpunk-neon">
                    <div className="text-pink-400 text-xl mb-2">✨</div>
                    <div className="text-pink-300 font-semibold">Neon</div>
                    <div className="text-pink-400 text-sm">Night City Theme</div>
                  </DemoComponent>
                </div>

                {/* Button Demonstrations */}
                <Card variant="cyberpunk-neon" cyberpunkGlow="normal">
                  <CardHeader>
                    <CardTitle>Interactive Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-pink-300 font-semibold mb-3">
                          Buttons with Current Effects
                        </h4>
                        <div className="space-y-3">
                          <Button
                            variant="cyberpunk-matrix"
                            cyberpunkGlow={glowEnabled ? glowIntensity : undefined}
                            scanlines={scanlinesEnabled}
                            className={pulseEnabled ? 'cyber-pulse' : ''}
                            iconStart="Zap"
                            fullWidth
                          >
                            Matrix Button
                          </Button>
                          <Button
                            variant="cyberpunk-doom"
                            cyberpunkGlow={glowEnabled ? glowIntensity : undefined}
                            scanlines={scanlinesEnabled}
                            className={pulseEnabled ? 'cyber-pulse' : ''}
                            iconStart="Target"
                            fullWidth
                          >
                            DOOM Button
                          </Button>
                          <Button
                            variant="cyberpunk-neon"
                            cyberpunkGlow={glowEnabled ? glowIntensity : undefined}
                            scanlines={scanlinesEnabled}
                            className={pulseEnabled ? 'cyber-pulse' : ''}
                            iconStart="Sparkles"
                            fullWidth
                          >
                            Neon Button
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-pink-300 font-semibold mb-3">Progress Indicators</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-green-300 mb-1">Matrix Loading</div>
                            <Progress
                              value={67}
                              className={`cyber-glow ${scanlinesEnabled ? 'cyber-scanlines' : ''}`}
                            />
                          </div>
                          <div>
                            <div className="text-sm text-red-300 mb-1">Combat Status</div>
                            <Progress
                              value={89}
                              className={`cyber-glow-red ${scanlinesEnabled ? 'cyber-scanlines' : ''}`}
                            />
                          </div>
                          <div>
                            <div className="text-sm text-pink-300 mb-1">Neural Load</div>
                            <Progress
                              value={45}
                              className={`cyber-glow ${scanlinesEnabled ? 'cyber-scanlines' : ''}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terminal with Effects */}
                <Terminal
                  variant="matrix"
                  title="PLUGIN DEMONSTRATION TERMINAL"
                  height="300px"
                  enableScanlines={scanlinesEnabled}
                  enableMatrixRain={matrixRainEnabled}
                  initialCommands={[
                    {
                      id: '1',
                      command: 'cyberpunk-plugins --status',
                      output: `Plugin System Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Glow Effects: ${glowEnabled ? `✓ ENABLED (${glowIntensity})` : '✗ DISABLED'}
Scanlines: ${scanlinesEnabled ? '✓ ENABLED' : '✗ DISABLED'}
Matrix Rain: ${matrixRainEnabled ? '✓ ENABLED' : '✗ DISABLED'}
Pulse Animation: ${pulseEnabled ? '✓ ENABLED' : '✗ DISABLED'}
Reduced Motion: ${reducedMotion ? '✓ ENABLED' : '✗ DISABLED'}

Performance: OPTIMAL
Memory Usage: 12.3MB
GPU Acceleration: ACTIVE

All systems operational.`,
                      timestamp: new Date(),
                      status: 'success' as const,
                    },
                  ]}
                  enableInput={false}
                />
              </div>
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
        story:
          'Interactive plugin configurator allowing real-time testing of all cyberpunk effects and their combinations.',
      },
    },
  },
};

// Individual Plugin Demonstrations
export const GlowEffectsShowcase: Story = {
  render: () => (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-400 cyber-text-glow mb-4">
              GLOW EFFECTS PLUGIN
            </h1>
            <p className="text-green-300">
              Dynamic neon glow effects with configurable intensity and color options
            </p>
          </div>

          {/* Intensity Levels */}
          <Card variant="cyberpunk-matrix" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Glow Intensity Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <h3 className="text-green-300 font-semibold">Subtle</h3>
                  <Button variant="cyberpunk-matrix" cyberpunkGlow="subtle" fullWidth>
                    Subtle Glow
                  </Button>
                  <Card variant="cyberpunk-matrix" cyberpunkGlow="subtle">
                    <CardContent className="text-center py-4">
                      <div className="text-green-400">Minimal glow for professional interfaces</div>
                    </CardContent>
                  </Card>
                  <p className="text-xs text-green-400">
                    Perfect for business applications and subtle enhancement
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-green-300 font-semibold">Normal</h3>
                  <Button variant="cyberpunk-matrix" cyberpunkGlow="normal" fullWidth>
                    Normal Glow
                  </Button>
                  <Card variant="cyberpunk-matrix" cyberpunkGlow="normal">
                    <CardContent className="text-center py-4">
                      <div className="text-green-400">Standard cyberpunk glow effect</div>
                    </CardContent>
                  </Card>
                  <p className="text-xs text-green-400">
                    Balanced glow for most cyberpunk interfaces
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-green-300 font-semibold">Intense</h3>
                  <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" fullWidth>
                    Intense Glow
                  </Button>
                  <Card variant="cyberpunk-matrix" cyberpunkGlow="intense">
                    <CardContent className="text-center py-4">
                      <div className="text-green-400">Maximum intensity for dramatic impact</div>
                    </CardContent>
                  </Card>
                  <p className="text-xs text-green-400">
                    High-impact glow for gaming and dramatic interfaces
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Variations */}
          <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Multi-Color Glow Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center space-y-3">
                  <h4 className="text-green-300">Matrix Green</h4>
                  <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" fullWidth>
                    Matrix Power
                  </Button>
                  <div className="cyber-glow text-green-400 p-3 border border-green-500/30 rounded">
                    Primary cyberpunk color
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h4 className="text-red-300">DOOM Red</h4>
                  <Button variant="cyberpunk-doom" cyberpunkGlow="intense" fullWidth>
                    Combat Mode
                  </Button>
                  <div className="cyber-glow-red text-red-400 p-3 border border-red-500/30 rounded">
                    Aggressive combat theme
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h4 className="text-cyan-300">Swordfish Cyan</h4>
                  <div className="cyber-glow-cyan text-cyan-400 p-3 border border-cyan-500/30 rounded font-semibold">
                    Information Display
                  </div>
                  <div className="cyber-glow-cyan text-cyan-400 p-3 border border-cyan-500/30 rounded">
                    Data and analytics
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h4 className="text-pink-300">Neon Pink</h4>
                  <Button variant="cyberpunk-neon" cyberpunkGlow="intense" fullWidth>
                    Night City
                  </Button>
                  <div className="cyber-glow text-pink-400 p-3 border border-pink-500/30 rounded">
                    Futuristic interface
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Animation Effects */}
          <Card variant="cyberpunk-neon" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Animation Effects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <h4 className="text-pink-300">Pulse Effect</h4>
                  <Button
                    variant="cyberpunk-matrix"
                    cyberpunkGlow="normal"
                    className="cyber-pulse"
                    fullWidth
                  >
                    Pulsing Glow
                  </Button>
                  <p className="text-xs text-pink-400">Breathing animation that draws attention</p>
                </div>

                <div className="text-center space-y-4">
                  <h4 className="text-pink-300">Intense Pulse</h4>
                  <Button
                    variant="cyberpunk-doom"
                    cyberpunkGlow="intense"
                    className="cyber-pulse-intense"
                    fullWidth
                  >
                    Intense Pulse
                  </Button>
                  <p className="text-xs text-pink-400">
                    More dramatic pulsing with scale transform
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <h4 className="text-pink-300">Rainbow Cycle</h4>
                  <Button
                    variant="cyberpunk-neon"
                    cyberpunkGlow="normal"
                    className="cyber-rainbow"
                    fullWidth
                  >
                    Color Cycle
                  </Button>
                  <p className="text-xs text-pink-400">Cycles through multiple glow colors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Info */}
          <Alert variant="cyberpunk-matrix" glow>
            <div className="text-green-400">
              <strong>Performance Optimization</strong>
              <p className="text-sm mt-2">
                Glow effects use CSS box-shadow and filters for hardware acceleration. The plugin
                automatically adjusts intensity based on device capabilities and respects reduced
                motion preferences for accessibility.
              </p>
            </div>
          </Alert>
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Comprehensive demonstration of the glow effects plugin with all intensity levels, colors, and animation options.',
      },
    },
  },
};

export const ScanlineEffectsShowcase: Story = {
  render: () => (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-400 cyber-text-glow mb-4">
              SCANLINE EFFECTS PLUGIN
            </h1>
            <p className="text-green-300">
              Retro CRT monitor scanlines for authentic cyberpunk atmosphere
            </p>
          </div>

          {/* Basic Scanlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="cyberpunk-matrix">
              <CardHeader>
                <CardTitle>Without Scanlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center">
                  <div className="text-green-400 text-center">
                    <div className="text-xl mb-2">Standard Interface</div>
                    <div className="text-sm">Clean, modern appearance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="cyberpunk-matrix" scanlines>
              <CardHeader>
                <CardTitle>With Scanlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center cyber-scanlines">
                  <div className="text-green-400 text-center">
                    <div className="text-xl mb-2">Retro CRT Interface</div>
                    <div className="text-sm">Authentic cyberpunk feel</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scanlines with Different Variants */}
          <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Scanlines Across All Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="cyberpunk-matrix" scanlines cyberpunkGlow="normal">
                  <CardContent className="text-center py-6">
                    <div className="text-green-400 text-lg mb-2">Matrix</div>
                    <div className="text-green-300 text-sm">Green scanlines</div>
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-doom" scanlines cyberpunkGlow="normal">
                  <CardContent className="text-center py-6">
                    <div className="text-red-400 text-lg mb-2">DOOM</div>
                    <div className="text-red-300 text-sm">Combat scanlines</div>
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-ghost" scanlines cyberpunkGlow="normal">
                  <CardContent className="text-center py-6">
                    <div className="text-gray-400 text-lg mb-2">Ghost</div>
                    <div className="text-gray-300 text-sm">Stealth scanlines</div>
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-neon" scanlines cyberpunkGlow="normal">
                  <CardContent className="text-center py-6">
                    <div className="text-pink-400 text-lg mb-2">Neon</div>
                    <div className="text-pink-300 text-sm">Night city scanlines</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Terminal with Scanlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Terminal
              variant="matrix"
              title="MATRIX TERMINAL - NO SCANLINES"
              height="300px"
              enableScanlines={false}
              initialCommands={[
                {
                  id: '1',
                  command: 'display --mode modern',
                  output: `Modern display mode activated.
Clean, crisp text rendering.
No retro effects applied.`,
                  timestamp: new Date(),
                  status: 'success' as const,
                },
              ]}
              enableInput={false}
            />

            <Terminal
              variant="matrix"
              title="MATRIX TERMINAL - WITH SCANLINES"
              height="300px"
              enableScanlines={true}
              initialCommands={[
                {
                  id: '1',
                  command: 'display --mode retro',
                  output: `Retro CRT mode activated.
Scanline overlay enabled.
Authentic 80s terminal feel.
  
Perfect for cyberpunk interfaces!`,
                  timestamp: new Date(),
                  status: 'success' as const,
                },
              ]}
              enableInput={false}
            />
          </div>

          {/* Combined Effects */}
          <Card variant="cyberpunk-doom" cyberpunkGlow="intense" scanlines>
            <CardHeader>
              <CardTitle>Combined Effects: Glow + Scanlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-red-400 text-2xl mb-4">⚡ MAXIMUM CYBERPUNK ⚡</div>
                <p className="text-red-300 mb-6">
                  Combining intense glow effects with retro scanlines creates the ultimate cyberpunk
                  aesthetic
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="cyberpunk-doom" cyberpunkGlow="intense" scanlines fullWidth>
                    Combat Button
                  </Button>
                  <Button variant="cyberpunk-matrix" cyberpunkGlow="intense" scanlines fullWidth>
                    Matrix Button
                  </Button>
                  <Button variant="cyberpunk-neon" cyberpunkGlow="intense" scanlines fullWidth>
                    Neon Button
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
            <CardHeader>
              <CardTitle>Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3">CSS Implementation</h4>
                  <div className="bg-black/50 p-4 rounded border border-gray-600 text-xs font-mono">
                    <div className="text-gray-400">/* Scanline pattern */</div>
                    <div className="text-gray-300">.cyber-scanlines::after {`{`}</div>
                    <div className="text-gray-300 ml-2">content: "";</div>
                    <div className="text-gray-300 ml-2">position: absolute;</div>
                    <div className="text-gray-300 ml-2">top: 0;</div>
                    <div className="text-gray-300 ml-2">left: 0;</div>
                    <div className="text-gray-300 ml-2">right: 0;</div>
                    <div className="text-gray-300 ml-2">bottom: 0;</div>
                    <div className="text-gray-300 ml-2">background: repeating-linear-gradient(</div>
                    <div className="text-gray-300 ml-4">0deg,</div>
                    <div className="text-gray-300 ml-4">transparent,</div>
                    <div className="text-gray-300 ml-4">transparent 2px,</div>
                    <div className="text-gray-300 ml-4">rgba(57, 255, 20, 0.03) 2px,</div>
                    <div className="text-gray-300 ml-4">rgba(57, 255, 20, 0.03) 4px</div>
                    <div className="text-gray-300 ml-2">);</div>
                    <div className="text-gray-300">{`}`}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3">Performance Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Uses CSS pseudo-elements for efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>No JavaScript required for animation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Hardware accelerated rendering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Minimal memory footprint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Scales with component size</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Complete demonstration of the scanline effects plugin showing CRT-style scanlines across all components and variants.',
      },
    },
  },
};

export const MatrixRainShowcase: Story = {
  render: () => {
    const [rainEnabled, setRainEnabled] = useState(true);
    const [rainSpeed, setRainSpeed] = useState('normal');

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white relative">
          {rainEnabled && (
            <div className="cyber-matrix-overlay opacity-30 pointer-events-none"></div>
          )}

          <div className="relative z-10 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-green-400 cyber-text-glow mb-4">
                  MATRIX RAIN PLUGIN
                </h1>
                <p className="text-green-300">Iconic digital rain effect inspired by The Matrix</p>
              </div>

              {/* Controls */}
              <Card variant="cyberpunk-matrix" cyberpunkGlow="normal">
                <CardHeader>
                  <CardTitle>Matrix Rain Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Enable Matrix Rain</span>
                      <Switch checked={rainEnabled} onCheckedChange={setRainEnabled} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Background Rain Speed: {rainSpeed}</span>
                      <Button
                        variant="cyberpunk-ghost"
                        size="sm"
                        onClick={() =>
                          setRainSpeed(
                            rainSpeed === 'slow'
                              ? 'normal'
                              : rainSpeed === 'normal'
                                ? 'fast'
                                : 'slow',
                          )
                        }
                      >
                        Change Speed
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Matrix Rain Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="cyberpunk-matrix">
                  <CardHeader>
                    <CardTitle>Without Matrix Rain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-green-500/5 border border-green-500/30 rounded relative flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-green-400 text-xl mb-2">Standard Background</div>
                        <div className="text-green-300 text-sm">
                          Clean interface without effects
                        </div>
                        <div className="text-green-400 mt-4">No digital rain overlay</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-matrix" matrixRain>
                  <CardHeader>
                    <CardTitle>With Matrix Rain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-green-500/5 border border-green-500/30 rounded relative flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-green-400 text-xl mb-2">Matrix Background</div>
                        <div className="text-green-300 text-sm">Digital rain effect active</div>
                        <div className="text-green-400 mt-4">Authentic Matrix atmosphere</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Terminal with Matrix Rain */}
              <Terminal
                variant="matrix"
                title="THE MATRIX - DIGITAL REALITY INTERFACE"
                height="400px"
                enableScanlines
                enableMatrixRain={rainEnabled}
                initialCommands={[
                  {
                    id: '1',
                    command: 'wake up neo...',
                    output: `The Matrix has you...
Follow the white rabbit.

Knock, knock, Neo.`,
                    timestamp: new Date(Date.now() - 5000),
                    status: 'success' as const,
                  },
                  {
                    id: '2',
                    command: 'what is the matrix?',
                    output: `The Matrix is a system, Neo.
That system is our enemy.

When you're inside, you look around, 
what do you see? Businessmen, teachers, 
lawyers, carpenters. The very minds of 
the people we are trying to save.

But until we do, these people are still 
a part of that system and that makes 
them our enemy.`,
                    timestamp: new Date(Date.now() - 2000),
                    status: 'warning' as const,
                  },
                  {
                    id: '3',
                    command: 'red pill or blue pill?',
                    output: `This is your last chance.
After this, there is no going back.

You take the blue pill—the story ends, 
you wake up in your bed and believe 
whatever you want to believe.

You take the red pill—you stay in 
Wonderland, and I show you how deep 
the rabbit hole goes.

Remember: all I'm offering is the truth. 
Nothing more.`,
                    timestamp: new Date(),
                    status: 'error' as const,
                  },
                ]}
                enableInput={false}
              />

              {/* Matrix-themed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="cyberpunk-matrix" matrixRain cyberpunkGlow="intense">
                  <CardHeader>
                    <CardTitle>The One</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <div className="text-green-400 text-2xl mb-2">👁️</div>
                      <div className="text-green-300">Neo Anderson</div>
                      <div className="text-green-400 text-sm mt-2">"There is no spoon"</div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-matrix" matrixRain cyberpunkGlow="normal" scanlines>
                  <CardHeader>
                    <CardTitle>Agent Smith</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <div className="text-green-400 text-2xl mb-2">🕴️</div>
                      <div className="text-green-300">The Virus</div>
                      <div className="text-green-400 text-sm mt-2">"Mr. Anderson..."</div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-matrix" matrixRain cyberpunkGlow="subtle">
                  <CardHeader>
                    <CardTitle>Morpheus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <div className="text-green-400 text-2xl mb-2">🔮</div>
                      <div className="text-green-300">The Captain</div>
                      <div className="text-green-400 text-sm mt-2">"Welcome to the real world"</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Implementation Details */}
              <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
                <CardHeader>
                  <CardTitle>Matrix Rain Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-gray-300 font-semibold mb-3">Features</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Animated character streams falling vertically</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Configurable speed and density</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Background overlay that doesn't interfere with content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Uses CSS animations for smooth performance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Automatically respects reduced motion preferences</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-semibold mb-3">Usage Guidelines</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400">⚠</span>
                          <span>Use sparingly to avoid visual overload</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400">⚠</span>
                          <span>Test readability with overlay active</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400">⚠</span>
                          <span>Consider performance on mobile devices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Perfect for Matrix-themed interfaces</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <span>Great for loading screens and backgrounds</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Famous Matrix Quotes */}
              <Card
                variant="cyberpunk-matrix"
                matrixRain
                cyberpunkGlow="normal"
                className="cyber-pulse"
              >
                <CardContent>
                  <div className="text-center py-8">
                    <blockquote className="text-green-400 text-xl italic mb-4">
                      "Unfortunately, no one can be told what the Matrix is. You have to see it for
                      yourself."
                    </blockquote>
                    <cite className="text-green-300">— Morpheus</cite>
                  </div>
                </CardContent>
              </Card>
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
        story:
          'Complete demonstration of the Matrix rain plugin with interactive controls and Matrix-themed examples.',
      },
    },
  },
};
