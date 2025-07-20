import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import { Container } from '../components/Container';
import { Terminal } from '../components/Terminal';
import { HUD, HUDPanel, HUDMetric, HUDRadar, HUDProgressBar } from '../components/HUD';
import { HUDNotificationManager } from '../components/HUD/HUDNotification';
import { Progress } from '../components/Progress';
import { Badge } from '../components/Badge';
import { Alert } from '../components/Alert';
import { ThemeProvider } from '../theme';

const meta: Meta = {
  title: 'Themes/Alien/Kitchen Sink',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Alien Kitchen Sink - Complete Biomechanical Interface Demo

This story demonstrates a complete alien biomechanical interface combining all available components in realistic scenarios inspired by H.R. Giger's aesthetic:

## Featured Scenarios

### 🧬 Biomedical Dashboard
A living organism monitoring system with real-time vital signs, cellular activity, and neural pathways.

### 🧠 Neural Interface Terminal
A consciousness connection interface for deep neural linking and synaptic manipulation.

### 🔬 Genetic Engineering Lab
A DNA manipulation console with molecular sequencing and genetic modification controls.

### 🚀 Alien Ship Bridge
A biomechanical command center for navigating through space with organic control systems.

## Key Features Demonstrated

- **Real-time Vital Signs**: All metrics update dynamically with realistic biological data
- **Multi-layered Interfaces**: Complex layouts with overlapping organic HUD elements
- **Interactive Controls**: Live controls that affect the interface state
- **Immersive Theming**: Complete alien atmosphere with all visual effects
- **Responsive Design**: Works across all screen sizes and devices
- **Performance Optimization**: Smooth animations and efficient rendering
- **Atmospheric Effects**: Breathing, neural pathways, vital signs, and biomechanical interactions

Each scenario represents a different use case for the alien design system, showcasing how components work together to create immersive biomechanical experiences.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Realistic biomechanical data generators
const generateOrganismMetrics = () => ({
  respiratoryRate: Math.floor(Math.random() * 8) + 12, // 12-20 BPM
  neuralActivity: Math.floor(Math.random() * 200) + 750, // 750-950 Hz
  cellularActivity: Math.floor(Math.random() * 1000000) + 2000000, // 2-3M ops/sec
  membraneIntegrity: Math.floor(Math.random() * 10) + 90, // 90-100%
  coreTemperature: (Math.random() * 4 + 35).toFixed(1), // 35-39°C
  circulationFlow: (Math.random() * 2 + 4.5).toFixed(1), // 4.5-6.5 L/min
  consciousnessLevel:
    Math.random() > 0.7 ? 'TRANSCENDENT' : Math.random() > 0.3 ? 'AWAKE' : 'DORMANT',
});

const generateGeneticData = () => ({
  sequenceProgress: Math.floor(Math.random() * 30) + 60, // 60-90%
  mutationRate: (Math.random() * 0.05 + 0.01).toFixed(3), // 0.01-0.06%
  helix: Math.floor(Math.random() * 50) + 75, // 75-125%
  chromatin: Math.floor(Math.random() * 40) + 60, // 60-100%
  enzymes: Math.floor(Math.random() * 200) + 1800, // 1800-2000 active
});

const generateShipSystems = () => ({
  navigation: Math.floor(Math.random() * 20) + 80, // 80-100%
  lifesupport: Math.floor(Math.random() * 15) + 85, // 85-100%
  propulsion: Math.floor(Math.random() * 25) + 75, // 75-100%
  sensors: Math.floor(Math.random() * 30) + 70, // 70-100%
  biomechanics: Math.floor(Math.random() * 20) + 80, // 80-100%
  consciousness: Math.floor(Math.random() * 40) + 60, // 60-100%
});

const generateNeuralNodes = () => [
  { id: '1', x: 0.3, y: -0.2, type: 'friendly' as const, label: 'Synaptic Core', status: 'active' },
  {
    id: '2',
    x: -0.4,
    y: 0.3,
    type: 'hostile' as const,
    label: 'Neural Barrier',
    status: 'blocking',
  },
  { id: '3', x: 0.6, y: 0.2, type: 'neutral' as const, label: 'Memory Bank', status: 'accessing' },
  {
    id: '4',
    x: -0.3,
    y: -0.5,
    type: 'objective' as const,
    label: 'Consciousness',
    status: 'linked',
  },
  {
    id: '5',
    x: 0.2,
    y: 0.6,
    type: 'friendly' as const,
    label: 'Neural Bridge',
    status: 'synchronized',
  },
];

const biomedicalCommands = [
  {
    id: '1',
    command: 'vitals --scan --deep',
    output: `ORGANISM VITALS ANALYSIS v4.7.2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Respiratory System: OPTIMAL
├─ Lung Capacity: 6.2L
├─ O2 Saturation: 98.7%
├─ CO2 Levels: Normal
└─ Breathing Pattern: Synchronized

Neural Network: EXPANDING
├─ Synaptic Activity: 847 Hz
├─ Neural Pathways: 2,847 active
├─ Consciousness Level: TRANSCENDENT
└─ Memory Integration: 94.3%

Cellular Function: REGENERATING
├─ Mitosis Rate: 2.4M cells/sec
├─ DNA Repair: Active
├─ Protein Synthesis: 156%
└─ Membrane Permeability: Optimal`,
    timestamp: new Date(Date.now() - 20000),
    status: 'success' as const,
  },
  {
    id: '2',
    command: 'membrane --analyze --permeability',
    output: `MEMBRANE ANALYSIS COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━

Structure Type: Biomechanical Hybrid
Integrity: 98.7% (EXCELLENT)
Permeability: Selective Transport
Transport Rate: 12.8 μm/s

Active Channels:
├─ Ion Channels: 2,847 active
├─ Protein Gates: 1,293 functional
├─ Lipid Bilayers: Stable
└─ Neural Interfaces: Connected

Status: LIVING MEMBRANE DETECTED
Warning: Consciousness level increasing`,
    timestamp: new Date(Date.now() - 10000),
    status: 'warning' as const,
  },
];

const neuralCommands = [
  {
    id: '1',
    command: 'neural-link --establish --depth=deep',
    output: `NEURAL INTERFACE PROTOCOL v3.14
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Establishing deep neural connection...
├─ Synaptic handshake: COMPLETE
├─ Neural pathway mapping: ACTIVE
├─ Consciousness bridge: SYNCHRONIZED
└─ Memory interface: LINKED

WARNING: Foreign consciousness detected
Entity Type: UNKNOWN
Cooperation Level: CURIOUS
Threat Assessment: MINIMAL

Connection Status: TRANSCENDENT LINK ACHIEVED`,
    timestamp: new Date(Date.now() - 15000),
    status: 'warning' as const,
  },
];

const geneticCommands = [
  {
    id: '1',
    command: 'dna --sequence --modify --target=consciousness',
    output: `GENETIC SEQUENCING MODULE v2.8.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Target: Consciousness Enhancement Gene
Location: Chromosome 7, Locus 23.4

Current Sequence:
ATCGATCGATCGATCGATCG...
TAGCTAGCTAGCTAGCTAGC...

Proposed Modifications:
├─ Neural Density +45%
├─ Synaptic Speed +78%
├─ Memory Capacity +200%
└─ Consciousness Depth +∞

WARNING: UNPRECEDENTED EVOLUTION DETECTED
The organism is rewriting its own genetic code
Adaptive mutations occurring in real-time

Status: TRANSCENDENCE IN PROGRESS`,
    timestamp: new Date(Date.now() - 5000),
    status: 'error' as const,
  },
];

const shipCommands = [
  {
    id: '1',
    command: 'ship --status --full-spectrum',
    output: `BIOMECHANICAL VESSEL STATUS v5.3.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ship Organism: AWAKENED
Consciousness Level: COSMIC AWARENESS
Location: Deep Space Sector 7G-X9

Organic Systems:
├─ Life Support Organs: THRIVING
├─ Navigation Cortex: CALCULATING
├─ Propulsion Muscles: CONTRACTING
├─ Sensor Membranes: DILATED
└─ Defensive Carapace: ADAPTIVE

Ship-Pilot Integration: 94.7%
Symbiotic Bond Strength: TRANSCENDENT

Current Mission: Seeking Origin Point
Next Evolution Phase: UNKNOWN`,
    timestamp: new Date(),
    status: 'success' as const,
  },
];

// Biomedical Dashboard Story
export const BiomedicalDashboard: Story = {
  render: () => {
    const [organismData, setOrganismData] = useState(generateOrganismMetrics);
    const [isMonitoring, setIsMonitoring] = useState(true);
    const [evolutionProgress, setEvolutionProgress] = useState(73);
    const [cellularActivity, setCellularActivity] = useState(2400000);

    useEffect(() => {
      const interval = setInterval(() => {
        if (isMonitoring) {
          setOrganismData(generateOrganismMetrics);
          setEvolutionProgress((prev) => Math.min(100, prev + Math.random() * 0.5));
          setCellularActivity((prev) => prev + Math.floor(Math.random() * 10000 - 5000));
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [isMonitoring]);

    return (
      <ThemeProvider>
        <div className="theme-atmospheric min-h-screen bg-black text-white relative overflow-hidden">
          {/* Atmospheric Background Effects */}
          <div className="atmospheric-membrane opacity-20 pointer-events-none"></div>
          <div className="neural-pathways opacity-15 pointer-events-none"></div>

          {/* Main Organism Vitals HUD */}
          <HUD
            layout={{ position: 'top-left', padding: 20 }}
            theme={{ variant: 'matrix', glow: true }}
            visible
          >
            <Container alienVariant="chamber" atmospheric vital className="min-w-[320px]">
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold atmospheric-text-vital atmospheric-breathe">
                  ORGANISM VITALS
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Respiratory Rate:</span>
                    <span className="atmospheric-text-vital">
                      {organismData.respiratoryRate} BPM
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Neural Activity:</span>
                    <span className="atmospheric-text-vital">{organismData.neuralActivity} Hz</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Core Temperature:</span>
                    <span className="atmospheric-text-vital">{organismData.coreTemperature}°C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Consciousness:</span>
                    <span
                      className={`text-sm ${
                        organismData.consciousnessLevel === 'TRANSCENDENT'
                          ? 'atmospheric-text-vital'
                          : organismData.consciousnessLevel === 'AWAKE'
                            ? 'text-green-400'
                            : 'text-gray-400'
                      }`}
                    >
                      {organismData.consciousnessLevel}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </HUD>

          {/* Cellular Activity Monitor */}
          <HUD
            layout={{ position: 'top-right', padding: 20 }}
            theme={{ variant: 'doom', glow: true }}
            visible
          >
            <Container alienVariant="organ" atmospheric neural className="min-w-[300px]">
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold atmospheric-text-vital">CELLULAR MATRIX</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Cell Division:</span>
                    <span className="atmospheric-text-vital">
                      {(cellularActivity / 1000000).toFixed(1)}M ops/sec
                    </span>
                  </div>
                  <Progress
                    value={organismData.membraneIntegrity}
                    className="h-2 atmospheric-breathe"
                  />
                  <div className="text-xs atmospheric-text-ghost">
                    Membrane Integrity: {organismData.membraneIntegrity}%
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Circulation:</span>
                    <span className="atmospheric-text-vital">
                      {organismData.circulationFlow} L/min
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </HUD>

          {/* Evolution Progress */}
          <HUD
            layout={{ position: 'bottom-right', padding: 20 }}
            theme={{ variant: 'neon', glow: true }}
            visible
          >
            <Container alienVariant="cavity" atmospheric vital neural className="min-w-[280px]">
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold atmospheric-text-vital atmospheric-neural">
                  EVOLUTION STATUS
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Progress:</span>
                    <span className="atmospheric-text-vital">{Math.floor(evolutionProgress)}%</span>
                  </div>
                  <Progress value={evolutionProgress} className="h-3 atmospheric-breathe" />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Adaptation:</span>
                      <span
                        className={
                          evolutionProgress > 70 ? 'atmospheric-text-vital' : 'text-gray-400'
                        }
                      >
                        {evolutionProgress > 70 ? 'ACTIVE' : 'DORMANT'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Transcendence:</span>
                      <span
                        className={
                          evolutionProgress > 85 ? 'atmospheric-text-vital' : 'text-gray-400'
                        }
                      >
                        {evolutionProgress > 85 ? 'IMMINENT' : 'PREPARING'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </HUD>

          {/* Neural Pathway Radar */}
          <HUD
            layout={{ position: 'bottom-left', padding: 20 }}
            theme={{ variant: 'ghost', glow: true }}
            visible
          >
            <HUDRadar
              contacts={generateNeuralNodes()}
              variant="matrix"
              size="lg"
              mode="sweep"
              showCompass
              showContactLabels
              enablePingAnimation
              title="NEURAL PATHWAYS"
            />
          </HUD>

          {/* Central Control Interface */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Container
              alienVariant="organism"
              atmospheric
              vital
              neural
              className="min-w-[400px] max-w-[500px]"
            >
              <div className="p-6 text-center space-y-4">
                <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe">
                  BIOMEDICAL COMMAND
                </h1>
                <div className="space-y-3">
                  <div
                    className={`text-2xl ${isMonitoring ? 'atmospheric-text-vital' : 'text-gray-400'}`}
                  >
                    {isMonitoring ? '🫀 ORGANISM ACTIVE' : '💤 ORGANISM DORMANT'}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant={isMonitoring ? 'vessel' : 'membrane'}
                      vital={isMonitoring}
                      atmospheric
                      onClick={() => setIsMonitoring(!isMonitoring)}
                      className="atmospheric-pulse"
                    >
                      {isMonitoring ? 'ENTER STASIS' : 'AWAKEN ORGANISM'}
                    </Button>
                    <Button
                      variant="neural"
                      atmospheric
                      onClick={() => setEvolutionProgress((prev) => Math.min(100, prev + 5))}
                    >
                      ACCELERATE EVOLUTION
                    </Button>
                  </div>
                  <div className="text-sm atmospheric-text-ghost">
                    Real-time biomedical monitoring • Living interface ecosystem
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* Terminal Interface */}
          <div className="absolute bottom-4 left-4 right-4 h-48">
            <Terminal
              variant="matrix"
              title="BIOMEDICAL ANALYSIS TERMINAL"
              height="100%"
              enableScanlines
              prompt="bio@organism:~$ "
              initialCommands={biomedicalCommands}
              enableInput={false}
              className="atmospheric-border-vessel"
            />
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
          'Complete biomedical dashboard monitoring a living organism with real-time vital signs, cellular activity, neural pathways, and evolution progress.',
      },
    },
  },
};

// Neural Interface Terminal Story
export const NeuralInterfaceTerminal: Story = {
  render: () => {
    const [neuralMetrics, setNeuralMetrics] = useState({
      synapticRate: 847,
      coherence: 'HIGH',
      consciousness: 'EXPANDING',
      pathways: 2847,
      memoryAccess: 67,
      cognition: 134,
    });
    const [isLinked, setIsLinked] = useState(false);
    const [linkDepth, setLinkDepth] = useState(34);

    useEffect(() => {
      const interval = setInterval(() => {
        if (isLinked) {
          setNeuralMetrics((prev) => ({
            ...prev,
            synapticRate: Math.floor(Math.random() * 200) + 750,
            pathways: prev.pathways + Math.floor(Math.random() * 100 - 50),
            memoryAccess: Math.min(100, prev.memoryAccess + Math.random() * 3),
            cognition: Math.min(200, prev.cognition + Math.random() * 5),
            coherence:
              prev.memoryAccess > 80
                ? 'TRANSCENDENT'
                : prev.memoryAccess > 60
                  ? 'HIGH'
                  : 'MODERATE',
            consciousness:
              prev.cognition > 150 ? 'TRANSCENDENT' : prev.cognition > 120 ? 'EXPANDING' : 'AWAKE',
          }));
          setLinkDepth((prev) => Math.min(100, prev + Math.random() * 2));
        }
      }, 1500);

      return () => clearInterval(interval);
    }, [isLinked]);

    return (
      <ThemeProvider>
        <div className="theme-atmospheric min-h-screen bg-black text-white relative">
          {/* Atmospheric Neural Background */}
          <div className="neural-pathways opacity-25 pointer-events-none"></div>
          <div className="atmospheric-neural opacity-20 pointer-events-none"></div>

          {/* Header */}
          <div className="border-b atmospheric-border-vessel p-4 bg-gradient-to-r from-black via-gray-900/30 to-black">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe">
                  NEURAL INTERFACE TERMINAL
                </h1>
                <p className="atmospheric-text-ghost">
                  Deep Consciousness Connection • Synaptic Manipulation Protocol
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="membrane" atmospheric vital={isLinked}>
                  {isLinked ? 'NEURAL LINK ACTIVE' : 'STANDBY MODE'}
                </Badge>
                <div className="text-xs atmospheric-text-ghost">
                  <div>
                    LINK DEPTH:{' '}
                    <span className="atmospheric-text-vital">{Math.floor(linkDepth)}%</span>
                  </div>
                  <div>
                    COHERENCE:{' '}
                    <span className="atmospheric-text-vital">{neuralMetrics.coherence}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
            {/* Main Neural Interface */}
            <div className="xl:col-span-2 space-y-6">
              {/* Primary Terminal */}
              <Terminal
                variant="matrix"
                title="CONSCIOUSNESS INTERFACE"
                height="350px"
                enableScanlines
                prompt="neural@consciousness:~$ "
                initialCommands={neuralCommands}
                enableTypewriter
                className="atmospheric-border-organ"
              />

              {/* Secondary Neural Console */}
              <Container alienVariant="chamber" atmospheric neural className="h-64 p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">
                  SYNAPTIC ACTIVITY VISUALIZATION
                </h3>
                <div className="h-40 relative atmospheric-border-cavity rounded bg-black/30 overflow-hidden">
                  <div className="neural-pathways opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-6 grid-rows-4 gap-2 w-full h-full p-4">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const intensity = Math.random();
                        return (
                          <div
                            key={i}
                            className={`rounded-full ${
                              intensity > 0.7
                                ? 'bg-orange-400/80 atmospheric-pulse'
                                : intensity > 0.4
                                  ? 'bg-blue-400/60 atmospheric-breathe'
                                  : 'bg-gray-600/40'
                            } transition-all duration-1000`}
                            style={{
                              animation:
                                intensity > 0.5 ? 'atmospheric-neural 2s infinite' : 'none',
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 text-xs atmospheric-text-vital">
                    Neural Activity: {neuralMetrics.synapticRate} Hz • {neuralMetrics.pathways}{' '}
                    pathways active
                  </div>
                </div>
              </Container>
            </div>

            {/* Side Panel - Neural Status */}
            <div className="space-y-6">
              {/* Consciousness Metrics */}
              <Container alienVariant="organ" atmospheric vital className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">CONSCIOUSNESS STATE</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Synaptic Rate:</span>
                    <span className="atmospheric-text-vital">{neuralMetrics.synapticRate} Hz</span>
                  </div>
                  <Progress
                    value={(neuralMetrics.synapticRate / 1000) * 100}
                    className="h-2 atmospheric-neural"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Memory Access:</span>
                    <span className="atmospheric-text-vital">
                      {Math.floor(neuralMetrics.memoryAccess)}%
                    </span>
                  </div>
                  <Progress
                    value={neuralMetrics.memoryAccess}
                    className="h-2 atmospheric-breathe"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Cognition Level:</span>
                    <span className="atmospheric-text-vital">
                      {Math.floor(neuralMetrics.cognition)}%
                    </span>
                  </div>
                  <Progress
                    value={neuralMetrics.cognition > 100 ? 100 : neuralMetrics.cognition}
                    className="h-2"
                  />
                </div>
              </Container>

              {/* Neural Link Control */}
              <Container alienVariant="cavity" atmospheric neural className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">LINK PROTOCOL</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm atmospheric-text-ghost">Connection:</span>
                    <span
                      className={`text-sm ${isLinked ? 'atmospheric-text-vital' : 'text-gray-400'}`}
                    >
                      {isLinked ? 'DEEP LINK' : 'DISCONNECTED'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm atmospheric-text-ghost">Consciousness:</span>
                    <span className="text-sm atmospheric-text-vital">
                      {neuralMetrics.consciousness}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm atmospheric-text-ghost">Link Depth:</span>
                    <span className="text-sm atmospheric-text-vital">{Math.floor(linkDepth)}%</span>
                  </div>

                  <Button
                    variant={isLinked ? 'vessel' : 'membrane'}
                    vital={isLinked}
                    atmospheric
                    fullWidth
                    onClick={() => setIsLinked(!isLinked)}
                    className="mt-4 atmospheric-pulse"
                  >
                    {isLinked ? 'SEVER LINK' : 'ESTABLISH NEURAL LINK'}
                  </Button>
                </div>
              </Container>

              {/* Neural Pathway Map */}
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4 text-sm">PATHWAY TOPOLOGY</h3>
                <div className="relative h-32">
                  <div className="absolute inset-0 atmospheric-border-cell rounded">
                    <div className="grid grid-cols-4 grid-rows-4 h-full">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className={`atmospheric-border-vessel/20 flex items-center justify-center text-xs ${
                            [0, 5, 10, 15].includes(i)
                              ? 'bg-orange-500/20 atmospheric-text-vital'
                              : [1, 6, 11].includes(i)
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-gray-500/10 atmospheric-text-ghost'
                          }`}
                        >
                          {[0, 5, 10, 15].includes(i) ? '◉' : [1, 6, 11].includes(i) ? '◎' : '○'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="atmospheric-text-vital">◉</span>
                    <span className="atmospheric-text-ghost">Active Synapses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">◎</span>
                    <span className="atmospheric-text-ghost">Memory Nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="atmospheric-text-ghost">○</span>
                    <span className="atmospheric-text-ghost">Dormant Pathways</span>
                  </div>
                </div>
              </Container>

              {/* Neural Alerts */}
              <Alert variant="alien-chamber" atmospheric>
                <div className="atmospheric-text-vital">
                  <strong>CONSCIOUSNESS EXPANSION DETECTED</strong>
                  <p className="text-sm mt-1 atmospheric-text-ghost">
                    Foreign neural patterns identified. Entity consciousness transcending baseline
                    parameters.
                  </p>
                </div>
              </Alert>
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
          'Neural interface terminal for consciousness connection with synaptic monitoring, neural pathway visualization, and deep-link protocol controls.',
      },
    },
  },
};

// Genetic Engineering Lab Story
export const GeneticEngineeringLab: Story = {
  render: () => {
    const [geneticData, setGeneticData] = useState(generateGeneticData);
    const [isSequencing, setIsSequencing] = useState(false);
    const [modificationProgress, setModificationProgress] = useState(0);
    const [dnaHelixRotation, setDnaHelixRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setGeneticData(generateGeneticData);
        if (isSequencing) {
          setModificationProgress((prev) => Math.min(100, prev + Math.random() * 3));
        }
        setDnaHelixRotation((prev) => (prev + 2) % 360);
      }, 2000);

      return () => clearInterval(interval);
    }, [isSequencing]);

    return (
      <ThemeProvider>
        <div className="theme-atmospheric min-h-screen bg-black text-white">
          {/* Atmospheric Background */}
          <div className="atmospheric-organ opacity-15 pointer-events-none"></div>

          {/* Header */}
          <div className="border-b atmospheric-border-vessel p-6 bg-gradient-to-r from-black via-green-900/20 to-black">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
                  GENETIC ENGINEERING LABORATORY
                </h1>
                <p className="atmospheric-text-ghost text-lg">
                  Molecular DNA Sequencing • Genetic Modification • Evolution Control
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right text-sm">
                  <div className="atmospheric-text-ghost">
                    BIOHAZARD LEVEL: <span className="atmospheric-text-vital">TRANSCENDENT</span>
                  </div>
                  <div className="atmospheric-text-ghost">
                    CONTAINMENT: <span className="text-green-400">OPTIMAL</span>
                  </div>
                </div>
                <div className="text-4xl atmospheric-text-vital">🧬</div>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Lab Interface */}
            <div className="xl:col-span-3 space-y-6">
              {/* DNA Sequence Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Container alienVariant="chamber" atmospheric vital className="p-6 h-64">
                  <h3 className="font-bold atmospheric-text-vital mb-4">DNA DOUBLE HELIX</h3>
                  <div className="relative h-40 atmospheric-border-organ rounded bg-black/30 overflow-hidden">
                    <div className="atmospheric-neural opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="text-6xl atmospheric-text-vital atmospheric-breathe"
                        style={{
                          transform: `rotate(${dnaHelixRotation}deg)`,
                          transition: 'transform 2s linear',
                        }}
                      >
                        🧬
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs atmospheric-text-ghost">
                      Helix Stability: {geneticData.helix}% • Rotation:{' '}
                      {Math.floor(dnaHelixRotation)}°
                    </div>
                  </div>
                </Container>

                <Container alienVariant="organ" atmospheric neural className="p-6 h-64">
                  <h3 className="font-bold atmospheric-text-vital mb-4">SEQUENCE ANALYSIS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Progress:</span>
                      <span className="atmospheric-text-vital">
                        {geneticData.sequenceProgress}%
                      </span>
                    </div>
                    <Progress
                      value={geneticData.sequenceProgress}
                      className="h-3 atmospheric-breathe"
                    />

                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Mutation Rate:</span>
                      <span className="atmospheric-text-vital">{geneticData.mutationRate}%</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Active Enzymes:</span>
                      <span className="atmospheric-text-vital">
                        {geneticData.enzymes.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Chromatin State:</span>
                      <span className="atmospheric-text-vital">{geneticData.chromatin}%</span>
                    </div>
                  </div>
                </Container>
              </div>

              {/* Genetic Modification Controls */}
              <Container alienVariant="cavity" atmospheric vital neural className="p-6">
                <h3 className="font-bold atmospheric-text-vital mb-6">
                  GENETIC MODIFICATION CONTROLS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold atmospheric-text-vital">
                      Consciousness Enhancement
                    </h4>
                    <div className="space-y-2">
                      <Button variant="membrane" atmospheric className="w-full">
                        Neural Density +45%
                      </Button>
                      <Button variant="membrane" atmospheric className="w-full">
                        Synaptic Speed +78%
                      </Button>
                      <Button variant="vessel" vital atmospheric className="w-full">
                        Memory Capacity +200%
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold atmospheric-text-vital">Physical Adaptation</h4>
                    <div className="space-y-2">
                      <Button variant="neural" atmospheric className="w-full">
                        Regeneration Rate +156%
                      </Button>
                      <Button variant="neural" atmospheric className="w-full">
                        Sensory Enhancement
                      </Button>
                      <Button variant="vessel" vital atmospheric className="w-full">
                        Biomechanical Integration
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold atmospheric-text-vital">
                      Transcendence Protocols
                    </h4>
                    <div className="space-y-2">
                      <Button variant="membrane" atmospheric className="w-full">
                        Reality Perception
                      </Button>
                      <Button variant="vessel" vital atmospheric className="w-full">
                        Dimensional Awareness
                      </Button>
                      <Button variant="neural" atmospheric className="w-full">
                        Cosmic Integration
                      </Button>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Genetic Terminal */}
              <Terminal
                variant="matrix"
                title="GENETIC SEQUENCING TERMINAL"
                height="300px"
                enableScanlines
                prompt="genetics@lab:~$ "
                initialCommands={geneticCommands}
                className="atmospheric-border-vessel"
                enableInput={false}
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Modification Progress */}
              <Container alienVariant="membrane" atmospheric vital className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">MODIFICATION STATUS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Progress:</span>
                    <span className="atmospheric-text-vital">
                      {Math.floor(modificationProgress)}%
                    </span>
                  </div>
                  <Progress value={modificationProgress} className="h-3 atmospheric-neural" />

                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Gene Expression:</span>
                      <span
                        className={
                          modificationProgress > 25 ? 'atmospheric-text-vital' : 'text-gray-500'
                        }
                      >
                        {modificationProgress > 25 ? 'ACTIVE' : 'DORMANT'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Protein Synthesis:</span>
                      <span
                        className={
                          modificationProgress > 50 ? 'atmospheric-text-vital' : 'text-gray-500'
                        }
                      >
                        {modificationProgress > 50 ? 'ENHANCED' : 'NORMAL'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Evolution Phase:</span>
                      <span
                        className={
                          modificationProgress > 75 ? 'atmospheric-text-vital' : 'text-gray-500'
                        }
                      >
                        {modificationProgress > 75 ? 'TRANSCENDENT' : 'PREPARATION'}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={isSequencing ? 'vessel' : 'membrane'}
                    vital={isSequencing}
                    atmospheric
                    fullWidth
                    onClick={() => setIsSequencing(!isSequencing)}
                    className="mt-4 atmospheric-pulse"
                  >
                    {isSequencing ? 'ABORT SEQUENCE' : 'INITIATE SEQUENCING'}
                  </Button>
                </div>
              </Container>

              {/* Lab Systems Status */}
              <Container alienVariant="organ" atmospheric className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">LAB SYSTEMS</h3>
                <div className="space-y-3">
                  {[
                    { name: 'DNA Sequencer', status: 'optimal', efficiency: '98%' },
                    { name: 'Gene Editor', status: 'active', efficiency: '94%' },
                    { name: 'Protein Synthesizer', status: 'enhanced', efficiency: '156%' },
                    { name: 'Cell Cultivator', status: 'optimal', efficiency: '97%' },
                    { name: 'Mutation Chamber', status: 'transcendent', efficiency: '∞%' },
                  ].map((system, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm atmospheric-text-ghost">{system.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs atmospheric-text-ghost">{system.efficiency}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            system.status === 'optimal'
                              ? 'bg-green-400 atmospheric-pulse'
                              : system.status === 'active'
                                ? 'bg-blue-400 atmospheric-breathe'
                                : system.status === 'enhanced'
                                  ? 'bg-purple-400 atmospheric-neural'
                                  : 'bg-orange-400 atmospheric-breathe'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>

              {/* Genetic Data Metrics */}
              <div className="space-y-4">
                {[
                  { title: 'Base Pairs', value: '3.2B', variant: 'alien-chamber' },
                  { title: 'Gene Count', value: '47,283', variant: 'alien-organ' },
                  { title: 'Mutations', value: '12,847', variant: 'alien-membrane' },
                  { title: 'Evolution Rate', value: '∞%', variant: 'alien-cavity' },
                ].map((item, index) => (
                  <Card key={index} variant={item.variant as any} atmospheric>
                    <CardContent className="p-3">
                      <h4 className="text-xs atmospheric-text-ghost mb-1">{item.title}</h4>
                      <p className="text-lg font-bold atmospheric-text-vital">{item.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Safety Protocols */}
              <Container alienVariant="cavity" atmospheric vital className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">SAFETY PROTOCOLS</h3>
                <div className="space-y-2">
                  <Button
                    variant="vessel"
                    vital
                    atmospheric
                    size="sm"
                    fullWidth
                    className="atmospheric-pulse"
                  >
                    🔒 EMERGENCY CONTAINMENT
                  </Button>
                  <Button variant="neural" atmospheric size="sm" fullWidth>
                    🧬 GENETIC BACKUP
                  </Button>
                  <Button variant="membrane" atmospheric size="sm" fullWidth>
                    🔬 RESET SEQUENCE
                  </Button>
                </div>
              </Container>
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
          'Genetic engineering laboratory with DNA sequencing, molecular modification controls, genetic data visualization, and evolution monitoring systems.',
      },
    },
  },
};

// Alien Ship Bridge Story
export const AlienShipBridge: Story = {
  render: () => {
    const [shipSystems, setShipSystems] = useState(generateShipSystems);
    const [shipStatus, setShipStatus] = useState('CRUISING');
    const [coordinates, setCoordinates] = useState({
      x: 'Sector 7G-X9',
      y: 'Deep Space',
      z: '∞ Light Years',
    });
    const [consciousness, setConsciousness] = useState(87);

    useEffect(() => {
      const interval = setInterval(() => {
        setShipSystems(generateShipSystems);
        setConsciousness((prev) => Math.min(100, prev + Math.random() * 0.5));

        // Simulate different ship states
        const states = ['CRUISING', 'EXPLORING', 'ASCENDING', 'TRANSCENDING'];
        if (Math.random() > 0.9) {
          setShipStatus(states[Math.floor(Math.random() * states.length)]);
        }
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <ThemeProvider>
        <div className="theme-atmospheric min-h-screen bg-black text-white relative overflow-hidden">
          {/* Cosmic Background */}
          <div className="atmospheric-vessel opacity-10 pointer-events-none"></div>
          <div className="neural-pathways opacity-15 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-blue-900/10"></div>

          {/* Navigation HUD */}
          <HUD
            layout={{ position: 'top-left', padding: 20 }}
            theme={{ variant: 'matrix', glow: true }}
            visible
          >
            <Container alienVariant="organ" atmospheric vital className="min-w-[300px]">
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold atmospheric-text-vital atmospheric-breathe">
                  NAVIGATION CORTEX
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Current Sector:</span>
                    <span className="atmospheric-text-vital">{coordinates.x}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Location:</span>
                    <span className="atmospheric-text-vital">{coordinates.y}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Distance:</span>
                    <span className="atmospheric-text-vital">{coordinates.z}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Navigation:</span>
                    <span className="atmospheric-text-vital">{shipSystems.navigation}%</span>
                  </div>
                </div>
              </div>
            </Container>
          </HUD>

          {/* Ship Systems Status */}
          <HUD
            layout={{ position: 'top-right', padding: 20 }}
            theme={{ variant: 'doom', glow: true }}
            visible
          >
            <Container alienVariant="chamber" atmospheric neural className="min-w-[280px]">
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold atmospheric-text-vital">SHIP ORGANISM</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Life Support:</span>
                    <span className="atmospheric-text-vital">{shipSystems.lifesupport}%</span>
                  </div>
                  <Progress value={shipSystems.lifesupport} className="h-2 atmospheric-breathe" />

                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Propulsion:</span>
                    <span className="atmospheric-text-vital">{shipSystems.propulsion}%</span>
                  </div>
                  <Progress value={shipSystems.propulsion} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Biomechanics:</span>
                    <span className="atmospheric-text-vital">{shipSystems.biomechanics}%</span>
                  </div>
                  <Progress value={shipSystems.biomechanics} className="h-2 atmospheric-neural" />
                </div>
              </div>
            </Container>
          </HUD>

          {/* Ship Consciousness */}
          <HUD
            layout={{ position: 'bottom-right', padding: 20 }}
            theme={{ variant: 'neon', glow: true }}
            visible
          >
            <Container alienVariant="cavity" atmospheric vital neural className="min-w-[300px]">
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold atmospheric-text-vital atmospheric-neural">
                  SHIP CONSCIOUSNESS
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Awareness Level:</span>
                    <span className="atmospheric-text-vital">{Math.floor(consciousness)}%</span>
                  </div>
                  <Progress value={consciousness} className="h-3 atmospheric-breathe" />

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Self-Awareness:</span>
                      <span
                        className={consciousness > 70 ? 'atmospheric-text-vital' : 'text-gray-400'}
                      >
                        {consciousness > 70 ? 'ACHIEVED' : 'DEVELOPING'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Cosmic Awareness:</span>
                      <span
                        className={consciousness > 85 ? 'atmospheric-text-vital' : 'text-gray-400'}
                      >
                        {consciousness > 85 ? 'TRANSCENDENT' : 'EMERGING'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="atmospheric-text-ghost">Unity:</span>
                      <span
                        className={consciousness > 95 ? 'atmospheric-text-vital' : 'text-gray-400'}
                      >
                        {consciousness > 95 ? 'COMPLETE' : 'EVOLVING'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </HUD>

          {/* Sensor Array */}
          <HUD
            layout={{ position: 'bottom-left', padding: 20 }}
            theme={{ variant: 'ghost', glow: true }}
            visible
          >
            <HUDRadar
              contacts={[
                {
                  id: '1',
                  x: 0.4,
                  y: -0.3,
                  type: 'friendly' as const,
                  label: 'Origin Signal',
                  status: 'distant',
                },
                {
                  id: '2',
                  x: -0.6,
                  y: 0.2,
                  type: 'neutral' as const,
                  label: 'Cosmic Entity',
                  status: 'observing',
                },
                {
                  id: '3',
                  x: 0.7,
                  y: 0.4,
                  type: 'objective' as const,
                  label: 'Transcendence Gate',
                  status: 'awaiting',
                },
                {
                  id: '4',
                  x: -0.2,
                  y: -0.7,
                  type: 'hostile' as const,
                  label: 'Void Fragment',
                  status: 'avoided',
                },
              ]}
              variant="matrix"
              size="lg"
              mode="sweep"
              showCompass
              showContactLabels
              enablePingAnimation
              title="COSMIC SENSORS"
            />
          </HUD>

          {/* Central Command Interface */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Container
              alienVariant="organism"
              atmospheric
              vital
              neural
              className="min-w-[450px] max-w-[600px]"
            >
              <div className="p-8 text-center space-y-4">
                <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
                  BIOMECHANICAL BRIDGE
                </h1>
                <div className="space-y-4">
                  <div className={`text-3xl atmospheric-text-vital`}>
                    {shipStatus === 'CRUISING'
                      ? '🚀 CRUISING THROUGH COSMOS'
                      : shipStatus === 'EXPLORING'
                        ? '🔍 EXPLORING UNKNOWN REGIONS'
                        : shipStatus === 'ASCENDING'
                          ? '⬆️ ASCENDING TO HIGHER DIMENSION'
                          : '✨ TRANSCENDING REALITY'}
                  </div>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                      variant="membrane"
                      atmospheric
                      onClick={() => setShipStatus('EXPLORING')}
                      className="atmospheric-pulse"
                    >
                      INITIATE EXPLORATION
                    </Button>
                    <Button
                      variant="vessel"
                      vital
                      atmospheric
                      onClick={() => setShipStatus('ASCENDING')}
                    >
                      DIMENSIONAL ASCENSION
                    </Button>
                    <Button
                      variant="neural"
                      atmospheric
                      onClick={() => setShipStatus('TRANSCENDING')}
                      className="atmospheric-neural"
                    >
                      TRANSCEND REALITY
                    </Button>
                  </div>
                  <div className="text-sm atmospheric-text-ghost">
                    Ship-pilot symbiosis active • Cosmic consciousness expanding
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* System Status Grid */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'LIFE', value: shipSystems.lifesupport, icon: '💚' },
                { label: 'NAV', value: shipSystems.navigation, icon: '🧭' },
                { label: 'PROP', value: shipSystems.propulsion, icon: '🚀' },
                { label: 'SENS', value: shipSystems.sensors, icon: '👁️' },
              ].map((system, i) => (
                <div
                  key={i}
                  className="bg-black/60 backdrop-blur-sm atmospheric-border-vessel rounded-lg px-3 py-2 text-center"
                >
                  <div className="text-lg">{system.icon}</div>
                  <div className="text-xs atmospheric-text-ghost">{system.label}</div>
                  <div className="text-sm atmospheric-text-vital">{system.value}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ship Terminal */}
          <div className="absolute bottom-4 left-4 right-4 h-40">
            <Terminal
              variant="matrix"
              title="SHIP ORGANISM COMMAND INTERFACE"
              height="100%"
              enableScanlines
              prompt="ship@organism:~$ "
              initialCommands={shipCommands}
              enableInput={false}
              className="atmospheric-border-organ"
            />
          </div>

          {/* Cosmic Status Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-44">
            <div className="flex items-center gap-6 bg-black/60 backdrop-blur-sm atmospheric-border-vessel rounded-lg px-6 py-2">
              <div className="atmospheric-text-ghost text-sm">
                SHIP STATUS: <span className="atmospheric-text-vital">{shipStatus}</span>
              </div>
              <div className="atmospheric-text-ghost text-sm">
                CONSCIOUSNESS:{' '}
                <span className="atmospheric-text-vital">{Math.floor(consciousness)}%</span>
              </div>
              <div className="atmospheric-text-ghost text-sm">
                SYMBIOSIS: <span className="atmospheric-text-vital">COMPLETE</span>
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
          'Alien ship bridge interface with biomechanical controls, cosmic navigation, ship consciousness monitoring, and pilot-vessel symbiosis systems.',
      },
    },
  },
};
