import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../theme/ThemeContext';
import { mirthaTheme } from '../theme';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import '../styles/mirtha.css';

const meta: Meta = {
  title: 'Themes/Mirtha Legrand/Simple',
  decorators: [
    (Story) => (
      <ThemeProvider theme={mirthaTheme}>
        <div
          className="theme-mirtha"
          style={{
            minHeight: '100vh',
            padding: '2rem',
            background: 'radial-gradient(ellipse at center, #FBF7F0 0%, #F8F3E8 40%, #F5EFE2 100%)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const BasicExample: StoryObj = {
  render: () => (
    <Container size="lg">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .elegant-title {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          background: linear-gradient(135deg, #FFD700 0%, #F7E7CE 50%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .mirtha-card {
          background: white;
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .mirtha-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.4);
        }
        
        .mirtha-button {
          background: linear-gradient(135deg, #FFD700 0%, #F7E7CE 100%);
          color: #36454F;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }
        
        .mirtha-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
        
        .gold-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FFD700, transparent);
          margin: 2rem 0;
          position: relative;
        }
        
        .gold-divider::before {
          content: '◆';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #FFD700;
          background: #FFFCF9;
          padding: 0 1rem;
          font-size: 1rem;
        }
      `}</style>

      <h1 className="elegant-title">Tema Mirtha Legrand</h1>

      <p
        style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          color: '#8B7D6B',
          marginBottom: '3rem',
          fontStyle: 'italic',
        }}
      >
        Elegancia eterna en cada detalle
      </p>

      <div className="gold-divider" />

      <div className="mirtha-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
          Bienvenidos a la Mesa
        </h2>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Un espacio donde la sofisticación y la calidez se encuentran. Cada elemento ha sido
          diseñado para evocar la elegancia atemporal que caracteriza a nuestra querida Mirtha.
        </p>
        <button className="mirtha-button">Descubrir Más</button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div className="mirtha-card" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#FFD700',
            }}
          >
            ✦
          </div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
            Elegancia
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#8B7D6B' }}>En cada detalle</p>
        </div>

        <div className="mirtha-card" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#F4C2C2',
            }}
          >
            ◆
          </div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
            Tradición
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#8B7D6B' }}>Desde 1968</p>
        </div>

        <div className="mirtha-card" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#722F37',
            }}
          >
            ✧
          </div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
            Distinción
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#8B7D6B' }}>Única e inigualable</p>
        </div>
      </div>

      <div className="gold-divider" />

      <div
        style={{
          background: 'rgba(255, 215, 0, 0.05)',
          borderLeft: '4px solid #FFD700',
          padding: '2rem',
          margin: '2rem 0',
          borderRadius: '0 0.5rem 0.5rem 0',
        }}
      >
        <p
          style={{
            fontSize: '1.5rem',
            fontFamily: 'Crimson Text, serif',
            fontStyle: 'italic',
            color: '#722F37',
            margin: 0,
          }}
        >
          "Como te ven, te tratan. Si te ven mal, te maltratan. Si te ven bien, te contratan."
        </p>
        <p
          style={{
            textAlign: 'right',
            marginTop: '1rem',
            color: '#8B7D6B',
            fontSize: '0.875rem',
          }}
        >
          — Mirtha Legrand
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="mirtha-button" style={{ marginRight: '1rem' }}>
          Ver Colección
        </button>
        <button
          className="mirtha-button"
          style={{
            background: 'transparent',
            color: '#FFD700',
            border: '2px solid #FFD700',
          }}
        >
          Conocer Más
        </button>
      </div>
    </Container>
  ),
};
