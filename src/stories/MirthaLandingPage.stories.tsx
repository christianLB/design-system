import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../theme/ThemeContext';
import { mirthaTheme, mirthaEffects } from '../theme';
import '../styles/mirtha.css';

const meta: Meta = {
  title: 'Themes/Mirtha Legrand/Landing Page',
  decorators: [
    (Story) => (
      <ThemeProvider theme={mirthaTheme}>
        <div
          className="theme-mirtha"
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #FFFCF9 0%, #FFF9F5 50%, #FFFCF9 100%)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AlmuerzosConMirtha: StoryObj = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Hero Section */}
        <header style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Navigation */}
          <nav
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              padding: '1.5rem 2rem',
              background:
                'linear-gradient(180deg, rgba(255, 252, 249, 0.95) 0%, rgba(255, 252, 249, 0) 100%)',
            }}
          >
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: '2rem',
                  margin: 0,
                  background: mirthaEffects.gradients.goldShimmer,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Mirtha Legrand
              </h1>

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <a
                  href="#"
                  style={{
                    color: mirthaEffects.sparkle.gold,
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                >
                  Inicio
                </a>
                <a
                  href="#invitados"
                  style={{
                    color: mirthaEffects.sparkle.gold,
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                >
                  Invitados
                </a>
                <a
                  href="#menu"
                  style={{
                    color: mirthaEffects.sparkle.gold,
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                >
                  Menú
                </a>
                <a
                  href="#galeria"
                  style={{
                    color: mirthaEffects.sparkle.gold,
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                >
                  Galería
                </a>
                <button
                  className="btn-mirtha mirtha-sparkle-container"
                  style={{ fontSize: '0.875rem', padding: '0.5rem 1.5rem' }}
                >
                  Reservar Mesa
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '4rem 2rem',
              background: `radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)`,
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '800px', zIndex: 10 }}>
              <h2
                className="elegant-heading mirtha-shimmer"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  fontFamily: 'Playfair Display, serif',
                  marginBottom: '1rem',
                  lineHeight: 1.1,
                }}
              >
                Los Almuerzos de Mirtha
              </h2>
              <p
                style={{
                  fontSize: '1.5rem',
                  color: mirthaEffects.rose.burgundy,
                  marginBottom: '3rem',
                  fontStyle: 'italic',
                  fontFamily: 'Crimson Text, serif',
                }}
              >
                "Una mesa donde la elegancia se encuentra con la conversación"
              </p>
              <div
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <button
                  className="btn-mirtha"
                  style={{
                    fontSize: '1.125rem',
                    padding: '1rem 2.5rem',
                    animation: 'mirtha-float 3s ease-in-out infinite',
                  }}
                >
                  Conocer más
                </button>
                <button
                  className="btn-mirtha"
                  style={{
                    fontSize: '1.125rem',
                    padding: '1rem 2.5rem',
                    background: 'transparent',
                    color: mirthaEffects.sparkle.gold,
                    border: `2px solid ${mirthaEffects.sparkle.gold}`,
                  }}
                >
                  Ver episodios
                </button>
              </div>
            </div>

            {/* Decorative sparkles */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                fontSize: '2rem',
                color: mirthaEffects.sparkle.gold,
                animation: 'mirtha-sparkle 3s ease-in-out infinite',
              }}
            >
              ✦
            </div>
            <div
              style={{
                position: 'absolute',
                top: '70%',
                right: '15%',
                fontSize: '1.5rem',
                color: mirthaEffects.rose.gold,
                animation: 'mirtha-sparkle 3s ease-in-out infinite 1s',
              }}
            >
              ✦
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '30%',
                left: '20%',
                fontSize: '1rem',
                color: mirthaEffects.sparkle.gold,
                animation: 'mirtha-sparkle 3s ease-in-out infinite 2s',
              }}
            >
              ✦
            </div>
          </div>
        </header>

        {/* About Section */}
        <section style={{ padding: '5rem 2rem', background: '#FFFAF7' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '3rem',
                    marginBottom: '1.5rem',
                    color: mirthaEffects.sparkle.gold,
                  }}
                >
                  Una Tradición Argentina
                </h2>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Desde 1968, los almuerzos de Mirtha Legrand han sido el punto de encuentro de las
                  personalidades más destacadas de Argentina y el mundo. Un espacio donde la
                  elegancia, la cultura y la conversación se fusionan en una experiencia única.
                </p>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Cada mesa es cuidadosamente preparada con los más finos detalles, desde la
                  cristalería hasta los arreglos florales, creando un ambiente de sofisticación
                  incomparable.
                </p>
                <div className="mirtha-sparkle-container">
                  <span
                    className="mirtha-badge"
                    style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}
                  >
                    55 años de tradición
                  </span>
                </div>
              </div>
              <div
                className="mirtha-golden-frame"
                style={{
                  padding: '2rem',
                  borderRadius: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '400px',
                    background: mirthaEffects.gradients.luxury,
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'white',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  [Imagen de Mirtha]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guests */}
        <section id="invitados" style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              className="elegant-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                textAlign: 'center',
                marginBottom: '3rem',
              }}
            >
              Invitados Destacados
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
              {['Personalidad del Arte', 'Figura del Deporte', 'Líder de Opinión'].map(
                (guest, index) => (
                  <div
                    key={index}
                    className="card-mirtha mirtha-shimmer"
                    style={{
                      textAlign: 'center',
                      padding: '2rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: mirthaEffects.gradients.roseGold,
                        margin: '0 auto 1.5rem',
                        boxShadow: mirthaEffects.shadows.golden,
                      }}
                    />
                    <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
                      {guest}
                    </h3>
                    <p style={{ color: '#8B7D6B' }}>Próximamente en nuestra mesa</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" style={{ padding: '5rem 2rem', background: '#FFFAF7' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              className="elegant-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              Menú de Gala
            </h2>
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.25rem',
                color: mirthaEffects.rose.burgundy,
                marginBottom: '3rem',
                fontStyle: 'italic',
              }}
            >
              "La buena mesa es el preludio de una gran conversación"
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '3rem',
              }}
            >
              {/* Entrada */}
              <div className="mirtha-golden-frame" style={{ padding: '2rem' }}>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: mirthaEffects.sparkle.gold,
                  }}
                >
                  Entrada
                </h3>
                <ul className="mirtha-list">
                  <li>Canapés de salmón ahumado con caviar</li>
                  <li>Terrina de foie gras con brioche dorado</li>
                  <li>Ostras frescas con champagne rosé</li>
                </ul>
              </div>

              {/* Plato Principal */}
              <div className="mirtha-golden-frame" style={{ padding: '2rem' }}>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: mirthaEffects.sparkle.gold,
                  }}
                >
                  Plato Principal
                </h3>
                <ul className="mirtha-list">
                  <li>Lomo Wellington con salsa de trufas</li>
                  <li>Langosta thermidor gratinada</li>
                  <li>Pato a la naranja con guarnición</li>
                </ul>
              </div>

              {/* Postre */}
              <div className="mirtha-golden-frame" style={{ padding: '2rem' }}>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: mirthaEffects.sparkle.gold,
                  }}
                >
                  Postre
                </h3>
                <ul className="mirtha-list">
                  <li>Soufflé de chocolate belga</li>
                  <li>Crème brûlée con vainilla de Madagascar</li>
                  <li>Pavlova con frutos rojos y crema</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              className="elegant-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                textAlign: 'center',
                marginBottom: '3rem',
              }}
            >
              Momentos Inolvidables
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="mirtha-shimmer"
                  style={{
                    aspectRatio: '1',
                    background: mirthaEffects.gradients.pearlescent,
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = mirthaEffects.shadows.luxurious;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.3)',
                      color: 'white',
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.25rem',
                    }}
                  >
                    Momento {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '5rem 2rem', background: '#FFFAF7' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              className="elegant-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                textAlign: 'center',
                marginBottom: '3rem',
              }}
            >
              Palabras de Nuestros Invitados
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
              }}
            >
              {[
                {
                  quote:
                    'Una experiencia única donde la elegancia y la calidez humana se encuentran en perfecta armonía.',
                  author: 'Celebridad Internacional',
                },
                {
                  quote:
                    'Los almuerzos de Mirtha son mucho más que una comida, son un pedazo de la historia argentina.',
                  author: 'Figura Política',
                },
                {
                  quote:
                    'Cada detalle está cuidado con amor y dedicación. Es un honor ser parte de esta tradición.',
                  author: 'Artista Reconocido',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="mirtha-quote"
                  style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: mirthaEffects.shadows.soft,
                  }}
                >
                  {testimonial.quote}
                  <div
                    style={{
                      textAlign: 'right',
                      marginTop: '1rem',
                      fontStyle: 'normal',
                      fontSize: '0.875rem',
                      color: mirthaEffects.rose.burgundy,
                    }}
                  >
                    — {testimonial.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: '5rem 2rem',
            background: `linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(244, 194, 194, 0.1) 100%)`,
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                marginBottom: '1.5rem',
                background: mirthaEffects.gradients.goldShimmer,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sea Parte de la Historia
            </h2>
            <p
              style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                color: mirthaEffects.rose.burgundy,
              }}
            >
              Reserve su lugar en la mesa más elegante de Argentina
            </p>
            <button
              className="btn-mirtha mirtha-sparkle-container"
              style={{
                fontSize: '1.25rem',
                padding: '1rem 3rem',
                animation: 'mirtha-glow 3s ease-in-out infinite',
              }}
            >
              Solicitar Invitación
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: '3rem 2rem',
            background: mirthaEffects.pearl.charcoal,
            color: mirthaEffects.pearl.ivory,
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: '2rem',
                marginBottom: '1rem',
                color: mirthaEffects.sparkle.gold,
              }}
            >
              Mirtha Legrand
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              "Como te ven, te tratan. Si te ven mal, te maltratan. Si te ven bien, te contratan."
            </p>
            <div className="mirtha-divider" style={{ margin: '2rem auto', maxWidth: '400px' }} />
            <p style={{ fontSize: '0.875rem' }}>
              © 2024 Los Almuerzos de Mirtha Legrand. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    );
  },
};
