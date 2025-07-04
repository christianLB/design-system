import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type HUDPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'custom';
export type HUDVariant = 'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost';
export type HUDSize = 'sm' | 'md' | 'lg' | 'xl';
export type HUDOrientation = 'horizontal' | 'vertical';

export interface HUDPosition2D {
  x: number;
  y: number;
}

export interface HUDLayout {
  position: HUDPosition;
  customPosition?: HUDPosition2D;
  orientation?: HUDOrientation;
  gap?: number;
  padding?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface HUDTheme {
  variant: HUDVariant;
  opacity?: number;
  blur?: number;
  glow?: boolean;
  scanlines?: boolean;
  matrixRain?: boolean;
  glitchEffect?: boolean;
  pulseEffect?: boolean;
}

export interface HUDConfig {
  autoHide?: boolean;
  autoHideDelay?: number;
  resizable?: boolean;
  draggable?: boolean;
  collapsible?: boolean;
  persistent?: boolean;
  zIndex?: number;
  responsive?: boolean;
}

export interface HUDProps {
  /** Children components to render inside HUD */
  children?: React.ReactNode;
  /** Layout configuration */
  layout?: Partial<HUDLayout>;
  /** Theme configuration */
  theme?: Partial<HUDTheme>;
  /** Behavior configuration */
  config?: Partial<HUDConfig>;
  /** Whether HUD is visible */
  visible?: boolean;
  /** Whether HUD is active/focused */
  active?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when HUD visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Callback when HUD is clicked */
  onClick?: () => void;
  /** Callback when HUD is hovered */
  onHover?: (hovered: boolean) => void;
  /** Callback when HUD is dragged (if draggable) */
  onDrag?: (position: HUDPosition2D) => void;
  /** Callback when HUD is resized (if resizable) */
  onResize?: (size: { width: number; height: number }) => void;
  /** Data attributes for testing */
  'data-testid'?: string;
}

const defaultLayout: HUDLayout = {
  position: 'top-left',
  orientation: 'vertical',
  gap: 16,
  padding: 16,
};

const defaultTheme: HUDTheme = {
  variant: 'matrix',
  opacity: 0.9,
  blur: 8,
  glow: true,
  scanlines: true,
  matrixRain: false,
  glitchEffect: false,
  pulseEffect: false,
};

const defaultConfig: HUDConfig = {
  autoHide: false,
  autoHideDelay: 3000,
  resizable: false,
  draggable: false,
  collapsible: false,
  persistent: true,
  zIndex: 1000,
  responsive: true,
};

const HUD: React.FC<HUDProps> = ({
  children,
  layout = {},
  theme = {},
  config = {},
  visible = true,
  active = false,
  className,
  style,
  onVisibilityChange,
  onClick,
  onHover,
  onDrag,
  onResize,
  'data-testid': dataTestId,
}) => {
  // Merge configurations with defaults
  const mergedLayout = { ...defaultLayout, ...layout };
  const mergedTheme = { ...defaultTheme, ...theme };
  const mergedConfig = { ...defaultConfig, ...config };

  // State
  const [isVisible, setIsVisible] = useState(visible);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<HUDPosition2D | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Refs
  const hudRef = useRef<HTMLDivElement>(null);
  const autoHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Auto-hide functionality
  useEffect(() => {
    if (mergedConfig.autoHide && isVisible && !isHovered) {
      autoHideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        onVisibilityChange?.(false);
      }, mergedConfig.autoHideDelay);
    } else if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
      autoHideTimeoutRef.current = null;
    }

    return () => {
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
    };
  }, [mergedConfig.autoHide, mergedConfig.autoHideDelay, isVisible, isHovered, onVisibilityChange]);

  // Visibility sync
  useEffect(() => {
    if (visible !== isVisible) {
      setIsVisible(visible);
    }
  }, [visible, isVisible]);

  // Resize observer
  useEffect(() => {
    if (hudRef.current && mergedConfig.resizable) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
          onResize?.({ width, height });
        }
      });

      resizeObserverRef.current.observe(hudRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [mergedConfig.resizable, onResize]);

  // Position calculation
  const calculatePosition = useCallback((): React.CSSProperties => {
    if (mergedLayout.position === 'custom' && mergedLayout.customPosition) {
      return {
        position: 'fixed',
        left: mergedLayout.customPosition.x,
        top: mergedLayout.customPosition.y,
        zIndex: mergedConfig.zIndex,
      };
    }

    if (dragPosition) {
      return {
        position: 'fixed',
        left: dragPosition.x,
        top: dragPosition.y,
        zIndex: mergedConfig.zIndex,
      };
    }

    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: mergedConfig.zIndex,
    };

    switch (mergedLayout.position) {
      case 'top-left':
        return { ...baseStyles, top: mergedLayout.padding, left: mergedLayout.padding };
      case 'top-right':
        return { ...baseStyles, top: mergedLayout.padding, right: mergedLayout.padding };
      case 'bottom-left':
        return { ...baseStyles, bottom: mergedLayout.padding, left: mergedLayout.padding };
      case 'bottom-right':
        return { ...baseStyles, bottom: mergedLayout.padding, right: mergedLayout.padding };
      case 'center':
        return {
          ...baseStyles,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      default:
        return { ...baseStyles, top: mergedLayout.padding, left: mergedLayout.padding };
    }
  }, [mergedLayout, mergedConfig.zIndex, dragPosition]);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover?.(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHover?.(false);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleToggleCollapse = useCallback(() => {
    if (mergedConfig.collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  }, [mergedConfig.collapsible, isCollapsed]);

  // Drag functionality
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (!mergedConfig.draggable) return;

    setIsDragging(true);
    const rect = hudRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (event: MouseEvent) => {
      const newPosition = {
        x: event.clientX - offsetX,
        y: event.clientY - offsetY,
      };
      setDragPosition(newPosition);
      onDrag?.(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [mergedConfig.draggable, onDrag]);

  // CSS classes
  const hudClasses = clsx(
    'hud',
    'hud-container',
    `hud--${mergedTheme.variant}`,
    `hud--${mergedLayout.position}`,
    `hud--${mergedLayout.orientation}`,
    {
      'hud--visible': isVisible,
      'hud--active': active,
      'hud--hovered': isHovered,
      'hud--dragging': isDragging,
      'hud--collapsed': isCollapsed,
      'hud--draggable': mergedConfig.draggable,
      'hud--resizable': mergedConfig.resizable,
      'hud--collapsible': mergedConfig.collapsible,
      'hud--glow': mergedTheme.glow,
      'hud--scanlines': mergedTheme.scanlines,
      'hud--matrix-rain': mergedTheme.matrixRain,
      'hud--glitch': mergedTheme.glitchEffect,
      'hud--pulse': mergedTheme.pulseEffect,
    },
    className
  );

  // Animation variants
  const animationVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
    },
  };

  // Inline styles
  const inlineStyles: React.CSSProperties = {
    ...calculatePosition(),
    ...style,
    '--hud-opacity': mergedTheme.opacity,
    '--hud-blur': `${mergedTheme.blur}px`,
    '--hud-gap': `${mergedLayout.gap}px`,
    maxWidth: mergedLayout.maxWidth,
    maxHeight: mergedLayout.maxHeight,
  } as React.CSSProperties;

  if (!isVisible && !mergedConfig.persistent) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={hudRef}
          className={hudClasses}
          style={inlineStyles}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onMouseDown={handleDragStart}
          data-testid={dataTestId}
        >
          {/* Background effects */}
          {mergedTheme.scanlines && (
            <div className="hud-scanlines" />
          )}
          {mergedTheme.matrixRain && (
            <div className="hud-matrix-rain">
              <div className="hud-matrix-rain-overlay" />
            </div>
          )}

          {/* Collapse button */}
          {mergedConfig.collapsible && (
            <button
              className="hud-collapse-button"
              onClick={handleToggleCollapse}
              aria-label={isCollapsed ? 'Expand HUD' : 'Collapse HUD'}
            >
              {isCollapsed ? '▲' : '▼'}
            </button>
          )}

          {/* HUD Content */}
          <div className={clsx('hud-content', {
            'hud-content--collapsed': isCollapsed,
          })}>
            {children}
          </div>

          {/* Resize handles */}
          {mergedConfig.resizable && (
            <div className="hud-resize-handles">
              <div className="hud-resize-handle hud-resize-handle--se" />
            </div>
          )}

          {/* Status indicator */}
          <div className="hud-status-indicator" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HUD;