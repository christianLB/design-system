import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Themes/Alien/Simple Demo',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AlienDemo: Story = {
  render: () => (
    <div
      data-theme="alien"
      style={{
        padding: '2rem',
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        color: '#8B4513',
        fontFamily: 'monospace',
      }}
    >
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        🛸 Alien Biomechanical Theme v3.5.0 - SUCCESS!
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Alien CSS Variables Working:</h2>
        <div
          style={{
            background: 'var(--alien-void-black, #0a0a0a)',
            border: '1px solid var(--alien-bio-orange, #8B4513)',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: 'var(--glow-bio-sm, 0 0 5px rgba(139, 69, 19, 0.5))',
          }}
        >
          <p>✅ CSS Variables loaded</p>
          <p>✅ Alien colors active</p>
          <p>✅ Bio-glow effects working</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Membrane Gold Theme:</h2>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 69, 19, 0.1))',
            border: '1px solid var(--alien-membrane-gold, #D4AF37)',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: 'var(--glow-gold-sm, 0 0 5px rgba(212, 175, 55, 0.5))',
            color: '#D4AF37',
          }}
        >
          <p>🧬 Membrane Interface Active</p>
          <p>🧬 Cellular barriers online</p>
          <p>🧬 Permeability: Selective</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#8B0000', marginBottom: '1rem' }}>Vessel Crimson Theme:</h2>
        <div
          style={{
            background: 'radial-gradient(circle, rgba(139, 0, 0, 0.2), rgba(0, 0, 0, 0.8))',
            border: '1px solid var(--alien-vessel-crimson, #8B0000)',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: 'var(--glow-crimson-sm, 0 0 5px rgba(139, 0, 0, 0.5))',
            color: '#8B0000',
          }}
        >
          <p>🫀 Vessel Systems Online</p>
          <p>🫀 Circulation: Optimal</p>
          <p>🫀 Pressure: 1.2 ATM</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#4B0082', marginBottom: '1rem' }}>Neural Indigo Theme:</h2>
        <div
          style={{
            background:
              'conic-gradient(from 0deg, rgba(75, 0, 130, 0.3), rgba(139, 69, 19, 0.1), rgba(75, 0, 130, 0.3))',
            border: '1px solid var(--alien-neural-indigo, #4B0082)',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(75, 0, 130, 0.4), 0 0 20px rgba(139, 69, 19, 0.3)',
            color: '#4B0082',
          }}
        >
          <p>🧠 Neural Networks Synchronized</p>
          <p>🧠 Synaptic Activity: 847 Hz</p>
          <p>🧠 Consciousness Level: AWAKE</p>
        </div>
      </div>

      <div>
        <h2 style={{ color: '#2F4F2F', marginBottom: '1rem' }}>Organism Dark Olive Theme:</h2>
        <div
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(47, 79, 47, 0.4), rgba(0, 0, 0, 0.9))',
            border: '1px solid var(--alien-organism-olive, #2F4F2F)',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(47, 79, 47, 0.6), inset 0 0 20px rgba(139, 69, 19, 0.2)',
            color: '#2F4F2F',
          }}
        >
          <p>👁️ Complete Organism Integration</p>
          <p>👁️ Bio-mechanical fusion: 94.7%</p>
          <p>👁️ Evolution status: TRANSCENDENT</p>
        </div>
      </div>

      <div
        style={{
          marginTop: '3rem',
          padding: '1rem',
          border: '1px solid #8B4513',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>
          ✅ Alien Biomechanical Theme System Status
        </h3>
        <p>🛸 Themes: 4 (Light, Dark, Futuristic, Alien)</p>
        <p>🧬 Components: Button, Card, Container, Terminal, HUD</p>
        <p>🫀 Effects: Atmospheric, Vital, Neural, Breathing</p>
        <p>👁️ Variants: Membrane, Vessel, Neural, Organism</p>
        <p>🌌 Status: BIOMECHANICAL INTEGRATION COMPLETE</p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const GettingStarted: Story = {
  render: () => (
    <div
      className="theme-atmospheric"
      style={{
        padding: '2rem',
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <h1
          style={{
            color: 'var(--alien-bio-orange, #8B4513)',
            marginBottom: '2rem',
            fontSize: '2.5rem',
            textAlign: 'center',
          }}
        >
          🛸 Getting Started with Alien Theme
        </h1>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--alien-membrane-gold, #D4AF37)', marginBottom: '1rem' }}>
            1. Theme Activation
          </h2>
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid var(--alien-bio-orange, #8B4513)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            <p style={{ marginBottom: '1rem', color: '#cccccc' }}>
              Apply the alien theme to your application by adding the theme class:
            </p>
            <pre
              style={{
                background: '#000000',
                padding: '1rem',
                borderRadius: '4px',
                color: 'var(--alien-bio-orange, #8B4513)',
                fontSize: '0.9rem',
                overflow: 'auto',
              }}
            >
              {`<div className="theme-atmospheric">
  <!-- Your alien-themed content -->
</div>`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--alien-vessel-crimson, #8B0000)', marginBottom: '1rem' }}>
            2. Basic Components
          </h2>
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid var(--alien-vessel-crimson, #8B0000)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <p style={{ marginBottom: '1rem', color: '#cccccc' }}>
              Use alien component variants for biomechanical interfaces:
            </p>
            <pre
              style={{
                background: '#000000',
                padding: '1rem',
                borderRadius: '4px',
                color: 'var(--alien-vessel-crimson, #8B0000)',
                fontSize: '0.9rem',
                overflow: 'auto',
              }}
            >
              {`// Membrane Interface
<Button variant="membrane" atmospheric>
  Cellular Access
</Button>

// Vessel Control
<Button variant="vessel" vital atmospheric>
  Life Support
</Button>

// Living Chamber
<Card variant="alien-chamber" atmospheric>
  <CardContent>Bio-monitoring</CardContent>
</Card>`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--alien-neural-indigo, #4B0082)', marginBottom: '1rem' }}>
            3. Effects System
          </h2>
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid var(--alien-neural-indigo, #4B0082)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <p style={{ marginBottom: '1rem', color: '#cccccc' }}>
              Enhance components with atmospheric, vital, and neural effects:
            </p>
            <pre
              style={{
                background: '#000000',
                padding: '1rem',
                borderRadius: '4px',
                color: 'var(--alien-neural-indigo, #4B0082)',
                fontSize: '0.9rem',
                overflow: 'auto',
              }}
            >
              {`// Atmospheric breathing effects
<Container alienVariant="organism" atmospheric>
  Breathing interface
</Container>

// Vital signs monitoring
<Card variant="alien-organ" atmospheric vital>
  Life force indicators
</Card>

// Neural network connectivity
<Button variant="neural" atmospheric className="atmospheric-neural">
  Consciousness bridge
</Button>`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--alien-organism-olive, #2F4F2F)', marginBottom: '1rem' }}>
            4. Container Variants
          </h2>
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid var(--alien-organism-olive, #2F4F2F)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <p style={{ marginBottom: '1rem', color: '#cccccc' }}>
              Different container shapes for various biomechanical functions:
            </p>
            <pre
              style={{
                background: '#000000',
                padding: '1rem',
                borderRadius: '4px',
                color: 'var(--alien-organism-olive, #2F4F2F)',
                fontSize: '0.9rem',
                overflow: 'auto',
              }}
            >
              {`// Organic circular shape
<Container alienVariant="organism" atmospheric>
  Primary organism interface
</Container>

// Deep chamber structure
<Container alienVariant="chamber" atmospheric vital>
  Bio-chamber monitoring
</Container>

// Protective membrane
<Container alienVariant="membrane" atmospheric>
  Cellular barrier system
</Container>

// Internal cavity
<Container alienVariant="cavity" atmospheric neural>
  Deep body interface
</Container>`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--alien-bio-orange, #8B4513)', marginBottom: '1rem' }}>
            5. Animation Classes
          </h2>
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid var(--alien-bio-orange, #8B4513)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <p style={{ marginBottom: '1rem', color: '#cccccc' }}>
              Add organic animations to simulate living systems:
            </p>
            <pre
              style={{
                background: '#000000',
                padding: '1rem',
                borderRadius: '4px',
                color: 'var(--alien-bio-orange, #8B4513)',
                fontSize: '0.9rem',
                overflow: 'auto',
              }}
            >
              {`// Breathing animation
<div className="atmospheric-breathe">
  Simulates respiratory patterns
</div>

// Neural activity
<div className="atmospheric-neural">
  Synaptic firing patterns
</div>

// Pulse effect
<div className="atmospheric-pulse">
  Heartbeat-like pulsing
</div>

// Flowing movement
<div className="atmospheric-flow">
  Organic fluid motion
</div>`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--alien-membrane-gold, #D4AF37)', marginBottom: '1rem' }}>
            6. Complete Example
          </h2>
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid var(--alien-membrane-gold, #D4AF37)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <p style={{ marginBottom: '1rem', color: '#cccccc' }}>
              A complete biomechanical interface with all effects:
            </p>
            <pre
              style={{
                background: '#000000',
                padding: '1rem',
                borderRadius: '4px',
                color: 'var(--alien-membrane-gold, #D4AF37)',
                fontSize: '0.9rem',
                overflow: 'auto',
              }}
            >
              {`<div className="theme-atmospheric">
  <Container 
    alienVariant="organism" 
    atmospheric 
    vital 
    neural
    className="p-6"
  >
    <h2 className="atmospheric-text-vital atmospheric-breathe">
      Bio-System Monitor
    </h2>
    
    <Card variant="alien-chamber" atmospheric vital>
      <CardHeader>
        <CardTitle>Life Support</CardTitle>
      </CardHeader>
      <CardContent>
        <p>All systems operational</p>
        <Progress value={94} className="atmospheric-breathe" />
      </CardContent>
      <CardFooter>
        <Button 
          variant="vessel" 
          vital 
          atmospheric
          className="atmospheric-pulse"
        >
          Enhance Vitals
        </Button>
      </CardFooter>
    </Card>
  </Container>
</div>`}
            </pre>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2), rgba(47, 79, 47, 0.2))',
            border: '1px solid var(--alien-bio-orange, #8B4513)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              color: 'var(--alien-bio-orange, #8B4513)',
              marginBottom: '1rem',
              fontSize: '1.5rem',
            }}
          >
            🌌 Welcome to the Biomechanical Interface
          </h3>
          <p style={{ color: '#cccccc', marginBottom: '1rem' }}>
            You're now ready to create immersive alien experiences with breathing membranes, vital
            monitoring systems, neural networks, and complete organism integration.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'rgba(212, 175, 55, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--alien-membrane-gold, #D4AF37)',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧬</div>
              <div style={{ color: 'var(--alien-membrane-gold, #D4AF37)', fontSize: '0.9rem' }}>
                Membrane Interfaces
              </div>
            </div>
            <div
              style={{
                background: 'rgba(139, 0, 0, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--alien-vessel-crimson, #8B0000)',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🫀</div>
              <div style={{ color: 'var(--alien-vessel-crimson, #8B0000)', fontSize: '0.9rem' }}>
                Vessel Systems
              </div>
            </div>
            <div
              style={{
                background: 'rgba(75, 0, 130, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--alien-neural-indigo, #4B0082)',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧠</div>
              <div style={{ color: 'var(--alien-neural-indigo, #4B0082)', fontSize: '0.9rem' }}>
                Neural Networks
              </div>
            </div>
            <div
              style={{
                background: 'rgba(47, 79, 47, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--alien-organism-olive, #2F4F2F)',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👁️</div>
              <div style={{ color: 'var(--alien-organism-olive, #2F4F2F)', fontSize: '0.9rem' }}>
                Complete Organism
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
