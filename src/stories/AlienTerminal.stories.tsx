import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Terminal } from '../components/Terminal/Terminal';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { Button } from '../components/Button/Button';
import { Progress } from '../components/Progress/Progress';
import { Badge } from '../components/Badge/Badge';

const meta: Meta = {
  title: 'Themes/Alien/Terminal',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Alien biomechanical terminal interfaces with consciousness connection protocols and organic command systems.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Biomechanical terminal placeholder component
const BiomechanicalTerminal = ({
  variant = 'chamber',
  title = 'BIOMECHANICAL INTERFACE',
  consciousness = false,
  neural = false,
}: {
  variant?: string;
  title?: string;
  consciousness?: boolean;
  neural?: boolean;
}) => {
  const [pulseRate, setPulseRate] = useState(72);
  const [synapticActivity, setSynapticActivity] = useState(847);
  const [membraneIntegrity, setMembraneIntegrity] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      if (consciousness) {
        setPulseRate((prev) => Math.max(60, Math.min(120, prev + (Math.random() - 0.5) * 8)));
        setSynapticActivity((prev) =>
          Math.max(400, Math.min(1200, prev + (Math.random() - 0.5) * 100)),
        );
        setMembraneIntegrity((prev) =>
          Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 3)),
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [consciousness]);

  return (
    <div
      className={`
      bg-gradient-to-br from-black via-gray-900/30 to-black
      atmospheric-border-${
        variant === 'chamber'
          ? 'vessel'
          : variant === 'organ'
            ? 'organ'
            : variant === 'membrane'
              ? 'cell'
              : 'cavity'
      }
      rounded-lg p-6 font-mono text-sm
      ${consciousness ? 'atmospheric-breathe' : ''}
      ${neural ? 'atmospheric-neural' : ''}
      min-h-[400px] relative overflow-hidden
    `}
    >
      {/* Background Effects */}
      {consciousness && <div className="atmospheric-membrane opacity-20 pointer-events-none" />}
      {neural && <div className="neural-pathways opacity-15 pointer-events-none" />}

      {/* Terminal Header */}
      <div className="flex items-center justify-between atmospheric-border-vessel border-b pb-3 mb-4">
        <h3 className="atmospheric-text-vital font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${consciousness ? 'bg-green-400 atmospheric-pulse' : 'bg-gray-600'}`}
          />
          <div
            className={`w-3 h-3 rounded-full ${neural ? 'bg-blue-400 atmospheric-neural' : 'bg-gray-600'}`}
          />
          <div
            className={`w-3 h-3 rounded-full ${membraneIntegrity > 95 ? 'bg-orange-400' : 'bg-gray-600'}`}
          />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-3 atmospheric-text-vital">
        <div className="text-xs atmospheric-text-ghost">
          $ biomech-init --variant={variant} {consciousness ? '--consciousness' : ''}{' '}
          {neural ? '--neural-link' : ''}
        </div>

        <div className="space-y-1">
          <div>Initializing {variant} bio-interface...</div>
          <div>Loading organic protocols...</div>
          <div>Establishing membrane connections...</div>
          {consciousness && <div>🧠 Consciousness bridge: ACTIVE</div>}
          {neural && <div>⚡ Neural pathways: SYNCHRONIZED</div>}
          <div>System ready.</div>
        </div>

        {consciousness && (
          <div className="mt-4 space-y-2">
            <div className="text-xs atmospheric-text-ghost">VITAL SIGNS MONITOR:</div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="atmospheric-text-ghost">Pulse Rate:</span>
                <span className="atmospheric-text-vital ml-2">{Math.floor(pulseRate)} BPM</span>
              </div>
              <div>
                <span className="atmospheric-text-ghost">Synaptic:</span>
                <span className="atmospheric-text-vital ml-2">
                  {Math.floor(synapticActivity)} Hz
                </span>
              </div>
              <div>
                <span className="atmospheric-text-ghost">Membrane:</span>
                <span className="atmospheric-text-vital ml-2">
                  {Math.floor(membraneIntegrity)}%
                </span>
              </div>
              <div>
                <span className="atmospheric-text-ghost">Status:</span>
                <span className="atmospheric-text-vital ml-2">
                  {consciousness && neural
                    ? 'TRANSCENDENT'
                    : consciousness
                      ? 'AWAKENED'
                      : 'DORMANT'}
                </span>
              </div>
            </div>
          </div>
        )}

        {neural && (
          <div className="mt-4 space-y-2">
            <div className="text-xs atmospheric-text-ghost">NEURAL NETWORK STATUS:</div>
            <div className="grid grid-cols-4 grid-rows-3 gap-1">
              {Array.from({ length: 12 }).map((_, i) => {
                const isActive = consciousness && Math.random() < 0.7;
                return (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border atmospheric-border-vessel ${
                      isActive ? 'bg-blue-400/50 atmospheric-pulse' : 'bg-gray-600/30'
                    }`}
                  />
                );
              })}
            </div>
            <div className="text-xs atmospheric-text-ghost">
              Active nodes: {consciousness ? Math.floor(12 * 0.7) : 0}/12
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 atmospheric-border-vessel border-t">
          <div className="flex items-center">
            <span className="atmospheric-text-ghost">bio@{variant}:~$ </span>
            <span className="atmospheric-text-vital ml-2 animate-pulse">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BioChamberTerminal: Story = {
  render: () => (
    <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
            Bio-Chamber Terminal
          </h1>
          <p className="text-lg atmospheric-text-ghost">
            Deep organ chamber interface for biological system monitoring and control
          </p>
        </div>

        {/* Terminal */}
        <BiomechanicalTerminal
          variant="chamber"
          title="BIO-CHAMBER INTERFACE v4.7.2"
          consciousness={true}
          neural={false}
        />

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="alien-chamber" atmospheric>
            <CardHeader>
              <CardTitle>Chamber Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="atmospheric-text-ghost">Type:</span>
                  <span className="atmospheric-text-vital">Deep Organ Chamber</span>
                </div>
                <div className="flex justify-between">
                  <span className="atmospheric-text-ghost">Capacity:</span>
                  <span className="atmospheric-text-vital">Single Organism</span>
                </div>
                <div className="flex justify-between">
                  <span className="atmospheric-text-ghost">Life Support:</span>
                  <span className="atmospheric-text-vital">Full Integration</span>
                </div>
                <div className="flex justify-between">
                  <span className="atmospheric-text-ghost">Interface:</span>
                  <span className="atmospheric-text-vital">Biomechanical</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="alien-chamber" atmospheric>
            <CardHeader>
              <CardTitle>Chamber Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>🫁 Respiratory monitoring and control</div>
                <div>🫀 Circulatory system integration</div>
                <div>🧬 Cellular regeneration processes</div>
                <div>🔬 Biochemical analysis and adjustment</div>
                <div>⚡ Neural interface connectivity</div>
                <div>🛡️ Protective membrane management</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

export const ConsciousnessTerminal: Story = {
  render: () => {
    const [consciousnessLevel, setConsciousnessLevel] = useState(78);
    const [neuralConnected, setNeuralConnected] = useState(false);
    const [linkDepth, setLinkDepth] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if (neuralConnected) {
          setConsciousnessLevel((prev) => Math.min(100, prev + Math.random() * 2));
          setLinkDepth((prev) => Math.min(100, prev + Math.random() * 3));
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [neuralConnected]);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        {/* Background Effects */}
        <div className="neural-pathways opacity-20 pointer-events-none" />
        <div className="atmospheric-neural opacity-15 pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-neural">
              Consciousness Interface Terminal
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Deep neural connection protocols for consciousness bridging and synaptic manipulation
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="xl:col-span-1 space-y-6">
              <Container alienVariant="organ" atmospheric neural={neuralConnected} className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">CONSCIOUSNESS CONTROL</h3>
                <div className="space-y-4">
                  <Button
                    variant={neuralConnected ? 'neural' : 'membrane'}
                    atmospheric
                    fullWidth
                    onClick={() => setNeuralConnected(!neuralConnected)}
                    className={neuralConnected ? 'atmospheric-neural' : ''}
                  >
                    {neuralConnected ? 'NEURAL LINK ACTIVE' : 'ESTABLISH NEURAL LINK'}
                  </Button>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Consciousness:</span>
                      <span className="atmospheric-text-vital">
                        {Math.floor(consciousnessLevel)}%
                      </span>
                    </div>
                    <Progress value={consciousnessLevel} className="h-2 atmospheric-neural" />

                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Link Depth:</span>
                      <span className="atmospheric-text-vital">{Math.floor(linkDepth)}%</span>
                    </div>
                    <Progress value={linkDepth} className="h-2 atmospheric-breathe" />
                  </div>

                  <Badge
                    variant="neural"
                    atmospheric
                    className={neuralConnected ? 'atmospheric-pulse' : ''}
                  >
                    {neuralConnected ? 'CONSCIOUS ENTITY DETECTED' : 'NO CONSCIOUSNESS DETECTED'}
                  </Badge>
                </div>
              </Container>

              <Card variant="alien-cavity" atmospheric neural={neuralConnected}>
                <CardHeader>
                  <CardTitle className="text-sm">Neural Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Synaptic Rate:</span>
                      <span className="atmospheric-text-vital">
                        {neuralConnected
                          ? `${Math.floor(600 + consciousnessLevel * 4)} Hz`
                          : '0 Hz'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Access:</span>
                      <span className="atmospheric-text-vital">
                        {neuralConnected ? `${Math.floor(linkDepth * 0.8)}%` : 'DENIED'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coherence:</span>
                      <span className="atmospheric-text-vital">
                        {neuralConnected ? (consciousnessLevel > 85 ? 'HIGH' : 'MODERATE') : 'NONE'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Terminal */}
            <div className="xl:col-span-2 space-y-6">
              <BiomechanicalTerminal
                variant="neural"
                title="CONSCIOUSNESS BRIDGE PROTOCOL v3.14"
                consciousness={neuralConnected}
                neural={neuralConnected}
              />

              {/* Consciousness Visualization */}
              <Container alienVariant="cavity" atmospheric neural={neuralConnected} className="p-6">
                <h3 className="font-bold atmospheric-text-vital mb-4">
                  CONSCIOUSNESS VISUALIZATION
                </h3>
                <div className="h-40 relative atmospheric-border-organ rounded bg-black/30 overflow-hidden">
                  {neuralConnected && (
                    <>
                      <div className="neural-pathways opacity-30" />
                      <div className="atmospheric-neural opacity-20" />
                    </>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`text-6xl transition-all duration-1000 ${
                        neuralConnected
                          ? 'atmospheric-text-vital atmospheric-neural'
                          : 'text-gray-600'
                      }`}
                      style={{
                        transform: `scale(${neuralConnected ? 1 + consciousnessLevel / 500 : 0.8})`,
                        filter: `drop-shadow(0 0 ${consciousnessLevel / 2}px rgba(139, 69, 19, 0.8))`,
                      }}
                    >
                      {consciousnessLevel > 90
                        ? '🧠✨'
                        : consciousnessLevel > 70
                          ? '🧠⚡'
                          : consciousnessLevel > 50
                            ? '🧠💭'
                            : neuralConnected
                              ? '🧠🔗'
                              : '🧠💤'}
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 text-xs atmospheric-text-ghost">
                    Entity Status:{' '}
                    {consciousnessLevel > 90
                      ? 'TRANSCENDENT'
                      : consciousnessLevel > 70
                        ? 'AWAKENED'
                        : consciousnessLevel > 50
                          ? 'CONSCIOUS'
                          : neuralConnected
                            ? 'LINKING'
                            : 'DORMANT'}
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const OrganicCommandInterface: Story = {
  render: () => {
    const [activeCommands, setActiveCommands] = useState<string[]>([]);
    const [systemStatus, setSystemStatus] = useState('INITIALIZING');

    const executeCommand = (command: string) => {
      setActiveCommands((prev) => [...prev, command].slice(-5)); // Keep last 5 commands

      // Simulate system state changes
      if (command.includes('membrane')) {
        setSystemStatus('MEMBRANE_ACTIVE');
      } else if (command.includes('neural')) {
        setSystemStatus('NEURAL_LINKED');
      } else if (command.includes('organism')) {
        setSystemStatus('ORGANISM_AWAKENED');
      }
    };

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        <div className="atmospheric-organ opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Organic Command Interface
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Biomechanical system control through organic command protocols and membrane interfaces
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Command Palette */}
            <div className="xl:col-span-1 space-y-6">
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">COMMAND PALETTE</h3>
                <div className="space-y-2">
                  {[
                    { cmd: 'membrane --scan', desc: 'Scan membrane systems' },
                    { cmd: 'neural --establish', desc: 'Establish neural link' },
                    { cmd: 'organism --awaken', desc: 'Awaken organism' },
                    { cmd: 'vital --monitor', desc: 'Monitor vital signs' },
                    { cmd: 'evolve --initiate', desc: 'Begin evolution' },
                  ].map((item, index) => (
                    <Button
                      key={index}
                      variant="membrane"
                      atmospheric
                      size="sm"
                      fullWidth
                      onClick={() => executeCommand(item.cmd)}
                      className="text-left justify-start"
                    >
                      <div>
                        <div className="text-xs atmospheric-text-vital font-mono">{item.cmd}</div>
                        <div className="text-xs atmospheric-text-ghost">{item.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </Container>

              <Card variant="alien-organ" atmospheric>
                <CardHeader>
                  <CardTitle className="text-sm">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-center">
                      <div
                        className={`text-2xl ${
                          systemStatus === 'ORGANISM_AWAKENED'
                            ? 'atmospheric-text-vital atmospheric-pulse'
                            : systemStatus === 'NEURAL_LINKED'
                              ? 'atmospheric-text-vital atmospheric-neural'
                              : systemStatus === 'MEMBRANE_ACTIVE'
                                ? 'atmospheric-text-vital atmospheric-breathe'
                                : 'text-gray-500'
                        }`}
                      >
                        {systemStatus === 'ORGANISM_AWAKENED'
                          ? '👁️'
                          : systemStatus === 'NEURAL_LINKED'
                            ? '🧠'
                            : systemStatus === 'MEMBRANE_ACTIVE'
                              ? '🧬'
                              : '💤'}
                      </div>
                      <div className="text-xs atmospheric-text-vital mt-1">{systemStatus}</div>
                    </div>

                    <div className="text-xs atmospheric-text-ghost">
                      Last {activeCommands.length} commands executed
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Terminal Grid */}
            <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Primary Terminal */}
              <div className="lg:col-span-2">
                <BiomechanicalTerminal
                  variant="organ"
                  title="ORGANIC COMMAND INTERFACE v5.2.1"
                  consciousness={systemStatus !== 'INITIALIZING'}
                  neural={systemStatus === 'NEURAL_LINKED' || systemStatus === 'ORGANISM_AWAKENED'}
                />
              </div>

              {/* Membrane Interface */}
              <Card variant="alien-membrane" atmospheric>
                <CardHeader>
                  <CardTitle>Membrane Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-24 atmospheric-border-cell rounded bg-black/30 relative overflow-hidden">
                      {systemStatus.includes('MEMBRANE') && (
                        <div className="atmospheric-membrane opacity-40" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`text-3xl ${
                            systemStatus.includes('MEMBRANE')
                              ? 'atmospheric-text-vital atmospheric-breathe'
                              : 'text-gray-600'
                          }`}
                        >
                          🫧
                        </div>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Permeability:</span>
                        <span className="atmospheric-text-vital">
                          {systemStatus.includes('MEMBRANE') ? 'SELECTIVE' : 'SEALED'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Integrity:</span>
                        <span className="atmospheric-text-vital">
                          {systemStatus.includes('MEMBRANE') ? '98.7%' : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Neural Interface */}
              <Card variant="alien-cavity" atmospheric neural={systemStatus.includes('NEURAL')}>
                <CardHeader>
                  <CardTitle>Neural Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-24 atmospheric-border-organ rounded bg-black/30 relative overflow-hidden">
                      {systemStatus.includes('NEURAL') && (
                        <div className="neural-pathways opacity-40" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`text-3xl ${
                            systemStatus.includes('NEURAL')
                              ? 'atmospheric-text-vital atmospheric-neural'
                              : 'text-gray-600'
                          }`}
                        >
                          ⚡
                        </div>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Connection:</span>
                        <span className="atmospheric-text-vital">
                          {systemStatus.includes('NEURAL') ? 'ESTABLISHED' : 'SEVERED'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Bandwidth:</span>
                        <span className="atmospheric-text-vital">
                          {systemStatus.includes('NEURAL') ? '847 Hz' : '0 Hz'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Command History */}
          <Container alienVariant="cavity" atmospheric className="p-4">
            <h3 className="font-bold atmospheric-text-vital mb-3">COMMAND HISTORY</h3>
            <div className="space-y-1 font-mono text-sm">
              {activeCommands.length === 0 ? (
                <div className="atmospheric-text-ghost">No commands executed yet...</div>
              ) : (
                activeCommands.map((cmd, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="atmospheric-text-ghost">$</span>
                    <span className="atmospheric-text-vital">{cmd}</span>
                    <span className="atmospheric-text-ghost text-xs">✓ EXECUTED</span>
                  </div>
                ))
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  },
};

export const AllTerminals: Story = {
  render: () => (
    <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
      <div className="atmospheric-vessel opacity-10 pointer-events-none" />
      <div className="neural-pathways opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
            All Biomechanical Terminals
          </h1>
          <p className="text-lg atmospheric-text-ghost">
            Complete showcase of all alien terminal variants and interface types
          </p>
        </div>

        {/* Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bio-Chamber Terminal */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Bio-Chamber Interface</h2>
            <BiomechanicalTerminal
              variant="chamber"
              title="BIO-CHAMBER v4.7.2"
              consciousness={true}
              neural={false}
            />
          </div>

          {/* Neural Terminal */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Neural Interface</h2>
            <BiomechanicalTerminal
              variant="neural"
              title="NEURAL-LINK v3.14"
              consciousness={true}
              neural={true}
            />
          </div>

          {/* Membrane Terminal */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Membrane Interface</h2>
            <BiomechanicalTerminal
              variant="membrane"
              title="MEMBRANE-CTRL v2.8"
              consciousness={false}
              neural={false}
            />
          </div>

          {/* Organism Terminal */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Organism Interface</h2>
            <BiomechanicalTerminal
              variant="organism"
              title="ORGANISM-SYS v6.1"
              consciousness={true}
              neural={true}
            />
          </div>
        </div>

        {/* Terminal Comparison */}
        <Container alienVariant="cavity" atmospheric vital neural className="p-6">
          <h2 className="text-xl font-bold atmospheric-text-vital mb-6">
            Terminal Comparison Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="atmospheric-border-vessel border-b">
                  <th className="text-left p-3 atmospheric-text-vital">Terminal Type</th>
                  <th className="text-left p-3 atmospheric-text-vital">Consciousness</th>
                  <th className="text-left p-3 atmospheric-text-vital">Neural Link</th>
                  <th className="text-left p-3 atmospheric-text-vital">Primary Function</th>
                  <th className="text-left p-3 atmospheric-text-vital">Complexity</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {[
                  {
                    type: 'Bio-Chamber',
                    consciousness: '✓',
                    neural: '○',
                    function: 'Life support monitoring',
                    complexity: 'Medium',
                  },
                  {
                    type: 'Neural Interface',
                    consciousness: '✓',
                    neural: '✓',
                    function: 'Consciousness bridging',
                    complexity: 'High',
                  },
                  {
                    type: 'Membrane',
                    consciousness: '○',
                    neural: '○',
                    function: 'Barrier control',
                    complexity: 'Low',
                  },
                  {
                    type: 'Organism',
                    consciousness: '✓',
                    neural: '✓',
                    function: 'Complete integration',
                    complexity: 'Maximum',
                  },
                ].map((row, index) => (
                  <tr key={index} className="atmospheric-border-vessel/30 border-b">
                    <td className="p-3 atmospheric-text-vital font-semibold">{row.type}</td>
                    <td className="p-3 atmospheric-text-ghost">{row.consciousness}</td>
                    <td className="p-3 atmospheric-text-ghost">{row.neural}</td>
                    <td className="p-3 atmospheric-text-ghost">{row.function}</td>
                    <td className="p-3 atmospheric-text-ghost">{row.complexity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </div>
    </div>
  ),
};
