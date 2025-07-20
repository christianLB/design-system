import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../theme/ThemeContext';
import { mirthaTheme, mirthaEffects } from '../theme';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { MirthaPluginRegistry, getMirthaPlugins } from '../theme/plugins/mirtha-registry';
import '../styles/mirtha.css';

const meta: Meta = {
  title: 'Themes/Mirtha Legrand/Interactive',
  decorators: [
    (Story) => (
      <ThemeProvider theme={mirthaTheme}>
        <div
          className="theme-mirtha"
          style={{
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(135deg, #FFFCF9 0%, #FFF9F5 100%)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const PluginDemo: StoryObj = {
  render: () => {
    const [activeEffects, setActiveEffects] = useState({
      sparkle: false,
      shimmer: true,
      glow: false,
      luxury: false,
      goldenHour: false,
      goldenFrame: false,
    });

    const toggleEffect = (effect: keyof typeof activeEffects) => {
      setActiveEffects((prev) => ({ ...prev, [effect]: !prev[effect] }));
    };

    return (
      <Container size="lg">
        <h1
          className="elegant-heading"
          style={{
            fontSize: '3rem',
            fontFamily: 'Playfair Display, serif',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          Efectos Interactivos Mirtha
        </h1>

        {/* Control Panel */}
        <Card className="card-mirtha" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
            Panel de Control de Efectos
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {Object.entries(activeEffects).map(([effect, active]) => (
              <button
                key={effect}
                className={`btn-mirtha ${active ? 'active' : ''}`}
                onClick={() => toggleEffect(effect as keyof typeof activeEffects)}
                style={{
                  opacity: active ? 1 : 0.7,
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {effect.charAt(0).toUpperCase() + effect.slice(1).replace(/([A-Z])/g, ' $1')}
                {active ? ' ✓' : ''}
              </button>
            ))}
          </div>
        </Card>

        {/* Demo Cards */}
        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {/* Sparkle Card */}
          <Card
            className={`card-mirtha ${activeEffects.sparkle ? 'mirtha-sparkle' : ''}`}
            data-mirtha-elegance="sparkle"
            data-sparkle-count="5"
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Efecto Sparkle
            </h3>
            <p>
              Destellos dorados que aparecen y desaparecen como las joyas bajo las luces del
              estudio.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <span className="mirtha-badge">Glamour</span>
            </div>
          </Card>

          {/* Shimmer Card */}
          <Card
            className={`card-mirtha ${activeEffects.shimmer ? 'mirtha-shimmer' : ''}`}
            data-mirtha-elegance="shimmer"
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Efecto Shimmer
            </h3>
            <p>Un brillo sutil que recorre la superficie, evocando el satén y la seda.</p>
            <div style={{ marginTop: '1rem' }}>
              <span
                className="mirtha-badge"
                style={{
                  background: `linear-gradient(135deg, ${mirthaEffects.glow.rose.sm} 0%, ${mirthaEffects.sparkle.gold} 100%)`,
                }}
              >
                Elegancia
              </span>
            </div>
          </Card>

          {/* Glow Card */}
          <Card
            className={`card-mirtha ${activeEffects.glow ? 'mirtha-glow' : ''}`}
            data-mirtha-elegance="glow"
            data-glow-intensity="medium"
            data-glow-color="gold"
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Efecto Glow
            </h3>
            <p>Un resplandor dorado que emana calidez y sofisticación.</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="mirtha-badge">Radiante</span>
            </div>
          </Card>

          {/* Luxury Card */}
          <Card
            className={`card-mirtha ${activeEffects.luxury ? 'luxury' : ''}`}
            data-mirtha-elegance="luxury"
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Efecto Luxury
            </h3>
            <p>La combinación perfecta de todos los efectos para crear la máxima elegancia.</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="mirtha-badge">Premium</span>
            </div>
          </Card>

          {/* Golden Hour Card */}
          <Card
            className={`card-mirtha ${activeEffects.goldenHour ? 'mirtha-golden-hour' : ''}`}
            data-mirtha-golden="hour"
            data-golden-animated="true"
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Hora Dorada
            </h3>
            <p>La luz cálida del atardecer que baña todo con un resplandor mágico.</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="mirtha-badge">Mágico</span>
            </div>
          </Card>

          {/* Golden Frame Card */}
          <Card
            className={`${activeEffects.goldenFrame ? 'mirtha-golden-frame' : 'card-mirtha'}`}
            data-mirtha-golden="frame"
            data-golden-intensity="1"
          >
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Marco Dorado
            </h3>
            <p>Un marco ornamental que enmarca el contenido como una obra de arte.</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="mirtha-badge">Artístico</span>
            </div>
          </Card>
        </div>

        {/* Interactive Form */}
        <Card className="card-mirtha luxury" style={{ marginTop: '3rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
            Formulario Elegante
          </h2>
          <form style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Nombre Completo
              </label>
              <input type="text" placeholder="Ingrese su nombre" style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Email
              </label>
              <input type="email" placeholder="su.email@ejemplo.com" style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Mensaje
              </label>
              <textarea
                rows={4}
                placeholder="Escriba su mensaje aquí"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-mirtha"
                style={{
                  background: 'transparent',
                  color: mirthaEffects.sparkle.gold,
                  border: `2px solid ${mirthaEffects.sparkle.gold}`,
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-mirtha mirtha-sparkle-container">
                Enviar Mensaje
              </button>
            </div>
          </form>
        </Card>

        {/* Animation Showcase */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
            Animaciones Elegantes
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                background: mirthaEffects.gradients.goldShimmer,
                borderRadius: '50%',
                animation: 'mirtha-float 3s ease-in-out infinite',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                background: mirthaEffects.gradients.roseGold,
                borderRadius: '0.5rem',
                animation: 'mirtha-glow 4s ease-in-out infinite',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                background: mirthaEffects.gradients.luxury,
                borderRadius: '0.5rem',
                animation: 'rotate 20s linear infinite',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          </div>
        </div>
      </Container>
    );
  },
};

export const ComponentShowcase: StoryObj = {
  render: () => (
    <Container size="lg">
      <h1
        className="elegant-heading"
        style={{
          fontSize: '3rem',
          fontFamily: 'Playfair Display, serif',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        Componentes del Sistema
      </h1>

      {/* Typography Examples */}
      <Card className="card-mirtha" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Tipografía Elegante
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Heading 1 - Playfair Display</h1>
          <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Heading 2 - Playfair Display</h2>
          <h3 style={{ fontFamily: 'Playfair Display, serif' }}>Heading 3 - Playfair Display</h3>
          <p style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Texto de párrafo en Montserrat - Una tipografía sans-serif elegante y moderna que
            complementa perfectamente los títulos serif.
          </p>
          <p
            style={{ fontFamily: 'Crimson Text, serif', fontSize: '1.125rem', fontStyle: 'italic' }}
          >
            "Una cita elegante en Crimson Text, perfecta para destacar frases memorables con un
            toque de distinción clásica."
          </p>
        </div>
      </Card>

      {/* Button Variations */}
      <Card className="card-mirtha" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Variaciones de Botones
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-mirtha">Primario</button>
          <button className="btn-mirtha" style={{ fontSize: '0.875rem', padding: '0.5rem 1.5rem' }}>
            Pequeño
          </button>
          <button className="btn-mirtha" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
            Grande
          </button>
          <button className="btn-mirtha" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            Deshabilitado
          </button>
          <button className="btn-mirtha mirtha-shimmer">Con Shimmer</button>
        </div>
      </Card>

      {/* Progress Indicators */}
      <Card className="card-mirtha" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Indicadores de Progreso
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Progress Bar */}
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span>Progreso de Carga</span>
              <span>75%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 215, 0, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '75%',
                  height: '100%',
                  background: mirthaEffects.gradients.goldShimmer,
                  animation: 'mirtha-shimmer 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Loading Spinner */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255, 215, 0, 0.2)',
                borderTop: `3px solid ${mirthaEffects.sparkle.gold}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        </div>
      </Card>

      {/* Status Messages */}
      <Card className="card-mirtha">
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Mensajes de Estado
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div
            style={{
              padding: '1rem',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '0.5rem',
              color: '#B8860B',
            }}
          >
            <strong>Información:</strong> Los almuerzos de Mirtha son legendarios.
          </div>
          <div
            style={{
              padding: '1rem',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.5rem',
              color: '#15803d',
            }}
          >
            <strong>Éxito:</strong> Su invitación ha sido confirmada.
          </div>
          <div
            style={{
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              color: '#b91c1c',
            }}
          >
            <strong>Error:</strong> Por favor, vista de etiqueta.
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  ),
};
