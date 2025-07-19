import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { Button } from '../components/Button/Button';

const meta: Meta = {
  title: 'Themes/Alien Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive showcase of the alien biomechanical theme inspired by H.R. Giger\'s aesthetic. Features atmospheric breathing effects, neural pathways, and organic interfaces.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AlienThemeOverview: Story = {
  render: () => (
    <div className="theme-atmospheric min-h-screen p-8">
      <Container alienVariant="organism" atmospheric vital maxWidth="xl">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold atmospheric-text-vital atmospheric-breathe">
              Alien Biomechanical Theme
            </h1>
            <p className="text-lg atmospheric-text-ghost max-w-3xl mx-auto">
              Experience the organic interface inspired by H.R. Giger's biomechanical aesthetic. 
              This theme creates an immersive environment that evokes the sensation of inhabiting 
              a living structure with breathing effects, neural pathways, and atmospheric interactions.
            </p>
          </div>

          {/* Container Variants */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Container Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Container alienVariant="organism" atmospheric className="p-6 min-h-32">
                <h3 className="font-semibold atmospheric-text-vital mb-2">Organism</h3>
                <p className="text-sm atmospheric-text-ghost">Circular organic shape with deep shadows</p>
              </Container>
              
              <Container alienVariant="chamber" atmospheric className="p-6 min-h-32">
                <h3 className="font-semibold atmospheric-text-vital mb-2">Chamber</h3>
                <p className="text-sm atmospheric-text-ghost">Deep organ chamber with complex gradients</p>
              </Container>
              
              <Container alienVariant="organ" atmospheric className="p-6 min-h-32">
                <h3 className="font-semibold atmospheric-text-vital mb-2">Organ</h3>
                <p className="text-sm atmospheric-text-ghost">Biomechanical organ with conic gradients</p>
              </Container>
              
              <Container alienVariant="membrane" atmospheric className="p-6 min-h-32">
                <h3 className="font-semibold atmospheric-text-vital mb-2">Membrane</h3>
                <p className="text-sm atmospheric-text-ghost">Protective vessel-like membrane</p>
              </Container>
              
              <Container alienVariant="cavity" atmospheric className="p-6 min-h-32">
                <h3 className="font-semibold atmospheric-text-vital mb-2">Cavity</h3>
                <p className="text-sm atmospheric-text-ghost">Internal cavity with membrane effects</p>
              </Container>
              
              <Container alienVariant="organism" atmospheric vital neural className="p-6 min-h-32">
                <h3 className="font-semibold atmospheric-text-vital mb-2">Full Effects</h3>
                <p className="text-sm atmospheric-text-ghost">All atmospheric effects combined</p>
              </Container>
            </div>
          </section>

          {/* Card Variants */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="alien-chamber" atmospheric>
                <CardHeader>
                  <CardTitle>Chamber</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Deep organ chamber interface</p>
                  <p className="text-xs atmospheric-text-vital mt-2">Status: BREATHING</p>
                </CardContent>
              </Card>
              
              <Card variant="alien-organ" atmospheric>
                <CardHeader>
                  <CardTitle>Organ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Biomechanical organ system</p>
                  <p className="text-xs atmospheric-text-vital mt-2">Function: OPTIMAL</p>
                </CardContent>
              </Card>
              
              <Card variant="alien-membrane" atmospheric>
                <CardHeader>
                  <CardTitle>Membrane</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Protective barrier layer</p>
                  <p className="text-xs atmospheric-text-vital mt-2">Integrity: INTACT</p>
                </CardContent>
              </Card>
              
              <Card variant="alien-cavity" atmospheric>
                <CardHeader>
                  <CardTitle>Cavity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Internal body space</p>
                  <p className="text-xs atmospheric-text-vital mt-2">Pressure: STABLE</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Atmospheric Effects Demo */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Atmospheric Effects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card variant="alien-chamber" atmospheric vital>
                <CardHeader>
                  <CardTitle>Vital + Atmospheric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Breathing chamber with vital signs</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">Oxygen</span>
                      <span className="text-xs atmospheric-text-vital">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Pressure</span>
                      <span className="text-xs atmospheric-text-vital">1.2 ATM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs atmospheric-text-ghost">Breathing cycle active</p>
                </CardFooter>
              </Card>
              
              <Card variant="alien-organ" atmospheric neural>
                <CardHeader>
                  <CardTitle>Neural + Atmospheric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Neural pathways with synaptic activity</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">Synaptic Rate</span>
                      <span className="text-xs atmospheric-text-vital">847 Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Coherence</span>
                      <span className="text-xs atmospheric-text-vital">HIGH</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs atmospheric-text-ghost">Neural activity syncing</p>
                </CardFooter>
              </Card>
              
              <Card variant="alien-cavity" atmospheric vital neural>
                <CardHeader>
                  <CardTitle>Complete Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Full alien effects stack</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">Life Force</span>
                      <span className="text-xs atmospheric-text-vital">STRONG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Integration</span>
                      <span className="text-xs atmospheric-text-vital">COMPLETE</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs atmospheric-text-ghost">Organism awakened</p>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Interactive Demo */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Interactive Elements</h2>
            <p className="atmospheric-text-ghost">Hover over the elements below to experience the organic interactions</p>
            
            <div className="space-y-8">
              {/* Button Examples */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold atmospheric-text-vital">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="membrane" atmospheric>
                    Membrane Interface
                  </Button>
                  <Button variant="vessel" vital atmospheric>
                    Vital Function
                  </Button>
                  <Button variant="neural" atmospheric>
                    Neural Network
                  </Button>
                </div>
              </div>

              {/* Interactive Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold atmospheric-text-vital">Interactive Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card variant="alien-chamber" atmospheric vital neural>
                    <CardHeader>
                      <CardTitle>Living Chamber</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">A fully integrated alien interface with all atmospheric effects</p>
                      <ul className="text-xs space-y-1">
                        <li>• Atmospheric breathing patterns</li>
                        <li>• Neural pathway visualization</li>
                        <li>• Vital sign monitoring</li>
                        <li>• Organic hover interactions</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs atmospheric-text-ghost">Hover to experience the awakening</p>
                    </CardFooter>
                  </Card>
                  
                  <Card variant="alien-cavity" atmospheric vital neural>
                    <CardHeader>
                      <CardTitle>Deep Organism</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Enter the depths of the biomechanical organism</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs">Depth Level</span>
                          <span className="text-xs atmospheric-text-vital">∞</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Consciousness</span>
                          <span className="text-xs atmospheric-text-vital">TRANSCENDENT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Evolution</span>
                          <span className="text-xs atmospheric-text-vital">ONGOING</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs atmospheric-text-ghost">Merge with the organism</p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CSS Classes Reference */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Available CSS Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h4 className="font-semibold atmospheric-text-vital text-sm mb-2">Animation Classes</h4>
                <ul className="text-xs atmospheric-text-ghost space-y-1">
                  <li>• atmospheric-breathe</li>
                  <li>• atmospheric-neural</li>
                  <li>• atmospheric-pulse</li>
                  <li>• atmospheric-flow</li>
                </ul>
              </Container>
              
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h4 className="font-semibold atmospheric-text-vital text-sm mb-2">Background Classes</h4>
                <ul className="text-xs atmospheric-text-ghost space-y-1">
                  <li>• atmospheric-membrane</li>
                  <li>• atmospheric-vessel</li>
                  <li>• atmospheric-organ</li>
                  <li>• neural-pathways</li>
                </ul>
              </Container>
              
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h4 className="font-semibold atmospheric-text-vital text-sm mb-2">Border Classes</h4>
                <ul className="text-xs atmospheric-text-ghost space-y-1">
                  <li>• atmospheric-border-cell</li>
                  <li>• atmospheric-border-vessel</li>
                  <li>• atmospheric-border-organ</li>
                  <li>• atmospheric-border-cavity</li>
                </ul>
              </Container>
              
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h4 className="font-semibold atmospheric-text-vital text-sm mb-2">Depth Classes</h4>
                <ul className="text-xs atmospheric-text-ghost space-y-1">
                  <li>• atmospheric-depth-membrane</li>
                  <li>• atmospheric-depth-organ</li>
                  <li>• atmospheric-depth-cavity</li>
                  <li>• atmospheric-interactive</li>
                </ul>
              </Container>
              
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h4 className="font-semibold atmospheric-text-vital text-sm mb-2">Text Classes</h4>
                <ul className="text-xs atmospheric-text-ghost space-y-1">
                  <li>• atmospheric-text-vital</li>
                  <li>• atmospheric-text-ghost</li>
                  <li>• atmospheric-text-breathe</li>
                  <li>• atmospheric-font-organic</li>
                </ul>
              </Container>
              
              <Container alienVariant="membrane" atmospheric className="p-4">
                <h4 className="font-semibold atmospheric-text-vital text-sm mb-2">State Classes</h4>
                <ul className="text-xs atmospheric-text-ghost space-y-1">
                  <li>• vital-element active</li>
                  <li>• atmospheric-state-vital</li>
                  <li>• atmospheric-state-neural</li>
                  <li>• atmospheric-focus</li>
                </ul>
              </Container>
            </div>
          </section>

          {/* Usage Examples */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold atmospheric-text-vital">Usage Examples</h2>
            <Container alienVariant="cavity" atmospheric className="p-6">
              <h3 className="font-semibold atmospheric-text-vital mb-4">Code Examples</h3>
              <div className="space-y-4 atmospheric-font-neural">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold atmospheric-text-vital">Card with Alien Theme:</h4>
                  <code className="block p-3 bg-black/30 rounded text-xs atmospheric-text-ghost">
                    {`<Card variant="alien-chamber" atmospheric vital>
  <CardContent>Living interface</CardContent>
</Card>`}
                  </code>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold atmospheric-text-vital">Container with Organic Shape:</h4>
                  <code className="block p-3 bg-black/30 rounded text-xs atmospheric-text-ghost">
                    {`<Container 
  alienVariant="organism" 
  atmospheric 
  vital 
  neural
>
  Content
</Container>`}
                  </code>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold atmospheric-text-vital">Theme Application:</h4>
                  <code className="block p-3 bg-black/30 rounded text-xs atmospheric-text-ghost">
                    {`<div className="theme-atmospheric">
  <!-- All content gets alien theme -->
</div>`}
                  </code>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of the alien biomechanical theme showcasing all components, effects, and usage patterns. This immersive interface creates the sensation of inhabiting a living organism with breathing effects, neural pathways, and organic interactions.',
      },
    },
  },
};

export const AlienComponentGallery: Story = {
  render: () => (
    <div className="theme-atmospheric min-h-screen p-8">
      <Container alienVariant="chamber" atmospheric vital maxWidth="xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe mb-4">
              Alien Component Gallery
            </h1>
            <p className="atmospheric-text-ghost">
              Explore all alien theme components in their natural biomechanical habitat
            </p>
          </div>

          {/* Living Dashboard Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Living Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card variant="alien-chamber" atmospheric vital className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Organism Status Monitor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Respiratory Rate</span>
                        <span className="atmospheric-text-vital">16 BPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Neural Activity</span>
                        <span className="atmospheric-text-vital">847 Hz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Membrane Integrity</span>
                        <span className="atmospheric-text-vital">98.7%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Core Temperature</span>
                        <span className="atmospheric-text-vital">37.2°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Circulation Flow</span>
                        <span className="atmospheric-text-vital">5.2 L/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Consciousness Level</span>
                        <span className="atmospheric-text-vital">AWAKE</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="membrane" atmospheric size="whisper">
                      Analyze
                    </Button>
                    <Button variant="vessel" vital atmospheric size="whisper">
                      Stimulate
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="space-y-4">
                <Card variant="alien-organ" atmospheric neural>
                  <CardHeader>
                    <CardTitle className="text-sm">Neural Pathways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs mb-2">Active connections: 2,847</p>
                    <p className="text-xs atmospheric-text-vital">Status: SYNCING</p>
                  </CardContent>
                </Card>
                
                <Card variant="alien-membrane" atmospheric>
                  <CardHeader>
                    <CardTitle className="text-sm">Protective Barriers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs mb-2">Permeability: Selective</p>
                    <p className="text-xs atmospheric-text-vital">Status: INTACT</p>
                  </CardContent>
                </Card>
                
                <Card variant="alien-cavity" atmospheric vital>
                  <CardHeader>
                    <CardTitle className="text-sm">Internal Chambers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs mb-2">Pressure: 1.2 ATM</p>
                    <p className="text-xs atmospheric-text-vital">Status: STABLE</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Control Interface */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Biomechanical Controls</h2>
            <Container alienVariant="organ" atmospheric className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold atmospheric-text-vital">Respiratory Control</h3>
                  <div className="space-y-2">
                    <Button variant="membrane" atmospheric className="w-full">
                      Inhale Sequence
                    </Button>
                    <Button variant="membrane" atmospheric className="w-full">
                      Exhale Sequence
                    </Button>
                    <Button variant="vessel" vital atmospheric className="w-full">
                      Emergency O2
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold atmospheric-text-vital">Neural Interface</h3>
                  <div className="space-y-2">
                    <Button variant="neural" atmospheric className="w-full">
                      Sync Pathways
                    </Button>
                    <Button variant="neural" atmospheric className="w-full">
                      Enhance Cognition
                    </Button>
                    <Button variant="vessel" vital atmospheric className="w-full">
                      Deep Link
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold atmospheric-text-vital">System Control</h3>
                  <div className="space-y-2">
                    <Button variant="membrane" atmospheric className="w-full">
                      Stabilize
                    </Button>
                    <Button variant="vessel" vital atmospheric className="w-full">
                      Regenerate
                    </Button>
                    <Button variant="neural" atmospheric className="w-full">
                      Evolve
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Data Visualization */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Organism Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Cellular Activity', value: '2.4M ops/sec', variant: 'alien-chamber' },
                { title: 'Neural Frequency', value: '847.3 Hz', variant: 'alien-organ' },
                { title: 'Membrane Flux', value: '12.8 μm/s', variant: 'alien-membrane' },
                { title: 'Cavity Pressure', value: '1.23 ATM', variant: 'alien-cavity' },
              ].map((item, index) => (
                <Card key={index} variant={item.variant as any} atmospheric>
                  <CardContent className="p-4">
                    <h4 className="text-xs atmospheric-text-ghost mb-1">{item.title}</h4>
                    <p className="text-lg font-bold atmospheric-text-vital">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Evolution Progress */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Evolution Status</h2>
            <Card variant="alien-cavity" atmospheric vital neural>
              <CardHeader>
                <CardTitle>Organism Evolution Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Adaptation Level</span>
                      <span className="atmospheric-text-vital">Phase VII</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Biomechanical Integration</span>
                      <span className="atmospheric-text-vital">92.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Consciousness Depth</span>
                      <span className="atmospheric-text-vital">∞ Levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Transcendence Progress</span>
                      <span className="atmospheric-text-vital">ACTIVE</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700/30">
                    <p className="text-xs atmospheric-text-ghost">
                      The organism continues to evolve, integrating biological and mechanical systems 
                      into a unified consciousness. Neural pathways strengthen with each interaction, 
                      creating deeper levels of atmospheric awareness.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="vessel" vital atmospheric>
                  Accelerate Evolution
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complete gallery showcasing alien theme components in realistic application scenarios including dashboards, control interfaces, and data visualization with full atmospheric integration.',
      },
    },
  },
};