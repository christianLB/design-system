import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../theme/ThemeContext';
import { mirthaTheme, mirthaEffects } from '../theme';
import '../styles/mirtha.css';

const meta: Meta = {
  title: 'Themes/Mirtha Legrand/Magazine Style',
  decorators: [
    (Story) => (
      <ThemeProvider theme={mirthaTheme}>
        <div
          className="theme-mirtha"
          style={{
            minHeight: '100vh',
            background: 'radial-gradient(ellipse at center, #FBF7F0 0%, #F8F3E8 40%, #F5EFE2 100%)',
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

export const ElegantMagazine: StoryObj = {
  render: () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Fixed Header */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: scrollY > 50 ? 'rgba(255, 252, 249, 0.95)' : 'transparent',
            backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease',
            borderBottom: scrollY > 50 ? '1px solid rgba(255, 215, 0, 0.2)' : 'none',
          }}
        >
          <nav
            style={{
              padding: '1rem 2rem',
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <h1
                className="mirtha-sparkle-container"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.5rem',
                  margin: 0,
                  letterSpacing: '0.05em',
                }}
              >
                ML
              </h1>
              <div style={{ display: 'flex', gap: '2rem' }}>
                {['Inicio', 'Colección', 'Historia', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color:
                        scrollY > 50 ? mirthaEffects.sparkle.gold : mirthaEffects.pearl.charcoal,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = mirthaEffects.rose.gold)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        scrollY > 50 ? mirthaEffects.sparkle.gold : mirthaEffects.pearl.charcoal)
                    }
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <button
              className="btn-mirtha"
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '0.875rem',
              }}
            >
              Edición Especial
            </button>
          </nav>
        </header>

        {/* Hero Section - Full Screen */}
        <section
          id="inicio"
          style={{
            height: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
              radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(244, 194, 194, 0.05) 0%, transparent 50%)
            `,
            }}
          />

          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 2rem',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: mirthaEffects.rose.gold,
                  marginBottom: '1rem',
                }}
              >
                Edición Limitada 2024
              </p>
              <h2
                style={{
                  fontSize: 'clamp(3rem, 5vw, 4rem)',
                  fontFamily: 'Playfair Display, serif',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  background: mirthaEffects.gradients.goldShimmer,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                La Elegancia
                <br />
                Es Un Estado
                <br />
                Del Alma
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: '#6B7280',
                  marginBottom: '2rem',
                  maxWidth: '500px',
                }}
              >
                Descubra la colección que rinde homenaje a más de cinco décadas de estilo,
                sofisticación y momentos inolvidables.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-mirtha mirtha-shimmer">Explorar Colección</button>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: mirthaEffects.sparkle.gold,
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  Ver Video
                  <span style={{ fontSize: '1.25rem' }}>▶</span>
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div
              style={{
                position: 'relative',
                transform: `translateY(${scrollY * -0.1}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div
                className="mirtha-golden-frame mirtha-shimmer"
                style={{
                  width: '100%',
                  height: '600px',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: mirthaEffects.gradients.luxury,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'white',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  [Editorial Image]
                </div>
              </div>

              {/* Floating elements */}
              <div
                className="mirtha-sparkle-container"
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: mirthaEffects.gradients.roseGold,
                  animation: 'mirtha-float 6s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              SCROLL
            </p>
            <div
              style={{
                width: '1px',
                height: '40px',
                background: mirthaEffects.sparkle.gold,
                margin: '0 auto',
                animation: 'bounce 2s infinite',
              }}
            />
          </div>
        </section>

        {/* Collection Grid */}
        <section id="coleccion" style={{ padding: '8rem 2rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: mirthaEffects.rose.gold,
                  marginBottom: '1rem',
                }}
              >
                Colección Exclusiva
              </p>
              <h2
                style={{
                  fontSize: '3rem',
                  fontFamily: 'Playfair Display, serif',
                  marginBottom: '2rem',
                }}
              >
                Piezas Únicas de Elegancia
              </h2>
              <div className="mirtha-divider" style={{ maxWidth: '200px', margin: '0 auto' }} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
              }}
            >
              {/* Large Feature */}
              <div
                style={{
                  gridColumn: 'span 2',
                  gridRow: 'span 2',
                }}
              >
                <div
                  className="card-mirtha luxury mirtha-shimmer"
                  style={{
                    height: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '3rem',
                    background: `
                    linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%),
                    ${mirthaEffects.gradients.sunset}
                  `,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'relative', zIndex: 10, color: 'white' }}>
                    <span
                      className="mirtha-badge"
                      style={{ marginBottom: '1rem', display: 'inline-block' }}
                    >
                      Destacado
                    </span>
                    <h3
                      style={{
                        fontSize: '2.5rem',
                        fontFamily: 'Playfair Display, serif',
                        marginBottom: '1rem',
                      }}
                    >
                      El Vestido Dorado
                    </h3>
                    <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                      Una pieza icónica que captura la esencia de décadas de elegancia
                    </p>
                  </div>
                </div>
              </div>

              {/* Small Cards */}
              {[
                { title: 'Joyas de Gala', color: mirthaEffects.rose.gold },
                { title: 'Accesorios Vintage', color: mirthaEffects.sparkle.gold },
                { title: 'Perfume Signature', color: mirthaEffects.rose.burgundy },
                { title: 'Colección Limitada', color: mirthaEffects.pearl.taupe },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card-mirtha mirtha-shimmer"
                  style={{
                    height: '290px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}44 100%)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = mirthaEffects.shadows.luxurious;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = mirthaEffects.shadows.soft;
                  }}
                >
                  <h4
                    style={{
                      fontSize: '1.5rem',
                      fontFamily: 'Playfair Display, serif',
                      color: item.color,
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section
          id="historia"
          style={{
            padding: '8rem 2rem',
            background: '#FFFAF7',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: mirthaEffects.rose.gold,
                  marginBottom: '1rem',
                }}
              >
                Una Vida de Elegancia
              </p>
              <h2
                style={{
                  fontSize: '3rem',
                  fontFamily: 'Playfair Display, serif',
                }}
              >
                Momentos Que Hicieron Historia
              </h2>
            </div>

            <div style={{ position: 'relative', padding: '0 2rem' }}>
              {/* Timeline Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: mirthaEffects.gradients.goldShimmer,
                  transform: 'translateX(-50%)',
                }}
              />

              {/* Timeline Items */}
              {[
                { year: '1968', title: 'El Comienzo', desc: 'Primer almuerzo televisado' },
                { year: '1980', title: 'Era Dorada', desc: 'Consolidación como ícono cultural' },
                {
                  year: '2000',
                  title: 'Nuevo Milenio',
                  desc: 'Modernización y nuevas generaciones',
                },
                {
                  year: '2024',
                  title: 'Legado Eterno',
                  desc: '56 años de tradición ininterrumpida',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                    marginBottom: '4rem',
                    position: 'relative',
                  }}
                >
                  <div
                    className="card-mirtha mirtha-shimmer"
                    style={{
                      width: '40%',
                      padding: '2rem',
                      textAlign: index % 2 === 0 ? 'right' : 'left',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '2rem',
                        fontFamily: 'Playfair Display, serif',
                        color: mirthaEffects.sparkle.gold,
                        display: 'block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.year}
                    </span>
                    <h4
                      style={{
                        fontSize: '1.5rem',
                        fontFamily: 'Playfair Display, serif',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ color: '#6B7280' }}>{item.desc}</p>
                  </div>

                  {/* Center Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: mirthaEffects.sparkle.gold,
                      border: '4px solid #FFFAF7',
                      boxShadow: mirthaEffects.shadows.golden,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section
          style={{
            padding: '6rem 2rem',
            background: `linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(244, 194, 194, 0.05) 100%)`,
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div
              className="mirtha-quote"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '2rem',
                fontFamily: 'Crimson Text, serif',
                color: mirthaEffects.rose.burgundy,
              }}
            >
              "La elegancia no es destacar, sino ser recordada"
              <div
                style={{
                  marginTop: '2rem',
                  fontSize: '1rem',
                  fontFamily: 'Dancing Script, cursive',
                  color: mirthaEffects.sparkle.gold,
                }}
              >
                — Mirtha Legrand
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h3
              style={{
                fontSize: '2rem',
                fontFamily: 'Playfair Display, serif',
                marginBottom: '1rem',
              }}
            >
              Manténgase al Día
            </h3>
            <p style={{ marginBottom: '2rem', color: '#6B7280' }}>
              Reciba las últimas noticias y eventos exclusivos
            </p>
            <form style={{ display: 'flex', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              <input type="email" placeholder="Su correo elegante" style={{ flex: 1 }} />
              <button className="btn-mirtha mirtha-sparkle-container">Suscribir</button>
            </form>
          </div>
        </section>

        {/* Elegant Footer */}
        <footer
          style={{
            padding: '4rem 2rem 2rem',
            background: mirthaEffects.pearl.charcoal,
            color: mirthaEffects.pearl.ivory,
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '3rem',
                marginBottom: '3rem',
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: mirthaEffects.sparkle.gold,
                  }}
                >
                  ML
                </h4>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Elegancia eterna desde 1968</p>
              </div>

              {['Colección', 'Sobre Nosotros', 'Contacto'].map((title) => (
                <div key={title}>
                  <h5
                    style={{
                      fontSize: '0.875rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      color: mirthaEffects.rose.gold,
                    }}
                  >
                    {title}
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                      <li key={link} style={{ marginBottom: '0.5rem' }}>
                        <a
                          href="#"
                          style={{
                            color: mirthaEffects.pearl.ivory,
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            opacity: 0.8,
                            transition: 'opacity 0.3s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 215, 0, 0.2)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                © 2024 Mirtha Legrand Collection. Todos los derechos reservados.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      color: mirthaEffects.sparkle.gold,
                      fontSize: '0.75rem',
                      textDecoration: 'none',
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${mirthaEffects.sparkle.gold};
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${mirthaEffects.rose.gold};
          }
        `}</style>
      </div>
    );
  },
};
