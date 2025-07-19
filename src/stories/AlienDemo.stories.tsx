import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { Progress } from '../components/Progress/Progress';
import { Badge } from '../components/Badge/Badge';
import { Alert } from '../components/Alert/Alert';
import { Terminal } from '../components/Terminal/Terminal';
import { HUD, HUDPanel, HUDMetric, HUDRadar } from '../components/HUD/HUD';

const meta: Meta = {
  title: 'Alien/Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Alien biomechanical theme showcase demonstrating all alien variants, effects, and real-time interactive features.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Real-time data generators for alien systems
const generateOrganismData = () => ({
  consciousness: Math.floor(Math.random() * 30) + 70, // 70-100%
  biointegration: Math.floor(Math.random() * 25) + 75, // 75-100%
  neuralActivity: Math.floor(Math.random() * 200) + 800, // 800-1000 Hz
  membraneIntegrity: Math.floor(Math.random() * 15) + 85, // 85-100%
  atmosphericPressure: (Math.random() * 0.5 + 1.0).toFixed(2), // 1.0-1.5 ATM
  vitalSigns: Math.random() > 0.8 ? 'TRANSCENDENT' : Math.random() > 0.4 ? 'OPTIMAL' : 'STABLE',
});

const generateAlienContacts = () => [
  { id: '1', x: 0.3, y: -0.2, type: 'friendly' as const, label: 'Bio-Scanner', status: 'scanning' },
  { id: '2', x: -0.4, y: 0.3, type: 'neutral' as const, label: 'Membrane', status: 'permeable' },
  { id: '3', x: 0.6, y: 0.2, type: 'objective' as const, label: 'Neural Node', status: 'active' },
  { id: '4', x: -0.3, y: -0.5, type: 'hostile' as const, label: 'Toxin', status: 'contained' },
  { id: '5', x: 0.1, y: 0.7, type: 'friendly' as const, label: 'Symbiont', status: 'bonding' },
];

export const AlienButtons: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState('membrane');
    const [atmosphericActive, setAtmosphericActive] = useState(true);
    const [vitalActive, setVitalActive] = useState(true);
    const [neuralActive, setNeuralActive] = useState(false);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        {/* Atmospheric Background Effects */}
        {atmosphericActive && <div className="atmospheric-membrane opacity-20 pointer-events-none" />}
        {neuralActive && <div className="neural-pathways opacity-15 pointer-events-none" />}
        
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Alien Button Variants Demo
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Interactive demonstration of all alien biomechanical button variants and effects
            </p>
          </div>

          {/* Controls */}
          <Container alienVariant="organ" atmospheric className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm atmospheric-text-ghost mb-2">Button Variant</label>
                <select 
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full bg-black/50 atmospheric-border-vessel rounded px-3 py-2 text-sm atmospheric-text-vital"
                >
                  <option value="membrane">Membrane</option>
                  <option value="vessel">Vessel</option>
                  <option value="neural">Neural</option>
                  <option value="organism">Organism</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant={atmosphericActive ? 'vessel' : 'membrane'}
                  atmospheric={atmosphericActive}
                  fullWidth
                  onClick={() => setAtmosphericActive(!atmosphericActive)}
                  size="sm"
                >
                  Atmospheric {atmosphericActive ? 'ON' : 'OFF'}
                </Button>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant={vitalActive ? 'vessel' : 'membrane'}
                  vital={vitalActive}
                  atmospheric
                  fullWidth
                  onClick={() => setVitalActive(!vitalActive)}
                  size="sm"
                >
                  Vital {vitalActive ? 'ON' : 'OFF'}
                </Button>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant={neuralActive ? 'neural' : 'membrane'}
                  atmospheric
                  fullWidth
                  onClick={() => setNeuralActive(!neuralActive)}
                  size="sm"
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Neural {neuralActive ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>
          </Container>

          {/* Button Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Size Variations */}
            <Card variant="alien-chamber" atmospheric={atmosphericActive}>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  size="whisper"
                  fullWidth
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Whisper Size
                </Button>
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  size="sm"
                  fullWidth
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Small Size
                </Button>
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  size="default"
                  fullWidth
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Default Size
                </Button>
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  size="lg"
                  fullWidth
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Large Size
                </Button>
              </CardContent>
            </Card>

            {/* State Variations */}
            <Card variant="alien-organ" atmospheric={atmosphericActive} vital={vitalActive}>
              <CardHeader>
                <CardTitle>Button States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  fullWidth
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Normal State
                </Button>
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  fullWidth
                  disabled
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Disabled State
                </Button>
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  fullWidth
                  className={`atmospheric-pulse ${neuralActive ? 'atmospheric-neural' : ''}`}
                >
                  Pulsing State
                </Button>
                <Button 
                  variant={selectedVariant as any} 
                  atmospheric={atmosphericActive}
                  vital={vitalActive}
                  fullWidth
                  className={`atmospheric-breathe ${neuralActive ? 'atmospheric-neural' : ''}`}
                >
                  Breathing State
                </Button>
              </CardContent>
            </Card>

            {/* All Variants Showcase */}
            <Card variant="alien-membrane" atmospheric={atmosphericActive} neural={neuralActive}>
              <CardHeader>
                <CardTitle>All Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="membrane" atmospheric={atmosphericActive} vital={vitalActive} fullWidth>
                  Membrane
                </Button>
                <Button variant="vessel" atmospheric={atmosphericActive} vital={vitalActive} fullWidth>
                  Vessel
                </Button>
                <Button 
                  variant="neural" 
                  atmospheric={atmosphericActive} 
                  fullWidth
                  className="atmospheric-neural"
                >
                  Neural
                </Button>
                <Button 
                  variant="organism" 
                  atmospheric={atmosphericActive} 
                  vital={vitalActive}
                  fullWidth
                  className={neuralActive ? 'atmospheric-neural' : ''}
                >
                  Organism
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Playground */}
          <Container 
            alienVariant="cavity" 
            atmospheric={atmosphericActive} 
            vital={vitalActive} 
            neural={neuralActive}
            className="p-6"
          >
            <h2 className="text-2xl font-bold atmospheric-text-vital mb-6">Interactive Playground</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="membrane" 
                atmospheric={atmosphericActive}
                onClick={() => alert('Membrane interface activated!')}
                className="h-16"
              >
                <div className="text-center">
                  <div className="text-lg">🧬</div>
                  <div className="text-xs">Activate Membrane</div>
                </div>
              </Button>
              
              <Button 
                variant="vessel" 
                vital={vitalActive}
                atmospheric={atmosphericActive}
                onClick={() => alert('Vessel systems engaged!')}
                className="h-16"
              >
                <div className="text-center">
                  <div className="text-lg">🫀</div>
                  <div className="text-xs">Engage Vessel</div>
                </div>
              </Button>
              
              <Button 
                variant="neural" 
                atmospheric={atmosphericActive}
                onClick={() => alert('Neural link established!')}
                className="h-16 atmospheric-neural"
              >
                <div className="text-center">
                  <div className="text-lg">⚡</div>
                  <div className="text-xs">Neural Link</div>
                </div>
              </Button>
              
              <Button 
                variant="organism" 
                atmospheric={atmosphericActive}
                vital={vitalActive}
                onClick={() => alert('Organism awakened!')}
                className={`h-16 ${neuralActive ? 'atmospheric-neural' : ''}`}
              >
                <div className="text-center">
                  <div className="text-lg">👁️</div>
                  <div className="text-xs">Awaken Organism</div>
                </div>
              </Button>
            </div>
          </Container>
        </div>
      </div>
    );
  },
};

export const AlienCards: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState('alien-chamber');
    const [effectsEnabled, setEffectsEnabled] = useState(true);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        {effectsEnabled && <div className="atmospheric-vessel opacity-20 pointer-events-none" />}
        
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Alien Card Variants Demo
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Explore all alien biomechanical card variants with atmospheric, vital, and neural effects
            </p>
          </div>

          {/* Controls */}
          <Container alienVariant="membrane" atmospheric className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm atmospheric-text-ghost mb-2">Card Variant</label>
                <select 
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full bg-black/50 atmospheric-border-vessel rounded px-3 py-2 text-sm atmospheric-text-vital"
                >
                  <option value="alien-chamber">Alien Chamber</option>
                  <option value="alien-organ">Alien Organ</option>
                  <option value="alien-membrane">Alien Membrane</option>
                  <option value="alien-cavity">Alien Cavity</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant={effectsEnabled ? 'vessel' : 'membrane'}
                  atmospheric={effectsEnabled}
                  vital={effectsEnabled}
                  fullWidth
                  onClick={() => setEffectsEnabled(!effectsEnabled)}
                  size="sm"
                >
                  Effects {effectsEnabled ? 'ENABLED' : 'DISABLED'}
                </Button>
              </div>
            </div>
          </Container>

          {/* Card Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Basic Card Examples */}
            {[
              { variant: 'alien-chamber', title: 'Bio Chamber', icon: '🫁', desc: 'Deep organ chamber interface' },
              { variant: 'alien-organ', title: 'Living Organ', icon: '🧠', desc: 'Biomechanical organ system' },
              { variant: 'alien-membrane', title: 'Cell Membrane', icon: '🧬', desc: 'Protective barrier layer' },
              { variant: 'alien-cavity', title: 'Body Cavity', icon: '🖤', desc: 'Internal body space' },
            ].map((item, index) => (
              <Card 
                key={index}
                variant={item.variant as any} 
                atmospheric={effectsEnabled}
                vital={effectsEnabled && index % 2 === 0}
                neural={effectsEnabled && index % 3 === 0}
                className={effectsEnabled ? 'atmospheric-breathe' : ''}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm atmospheric-text-ghost">{item.desc}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Status:</span>
                      <span className="atmospheric-text-vital">
                        {effectsEnabled ? 'LIVING' : 'DORMANT'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Integration:</span>
                      <span className="atmospheric-text-vital">
                        {effectsEnabled ? '94.7%' : '0%'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="membrane" 
                    atmospheric={effectsEnabled}
                    size="sm"
                    fullWidth
                  >
                    Interface
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Interactive Demo Card */}
            <Card 
              variant={selectedVariant as any} 
              atmospheric={effectsEnabled}
              vital={effectsEnabled}
              neural={effectsEnabled}
              className={`col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4 ${effectsEnabled ? 'atmospheric-breathe atmospheric-neural' : ''}`}
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  Interactive Demo: {selectedVariant.replace('alien-', '').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold atmospheric-text-vital">Atmospheric Effects</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Breathing Rate:</span>
                        <span className="atmospheric-text-vital">
                          {effectsEnabled ? '16 BPM' : 'STATIC'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Membrane State:</span>
                        <span className="atmospheric-text-vital">
                          {effectsEnabled ? 'PERMEABLE' : 'SOLID'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold atmospheric-text-vital">Vital Signs</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Life Force:</span>
                        <span className="atmospheric-text-vital">
                          {effectsEnabled ? 'STRONG' : 'ABSENT'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Pulse:</span>
                        <span className="atmospheric-text-vital">
                          {effectsEnabled ? '72 BPM' : 'NONE'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold atmospheric-text-vital">Neural Activity</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Synapses:</span>
                        <span className="atmospheric-text-vital">
                          {effectsEnabled ? '2,847' : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Frequency:</span>
                        <span className="atmospheric-text-vital">
                          {effectsEnabled ? '847 Hz' : 'SILENT'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-3 w-full">
                  <Button variant="membrane" atmospheric={effectsEnabled} className="flex-1">
                    Scan Organism
                  </Button>
                  <Button variant="vessel" vital={effectsEnabled} atmospheric className="flex-1">
                    Enhance Vitals
                  </Button>
                  <Button 
                    variant="neural" 
                    atmospheric 
                    className={`flex-1 ${effectsEnabled ? 'atmospheric-neural' : ''}`}
                  >
                    Neural Link
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  },
};

export const RealTimeInteractivity: Story = {
  render: () => {
    const [organismData, setOrganismData] = useState(generateOrganismData);
    const [isEvolutionActive, setIsEvolutionActive] = useState(false);
    const [evolutionStage, setEvolutionStage] = useState(1);
    const [contacts] = useState(generateAlienContacts);

    useEffect(() => {
      const interval = setInterval(() => {
        setOrganismData(generateOrganismData);
        if (isEvolutionActive) {
          setEvolutionStage(prev => (prev + 0.1) % 5);
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [isEvolutionActive]);

    const getEvolutionStatus = () => {
      if (evolutionStage < 1) return { status: 'CELLULAR', icon: '🦠', color: 'text-blue-400' };
      if (evolutionStage < 2) return { status: 'TISSUE', icon: '🧬', color: 'text-green-400' };
      if (evolutionStage < 3) return { status: 'ORGAN', icon: '🫀', color: 'text-red-400' };
      if (evolutionStage < 4) return { status: 'ORGANISM', icon: '👁️', color: 'text-purple-400' };
      return { status: 'TRANSCENDENT', icon: '✨', color: 'atmospheric-text-vital' };
    };

    const evolution = getEvolutionStatus();

    return (
      <div className="theme-atmospheric min-h-screen bg-black text-white relative overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="atmospheric-organ opacity-20 pointer-events-none" />
        <div className="neural-pathways opacity-15 pointer-events-none" />
        
        <div className="p-6 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe atmospheric-neural">
              Real-Time Alien Interface Demo
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Live biomechanical system monitoring with real-time data updates and interactive evolution
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Control Panel */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Evolution Control */}
              <Container alienVariant="organism" atmospheric vital neural className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">EVOLUTION CONTROL</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl ${evolution.color}`}>{evolution.icon}</div>
                    <div className="text-sm atmospheric-text-vital">{evolution.status}</div>
                    <div className="text-xs atmospheric-text-ghost">
                      Stage {Math.floor(evolutionStage) + 1}/5
                    </div>
                  </div>
                  
                  <Button
                    variant={isEvolutionActive ? 'vessel' : 'membrane'}
                    vital={isEvolutionActive}
                    atmospheric
                    fullWidth
                    onClick={() => setIsEvolutionActive(!isEvolutionActive)}
                    className={isEvolutionActive ? 'atmospheric-pulse' : ''}
                  >
                    {isEvolutionActive ? 'EVOLVING...' : 'START EVOLUTION'}
                  </Button>
                  
                  <Progress 
                    value={(evolutionStage % 1) * 100} 
                    className="h-3 atmospheric-breathe" 
                  />
                </div>
              </Container>

              {/* Real-time Metrics */}
              <Container alienVariant="chamber" atmospheric vital className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">ORGANISM METRICS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Consciousness:</span>
                    <span className="atmospheric-text-vital">{organismData.consciousness}%</span>
                  </div>
                  <Progress value={organismData.consciousness} className="h-2 atmospheric-neural" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Integration:</span>
                    <span className="atmospheric-text-vital">{organismData.biointegration}%</span>
                  </div>
                  <Progress value={organismData.biointegration} className="h-2 atmospheric-breathe" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="atmospheric-text-ghost">Neural Activity:</span>
                    <span className="atmospheric-text-vital">{organismData.neuralActivity} Hz</span>
                  </div>
                  <Progress value={(organismData.neuralActivity / 1000) * 100} className="h-2" />
                  
                  <div className="text-xs atmospheric-text-ghost mt-3">
                    Status: {organismData.vitalSigns}
                  </div>
                </div>
              </Container>

              {/* Alert System */}
              <Alert variant="alien-membrane" atmospheric>
                <div className="atmospheric-text-vital">
                  <strong>SYSTEM ACTIVE</strong>
                  <p className="text-sm mt-1 atmospheric-text-ghost">
                    Organism responding to real-time stimuli. Evolution progress: {Math.floor((evolutionStage % 1) * 100)}%
                  </p>
                </div>
              </Alert>
            </div>

            {/* Main Interface */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* HUD Overlay Demo */}
              <div className="relative h-96 rounded-lg overflow-hidden atmospheric-border-organ bg-gradient-to-br from-black via-gray-900/50 to-black">
                
                {/* Background Visualization */}
                <div className="absolute inset-0">
                  <div className="grid grid-cols-12 grid-rows-8 h-full opacity-30">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const isActive = Math.random() < (organismData.consciousness / 100);
                      return (
                        <div
                          key={i}
                          className={`border atmospheric-border-vessel/20 ${
                            isActive ? 'bg-orange-400/20 atmospheric-pulse' : ''
                          }`}
                          style={{
                            animationDelay: `${i * 0.05}s`
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* HUD Elements */}
                <div className="absolute top-4 left-4">
                  <HUDPanel variant="matrix" title="ORGANISM STATUS">
                    <div className="space-y-2">
                      <HUDMetric label="Consciousness" value={`${organismData.consciousness}%`} />
                      <HUDMetric label="Integration" value={`${organismData.biointegration}%`} />
                      <HUDMetric label="Vital Signs" value={organismData.vitalSigns} />
                    </div>
                  </HUDPanel>
                </div>

                <div className="absolute top-4 right-4">
                  <HUDRadar
                    contacts={contacts}
                    variant="matrix"
                    size="md"
                    mode="sweep"
                    showCompass
                    title="BIO-SCAN"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <Container alienVariant="membrane" atmospheric className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xs atmospheric-text-ghost">Pressure</div>
                        <div className="text-lg atmospheric-text-vital">{organismData.atmosphericPressure} ATM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs atmospheric-text-ghost">Membrane</div>
                        <div className="text-lg atmospheric-text-vital">{organismData.membraneIntegrity}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs atmospheric-text-ghost">Evolution</div>
                        <div className="text-lg atmospheric-text-vital">{evolution.status}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs atmospheric-text-ghost">Neural Hz</div>
                        <div className="text-lg atmospheric-text-vital">{organismData.neuralActivity}</div>
                      </div>
                    </div>
                  </Container>
                </div>

                {/* Central Organism Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className={`text-8xl ${evolution.color} transition-all duration-1000`}
                    style={{
                      transform: `scale(${1 + (organismData.consciousness / 500)}) rotate(${evolutionStage * 72}deg)`,
                      filter: `drop-shadow(0 0 20px ${isEvolutionActive ? 'rgba(139, 69, 19, 0.6)' : 'rgba(139, 69, 19, 0.3)'})`
                    }}
                  >
                    {evolution.icon}
                  </div>
                </div>
              </div>

              {/* Interactive Control Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Scan Organism', variant: 'membrane', icon: '🔍', action: 'Scanning biological systems...' },
                  { title: 'Enhance Vitals', variant: 'vessel', icon: '💉', action: 'Boosting life force systems...' },
                  { title: 'Neural Link', variant: 'neural', icon: '🧠', action: 'Establishing consciousness connection...' },
                  { title: 'Evolve Form', variant: 'organism', icon: '🧬', action: 'Accelerating evolutionary process...' },
                ].map((item, index) => (
                  <Card 
                    key={index}
                    variant="alien-cavity" 
                    atmospheric 
                    vital={index % 2 === 0}
                    neural={index % 3 === 0}
                    className="atmospheric-breathe cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => alert(item.action)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl atmospheric-text-vital mb-2">{item.icon}</div>
                      <h4 className="font-semibold atmospheric-text-vital">{item.title}</h4>
                      <div className="text-xs atmospheric-text-ghost mt-2">
                        Click to {item.title.toLowerCase()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Real-time Data Stream */}
              <Container alienVariant="organ" atmospheric vital neural className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">LIVE DATA STREAM</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Cellular Division Rate', value: `${(organismData.biointegration * 2.4).toFixed(1)}M/sec`, trend: '↗️' },
                    { label: 'Synaptic Coherence', value: `${organismData.consciousness}%`, trend: '↗️' },
                    { label: 'Membrane Flux', value: `${(Math.random() * 20 + 10).toFixed(1)} μm/s`, trend: '↔️' },
                    { label: 'Neural Pathways', value: `${Math.floor(organismData.neuralActivity * 3.4)}`, trend: '↗️' },
                    { label: 'Evolution Phase', value: evolution.status, trend: isEvolutionActive ? '↗️' : '↔️' },
                    { label: 'Consciousness Depth', value: `${Math.floor(organismData.consciousness * 1.2)}%`, trend: '↗️' },
                  ].map((metric, index) => (
                    <div key={index} className="bg-black/30 atmospheric-border-vessel rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs atmospheric-text-ghost">{metric.label}</span>
                        <span className="text-xs">{metric.trend}</span>
                      </div>
                      <div className="text-lg atmospheric-text-vital font-semibold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AlienPlayground: Story = {
  render: () => {
    const [activeComponents, setActiveComponents] = useState({
      atmospheric: true,
      vital: true,
      neural: false,
      buttons: true,
      cards: true,
      containers: true,
      hud: false
    });

    const [intensity, setIntensity] = useState(75);

    return (
      <div className="theme-atmospheric min-h-screen bg-black text-white p-6">
        {activeComponents.atmospheric && <div className="atmospheric-membrane opacity-20 pointer-events-none" />}
        {activeComponents.neural && <div className="neural-pathways opacity-15 pointer-events-none" />}
        
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Alien Theme Playground
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Interactive playground to experiment with all alien theme components and effects
            </p>
          </div>

          {/* Master Controls */}
          <Container alienVariant="organism" atmospheric={activeComponents.atmospheric} vital={activeComponents.vital} neural={activeComponents.neural} className="p-6">
            <h2 className="text-xl font-bold atmospheric-text-vital mb-4">Master Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div>
                <label className="block text-sm atmospheric-text-ghost mb-2">
                  Global Intensity: {intensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full atmospheric-slider"
                />
              </div>

              {Object.entries(activeComponents).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm atmospheric-text-ghost mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <Button
                    variant={value ? 'vessel' : 'membrane'}
                    atmospheric={activeComponents.atmospheric}
                    vital={value && (key === 'vital' || key === 'buttons')}
                    fullWidth
                    size="sm"
                    onClick={() => setActiveComponents(prev => ({ ...prev, [key]: !value }))}
                    className={value && key === 'neural' ? 'atmospheric-neural' : ''}
                  >
                    {value ? 'ON' : 'OFF'}
                  </Button>
                </div>
              ))}
            </div>
          </Container>

          {/* Dynamic Component Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Buttons Section */}
            {activeComponents.buttons && (
              <Card 
                variant="alien-chamber" 
                atmospheric={activeComponents.atmospheric}
                vital={activeComponents.vital}
                neural={activeComponents.neural}
                className={activeComponents.atmospheric ? 'atmospheric-breathe' : ''}
              >
                <CardHeader>
                  <CardTitle>Button Showcase</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="membrane" 
                    atmospheric={activeComponents.atmospheric}
                    vital={activeComponents.vital}
                    fullWidth
                    style={{ opacity: 0.5 + (intensity / 200) }}
                  >
                    Membrane ({intensity}%)
                  </Button>
                  <Button 
                    variant="vessel" 
                    atmospheric={activeComponents.atmospheric}
                    vital={activeComponents.vital}
                    fullWidth
                    className={intensity > 70 ? 'atmospheric-pulse' : ''}
                  >
                    Vessel {intensity > 70 ? '(Pulsing)' : ''}
                  </Button>
                  <Button 
                    variant="neural" 
                    atmospheric={activeComponents.atmospheric}
                    fullWidth
                    className={activeComponents.neural ? 'atmospheric-neural' : ''}
                  >
                    Neural {activeComponents.neural ? '(Active)' : '(Dormant)'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Cards Section */}
            {activeComponents.cards && (
              <Card 
                variant="alien-organ" 
                atmospheric={activeComponents.atmospheric}
                vital={activeComponents.vital}
                neural={activeComponents.neural}
                className={activeComponents.neural ? 'atmospheric-neural' : ''}
              >
                <CardHeader>
                  <CardTitle>Living Card System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Atmospheric:</span>
                        <span className="atmospheric-text-vital">
                          {activeComponents.atmospheric ? 'BREATHING' : 'STATIC'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Vital Signs:</span>
                        <span className="atmospheric-text-vital">
                          {activeComponents.vital ? 'DETECTED' : 'ABSENT'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Neural Activity:</span>
                        <span className="atmospheric-text-vital">
                          {activeComponents.neural ? `${Math.floor(intensity * 8)} Hz` : 'SILENT'}
                        </span>
                      </div>
                    </div>
                    <Progress value={intensity} className="h-3 atmospheric-breathe" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Containers Section */}
            {activeComponents.containers && (
              <Container 
                alienVariant="cavity" 
                atmospheric={activeComponents.atmospheric}
                vital={activeComponents.vital}
                neural={activeComponents.neural}
                className="p-6"
              >
                <h3 className="font-bold atmospheric-text-vital mb-4">Container Demo</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl atmospheric-text-vital ${
                      activeComponents.atmospheric ? 'atmospheric-breathe' : ''
                    } ${
                      activeComponents.neural ? 'atmospheric-neural' : ''
                    }`}>
                      {intensity > 80 ? '🌟' : intensity > 60 ? '👁️' : intensity > 40 ? '🧬' : intensity > 20 ? '🫀' : '💤'}
                    </div>
                    <div className="text-sm atmospheric-text-ghost mt-2">
                      Organism State: {
                        intensity > 80 ? 'TRANSCENDENT' :
                        intensity > 60 ? 'AWAKENED' :
                        intensity > 40 ? 'DEVELOPING' :
                        intensity > 20 ? 'BASIC' : 'DORMANT'
                      }
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Badge variant="membrane" atmospheric={activeComponents.atmospheric}>
                      Membrane: {activeComponents.atmospheric ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                    <Badge variant="organism" vital={activeComponents.vital} atmospheric>
                      Vitals: {activeComponents.vital ? 'ONLINE' : 'OFFLINE'}
                    </Badge>
                  </div>
                </div>
              </Container>
            )}
          </div>

          {/* Live Metrics Dashboard */}
          <Container 
            alienVariant="membrane" 
            atmospheric={activeComponents.atmospheric}
            vital={activeComponents.vital}
            neural={activeComponents.neural}
            className="p-6"
          >
            <h2 className="text-xl font-bold atmospheric-text-vital mb-4">Live System Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  title: 'System Load', 
                  value: `${Math.floor(Object.values(activeComponents).filter(Boolean).length * 12.5)}%`,
                  status: Object.values(activeComponents).filter(Boolean).length > 4 ? 'HIGH' : 'NORMAL'
                },
                { 
                  title: 'Effect Intensity', 
                  value: `${intensity}%`,
                  status: intensity > 75 ? 'MAXIMUM' : intensity > 50 ? 'OPTIMAL' : 'LOW'
                },
                { 
                  title: 'Active Components', 
                  value: Object.values(activeComponents).filter(Boolean).length,
                  status: Object.values(activeComponents).filter(Boolean).length > 5 ? 'FULL' : 'PARTIAL'
                },
                { 
                  title: 'Organism State', 
                  value: intensity > 70 && Object.values(activeComponents).filter(Boolean).length > 4 ? 'TRANSCENDENT' : 'DEVELOPING',
                  status: 'EVOLVING'
                },
              ].map((metric, index) => (
                <div key={index} className="bg-black/30 atmospheric-border-vessel rounded-lg p-4">
                  <div className="text-xs atmospheric-text-ghost mb-1">{metric.title}</div>
                  <div className="text-lg atmospheric-text-vital font-semibold">{metric.value}</div>
                  <div className="text-xs atmospheric-text-ghost">{metric.status}</div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    );
  },
};