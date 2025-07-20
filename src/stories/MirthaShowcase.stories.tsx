import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../theme/ThemeContext';
import { mirthaTheme, mirthaEffects } from '../theme';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import '../styles/mirtha.css';

const meta: Meta = {
  title: 'Themes/Mirtha Legrand',
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

export const Showcase: StoryObj = {
  render: () => (
    <Container size="lg">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1
          className="elegant-heading"
          style={{
            fontSize: '3.5rem',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '1rem',
          }}
        >
          Tema Mirtha Legrand
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: mirthaEffects.sparkle.gold,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Elegancia eterna en cada detalle
        </p>
      </div>

      <div className="mirtha-divider" style={{ marginBottom: '3rem' }} />

      {/* Golden Frame Card */}
      <Card className="mirtha-golden-frame" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
          Marco Dorado
        </h2>
        <p>
          Como las mesas legendarias de Mirtha, este diseño captura la sofisticación y el glamour
          con un toque dorado que evoca las noches de gala más memorables.
        </p>
      </Card>

      {/* Shimmer Effect Card */}
      <Card className="mirtha-shimmer card-mirtha" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
          Efecto Shimmer
        </h2>
        <p>
          Un sutil brillo que recorre la superficie, como las luces del estudio reflejándose en las
          joyas y vestidos de alta costura.
        </p>
      </Card>

      {/* Luxury Card */}
      <Card className="card-mirtha luxury" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
          Tarjeta de Lujo
        </h2>
        <p>
          La combinación perfecta de dorado y rosa, colores que han definido la estética
          inconfundible de la diva argentina.
        </p>
      </Card>

      {/* Button Showcase */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Botones Elegantes
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-mirtha">Botón Dorado</button>
          <button className="btn-mirtha mirtha-sparkle-container">Con Destellos</button>
          <button
            className="btn-mirtha"
            style={{
              background: `linear-gradient(135deg, ${mirthaEffects.sparkle.gold} 0%, ${mirthaEffects.glow.rose.sm} 100%)`,
            }}
          >
            Rosa Dorado
          </button>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mirtha-quote" style={{ marginBottom: '3rem' }}>
        Como te ven, te tratan. Si te ven mal, te maltratan. Si te ven bien, te contratan.
        <div
          style={{
            textAlign: 'right',
            marginTop: '1rem',
            fontStyle: 'normal',
            fontSize: '1rem',
          }}
        >
          — Mirtha Legrand
        </div>
      </div>

      {/* List Example */}
      <Card style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
          Características del Tema
        </h3>
        <ul className="mirtha-list">
          <li>Paleta de colores dorada y rosa inspirada en la elegancia clásica</li>
          <li>Tipografías serif para títulos que evocan sofisticación</li>
          <li>Efectos de brillo y shimmer que capturan la luz del glamour</li>
          <li>Animaciones suaves y elegantes que respetan la accesibilidad</li>
          <li>Componentes con bordes dorados y sombras sutiles</li>
        </ul>
      </Card>

      {/* Badge Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Insignias de Lujo
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="mirtha-badge">Premium</span>
          <span
            className="mirtha-badge"
            style={{
              background: `linear-gradient(135deg, ${mirthaEffects.glow.rose.sm} 0%, ${mirthaEffects.sparkle.gold} 100%)`,
            }}
          >
            Exclusivo
          </span>
          <span className="mirtha-badge">VIP</span>
        </div>
      </div>

      {/* Color Palette */}
      <Card>
        <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
          Paleta de Colores
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { name: 'Oro Puro', color: '#FFD700' },
            { name: 'Rosa Dorado', color: '#F4C2C2' },
            { name: 'Champagne', color: '#F7E7CE' },
            { name: 'Rosa Rubor', color: '#FFB6C1' },
            { name: 'Perla', color: '#FFF8DC' },
            { name: 'Borgoña', color: '#722F37' },
          ].map(({ name, color }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: color,
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{name}</div>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>{color}</div>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  ),
};
