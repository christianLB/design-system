import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { Progress } from '../components/Progress/Progress';
import { Badge } from '../components/Badge/Badge';

const meta: Meta = {
  title: 'Alien/Effects',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Alien biomechanical effects plugin system demonstration with interactive controls and real-time performance monitoring',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Performance monitoring component
const PerformanceMonitor = ({ effectsActive }: { effectsActive: number }) => {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(45);
  const [gpuLoad, setGpuLoad] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate performance impact based on active effects
      const baseLoad = effectsActive * 8;
      setFps(Math.max(30, 60 - Math.floor(Math.random() * baseLoad)));
      setMemoryUsage(Math.min(90, 35 + baseLoad + Math.floor(Math.random() * 10)));
      setGpuLoad(Math.min(85, 20 + baseLoad + Math.floor(Math.random() * 15)));
    }, 1000);

    return () => clearInterval(interval);
  }, [effectsActive]);

  return (
    <Container alienVariant="cavity" atmospheric vital className="p-4">
      <h3 className="font-bold atmospheric-text-vital mb-3">PERFORMANCE MONITOR</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="atmospheric-text-ghost">FPS:</span>
          <span className={fps > 50 ? 'atmospheric-text-vital' : fps > 30 ? 'text-yellow-400' : 'text-red-400'}>
            {fps}
          </span>
        </div>
        <Progress value={(fps / 60) * 100} className="h-2" />
        
        <div className="flex justify-between text-sm">
          <span className="atmospheric-text-ghost">Memory:</span>
          <span className={memoryUsage < 70 ? 'atmospheric-text-vital' : 'text-yellow-400'}>
            {memoryUsage}%
          </span>
        </div>
        <Progress value={memoryUsage} className="h-2 atmospheric-breathe" />
        
        <div className="flex justify-between text-sm">
          <span className="atmospheric-text-ghost">GPU Load:</span>
          <span className={gpuLoad < 60 ? 'atmospheric-text-vital' : 'text-yellow-400'}>
            {gpuLoad}%
          </span>
        </div>
        <Progress value={gpuLoad} className="h-2 atmospheric-neural" />
        
        <div className="text-xs atmospheric-text-ghost">
          Active Effects: {effectsActive} • Impact: {effectsActive === 0 ? 'MINIMAL' : effectsActive < 3 ? 'LOW' : effectsActive < 6 ? 'MODERATE' : 'HIGH'}
        </div>
      </div>
    </Container>
  );
};

export const AtmosphericEffects: Story = {
  render: () => {
    const [atmosphericEnabled, setAtmosphericEnabled] = useState(true);
    const [breathingIntensity, setBreathingIntensity] = useState(50);
    const [membraneOpacity, setMembraneOpacity] = useState(30);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Atmospheric Effects Plugin
            </h1>
            <p className="text-lg atmospheric-text-ghost max-w-3xl mx-auto">
              Control the breathing patterns, membrane layers, and organic atmosphere of your biomechanical interfaces
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Controls Panel */}
            <div className="xl:col-span-1 space-y-6">
              <Container alienVariant="organ" atmospheric className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">ATMOSPHERIC CONTROLS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Atmospheric Effects
                    </label>
                    <Button
                      variant={atmosphericEnabled ? 'vessel' : 'membrane'}
                      vital={atmosphericEnabled}
                      atmospheric
                      fullWidth
                      onClick={() => setAtmosphericEnabled(!atmosphericEnabled)}
                    >
                      {atmosphericEnabled ? 'DISABLE' : 'ENABLE'}
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Breathing Intensity: {breathingIntensity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={breathingIntensity}
                      onChange={(e) => setBreathingIntensity(Number(e.target.value))}
                      className="w-full atmospheric-slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Membrane Opacity: {membraneOpacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={membraneOpacity}
                      onChange={(e) => setMembraneOpacity(Number(e.target.value))}
                      className="w-full atmospheric-slider"
                    />
                  </div>
                </div>
              </Container>

              <PerformanceMonitor effectsActive={atmosphericEnabled ? 2 : 0} />
            </div>

            {/* Demo Area */}
            <div className="xl:col-span-3 space-y-6">
              <h3 className="text-xl font-bold atmospheric-text-vital">Atmospheric Effect Showcase</h3>
              
              {/* Background Effects Demo */}
              <div 
                className="relative h-64 rounded-lg overflow-hidden atmospheric-border-vessel"
                style={{
                  background: atmosphericEnabled ? 'radial-gradient(circle at center, rgba(139, 69, 19, 0.1), rgba(0, 0, 0, 0.8))' : '#1a1a1a'
                }}
              >
                {atmosphericEnabled && (
                  <>
                    <div 
                      className="atmospheric-membrane pointer-events-none"
                      style={{ opacity: membraneOpacity / 100 }}
                    />
                    <div 
                      className="neural-pathways pointer-events-none"
                      style={{ 
                        opacity: breathingIntensity / 200,
                        animationDuration: `${3 - (breathingIntensity / 50)}s`
                      }}
                    />
                  </>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-3xl atmospheric-text-vital">
                      {atmosphericEnabled ? '🫁 BREATHING' : '💤 DORMANT'}
                    </div>
                    <div className="text-sm atmospheric-text-ghost">
                      Background atmospheric effects {atmosphericEnabled ? 'active' : 'disabled'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card 
                  variant="alien-chamber" 
                  atmospheric={atmosphericEnabled}
                  style={{
                    animationDuration: atmosphericEnabled ? `${3 - (breathingIntensity / 50)}s` : 'none'
                  }}
                >
                  <CardHeader>
                    <CardTitle>Breathing Chamber</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Atmospheric breathing with {breathingIntensity}% intensity</p>
                    <div className="mt-2 text-xs atmospheric-text-vital">
                      Status: {atmosphericEnabled ? 'LIVING' : 'STATIC'}
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  variant="alien-membrane" 
                  atmospheric={atmosphericEnabled}
                  style={{
                    opacity: atmosphericEnabled ? 0.7 + (membraneOpacity / 300) : 1
                  }}
                >
                  <CardHeader>
                    <CardTitle>Membrane Layer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Membrane opacity at {membraneOpacity}%</p>
                    <div className="mt-2 text-xs atmospheric-text-vital">
                      Permeability: {atmosphericEnabled ? 'SELECTIVE' : 'SOLID'}
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  variant="alien-organ" 
                  atmospheric={atmosphericEnabled}
                  className={atmosphericEnabled ? 'atmospheric-breathe' : ''}
                >
                  <CardHeader>
                    <CardTitle>Living Organ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Organic structure with atmospheric effects</p>
                    <div className="mt-2 text-xs atmospheric-text-vital">
                      Vitality: {atmosphericEnabled ? 'PULSING' : 'INERT'}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Button Examples */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold atmospheric-text-vital">Button Variations</h4>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="membrane" 
                    atmospheric={atmosphericEnabled}
                    className={atmosphericEnabled && breathingIntensity > 70 ? 'atmospheric-breathe' : ''}
                  >
                    Membrane Interface
                  </Button>
                  <Button 
                    variant="vessel" 
                    atmospheric={atmosphericEnabled}
                    className={atmosphericEnabled && membraneOpacity > 50 ? 'atmospheric-pulse' : ''}
                  >
                    Vessel Control
                  </Button>
                  <Button 
                    variant="neural" 
                    atmospheric={atmosphericEnabled}
                    className={atmosphericEnabled ? 'atmospheric-neural' : ''}
                  >
                    Neural Interface
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const VitalEffects: Story = {
  render: () => {
    const [vitalEnabled, setVitalEnabled] = useState(true);
    const [pulseRate, setPulseRate] = useState(60);
    const [oxygenLevel, setOxygenLevel] = useState(98);
    const [vitalIntensity, setVitalIntensity] = useState(75);

    useEffect(() => {
      const interval = setInterval(() => {
        if (vitalEnabled) {
          setPulseRate(prev => Math.max(40, Math.min(120, prev + (Math.random() - 0.5) * 5)));
          setOxygenLevel(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 2)));
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [vitalEnabled]);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Vital Signs Effects Plugin
            </h1>
            <p className="text-lg atmospheric-text-ghost max-w-3xl mx-auto">
              Monitor and control the life force indicators, pulse patterns, and vital energy flows in biomechanical systems
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Vital Controls */}
            <div className="xl:col-span-1 space-y-6">
              <Container alienVariant="chamber" atmospheric vital={vitalEnabled} className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">VITAL CONTROLS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Vital Signs
                    </label>
                    <Button
                      variant={vitalEnabled ? 'vessel' : 'membrane'}
                      vital={vitalEnabled}
                      atmospheric
                      fullWidth
                      onClick={() => setVitalEnabled(!vitalEnabled)}
                    >
                      {vitalEnabled ? 'ALIVE' : 'DORMANT'}
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Vital Intensity: {vitalIntensity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={vitalIntensity}
                      onChange={(e) => setVitalIntensity(Number(e.target.value))}
                      className="w-full atmospheric-slider"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Pulse Rate:</span>
                      <span className="atmospheric-text-vital">{Math.floor(pulseRate)} BPM</span>
                    </div>
                    <Progress value={(pulseRate / 120) * 100} className="h-2 atmospheric-breathe" />
                    
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Oxygen Level:</span>
                      <span className="atmospheric-text-vital">{Math.floor(oxygenLevel)}%</span>
                    </div>
                    <Progress value={oxygenLevel} className="h-2" />
                  </div>
                </div>
              </Container>

              <PerformanceMonitor effectsActive={vitalEnabled ? 3 : 0} />
            </div>

            {/* Vital Demo Area */}
            <div className="xl:col-span-3 space-y-6">
              <h3 className="text-xl font-bold atmospheric-text-vital">Vital Signs Monitoring</h3>
              
              {/* Vital Status Display */}
              <Container 
                alienVariant="organism" 
                atmospheric 
                vital={vitalEnabled}
                className="p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-6xl ${vitalEnabled ? 'atmospheric-text-vital atmospheric-pulse' : 'text-gray-600'}`}>
                      💓
                    </div>
                    <div className="mt-2">
                      <div className="text-sm atmospheric-text-ghost">Heart Rate</div>
                      <div className="text-xl atmospheric-text-vital">{Math.floor(pulseRate)} BPM</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-6xl ${vitalEnabled ? 'atmospheric-text-vital atmospheric-breathe' : 'text-gray-600'}`}>
                      🫁
                    </div>
                    <div className="mt-2">
                      <div className="text-sm atmospheric-text-ghost">Oxygen Level</div>
                      <div className="text-xl atmospheric-text-vital">{Math.floor(oxygenLevel)}%</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-6xl ${vitalEnabled ? 'atmospheric-text-vital atmospheric-neural' : 'text-gray-600'}`}>
                      🧠
                    </div>
                    <div className="mt-2">
                      <div className="text-sm atmospheric-text-ghost">Neural Activity</div>
                      <div className="text-xl atmospheric-text-vital">{vitalEnabled ? 'ACTIVE' : 'DORMANT'}</div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Component Examples with Vital Effects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { variant: 'alien-chamber', title: 'Vital Chamber', desc: 'Life support chamber' },
                  { variant: 'alien-organ', title: 'Living Organ', desc: 'Biomechanical organ' },
                  { variant: 'alien-membrane', title: 'Vital Membrane', desc: 'Living tissue barrier' },
                  { variant: 'alien-cavity', title: 'Body Cavity', desc: 'Internal organ space' },
                ].map((item, index) => (
                  <Card 
                    key={index}
                    variant={item.variant as any} 
                    atmospheric 
                    vital={vitalEnabled}
                    className={vitalEnabled ? 'atmospheric-breathe' : ''}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      opacity: vitalEnabled ? 0.8 + (vitalIntensity / 500) : 0.6
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className={vitalEnabled ? 'atmospheric-text-vital' : 'text-gray-500'}>●</span>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{item.desc}</p>
                      <div className="mt-2 text-xs">
                        <div className="flex justify-between">
                          <span className="atmospheric-text-ghost">Vitality:</span>
                          <span className="atmospheric-text-vital">
                            {vitalEnabled ? `${vitalIntensity}%` : 'NONE'}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="atmospheric-text-ghost">Status:</span>
                          <span className={vitalEnabled ? 'atmospheric-text-vital' : 'text-gray-500'}>
                            {vitalEnabled ? 'LIVING' : 'INERT'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Vital Signs Chart Simulation */}
              <Container alienVariant="cavity" atmospheric vital={vitalEnabled} className="p-4">
                <h4 className="font-bold atmospheric-text-vital mb-4">VITAL SIGNS WAVEFORM</h4>
                <div className="h-32 atmospheric-border-vessel rounded bg-black/30 relative overflow-hidden">
                  {vitalEnabled && (
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 400 100">
                        <path
                          d={`M0,50 ${Array.from({ length: 20 }, (_, i) => {
                            const x = (i + 1) * 20;
                            const y = 50 + Math.sin((i + Date.now() / 200) * 0.5) * 20 * (vitalIntensity / 100);
                            return `L${x},${y}`;
                          }).join(' ')}`}
                          stroke="var(--atmospheric-vital, #8B4513)"
                          strokeWidth="2"
                          fill="none"
                          className="atmospheric-pulse"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!vitalEnabled && (
                      <div className="text-gray-500 text-sm">No vital signs detected</div>
                    )}
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

export const NeuralEffects: Story = {
  render: () => {
    const [neuralEnabled, setNeuralEnabled] = useState(true);
    const [synapticRate, setSynapticRate] = useState(847);
    const [coherence, setCoherence] = useState(85);
    const [networkActivity, setNetworkActivity] = useState(67);

    useEffect(() => {
      const interval = setInterval(() => {
        if (neuralEnabled) {
          setSynapticRate(prev => Math.max(400, Math.min(1200, prev + (Math.random() - 0.5) * 50)));
          setCoherence(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 5)));
          setNetworkActivity(prev => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 10)));
        }
      }, 1500);

      return () => clearInterval(interval);
    }, [neuralEnabled]);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-neural">
              Neural Network Effects Plugin
            </h1>
            <p className="text-lg atmospheric-text-ghost max-w-3xl mx-auto">
              Control synaptic pathways, neural coherence, and consciousness network patterns in biomechanical systems
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Neural Controls */}
            <div className="xl:col-span-1 space-y-6">
              <Container alienVariant="organ" atmospheric neural={neuralEnabled} className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">NEURAL CONTROLS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Neural Network
                    </label>
                    <Button
                      variant={neuralEnabled ? 'neural' : 'membrane'}
                      atmospheric
                      fullWidth
                      onClick={() => setNeuralEnabled(!neuralEnabled)}
                      className={neuralEnabled ? 'atmospheric-neural' : ''}
                    >
                      {neuralEnabled ? 'CONNECTED' : 'DISCONNECTED'}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Synaptic Rate:</span>
                      <span className="atmospheric-text-vital">{Math.floor(synapticRate)} Hz</span>
                    </div>
                    <Progress value={(synapticRate / 1200) * 100} className="h-2 atmospheric-neural" />
                    
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Coherence:</span>
                      <span className="atmospheric-text-vital">{Math.floor(coherence)}%</span>
                    </div>
                    <Progress value={coherence} className="h-2 atmospheric-breathe" />
                    
                    <div className="flex justify-between text-sm">
                      <span className="atmospheric-text-ghost">Network Activity:</span>
                      <span className="atmospheric-text-vital">{Math.floor(networkActivity)}%</span>
                    </div>
                    <Progress value={networkActivity} className="h-2" />
                  </div>
                </div>
              </Container>

              <PerformanceMonitor effectsActive={neuralEnabled ? 4 : 0} />
            </div>

            {/* Neural Demo Area */}
            <div className="xl:col-span-3 space-y-6">
              <h3 className="text-xl font-bold atmospheric-text-vital">Neural Network Visualization</h3>
              
              {/* Neural Pathway Grid */}
              <Container 
                alienVariant="cavity" 
                atmospheric 
                neural={neuralEnabled}
                className="p-6"
              >
                <h4 className="font-bold atmospheric-text-vital mb-4">SYNAPTIC PATHWAY GRID</h4>
                <div className="h-48 relative">
                  {neuralEnabled && <div className="neural-pathways opacity-40 pointer-events-none" />}
                  <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const isActive = neuralEnabled && Math.random() < (networkActivity / 100);
                      const intensity = Math.random();
                      return (
                        <div
                          key={i}
                          className={`rounded-full transition-all duration-500 ${
                            isActive && intensity > 0.7 ? 'bg-orange-400/80 atmospheric-pulse' :
                            isActive && intensity > 0.4 ? 'bg-blue-400/60 atmospheric-breathe' :
                            isActive ? 'bg-purple-400/40' :
                            'bg-gray-600/20'
                          }`}
                          style={{
                            animation: isActive && intensity > 0.5 ? 'atmospheric-neural 1.5s infinite' : 'none',
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="absolute top-2 right-2 text-xs atmospheric-text-ghost bg-black/60 px-2 py-1 rounded">
                    Active Synapses: {neuralEnabled ? Math.floor(48 * (networkActivity / 100)) : 0} / 48
                  </div>
                </div>
              </Container>

              {/* Neural Interface Components */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { variant: 'alien-chamber', title: 'Neural Chamber', desc: 'Consciousness interface' },
                  { variant: 'alien-organ', title: 'Brain Cortex', desc: 'Cognitive processing' },
                  { variant: 'alien-membrane', title: 'Neural Barrier', desc: 'Synaptic membrane' },
                  { variant: 'alien-cavity', title: 'Mind Palace', desc: 'Memory storage' },
                ].map((item, index) => (
                  <Card 
                    key={index}
                    variant={item.variant as any} 
                    atmospheric 
                    neural={neuralEnabled}
                    className={neuralEnabled ? 'atmospheric-neural' : ''}
                    style={{
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className={neuralEnabled ? 'atmospheric-text-vital atmospheric-pulse' : 'text-gray-500'}>
                          ⚡
                        </span>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{item.desc}</p>
                      <div className="mt-2 text-xs">
                        <div className="flex justify-between">
                          <span className="atmospheric-text-ghost">Connectivity:</span>
                          <span className="atmospheric-text-vital">
                            {neuralEnabled ? `${Math.floor(coherence)}%` : 'SEVERED'}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="atmospheric-text-ghost">Activity:</span>
                          <span className={neuralEnabled ? 'atmospheric-text-vital' : 'text-gray-500'}>
                            {neuralEnabled ? `${Math.floor(synapticRate)} Hz` : 'SILENT'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Consciousness Levels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Container alienVariant="membrane" atmospheric neural={neuralEnabled} className="p-4">
                  <h4 className="font-bold atmospheric-text-vital mb-3 text-sm">CONSCIOUSNESS LEVEL</h4>
                  <div className="text-center">
                    <div className={`text-3xl ${neuralEnabled ? 'atmospheric-text-vital atmospheric-neural' : 'text-gray-500'}`}>
                      {coherence > 90 ? '🧠✨' : coherence > 70 ? '🧠' : coherence > 50 ? '🧠💭' : '🧠💤'}
                    </div>
                    <div className="mt-2 text-sm atmospheric-text-vital">
                      {coherence > 90 ? 'TRANSCENDENT' : 
                       coherence > 70 ? 'AWAKENED' : 
                       coherence > 50 ? 'CONSCIOUS' : 'DORMANT'}
                    </div>
                  </div>
                </Container>

                <Container alienVariant="chamber" atmospheric neural={neuralEnabled} className="p-4">
                  <h4 className="font-bold atmospheric-text-vital mb-3 text-sm">SYNAPTIC EFFICIENCY</h4>
                  <div className="space-y-2">
                    <Progress value={(synapticRate / 1200) * 100} className="h-3 atmospheric-neural" />
                    <div className="text-xs atmospheric-text-ghost">
                      {Math.floor(synapticRate)} Hz • {synapticRate > 1000 ? 'ENHANCED' : synapticRate > 700 ? 'OPTIMAL' : 'BASELINE'}
                    </div>
                  </div>
                </Container>

                <Container alienVariant="organ" atmospheric neural={neuralEnabled} className="p-4">
                  <h4 className="font-bold atmospheric-text-vital mb-3 text-sm">NETWORK STATUS</h4>
                  <div className="space-y-2">
                    <Badge 
                      variant={neuralEnabled ? 'membrane' : 'default'} 
                      atmospheric={neuralEnabled}
                      className={neuralEnabled ? 'atmospheric-pulse' : ''}
                    >
                      {neuralEnabled ? 'NETWORK ACTIVE' : 'NETWORK OFFLINE'}
                    </Badge>
                    <div className="text-xs atmospheric-text-ghost">
                      {neuralEnabled ? `${Math.floor(networkActivity)}% connectivity` : 'Neural link severed'}
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CombinedEffects: Story = {
  render: () => {
    const [atmosphericEnabled, setAtmosphericEnabled] = useState(true);
    const [vitalEnabled, setVitalEnabled] = useState(true);
    const [neuralEnabled, setNeuralEnabled] = useState(true);
    const [intensityLevel, setIntensityLevel] = useState(75);

    const activeEffects = [atmosphericEnabled, vitalEnabled, neuralEnabled].filter(Boolean).length;

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe atmospheric-neural">
              Combined Effects System
            </h1>
            <p className="text-lg atmospheric-text-ghost max-w-3xl mx-auto">
              Experience the full power of the alien biomechanical interface with all effect systems working in harmony
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Master Controls */}
            <div className="xl:col-span-1 space-y-6">
              <Container alienVariant="organism" atmospheric={atmosphericEnabled} vital={vitalEnabled} neural={neuralEnabled} className="p-4">
                <h3 className="font-bold atmospheric-text-vital mb-4">MASTER CONTROLS</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm atmospheric-text-ghost mb-2">
                      Master Intensity: {intensityLevel}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={intensityLevel}
                      onChange={(e) => setIntensityLevel(Number(e.target.value))}
                      className="w-full atmospheric-slider"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      variant={atmosphericEnabled ? 'vessel' : 'membrane'}
                      atmospheric={atmosphericEnabled}
                      fullWidth
                      onClick={() => setAtmosphericEnabled(!atmosphericEnabled)}
                      size="sm"
                    >
                      Atmospheric {atmosphericEnabled ? 'ON' : 'OFF'}
                    </Button>
                    
                    <Button
                      variant={vitalEnabled ? 'vessel' : 'membrane'}
                      vital={vitalEnabled}
                      atmospheric
                      fullWidth
                      onClick={() => setVitalEnabled(!vitalEnabled)}
                      size="sm"
                    >
                      Vital {vitalEnabled ? 'ON' : 'OFF'}
                    </Button>
                    
                    <Button
                      variant={neuralEnabled ? 'neural' : 'membrane'}
                      atmospheric
                      fullWidth
                      onClick={() => setNeuralEnabled(!neuralEnabled)}
                      size="sm"
                      className={neuralEnabled ? 'atmospheric-neural' : ''}
                    >
                      Neural {neuralEnabled ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                  
                  <div className="pt-3 border-t atmospheric-border-vessel">
                    <div className="text-xs atmospheric-text-ghost mb-2">Active Systems:</div>
                    <div className="text-sm atmospheric-text-vital">{activeEffects} / 3</div>
                    <div className="text-xs atmospheric-text-ghost">
                      Status: {activeEffects === 3 ? 'TRANSCENDENT' : activeEffects === 2 ? 'ENHANCED' : activeEffects === 1 ? 'BASIC' : 'DORMANT'}
                    </div>
                  </div>
                </div>
              </Container>

              <PerformanceMonitor effectsActive={activeEffects + (intensityLevel > 50 ? 1 : 0)} />
            </div>

            {/* Combined Demo Area */}
            <div className="xl:col-span-3 space-y-6">
              <h3 className="text-xl font-bold atmospheric-text-vital">Ultimate Biomechanical Interface</h3>
              
              {/* Master Organism Display */}
              <Container 
                alienVariant="organism" 
                atmospheric={atmosphericEnabled} 
                vital={vitalEnabled} 
                neural={neuralEnabled}
                className="p-8"
                style={{
                  transform: activeEffects === 3 ? `scale(${1 + (intensityLevel / 500)})` : 'scale(1)',
                  transition: 'transform 0.5s ease'
                }}
              >
                <div className="text-center space-y-6">
                  <div className="text-6xl">
                    {activeEffects === 3 ? '👁️‍🗨️' : activeEffects === 2 ? '🧬' : activeEffects === 1 ? '🫀' : '💤'}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      activeEffects === 3 ? 'atmospheric-text-vital atmospheric-breathe atmospheric-neural' :
                      activeEffects === 2 ? 'atmospheric-text-vital atmospheric-breathe' :
                      activeEffects === 1 ? 'atmospheric-text-vital' :
                      'text-gray-500'
                    }`}>
                      {activeEffects === 3 ? 'FULLY AWAKENED ORGANISM' :
                       activeEffects === 2 ? 'PARTIALLY AWAKENED' :
                       activeEffects === 1 ? 'BASIC FUNCTIONS ONLINE' :
                       'ORGANISM DORMANT'}
                    </h2>
                    <p className="atmospheric-text-ghost">
                      Integration Level: {Math.floor((activeEffects / 3) * intensityLevel)}% • 
                      Consciousness: {activeEffects === 3 && intensityLevel > 80 ? 'TRANSCENDENT' : 
                                      activeEffects >= 2 ? 'AWAKENED' : 
                                      activeEffects === 1 ? 'BASIC' : 'NONE'}
                    </p>
                  </div>
                </div>
              </Container>

              {/* Effect Combination Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    title: 'Pure Atmospheric', 
                    effects: { atmospheric: atmosphericEnabled, vital: false, neural: false },
                    icon: '🌊',
                    desc: 'Breathing membranes only'
                  },
                  { 
                    title: 'Living Chamber', 
                    effects: { atmospheric: atmosphericEnabled, vital: vitalEnabled, neural: false },
                    icon: '💓',
                    desc: 'Atmospheric + Vital'
                  },
                  { 
                    title: 'Conscious Interface', 
                    effects: { atmospheric: atmosphericEnabled, vital: false, neural: neuralEnabled },
                    icon: '🧠',
                    desc: 'Atmospheric + Neural'
                  },
                  { 
                    title: 'Transcendent Being', 
                    effects: { atmospheric: atmosphericEnabled, vital: vitalEnabled, neural: neuralEnabled },
                    icon: '✨',
                    desc: 'All systems combined'
                  },
                ].map((item, index) => (
                  <Card 
                    key={index}
                    variant="alien-cavity" 
                    atmospheric={item.effects.atmospheric}
                    vital={item.effects.vital}
                    neural={item.effects.neural}
                    className={`
                      ${item.effects.atmospheric ? 'atmospheric-breathe' : ''}
                      ${item.effects.neural ? 'atmospheric-neural' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      opacity: 0.7 + (intensityLevel / 300)
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <span className="text-xl">{item.icon}</span>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs atmospheric-text-ghost">{item.desc}</p>
                      <div className="mt-2 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span>Atmospheric:</span>
                          <span className={item.effects.atmospheric ? 'atmospheric-text-vital' : 'text-gray-500'}>
                            {item.effects.atmospheric ? 'ON' : 'OFF'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vital:</span>
                          <span className={item.effects.vital ? 'atmospheric-text-vital' : 'text-gray-500'}>
                            {item.effects.vital ? 'ON' : 'OFF'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Neural:</span>
                          <span className={item.effects.neural ? 'atmospheric-text-vital' : 'text-gray-500'}>
                            {item.effects.neural ? 'ON' : 'OFF'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Real-time Metrics Dashboard */}
              <Container alienVariant="chamber" atmospheric={atmosphericEnabled} vital={vitalEnabled} neural={neuralEnabled} className="p-6">
                <h4 className="font-bold atmospheric-text-vital mb-4">REAL-TIME SYSTEM METRICS</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-semibold atmospheric-text-vital text-sm">ATMOSPHERIC LAYER</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Membrane Permeability:</span>
                        <span className="atmospheric-text-vital">
                          {atmosphericEnabled ? `${Math.floor(intensityLevel * 0.8)}%` : 'SEALED'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Breathing Rate:</span>
                        <span className="atmospheric-text-vital">
                          {atmosphericEnabled ? `${Math.floor(12 + (intensityLevel / 10))} BPM` : 'STATIC'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-semibold atmospheric-text-vital text-sm">VITAL SYSTEMS</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Life Force:</span>
                        <span className="atmospheric-text-vital">
                          {vitalEnabled ? `${Math.floor(intensityLevel * 0.9)}%` : 'ABSENT'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Pulse Strength:</span>
                        <span className="atmospheric-text-vital">
                          {vitalEnabled ? (intensityLevel > 70 ? 'STRONG' : intensityLevel > 40 ? 'MODERATE' : 'WEAK') : 'NONE'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-semibold atmospheric-text-vital text-sm">NEURAL NETWORK</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Synaptic Activity:</span>
                        <span className="atmospheric-text-vital">
                          {neuralEnabled ? `${Math.floor(400 + (intensityLevel * 6))} Hz` : 'SILENT'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Consciousness:</span>
                        <span className="atmospheric-text-vital">
                          {neuralEnabled ? (intensityLevel > 80 ? 'TRANSCENDENT' : intensityLevel > 50 ? 'AWARE' : 'BASIC') : 'ABSENT'}
                        </span>
                      </div>
                    </div>
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