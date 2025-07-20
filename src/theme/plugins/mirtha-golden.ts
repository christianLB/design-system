/**
 * Mirtha Golden Plugin
 * Creates golden hour lighting effects and luxurious golden accents
 */

import { BasePlugin } from './base-plugin';
import type { PluginConfig } from './types';

export class MirthaGoldenPlugin extends BasePlugin {
  name = 'mirtha-golden';
  version = '1.0.0';
  description = 'Golden hour lighting effects and luxurious accents';

  private goldenElements: WeakMap<HTMLElement, GoldenState> = new WeakMap();
  private animationFrames: Map<string, number> = new Map();
  private resizeObserver: ResizeObserver | null = null;

  constructor(config: PluginConfig = {}) {
    super(config);
    this.setupResizeObserver();
  }

  private setupResizeObserver() {
    if (typeof window === 'undefined' || !window.ResizeObserver) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const state = this.goldenElements.get(element);
        if (state) {
          this.updateGoldenDimensions(element, state);
        }
      });
    });
  }

  apply(element: HTMLElement): void {
    const goldenType = element.dataset.mirthaGolden || 'subtle';
    const state: GoldenState = {
      type: goldenType,
      intensity: parseFloat(element.dataset.goldenIntensity || '1'),
      animated: element.dataset.goldenAnimated === 'true',
    };

    this.goldenElements.set(element, state);

    switch (goldenType) {
      case 'hour':
        this.applyGoldenHour(element, state);
        break;
      case 'frame':
        this.applyGoldenFrame(element, state);
        break;
      case 'accent':
        this.applyGoldenAccent(element, state);
        break;
      case 'luxury':
        this.applyLuxuryGold(element, state);
        break;
      default:
        this.applySubtleGold(element, state);
    }

    // Setup resize observer
    if (this.resizeObserver) {
      this.resizeObserver.observe(element);
    }
  }

  private applyGoldenHour(element: HTMLElement, state: GoldenState) {
    element.classList.add('mirtha-golden-hour');

    // Create golden hour overlay
    const overlay = document.createElement('div');
    overlay.className = 'mirtha-golden-hour-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      opacity: ${0.1 * state.intensity};
      mix-blend-mode: soft-light;
      background: radial-gradient(
        ellipse at top right,
        rgba(255, 215, 0, 0.4) 0%,
        rgba(255, 193, 7, 0.2) 30%,
        rgba(255, 152, 0, 0.1) 60%,
        transparent 100%
      );
    `;

    if (state.animated) {
      overlay.style.animation = 'goldenHourShift 10s ease-in-out infinite';
    }

    element.style.position = 'relative';
    element.appendChild(overlay);

    // Add warm color adjustment
    this.applyWarmthFilter(element, state.intensity);
  }

  private applyGoldenFrame(element: HTMLElement, state: GoldenState) {
    element.classList.add('mirtha-golden-frame');

    // Create ornate golden frame
    const frameWidth = 3 * state.intensity;
    element.style.cssText += `
      position: relative;
      border: ${frameWidth}px solid transparent;
      background: linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(
                    45deg,
                    #FFD700 0%,
                    #F7E7CE 25%,
                    #FFD700 50%,
                    #F7E7CE 75%,
                    #FFD700 100%
                  ) border-box;
    `;

    // Add frame corners
    this.addFrameCorners(element, state);

    if (state.animated) {
      this.animateFrame(element);
    }
  }

  private applyGoldenAccent(element: HTMLElement, state: GoldenState) {
    element.classList.add('mirtha-golden-accent');

    // Create accent highlights
    const accent = document.createElement('span');
    accent.className = 'mirtha-golden-accent-highlight';
    accent.style.cssText = `
      position: absolute;
      top: -2px;
      right: -2px;
      width: 20px;
      height: 20px;
      background: radial-gradient(
        circle at center,
        rgba(255, 215, 0, ${0.8 * state.intensity}) 0%,
        rgba(255, 215, 0, ${0.4 * state.intensity}) 50%,
        transparent 70%
      );
      pointer-events: none;
    `;

    if (state.animated) {
      accent.style.animation = 'goldenPulse 2s ease-in-out infinite';
    }

    element.style.position = 'relative';
    element.appendChild(accent);

    // Add golden text shadow for text elements
    if (this.isTextElement(element)) {
      element.style.textShadow = `0 1px 3px rgba(255, 215, 0, ${0.3 * state.intensity})`;
    }
  }

  private applyLuxuryGold(element: HTMLElement, state: GoldenState) {
    element.classList.add('mirtha-luxury-gold');

    // Combine multiple golden effects
    this.applyGoldenFrame(element, { ...state, intensity: state.intensity * 0.5 });
    this.applyGoldenHour(element, { ...state, intensity: state.intensity * 0.3 });

    // Add luxury gradient
    const gradient = document.createElement('div');
    gradient.className = 'mirtha-luxury-gradient';
    gradient.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      opacity: ${0.05 * state.intensity};
      background: conic-gradient(
        from 0deg,
        #FFD700 0deg,
        #F4C2C2 60deg,
        #FFF8DC 120deg,
        #FFD700 180deg,
        #F4C2C2 240deg,
        #FFF8DC 300deg,
        #FFD700 360deg
      );
      mix-blend-mode: luminosity;
    `;

    if (state.animated) {
      gradient.style.animation = 'luxuryRotate 20s linear infinite';
    }

    element.appendChild(gradient);
  }

  private applySubtleGold(element: HTMLElement, state: GoldenState) {
    element.classList.add('mirtha-subtle-gold');

    // Subtle golden tint
    element.style.cssText += `
      position: relative;
      background-color: rgba(255, 215, 0, ${0.02 * state.intensity});
      box-shadow: inset 0 1px 2px rgba(255, 215, 0, ${0.1 * state.intensity});
    `;

    // Add hover golden effect
    this.setupGoldenHover(element, state);
  }

  private addFrameCorners(element: HTMLElement, state: GoldenState) {
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    corners.forEach((corner) => {
      const ornament = document.createElement('div');
      ornament.className = `mirtha-frame-corner mirtha-frame-corner-${corner}`;

      const [vertical, horizontal] = corner.split('-');

      ornament.style.cssText = `
        position: absolute;
        ${vertical}: -5px;
        ${horizontal}: -5px;
        width: 15px;
        height: 15px;
        background: radial-gradient(
          circle at center,
          #FFD700 0%,
          #F7E7CE 50%,
          #FFD700 100%
        );
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 215, 0, ${0.5 * state.intensity});
      `;

      element.appendChild(ornament);
    });
  }

  private animateFrame(element: HTMLElement) {
    const id = element.id || Math.random().toString();

    const animate = () => {
      const time = Date.now() * 0.001;
      const shift = Math.sin(time) * 50 + 50;

      element.style.backgroundImage = `
        linear-gradient(#fff, #fff) padding-box,
        linear-gradient(
          ${45 + Math.sin(time * 0.5) * 15}deg,
          #FFD700 0%,
          #F7E7CE ${shift * 0.5}%,
          #FFD700 ${shift}%,
          #F7E7CE ${shift * 1.5}%,
          #FFD700 100%
        ) border-box
      `;

      this.animationFrames.set(id, requestAnimationFrame(animate));
    };

    animate();
  }

  private applyWarmthFilter(element: HTMLElement, intensity: number) {
    const warmth = 1 + 0.1 * intensity;
    const brightness = 1 + 0.05 * intensity;

    element.style.filter = `brightness(${brightness}) saturate(${warmth})`;
  }

  private setupGoldenHover(element: HTMLElement, state: GoldenState) {
    element.addEventListener('mouseenter', () => {
      element.style.backgroundColor = `rgba(255, 215, 0, ${0.05 * state.intensity})`;
      element.style.boxShadow = `
        inset 0 1px 2px rgba(255, 215, 0, ${0.2 * state.intensity}),
        0 0 20px rgba(255, 215, 0, ${0.1 * state.intensity})
      `;
    });

    element.addEventListener('mouseleave', () => {
      element.style.backgroundColor = `rgba(255, 215, 0, ${0.02 * state.intensity})`;
      element.style.boxShadow = `inset 0 1px 2px rgba(255, 215, 0, ${0.1 * state.intensity})`;
    });
  }

  private updateGoldenDimensions(element: HTMLElement, state: GoldenState) {
    // Update golden hour gradient based on new dimensions
    if (element.classList.contains('mirtha-golden-hour')) {
      const overlay = element.querySelector('.mirtha-golden-hour-overlay') as HTMLElement;
      if (overlay) {
        const { width, height } = element.getBoundingClientRect();
        const aspectRatio = width / height;
        overlay.style.background = `radial-gradient(
          ellipse ${100 * aspectRatio}% 100% at top right,
          rgba(255, 215, 0, 0.4) 0%,
          rgba(255, 193, 7, 0.2) 30%,
          rgba(255, 152, 0, 0.1) 60%,
          transparent 100%
        )`;
      }
    }
  }

  private isTextElement(element: HTMLElement): boolean {
    const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON'];
    return textTags.includes(element.tagName);
  }

  remove(element: HTMLElement): void {
    // Clean up animation frames
    const id = element.id || element.dataset.mirthaId;
    if (id && this.animationFrames.has(id)) {
      cancelAnimationFrame(this.animationFrames.get(id)!);
      this.animationFrames.delete(id);
    }

    // Remove resize observer
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(element);
    }

    // Remove created elements
    element
      .querySelectorAll(
        '.mirtha-golden-hour-overlay, .mirtha-frame-corner, ' +
          '.mirtha-golden-accent-highlight, .mirtha-luxury-gradient',
      )
      .forEach((el) => el.remove());

    // Remove classes
    element.classList.remove(
      'mirtha-golden-hour',
      'mirtha-golden-frame',
      'mirtha-golden-accent',
      'mirtha-luxury-gold',
      'mirtha-subtle-gold',
    );

    // Reset styles
    element.style.filter = '';
    element.style.backgroundColor = '';
    element.style.boxShadow = '';
    element.style.textShadow = '';

    // Clean up state
    this.goldenElements.delete(element);
  }

  destroy(): void {
    // Cancel all animation frames
    this.animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    this.animationFrames.clear();

    // Disconnect resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Clear state
    this.goldenElements = new WeakMap();
  }

  getStyles(): string {
    return `
      @keyframes goldenHourShift {
        0%, 100% {
          transform: rotate(0deg) scale(1);
        }
        25% {
          transform: rotate(5deg) scale(1.05);
        }
        50% {
          transform: rotate(-5deg) scale(1.1);
        }
        75% {
          transform: rotate(3deg) scale(1.05);
        }
      }

      @keyframes goldenPulse {
        0%, 100% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      @keyframes luxuryRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .mirtha-golden-hour {
        position: relative;
        overflow: hidden;
      }

      .mirtha-golden-frame {
        position: relative;
        background-clip: padding-box;
      }

      .mirtha-golden-accent {
        position: relative;
      }

      .mirtha-luxury-gold {
        position: relative;
        overflow: hidden;
      }

      .mirtha-subtle-gold {
        transition: all 0.3s ease-in-out;
      }

      /* Accessibility - Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .mirtha-golden-hour-overlay,
        .mirtha-golden-accent-highlight,
        .mirtha-luxury-gradient {
          animation: none;
        }
        
        .mirtha-subtle-gold {
          transition: none;
        }
      }

      /* Print styles */
      @media print {
        .mirtha-golden-hour-overlay,
        .mirtha-frame-corner,
        .mirtha-golden-accent-highlight,
        .mirtha-luxury-gradient {
          display: none;
        }
      }
    `;
  }

  getPerformanceHints() {
    return {
      gpu: true,
      reflow: 'minimal',
      memory: 'moderate',
      animations: 'gpu-accelerated',
      accessibility: 'reduced-motion-safe',
    };
  }
}

interface GoldenState {
  type: string;
  intensity: number;
  animated: boolean;
}
