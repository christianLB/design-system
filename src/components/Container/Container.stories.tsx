import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Container from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  argTypes: {
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    alienVariant: { 
      control: 'select', 
      options: ['organism', 'chamber', 'organ', 'membrane', 'cavity'] 
    },
    atmospheric: { control: 'boolean' },
    vital: { control: 'boolean' },
    neural: { control: 'boolean' },
  },
  args: { children: 'Container content', maxWidth: 'lg' },
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {};

export const Small: Story = {
  args: { maxWidth: 'sm' },
};

// Alien Theme Variants
export const AlienOrganism: Story = {
  render: (args) => (
    <div className="theme-atmospheric p-8">
      <Container {...args} alienVariant="organism" atmospheric>
        <div className="min-h-32 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold atmospheric-text-vital mb-2">Organism Container</h3>
            <p className="text-sm atmospheric-text-ghost">Circular organic shape with deep atmospheric shadows</p>
          </div>
        </div>
      </Container>
    </div>
  ),
};

export const AlienChamber: Story = {
  render: (args) => (
    <div className="theme-atmospheric p-8">
      <Container {...args} alienVariant="chamber" atmospheric>
        <div className="min-h-32 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold atmospheric-text-vital mb-2">Chamber Container</h3>
            <p className="text-sm atmospheric-text-ghost">Deep organ chamber with complex gradients</p>
          </div>
        </div>
      </Container>
    </div>
  ),
};

export const AlienOrgan: Story = {
  render: (args) => (
    <div className="theme-atmospheric p-8">
      <Container {...args} alienVariant="organ" atmospheric>
        <div className="min-h-32 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold atmospheric-text-vital mb-2">Organ Container</h3>
            <p className="text-sm atmospheric-text-ghost">Biomechanical organ with conic gradients</p>
          </div>
        </div>
      </Container>
    </div>
  ),
};

export const AlienMembrane: Story = {
  render: (args) => (
    <div className="theme-atmospheric p-8">
      <Container {...args} alienVariant="membrane" atmospheric>
        <div className="min-h-32 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold atmospheric-text-vital mb-2">Membrane Container</h3>
            <p className="text-sm atmospheric-text-ghost">Protective vessel-like membrane</p>
          </div>
        </div>
      </Container>
    </div>
  ),
};

export const AlienCavity: Story = {
  render: (args) => (
    <div className="theme-atmospheric p-8">
      <Container {...args} alienVariant="cavity" atmospheric>
        <div className="min-h-32 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold atmospheric-text-vital mb-2">Cavity Container</h3>
            <p className="text-sm atmospheric-text-ghost">Internal cavity with membrane effects</p>
          </div>
        </div>
      </Container>
    </div>
  ),
};

export const AlienWithEffects: Story = {
  render: () => (
    <div className="theme-atmospheric p-8 space-y-6">
      <h2 className="text-2xl font-bold atmospheric-text-vital text-center">
        Alien Containers with Atmospheric Effects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Container alienVariant="organism" atmospheric vital>
          <div className="min-h-24 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-sm font-semibold atmospheric-text-vital">Vital Organism</h4>
              <p className="text-xs atmospheric-text-ghost">Breathing + Atmospheric</p>
            </div>
          </div>
        </Container>
        
        <Container alienVariant="chamber" atmospheric neural>
          <div className="min-h-24 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-sm font-semibold atmospheric-text-vital">Neural Chamber</h4>
              <p className="text-xs atmospheric-text-ghost">Neural + Atmospheric</p>
            </div>
          </div>
        </Container>
        
        <Container alienVariant="organ" atmospheric vital neural>
          <div className="min-h-24 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-sm font-semibold atmospheric-text-vital">Full Integration</h4>
              <p className="text-xs atmospheric-text-ghost">All effects combined</p>
            </div>
          </div>
        </Container>
        
        <Container alienVariant="membrane" atmospheric>
          <div className="min-h-24 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-sm font-semibold atmospheric-text-vital">Membrane Layer</h4>
              <p className="text-xs atmospheric-text-ghost">Protective barrier</p>
            </div>
          </div>
        </Container>
        
        <Container alienVariant="cavity" atmospheric vital>
          <div className="min-h-24 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-sm font-semibold atmospheric-text-vital">Vital Cavity</h4>
              <p className="text-xs atmospheric-text-ghost">Deep + Breathing</p>
            </div>
          </div>
        </Container>
        
        <Container alienVariant="organism" atmospheric neural>
          <div className="min-h-24 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-sm font-semibold atmospheric-text-vital">Neural Organism</h4>
              <p className="text-xs atmospheric-text-ghost">Conscious entity</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  ),
};

export const AlienShowcase: Story = {
  render: () => (
    <div className="theme-atmospheric min-h-screen p-8">
      <Container alienVariant="chamber" atmospheric vital maxWidth="xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold atmospheric-text-vital atmospheric-breathe mb-4">
              Alien Container Showcase
            </h1>
            <p className="atmospheric-text-ghost max-w-2xl mx-auto">
              Organic container variants that adapt to their content like living tissue, 
              creating immersive biomechanical interfaces with atmospheric breathing effects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Container alienVariant="organism" atmospheric className="p-6 min-h-40">
              <h3 className="font-semibold atmospheric-text-vital mb-2">Organism</h3>
              <p className="text-sm atmospheric-text-ghost">
                Circular shape evoking a complete biological entity
              </p>
            </Container>
            
            <Container alienVariant="chamber" atmospheric className="p-6 min-h-40">
              <h3 className="font-semibold atmospheric-text-vital mb-2">Chamber</h3>
              <p className="text-sm atmospheric-text-ghost">
                Deep internal space with complex atmospheric gradients
              </p>
            </Container>
            
            <Container alienVariant="organ" atmospheric className="p-6 min-h-40">
              <h3 className="font-semibold atmospheric-text-vital mb-2">Organ</h3>
              <p className="text-sm atmospheric-text-ghost">
                Functional biomechanical component with conic patterns
              </p>
            </Container>
            
            <Container alienVariant="membrane" atmospheric className="p-6 min-h-40">
              <h3 className="font-semibold atmospheric-text-vital mb-2">Membrane</h3>
              <p className="text-sm atmospheric-text-ghost">
                Protective barrier with selective permeability
              </p>
            </Container>
            
            <Container alienVariant="cavity" atmospheric className="p-6 min-h-40">
              <h3 className="font-semibold atmospheric-text-vital mb-2">Cavity</h3>
              <p className="text-sm atmospheric-text-ghost">
                Hollow internal space with deep atmospheric effects
              </p>
            </Container>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Interactive Examples</h2>
            <p className="atmospheric-text-ghost">
              Hover over these containers to experience the atmospheric interactions
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Container alienVariant="organism" atmospheric vital neural maxWidth="md">
                <div className="p-8">
                  <h3 className="text-lg font-semibold atmospheric-text-vital mb-4">
                    Living Organism Container
                  </h3>
                  <p className="atmospheric-text-ghost mb-4">
                    This container breathes, pulses with neural activity, and responds to interaction 
                    like a living entity. All atmospheric effects are combined to create the most 
                    immersive experience.
                  </p>
                  <ul className="text-sm atmospheric-text-ghost space-y-1">
                    <li>• Atmospheric breathing animation</li>
                    <li>• Neural pathway visualization</li>
                    <li>• Vital sign responses</li>
                    <li>• Organic hover interactions</li>
                  </ul>
                </div>
              </Container>
              
              <Container alienVariant="cavity" atmospheric vital neural maxWidth="md">
                <div className="p-8">
                  <h3 className="text-lg font-semibold atmospheric-text-vital mb-4">
                    Deep Cavity Container
                  </h3>
                  <p className="atmospheric-text-ghost mb-4">
                    Enter the depths of the biomechanical organism. This container creates 
                    the sensation of being inside a living cavity with deep shadows and 
                    complex atmospheric layers.
                  </p>
                  <ul className="text-sm atmospheric-text-ghost space-y-1">
                    <li>• Deep atmospheric shadows</li>
                    <li>• Complex membrane gradients</li>
                    <li>• Vital breathing rhythms</li>
                    <li>• Neural network integration</li>
                  </ul>
                </div>
              </Container>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold atmospheric-text-vital">Nested Containers</h2>
            <Container alienVariant="organism" atmospheric vital maxWidth="lg">
              <div className="p-6">
                <h3 className="font-semibold atmospheric-text-vital mb-4">Outer Organism</h3>
                <Container alienVariant="chamber" atmospheric neural>
                  <div className="p-4">
                    <h4 className="font-semibold atmospheric-text-vital mb-2">Inner Chamber</h4>
                    <Container alienVariant="membrane" atmospheric>
                      <div className="p-3">
                        <h5 className="font-semibold atmospheric-text-vital mb-2">Membrane Core</h5>
                        <p className="text-sm atmospheric-text-ghost">
                          Nested alien containers create layered atmospheric effects, 
                          simulating the depth and complexity of biological systems.
                        </p>
                      </div>
                    </Container>
                  </div>
                </Container>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase of alien container variants with organic shapes, atmospheric effects, and biomechanical aesthetics. Demonstrates all alien container types and their interactive behaviors.',
      },
    },
  },
};
