/**
 * Mirtha Elegance Plugin
 * Adds sparkle, shimmer, and elegant effects to components
 */

import { BasePlugin } from './base-plugin';
import type { PluginConfig } from './types';

export class MirthaElegancePlugin extends BasePlugin {
  name = 'mirtha-elegance';
  version = '1.0.0';
  description = 'Elegant sparkle and shimmer effects inspired by Mirtha Legrand';

  private sparkleIntervals: Map<string, number> = new Map();
  private shimmerObserver: IntersectionObserver | null = null;

  constructor(config: PluginConfig = {}) {
    super(config);
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    this.shimmerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activateShimmer(entry.target as HTMLElement);
          } else {
            this.deactivateShimmer(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0.1 },
    );
  }

  private activateShimmer(element: HTMLElement) {
    element.classList.add('mirtha-shimmer-active');
  }

  private deactivateShimmer(element: HTMLElement) {
    element.classList.remove('mirtha-shimmer-active');
  }

  apply(element: HTMLElement): void {
    const eleganceType = element.dataset.mirthaElegance || 'default';

    switch (eleganceType) {
      case 'sparkle':
        this.applySparkle(element);
        break;
      case 'shimmer':
        this.applyShimmer(element);
        break;
      case 'glow':
        this.applyGlow(element);
        break;
      case 'luxury':
        this.applyLuxury(element);
        break;
      default:
        this.applyDefault(element);
    }

    // Add hover effects
    this.setupHoverEffects(element);
  }

  private applySparkle(element: HTMLElement) {
    element.classList.add('mirtha-sparkle');

    // Create sparkle elements
    const sparkleCount = parseInt(element.dataset.sparkleCount || '3');

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'mirtha-sparkle-particle';
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, transparent 70%);
        pointer-events: none;
        opacity: 0;
        animation: sparkle 2s ease-in-out infinite;
        animation-delay: ${i * 0.3}s;
      `;
      element.appendChild(sparkle);
    }

    // Animate sparkle positions
    this.animateSparkles(element);
  }

  private animateSparkles(element: HTMLElement) {
    const sparkles = element.querySelectorAll('.mirtha-sparkle-particle');
    const interval = setInterval(() => {
      sparkles.forEach((sparkle) => {
        const htmlSparkle = sparkle as HTMLElement;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        htmlSparkle.style.left = `${x}%`;
        htmlSparkle.style.top = `${y}%`;
      });
    }, 2000);

    this.sparkleIntervals.set(
      element.id || Math.random().toString(),
      interval as unknown as number,
    );
  }

  private applyShimmer(element: HTMLElement) {
    element.classList.add('mirtha-shimmer');

    // Create shimmer overlay
    const shimmer = document.createElement('div');
    shimmer.className = 'mirtha-shimmer-overlay';
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 215, 0, 0.1) 20%,
        rgba(255, 215, 0, 0.3) 50%,
        rgba(255, 215, 0, 0.1) 80%,
        transparent 100%
      );
      pointer-events: none;
      animation: shimmerSlide 3s ease-in-out infinite;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shimmer);

    // Observe for viewport visibility
    if (this.shimmerObserver) {
      this.shimmerObserver.observe(element);
    }
  }

  private applyGlow(element: HTMLElement) {
    element.classList.add('mirtha-glow');

    const glowIntensity = element.dataset.glowIntensity || 'medium';
    const glowColor = element.dataset.glowColor || 'gold';

    const glowStyles = {
      gold: {
        light: '0 0 10px rgba(255, 215, 0, 0.3)',
        medium: '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)',
        intense: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
      },
      rose: {
        light: '0 0 10px rgba(244, 194, 194, 0.4)',
        medium: '0 0 20px rgba(244, 194, 194, 0.5), 0 0 40px rgba(244, 194, 194, 0.3)',
        intense: '0 0 30px rgba(244, 194, 194, 0.6), 0 0 60px rgba(244, 194, 194, 0.4)',
      },
    };

    const glow =
      glowStyles[glowColor as keyof typeof glowStyles]?.[
        glowIntensity as keyof typeof glowStyles.gold
      ] || glowStyles.gold.medium;
    element.style.boxShadow = glow;
    element.style.transition = 'box-shadow 0.4s ease-in-out';
  }

  private applyLuxury(element: HTMLElement) {
    element.classList.add('mirtha-luxury');

    // Combine multiple effects for ultimate elegance
    this.applyGlow(element);
    this.applyShimmer(element);

    // Add luxury gradient border
    element.style.cssText += `
      background: linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(135deg, #FFD700, #F4C2C2, #FFD700) border-box;
      border: 2px solid transparent;
      position: relative;
    `;
  }

  private applyDefault(element: HTMLElement) {
    element.classList.add('mirtha-elegant');

    // Subtle default elegance
    element.style.cssText += `
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    `;
  }

  private setupHoverEffects(element: HTMLElement) {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-2px)';

      // Enhance glow on hover
      if (element.classList.contains('mirtha-glow')) {
        const currentShadow = element.style.boxShadow;
        element.style.boxShadow = currentShadow.replace(/0\.\d+/g, (match) =>
          String(Math.min(1, parseFloat(match) * 1.5)),
        );
      }
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';

      // Reset glow
      if (element.classList.contains('mirtha-glow')) {
        this.applyGlow(element);
      }
    });
  }

  remove(element: HTMLElement): void {
    // Clean up sparkle intervals
    const elementId = element.id || element.dataset.mirthaId;
    if (elementId && this.sparkleIntervals.has(elementId)) {
      window.clearInterval(this.sparkleIntervals.get(elementId)!);
      this.sparkleIntervals.delete(elementId);
    }

    // Remove observer
    if (this.shimmerObserver) {
      this.shimmerObserver.unobserve(element);
    }

    // Remove created elements
    element
      .querySelectorAll('.mirtha-sparkle-particle, .mirtha-shimmer-overlay')
      .forEach((el) => el.remove());

    // Remove classes
    element.classList.remove(
      'mirtha-sparkle',
      'mirtha-shimmer',
      'mirtha-shimmer-active',
      'mirtha-glow',
      'mirtha-luxury',
      'mirtha-elegant',
    );

    // Reset styles
    element.style.transform = '';
    element.style.boxShadow = '';
  }

  destroy(): void {
    // Clear all intervals
    this.sparkleIntervals.forEach((interval) => window.clearInterval(interval));
    this.sparkleIntervals.clear();

    // Disconnect observer
    if (this.shimmerObserver) {
      this.shimmerObserver.disconnect();
      this.shimmerObserver = null;
    }
  }

  getStyles(): string {
    return `
      @keyframes sparkle {
        0%, 100% {
          opacity: 0;
          transform: scale(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1) rotate(180deg);
        }
      }

      @keyframes shimmerSlide {
        0% {
          left: -100%;
        }
        100% {
          left: 200%;
        }
      }

      .mirtha-sparkle {
        position: relative;
        overflow: visible;
      }

      .mirtha-shimmer {
        position: relative;
        overflow: hidden;
      }

      .mirtha-shimmer-active .mirtha-shimmer-overlay {
        animation-play-state: running;
      }

      .mirtha-shimmer-overlay {
        animation-play-state: paused;
      }

      .mirtha-glow {
        animation: glow 4s ease-in-out infinite;
      }

      @keyframes glow {
        0%, 100% {
          filter: brightness(1);
        }
        50% {
          filter: brightness(1.1);
        }
      }

      .mirtha-luxury {
        background-clip: padding-box;
      }

      .mirtha-elegant {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Accessibility - Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .mirtha-sparkle-particle,
        .mirtha-shimmer-overlay,
        .mirtha-glow {
          animation: none;
        }
        
        .mirtha-elegant,
        .mirtha-luxury {
          transition: none;
        }
      }
    `;
  }

  getPerformanceHints() {
    return {
      gpu: true,
      reflow: 'minimal',
      memory: 'low',
      animations: 'css-only',
      accessibility: 'reduced-motion-safe',
    };
  }
}
