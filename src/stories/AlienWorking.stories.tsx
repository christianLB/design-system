import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { Progress } from '../components/Progress/Progress';
import { Badge } from '../components/Badge/Badge';
import { Alert } from '../components/Alert/Alert';

const meta: Meta = {
  title: 'Alien/Working Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Working alien theme examples with practical development scenarios and real-world applications',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicComponents: Story = {
  render: () => {
    // Set theme on mount for proper alien styling
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'alien');
    }, []);

    return (
      <div className="theme-atmospheric min-h-screen p-8 bg-black text-white">
        <div className="atmospheric-membrane opacity-20 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Alien Components - All Variants
            </h1>
            <p className="text-lg atmospheric-text-ghost">
              Complete showcase of alien biomechanical components ready for production use
            </p>
          </div>

          {/* Button Variants */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Button Variants</h2>
            <Container alienVariant="chamber" atmospheric className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="membrane" atmospheric>
                  Membrane Interface
                </Button>
                <Button variant="vessel" vital atmospheric>
                  Vessel Control
                </Button>
                <Button variant="neural" atmospheric className="atmospheric-neural">
                  Neural Network
                </Button>
                <Button variant="organism" atmospheric vital>
                  Organism System
                </Button>
              </div>
              
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-semibold atmospheric-text-vital">Different Sizes</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="membrane" atmospheric size="whisper">
                    Whisper
                  </Button>
                  <Button variant="vessel" vital atmospheric size="sm">
                    Small
                  </Button>
                  <Button variant="neural" atmospheric size="default" className="atmospheric-neural">
                    Default
                  </Button>
                  <Button variant="organism" atmospheric vital size="lg">
                    Large
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-semibold atmospheric-text-vital">With Effects</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="membrane" atmospheric className="atmospheric-breathe">
                    Breathing Effect
                  </Button>
                  <Button variant="vessel" vital atmospheric className="atmospheric-pulse">
                    Pulse Effect
                  </Button>
                  <Button variant="neural" atmospheric className="atmospheric-neural">
                    Neural Effect
                  </Button>
                </div>
              </div>
            </Container>
          </section>

          {/* Card Variants */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Card variant="alien-chamber" atmospheric>
                <CardHeader>
                  <CardTitle>🫁 Bio Chamber</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm atmospheric-text-ghost">
                    Deep organ chamber interface for biological monitoring and life support systems.
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Status:</span>
                      <span className="atmospheric-text-vital">BREATHING</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Pressure:</span>
                      <span className="atmospheric-text-vital">1.2 ATM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="membrane" atmospheric size="sm" fullWidth>
                    Access Chamber
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="alien-organ" atmospheric vital>
                <CardHeader>
                  <CardTitle>🧠 Living Organ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm atmospheric-text-ghost">
                    Biomechanical organ system with integrated vital sign monitoring and cellular regeneration.
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Vitality:</span>
                      <span className="atmospheric-text-vital">OPTIMAL</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Regeneration:</span>
                      <span className="atmospheric-text-vital">156%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="vessel" vital atmospheric size="sm" fullWidth>
                    Enhance Vitals
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="alien-membrane" atmospheric>
                <CardHeader>
                  <CardTitle>🧬 Cell Membrane</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm atmospheric-text-ghost">
                    Protective membrane barrier with selective permeability and adaptive molecular transport.
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Permeability:</span>
                      <span className="atmospheric-text-vital">SELECTIVE</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Integrity:</span>
                      <span className="atmospheric-text-vital">98.7%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="membrane" atmospheric size="sm" fullWidth>
                    Control Membrane
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="alien-cavity" atmospheric vital neural>
                <CardHeader>
                  <CardTitle>🖤 Body Cavity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm atmospheric-text-ghost">
                    Internal body space with full atmospheric, vital, and neural integration systems.
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Integration:</span>
                      <span className="atmospheric-text-vital">COMPLETE</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="atmospheric-text-ghost">Consciousness:</span>
                      <span className="atmospheric-text-vital">AWAKE</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="neural" atmospheric size="sm" fullWidth className="atmospheric-neural">
                    Neural Interface
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Container Variants */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Container Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Container alienVariant="organism" atmospheric className="p-6">
                <h3 className="font-bold atmospheric-text-vital mb-3">Organism Container</h3>
                <p className="text-sm atmospheric-text-ghost mb-4">
                  Circular organic shape with deep shadows and breathing effects
                </p>
                <div className="space-y-2">
                  <Badge variant="membrane" atmospheric>Breathing Active</Badge>
                  <div className="text-xs atmospheric-text-ghost">
                    Perfect for displaying living systems and organic interfaces
                  </div>
                </div>
              </Container>

              <Container alienVariant="chamber" atmospheric vital className="p-6">
                <h3 className="font-bold atmospheric-text-vital mb-3">Chamber Container</h3>
                <p className="text-sm atmospheric-text-ghost mb-4">
                  Deep organ chamber with complex gradients and vital signs
                </p>
                <div className="space-y-2">
                  <Badge variant="vessel" vital atmospheric>Vitals Online</Badge>
                  <div className="text-xs atmospheric-text-ghost">
                    Ideal for life support and monitoring systems
                  </div>
                </div>
              </Container>

              <Container alienVariant="membrane" atmospheric neural className="p-6">
                <h3 className="font-bold atmospheric-text-vital mb-3">Membrane Container</h3>
                <p className="text-sm atmospheric-text-ghost mb-4">
                  Protective vessel-like membrane with neural pathways
                </p>
                <div className="space-y-2">
                  <Badge variant="neural" atmospheric className="atmospheric-neural">Neural Active</Badge>
                  <div className="text-xs atmospheric-text-ghost">
                    Great for neural interfaces and consciousness bridges
                  </div>
                </div>
              </Container>
            </div>
          </section>

          {/* Progress and Status Indicators */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Progress & Status Indicators</h2>
            <Container alienVariant="cavity" atmospheric vital className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <h3 className="font-semibold atmospheric-text-vital">Progress Bars</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm atmospheric-text-ghost">Life Force Integration</label>
                      <Progress value={87} className="h-3 atmospheric-breathe" />
                    </div>
                    <div>
                      <label className="text-sm atmospheric-text-ghost">Neural Coherence</label>
                      <Progress value={94} className="h-3 atmospheric-neural" />
                    </div>
                    <div>
                      <label className="text-sm atmospheric-text-ghost">Membrane Integrity</label>
                      <Progress value={76} className="h-3" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold atmospheric-text-vital">Status Badges</h3>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="membrane" atmospheric>Membrane Active</Badge>
                      <Badge variant="vessel" vital atmospheric>Vitals Online</Badge>
                      <Badge variant="neural" atmospheric className="atmospheric-neural">Neural Linked</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="organism" atmospheric vital>Organism Awake</Badge>
                      <Badge variant="membrane" atmospheric className="atmospheric-pulse">System Alert</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Code Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Code Examples</h2>
            <Container alienVariant="organ" atmospheric className="p-6">
              <div className="space-y-6">
                
                <div>
                  <h3 className="font-semibold atmospheric-text-vital mb-3">Basic Button Usage</h3>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm atmospheric-border-vessel">
                    <pre className="atmospheric-text-ghost">
{`<Button variant="membrane" atmospheric>
  Membrane Interface
</Button>

<Button variant="vessel" vital atmospheric>
  Vessel Control
</Button>

<Button variant="neural" atmospheric className="atmospheric-neural">
  Neural Network
</Button>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold atmospheric-text-vital mb-3">Card with Effects</h3>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm atmospheric-border-vessel">
                    <pre className="atmospheric-text-ghost">
{`<Card variant="alien-chamber" atmospheric vital>
  <CardHeader>
    <CardTitle>Bio System Monitor</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Real-time biological monitoring</p>
  </CardContent>
  <CardFooter>
    <Button variant="membrane" atmospheric>
      Access System
    </Button>
  </CardFooter>
</Card>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold atmospheric-text-vital mb-3">Container with Multiple Effects</h3>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm atmospheric-border-vessel">
                    <pre className="atmospheric-text-ghost">
{`<Container 
  alienVariant="organism" 
  atmospheric 
  vital 
  neural
  className="p-6"
>
  <h2>Complete Integration</h2>
  <p>All alien effects combined</p>
</Container>`}
                    </pre>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all alien theme components with practical examples and code snippets ready for production use.'
      }
    }
  }
};

export const BiometricsWorkflow: Story = {
  render: () => {
    const [patientData, setPatientData] = useState({
      heartRate: 72,
      oxygenLevel: 98,
      neuralActivity: 847,
      cellularRegeneration: 156,
      membraneIntegrity: 94
    });

    const [monitoringActive, setMonitoringActive] = useState(true);
    const [alertLevel, setAlertLevel] = useState<'normal' | 'warning' | 'critical'>('normal');

    useEffect(() => {
      const interval = setInterval(() => {
        if (monitoringActive) {
          setPatientData(prev => ({
            heartRate: Math.max(60, Math.min(120, prev.heartRate + (Math.random() - 0.5) * 8)),
            oxygenLevel: Math.max(90, Math.min(100, prev.oxygenLevel + (Math.random() - 0.5) * 3)),
            neuralActivity: Math.max(400, Math.min(1200, prev.neuralActivity + (Math.random() - 0.5) * 100)),
            cellularRegeneration: Math.max(100, Math.min(200, prev.cellularRegeneration + (Math.random() - 0.5) * 10)),
            membraneIntegrity: Math.max(80, Math.min(100, prev.membraneIntegrity + (Math.random() - 0.5) * 5))
          }));

          // Determine alert level
          const newAlertLevel = 
            patientData.heartRate > 100 || patientData.oxygenLevel < 95 ? 'critical' :
            patientData.heartRate > 90 || patientData.oxygenLevel < 97 ? 'warning' : 'normal';
          setAlertLevel(newAlertLevel);
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [monitoringActive, patientData]);

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'alien');
    }, []);

    return (
      <div className="theme-atmospheric min-h-screen bg-black text-white">
        {/* Background Effects */}
        <div className="atmospheric-vessel opacity-15 pointer-events-none" />
        <div className="neural-pathways opacity-10 pointer-events-none" />
        
        <div className="p-6 space-y-6">
          
          {/* Header */}
          <div className="border-b atmospheric-border-vessel pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe">
                  Biometric Monitoring System
                </h1>
                <p className="atmospheric-text-ghost">
                  Advanced biomechanical patient monitoring • Real-time vital signs • Neural interface
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                  variant={alertLevel === 'critical' ? 'vessel' : alertLevel === 'warning' ? 'membrane' : 'organism'}
                  vital={alertLevel === 'critical'}
                  atmospheric
                  className={alertLevel === 'critical' ? 'atmospheric-pulse' : ''}
                >
                  {alertLevel.toUpperCase()}
                </Badge>
                <Button
                  variant={monitoringActive ? 'vessel' : 'membrane'}
                  vital={monitoringActive}
                  atmospheric
                  onClick={() => setMonitoringActive(!monitoringActive)}
                >
                  {monitoringActive ? 'MONITORING ACTIVE' : 'START MONITORING'}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Vital Signs Panel */}
            <div className="xl:col-span-1 space-y-6">
              
              <Card variant="alien-chamber" atmospheric vital className="atmospheric-breathe">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🫀</span>
                    Vital Signs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="atmospheric-text-ghost">Heart Rate</span>
                        <span className={`${
                          patientData.heartRate > 100 ? 'text-red-400' :
                          patientData.heartRate > 90 ? 'text-yellow-400' :
                          'atmospheric-text-vital'
                        }`}>
                          {Math.floor(patientData.heartRate)} BPM
                        </span>
                      </div>
                      <Progress 
                        value={(patientData.heartRate / 120) * 100} 
                        className="h-2 atmospheric-pulse" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="atmospheric-text-ghost">Oxygen Level</span>
                        <span className={`${
                          patientData.oxygenLevel < 95 ? 'text-red-400' :
                          patientData.oxygenLevel < 97 ? 'text-yellow-400' :
                          'atmospheric-text-vital'
                        }`}>
                          {Math.floor(patientData.oxygenLevel)}%
                        </span>
                      </div>
                      <Progress 
                        value={patientData.oxygenLevel} 
                        className="h-2 atmospheric-breathe" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="alien-organ" atmospheric neural>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🧠</span>
                    Neural Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="atmospheric-text-ghost">Synaptic Rate</span>
                        <span className="atmospheric-text-vital">
                          {Math.floor(patientData.neuralActivity)} Hz
                        </span>
                      </div>
                      <Progress 
                        value={(patientData.neuralActivity / 1200) * 100} 
                        className="h-2 atmospheric-neural" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="atmospheric-text-ghost">Consciousness</span>
                        <span className="atmospheric-text-vital">
                          {patientData.neuralActivity > 800 ? 'AWAKE' : 'DORMANT'}
                        </span>
                      </div>
                      <div className="text-xs atmospheric-text-ghost">
                        Neural coherence optimal
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {alertLevel !== 'normal' && (
                <Alert variant="alien-membrane" atmospheric>
                  <div className={alertLevel === 'critical' ? 'text-red-400' : 'text-yellow-400'}>
                    <strong>
                      {alertLevel === 'critical' ? '🚨 CRITICAL ALERT' : '⚠️ WARNING'}
                    </strong>
                    <p className="text-sm mt-1 atmospheric-text-ghost">
                      {alertLevel === 'critical' 
                        ? 'Patient vitals outside safe parameters. Immediate attention required.'
                        : 'Patient vitals approaching warning thresholds. Monitor closely.'
                      }
                    </p>
                  </div>
                </Alert>
              )}
            </div>

            {/* Main Monitoring Display */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Patient Overview */}
              <Container 
                alienVariant="organism" 
                atmospheric 
                vital={monitoringActive}
                neural={patientData.neuralActivity > 600}
                className="p-6"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold atmospheric-text-vital">
                    Patient Bio-Integration Status
                  </h2>
                  <div className={`text-6xl ${
                    alertLevel === 'critical' ? 'text-red-400 atmospheric-pulse' :
                    alertLevel === 'warning' ? 'text-yellow-400 atmospheric-breathe' :
                    'atmospheric-text-vital atmospheric-breathe'
                  }`}>
                    {alertLevel === 'critical' ? '🚨' : 
                     alertLevel === 'warning' ? '⚠️' : 
                     monitoringActive ? '💚' : '💤'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xs atmospheric-text-ghost">Heart Rate</div>
                      <div className="text-xl atmospheric-text-vital">{Math.floor(patientData.heartRate)}</div>
                      <div className="text-xs atmospheric-text-ghost">BPM</div>
                    </div>
                    <div>
                      <div className="text-xs atmospheric-text-ghost">Oxygen</div>
                      <div className="text-xl atmospheric-text-vital">{Math.floor(patientData.oxygenLevel)}</div>
                      <div className="text-xs atmospheric-text-ghost">%</div>
                    </div>
                    <div>
                      <div className="text-xs atmospheric-text-ghost">Neural</div>
                      <div className="text-xl atmospheric-text-vital">{Math.floor(patientData.neuralActivity)}</div>
                      <div className="text-xs atmospheric-text-ghost">Hz</div>
                    </div>
                    <div>
                      <div className="text-xs atmospheric-text-ghost">Regeneration</div>
                      <div className="text-xl atmospheric-text-vital">{Math.floor(patientData.cellularRegeneration)}</div>
                      <div className="text-xs atmospheric-text-ghost">%</div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Cellular Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <Card variant="alien-membrane" atmospheric>
                  <CardHeader>
                    <CardTitle>🧬 Cellular Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="atmospheric-text-ghost">Regeneration Rate</span>
                          <span className="atmospheric-text-vital">
                            {Math.floor(patientData.cellularRegeneration)}%
                          </span>
                        </div>
                        <Progress 
                          value={patientData.cellularRegeneration} 
                          className="h-2 atmospheric-breathe" 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="atmospheric-text-ghost">Membrane Integrity</span>
                          <span className="atmospheric-text-vital">
                            {Math.floor(patientData.membraneIntegrity)}%
                          </span>
                        </div>
                        <Progress 
                          value={patientData.membraneIntegrity} 
                          className="h-2" 
                        />
                      </div>

                      <div className="text-xs atmospheric-text-ghost space-y-1">
                        <div>• Cell division rate: {(patientData.cellularRegeneration * 2.4).toFixed(1)}M/sec</div>
                        <div>• Protein synthesis: {patientData.cellularRegeneration > 150 ? 'Enhanced' : 'Normal'}</div>
                        <div>• DNA repair: {patientData.membraneIntegrity > 90 ? 'Active' : 'Baseline'}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="membrane" atmospheric size="sm" fullWidth>
                      Run Deep Analysis
                    </Button>
                  </CardFooter>
                </Card>

                <Card variant="alien-cavity" atmospheric vital neural>
                  <CardHeader>
                    <CardTitle>🔬 Treatment Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        variant="vessel" 
                        vital 
                        atmospheric 
                        size="sm" 
                        fullWidth
                        disabled={alertLevel === 'normal'}
                      >
                        Emergency Stabilization
                      </Button>
                      <Button 
                        variant="membrane" 
                        atmospheric 
                        size="sm" 
                        fullWidth
                      >
                        Enhance Regeneration
                      </Button>
                      <Button 
                        variant="neural" 
                        atmospheric 
                        size="sm" 
                        fullWidth
                        className="atmospheric-neural"
                      >
                        Neural Interface Boost
                      </Button>
                      <Button 
                        variant="organism" 
                        atmospheric 
                        vital 
                        size="sm" 
                        fullWidth
                      >
                        Full System Integration
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs atmospheric-text-ghost">
                      Treatment options based on current biometric analysis
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world biometric monitoring system using alien theme components with live data updates and interactive treatment options.'
      }
    }
  }
};

export const LaboratoryInterface: Story = {
  render: () => {
    const [experiments, setExperiments] = useState([
      { id: 1, name: 'Neural Enhancement', status: 'running', progress: 67, type: 'neural' },
      { id: 2, name: 'Cellular Regeneration', status: 'completed', progress: 100, type: 'vital' },
      { id: 3, name: 'Membrane Analysis', status: 'pending', progress: 0, type: 'membrane' },
      { id: 4, name: 'Organism Integration', status: 'critical', progress: 23, type: 'organism' },
    ]);

    const [selectedExperiment, setSelectedExperiment] = useState(experiments[0]);
    const [labStatus, setLabStatus] = useState('operational');

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'alien');
      
      const interval = setInterval(() => {
        setExperiments(prev => prev.map(exp => {
          if (exp.status === 'running') {
            const newProgress = Math.min(100, exp.progress + Math.random() * 5);
            return {
              ...exp,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'running'
            };
          }
          return exp;
        }));
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'running': return 'atmospheric-text-vital';
        case 'completed': return 'text-green-400';
        case 'critical': return 'text-red-400';
        case 'pending': return 'text-gray-400';
        default: return 'atmospheric-text-ghost';
      }
    };

    return (
      <div className="theme-atmospheric min-h-screen bg-black text-white">
        <div className="atmospheric-organ opacity-10 pointer-events-none" />
        <div className="neural-pathways opacity-15 pointer-events-none" />
        
        <div className="p-6 space-y-6">
          
          {/* Header */}
          <div className="border-b atmospheric-border-vessel pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe">
                  Biomechanical Research Laboratory
                </h1>
                <p className="atmospheric-text-ghost">
                  Advanced genetic engineering • Neural enhancement • Cellular manipulation
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="organism" atmospheric vital>
                  Lab Status: {labStatus.toUpperCase()}
                </Badge>
                <Button variant="vessel" vital atmospheric>
                  Emergency Protocols
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Experiment List */}
            <div className="xl:col-span-1 space-y-4">
              <h2 className="text-xl font-bold atmospheric-text-vital">Active Experiments</h2>
              
              {experiments.map((experiment) => (
                <Card 
                  key={experiment.id}
                  variant="alien-chamber" 
                  atmospheric
                  vital={experiment.type === 'vital'}
                  neural={experiment.type === 'neural'}
                  className={`cursor-pointer transition-all ${
                    selectedExperiment.id === experiment.id ? 'ring-2 ring-orange-400/50' : ''
                  } ${experiment.status === 'running' ? 'atmospheric-breathe' : ''}`}
                  onClick={() => setSelectedExperiment(experiment)}
                >
                  <CardHeader>
                    <CardTitle className="text-sm">{experiment.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="atmospheric-text-ghost">Status:</span>
                        <span className={getStatusColor(experiment.status)}>
                          {experiment.status.toUpperCase()}
                        </span>
                      </div>
                      <Progress 
                        value={experiment.progress} 
                        className={`h-2 ${
                          experiment.type === 'neural' ? 'atmospheric-neural' :
                          experiment.type === 'vital' ? 'atmospheric-breathe' : ''
                        }`}
                      />
                      <div className="text-xs atmospheric-text-ghost">
                        {experiment.progress}% Complete
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Lab Interface */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Selected Experiment Details */}
              <Container 
                alienVariant="organism" 
                atmospheric 
                vital={selectedExperiment.type === 'vital'}
                neural={selectedExperiment.type === 'neural'}
                className="p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold atmospheric-text-vital">
                      {selectedExperiment.name}
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Experiment ID:</span>
                        <span className="atmospheric-text-vital">BIO-{selectedExperiment.id.toString().padStart(4, '0')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Type:</span>
                        <span className="atmospheric-text-vital">{selectedExperiment.type.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Progress:</span>
                        <span className="atmospheric-text-vital">{Math.floor(selectedExperiment.progress)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="atmospheric-text-ghost">Status:</span>
                        <span className={getStatusColor(selectedExperiment.status)}>
                          {selectedExperiment.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold atmospheric-text-vital">Progress Visualization</h3>
                    <div className="h-32 atmospheric-border-vessel rounded bg-black/30 relative overflow-hidden">
                      {selectedExperiment.type === 'neural' && (
                        <div className="neural-pathways opacity-40" />
                      )}
                      {selectedExperiment.type === 'vital' && (
                        <div className="atmospheric-membrane opacity-40" />
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-4xl ${
                          selectedExperiment.status === 'running' ? 'atmospheric-text-vital atmospheric-pulse' :
                          selectedExperiment.status === 'completed' ? 'text-green-400' :
                          selectedExperiment.status === 'critical' ? 'text-red-400 atmospheric-pulse' :
                          'text-gray-500'
                        }`}>
                          {selectedExperiment.type === 'neural' ? '🧠' :
                           selectedExperiment.type === 'vital' ? '🫀' :
                           selectedExperiment.type === 'membrane' ? '🧬' :
                           '👁️'}
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 left-2 text-xs atmospheric-text-ghost">
                        {selectedExperiment.status === 'running' ? 'PROCESSING...' :
                         selectedExperiment.status === 'completed' ? 'EXPERIMENT COMPLETE' :
                         selectedExperiment.status === 'critical' ? 'REQUIRES ATTENTION' :
                         'AWAITING INITIATION'}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Lab Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <Card variant="alien-membrane" atmospheric>
                  <CardHeader>
                    <CardTitle className="text-sm">Genetic Sequencer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl">🧬</div>
                      <div className="text-xs atmospheric-text-ghost">Status: READY</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="membrane" atmospheric size="sm" fullWidth>
                      Start Sequence
                    </Button>
                  </CardFooter>
                </Card>

                <Card variant="alien-organ" atmospheric vital>
                  <CardHeader>
                    <CardTitle className="text-sm">Cell Cultivator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl">🔬</div>
                      <div className="text-xs atmospheric-text-ghost">Status: GROWING</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="vessel" vital atmospheric size="sm" fullWidth>
                      Monitor Growth
                    </Button>
                  </CardFooter>
                </Card>

                <Card variant="alien-cavity" atmospheric neural>
                  <CardHeader>
                    <CardTitle className="text-sm">Neural Interface</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl">⚡</div>
                      <div className="text-xs atmospheric-text-ghost">Status: LINKED</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="neural" atmospheric size="sm" fullWidth className="atmospheric-neural">
                      Neural Bridge
                    </Button>
                  </CardFooter>
                </Card>

                <Card variant="alien-chamber" atmospheric vital neural>
                  <CardHeader>
                    <CardTitle className="text-sm">Bio-Reactor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl">⚗️</div>
                      <div className="text-xs atmospheric-text-ghost">Status: ACTIVE</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="organism" atmospheric vital size="sm" fullWidth>
                      Begin Synthesis
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Data Analysis */}
              <Container alienVariant="cavity" atmospheric className="p-6">
                <h3 className="text-xl font-bold atmospheric-text-vital mb-4">Laboratory Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold atmospheric-text-vital">Success Rates</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="atmospheric-text-ghost">Neural Enhancement:</span>
                        <span className="atmospheric-text-vital">94.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="atmospheric-text-ghost">Cellular Regeneration:</span>
                        <span className="atmospheric-text-vital">87.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="atmospheric-text-ghost">Membrane Integration:</span>
                        <span className="atmospheric-text-vital">91.8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold atmospheric-text-vital">Resource Usage</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="atmospheric-text-ghost">Processing Power:</span>
                          <span className="atmospheric-text-vital">78%</span>
                        </div>
                        <Progress value={78} className="h-2 atmospheric-neural" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="atmospheric-text-ghost">Bio-Material:</span>
                          <span className="atmospheric-text-vital">45%</span>
                        </div>
                        <Progress value={45} className="h-2 atmospheric-breathe" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold atmospheric-text-vital">Active Protocols</h4>
                    <div className="space-y-1 text-sm">
                      <Badge variant="membrane" atmospheric size="sm">Sterile Environment</Badge>
                      <Badge variant="vessel" vital atmospheric size="sm">Bio-Safety Level 4</Badge>
                      <Badge variant="neural" atmospheric size="sm" className="atmospheric-neural">Neural Shielding</Badge>
                      <Badge variant="organism" atmospheric vital size="sm">Life Support Active</Badge>
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
  parameters: {
    docs: {
      description: {
        story: 'Advanced laboratory interface for biomechanical research with real-time experiment monitoring and interactive equipment controls.'
      }
    }
  }
};

export const ProductionDashboard: Story = {
  render: () => {
    const [systemMetrics, setSystemMetrics] = useState({
      uptime: 99.7,
      throughput: 847,
      errorRate: 0.3,
      memoryUsage: 67,
      cpuLoad: 45,
      activeConnections: 1247
    });

    const [alerts] = useState([
      { id: 1, level: 'warning', message: 'Neural pathway optimization recommended', timestamp: '2 min ago' },
      { id: 2, level: 'info', message: 'Membrane integrity check completed', timestamp: '5 min ago' },
      { id: 3, level: 'success', message: 'Cellular regeneration process enhanced', timestamp: '12 min ago' }
    ]);

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'alien');
      
      const interval = setInterval(() => {
        setSystemMetrics(prev => ({
          uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.5)),
          throughput: Math.max(500, Math.min(1200, prev.throughput + (Math.random() - 0.5) * 100)),
          errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.2)),
          memoryUsage: Math.max(40, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
          cpuLoad: Math.max(20, Math.min(80, prev.cpuLoad + (Math.random() - 0.5) * 10)),
          activeConnections: Math.max(800, Math.min(1500, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100)))
        }));
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="theme-atmospheric min-h-screen bg-black text-white">
        <div className="atmospheric-vessel opacity-10 pointer-events-none" />
        
        <div className="p-6 space-y-6">
          
          {/* Header */}
          <div className="border-b atmospheric-border-vessel pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe">
                  Biomechanical Production Dashboard
                </h1>
                <p className="atmospheric-text-ghost">
                  Real-time system monitoring • Performance analytics • Health metrics
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                  variant="organism" 
                  atmospheric 
                  vital
                  className="atmospheric-pulse"
                >
                  SYSTEM OPERATIONAL
                </Badge>
                <Button variant="vessel" vital atmospheric>
                  Emergency Shutdown
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            
            <Card variant="alien-chamber" atmospheric>
              <CardContent className="p-4 text-center">
                <div className="text-xs atmospheric-text-ghost mb-1">System Uptime</div>
                <div className="text-2xl font-bold atmospheric-text-vital">
                  {systemMetrics.uptime.toFixed(1)}%
                </div>
                <div className="text-xs atmospheric-text-ghost">24/7 Operations</div>
              </CardContent>
            </Card>

            <Card variant="alien-organ" atmospheric vital>
              <CardContent className="p-4 text-center">
                <div className="text-xs atmospheric-text-ghost mb-1">Throughput</div>
                <div className="text-2xl font-bold atmospheric-text-vital">
                  {Math.floor(systemMetrics.throughput)}
                </div>
                <div className="text-xs atmospheric-text-ghost">requests/sec</div>
              </CardContent>
            </Card>

            <Card variant="alien-membrane" atmospheric>
              <CardContent className="p-4 text-center">
                <div className="text-xs atmospheric-text-ghost mb-1">Error Rate</div>
                <div className={`text-2xl font-bold ${
                  systemMetrics.errorRate > 2 ? 'text-red-400' : 
                  systemMetrics.errorRate > 1 ? 'text-yellow-400' : 
                  'atmospheric-text-vital'
                }`}>
                  {systemMetrics.errorRate.toFixed(1)}%
                </div>
                <div className="text-xs atmospheric-text-ghost">Error threshold</div>
              </CardContent>
            </Card>

            <Card variant="alien-cavity" atmospheric neural>
              <CardContent className="p-4 text-center">
                <div className="text-xs atmospheric-text-ghost mb-1">Memory Usage</div>
                <div className={`text-2xl font-bold ${
                  systemMetrics.memoryUsage > 80 ? 'text-red-400' : 
                  systemMetrics.memoryUsage > 70 ? 'text-yellow-400' : 
                  'atmospheric-text-vital'
                }`}>
                  {Math.floor(systemMetrics.memoryUsage)}%
                </div>
                <div className="text-xs atmospheric-text-ghost">Memory allocated</div>
              </CardContent>
            </Card>

            <Card variant="alien-chamber" atmospheric vital>
              <CardContent className="p-4 text-center">
                <div className="text-xs atmospheric-text-ghost mb-1">CPU Load</div>
                <div className="text-2xl font-bold atmospheric-text-vital">
                  {Math.floor(systemMetrics.cpuLoad)}%
                </div>
                <div className="text-xs atmospheric-text-ghost">Processing power</div>
              </CardContent>
            </Card>

            <Card variant="alien-organ" atmospheric neural>
              <CardContent className="p-4 text-center">
                <div className="text-xs atmospheric-text-ghost mb-1">Connections</div>
                <div className="text-2xl font-bold atmospheric-text-vital">
                  {systemMetrics.activeConnections.toLocaleString()}
                </div>
                <div className="text-xs atmospheric-text-ghost">Active sessions</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Performance Charts */}
            <div className="xl:col-span-2 space-y-6">
              
              <Container alienVariant="organism" atmospheric vital className="p-6">
                <h2 className="text-xl font-bold atmospheric-text-vital mb-4">System Performance</h2>
                <div className="space-y-6">
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="atmospheric-text-ghost">CPU Load</span>
                      <span className="atmospheric-text-vital">{Math.floor(systemMetrics.cpuLoad)}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuLoad} className="h-3 atmospheric-pulse" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="atmospheric-text-ghost">Memory Usage</span>
                      <span className="atmospheric-text-vital">{Math.floor(systemMetrics.memoryUsage)}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-3 atmospheric-breathe" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="atmospheric-text-ghost">Network Throughput</span>
                      <span className="atmospheric-text-vital">{Math.floor(systemMetrics.throughput)} req/s</span>
                    </div>
                    <Progress value={(systemMetrics.throughput / 1200) * 100} className="h-3 atmospheric-neural" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-black/30 atmospheric-border-vessel rounded p-3 text-center">
                      <div className="text-xs atmospheric-text-ghost">Peak Performance</div>
                      <div className="text-lg atmospheric-text-vital font-semibold">98.4%</div>
                    </div>
                    <div className="bg-black/30 atmospheric-border-vessel rounded p-3 text-center">
                      <div className="text-xs atmospheric-text-ghost">Avg Response Time</div>
                      <div className="text-lg atmospheric-text-vital font-semibold">23ms</div>
                    </div>
                    <div className="bg-black/30 atmospheric-border-vessel rounded p-3 text-center">
                      <div className="text-xs atmospheric-text-ghost">Data Processed</div>
                      <div className="text-lg atmospheric-text-vital font-semibold">2.4TB</div>
                    </div>
                  </div>
                </div>
              </Container>

              <Container alienVariant="cavity" atmospheric neural className="p-6">
                <h2 className="text-xl font-bold atmospheric-text-vital mb-4">Neural Network Status</h2>
                <div className="h-48 atmospheric-border-organ rounded bg-black/30 relative overflow-hidden">
                  <div className="neural-pathways opacity-30" />
                  <div className="grid grid-cols-8 grid-rows-6 h-full gap-1 p-4">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const isActive = Math.random() < 0.7;
                      const intensity = Math.random();
                      return (
                        <div
                          key={i}
                          className={`rounded-full transition-all duration-1000 ${
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
                  <div className="absolute bottom-2 left-2 text-xs atmospheric-text-ghost">
                    Neural Nodes: {Math.floor(48 * 0.7)} active / 48 total
                  </div>
                </div>
              </Container>
            </div>

            {/* Alerts and Controls */}
            <div className="space-y-6">
              
              <Card variant="alien-membrane" atmospheric>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded atmospheric-border-vessel ${
                        alert.level === 'warning' ? 'bg-yellow-400/10 border-yellow-400/30' :
                        alert.level === 'info' ? 'bg-blue-400/10 border-blue-400/30' :
                        'bg-green-400/10 border-green-400/30'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={
                            alert.level === 'warning' ? 'text-yellow-400' :
                            alert.level === 'info' ? 'text-blue-400' :
                            'text-green-400'
                          }>
                            {alert.level === 'warning' ? '⚠️' : alert.level === 'info' ? 'ℹ️' : '✅'}
                          </span>
                          <span className="text-xs atmospheric-text-ghost">{alert.timestamp}</span>
                        </div>
                        <div className="text-sm atmospheric-text-vital">{alert.message}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="membrane" atmospheric size="sm" fullWidth>
                    View All Alerts
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="alien-organ" atmospheric vital>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="vessel" vital atmospheric size="sm" fullWidth>
                      Optimize Performance
                    </Button>
                    <Button variant="membrane" atmospheric size="sm" fullWidth>
                      Run Diagnostics
                    </Button>
                    <Button variant="neural" atmospheric size="sm" fullWidth className="atmospheric-neural">
                      Neural Calibration
                    </Button>
                    <Button variant="organism" atmospheric vital size="sm" fullWidth>
                      Full System Check
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card variant="alien-cavity" atmospheric neural>
                <CardHeader>
                  <CardTitle className="text-sm">Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="atmospheric-text-ghost">Processing:</span>
                        <span className="atmospheric-text-vital">78%</span>
                      </div>
                      <Progress value={78} className="h-2 atmospheric-neural" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="atmospheric-text-ghost">Storage:</span>
                        <span className="atmospheric-text-vital">45%</span>
                      </div>
                      <Progress value={45} className="h-2 atmospheric-breathe" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="atmospheric-text-ghost">Network:</span>
                        <span className="atmospheric-text-vital">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Production-ready dashboard interface with real-time system monitoring, performance metrics, and operational controls using alien theme components.'
      }
    }
  }
};