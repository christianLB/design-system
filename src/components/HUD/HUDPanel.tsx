import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type HUDPanelVariant = 'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost';
export type HUDPanelSize = 'sm' | 'md' | 'lg' | 'xl';
export type HUDPanelShape = 'rectangular' | 'rounded' | 'hexagonal' | 'circular';

export interface HUDPanelProps {
  /** Panel content */
  children?: React.ReactNode;
  /** Panel title */
  title?: string;
  /** Panel subtitle */
  subtitle?: string;
  /** Visual variant */
  variant?: HUDPanelVariant;
  /** Panel size */
  size?: HUDPanelSize;
  /** Panel shape */
  shape?: HUDPanelShape;
  /** Whether panel is active/focused */
  active?: boolean;
  /** Whether panel is collapsible */
  collapsible?: boolean;
  /** Whether panel is initially collapsed */
  defaultCollapsed?: boolean;
  /** Whether panel is draggable */
  draggable?: boolean;
  /** Whether panel is resizable */
  resizable?: boolean;
  /** Whether to show header */
  showHeader?: boolean;
  /** Whether to show footer */
  showFooter?: boolean;
  /** Whether to show status indicator */
  showStatus?: boolean;
  /** Status type */
  status?: 'online' | 'offline' | 'warning' | 'error' | 'loading';
  /** Whether to enable glow effect */
  enableGlow?: boolean;
  /** Whether to enable scanlines */
  enableScanlines?: boolean;
  /** Whether to enable pulse animation */
  enablePulse?: boolean;
  /** Whether to enable glitch effect */
  enableGlitch?: boolean;
  /** Panel opacity */
  opacity?: number;
  /** Blur intensity */
  blur?: number;
  /** Custom width */
  width?: number | string;
  /** Custom height */
  height?: number | string;
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Header content */
  headerContent?: React.ReactNode;
  /** Footer content */
  footerContent?: React.ReactNode;
  /** Callback when panel is clicked */
  onClick?: () => void;
  /** Callback when panel is collapsed/expanded */
  onCollapse?: (collapsed: boolean) => void;
  /** Callback when panel is hovered */
  onHover?: (hovered: boolean) => void;
  /** Data attributes for testing */
  'data-testid'?: string;
}

const statusColors = {
  online: 'var(--cyber-matrix-green)',
  offline: 'var(--cyber-medium-charcoal)',
  warning: 'var(--cyber-tech-orange)',
  error: 'var(--cyber-doom-red)',
  loading: 'var(--cyber-swordfish-cyan)',
};

const HUDPanel: React.FC<HUDPanelProps> = ({
  children,
  title,
  subtitle,
  variant = 'matrix',
  size = 'md',
  shape = 'rectangular',
  active = false,
  collapsible = false,
  defaultCollapsed = false,
  draggable = false,
  resizable = false,
  showHeader = true,
  showFooter = false,
  showStatus = true,
  status = 'online',
  enableGlow = true,
  enableScanlines = true,
  enablePulse = false,
  enableGlitch = false,
  opacity = 0.9,
  blur = 8,
  width,
  height,
  className,
  style,
  headerContent,
  footerContent,
  onClick,
  onCollapse,
  onHover,
  'data-testid': dataTestId,
}) => {
  // State
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  // Refs
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle collapse toggle
  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const handleClick = () => {
    onClick?.();
  };

  // Drag functionality
  const handleDragStart = (e: React.MouseEvent) => {
    if (!draggable) return;

    setIsDragging(true);
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (event: MouseEvent) => {
      const newPosition = {
        x: event.clientX - offsetX,
        y: event.clientY - offsetY,
      };
      setDragPosition(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // CSS classes
  const panelClasses = clsx(
    'hud-panel',
    `hud-panel--${variant}`,
    `hud-panel--${size}`,
    `hud-panel--${shape}`,
    {
      'hud-panel--active': active,
      'hud-panel--collapsed': isCollapsed,
      'hud-panel--hovered': isHovered,
      'hud-panel--dragging': isDragging,
      'hud-panel--draggable': draggable,
      'hud-panel--resizable': resizable,
      'hud-panel--collapsible': collapsible,
      'hud-panel--glow': enableGlow,
      'hud-panel--scanlines': enableScanlines,
      'hud-panel--pulse': enablePulse,
      'hud-panel--glitch': enableGlitch,
    },
    className
  );

  // Inline styles
  const panelStyles: React.CSSProperties = {
    ...style,
    '--panel-opacity': opacity,
    '--panel-blur': `${blur}px`,
    '--panel-status-color': statusColors[status],
    width,
    height,
    ...(dragPosition && {
      position: 'fixed',
      left: dragPosition.x,
      top: dragPosition.y,
      zIndex: 1001,
    }),
  } as React.CSSProperties;

  // Animation variants
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    collapsed: { height: 'auto' },
    expanded: { height: 'auto' },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  return (
    <motion.div
      ref={panelRef}
      className={panelClasses}
      style={panelStyles}
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleDragStart}
      data-testid={dataTestId}
    >
      {/* Background effects */}
      {enableScanlines && (
        <div className="hud-panel-scanlines" />
      )}
      
      {/* Glow effect */}
      {enableGlow && (
        <div className="hud-panel-glow" />
      )}

      {/* Header */}
      {showHeader && (
        <div className="hud-panel-header">
          <div className="hud-panel-header-content">
            {/* Status indicator */}
            {showStatus && (
              <div className={clsx('hud-panel-status', `hud-panel-status--${status}`)}>
                <div className="hud-panel-status-dot" />
              </div>
            )}

            {/* Title and subtitle */}
            <div className="hud-panel-title-section">
              {title && (
                <h3 className="hud-panel-title">{title}</h3>
              )}
              {subtitle && (
                <p className="hud-panel-subtitle">{subtitle}</p>
              )}
            </div>

            {/* Header actions */}
            <div className="hud-panel-header-actions">
              {headerContent}
              
              {/* Collapse button */}
              {collapsible && (
                <button
                  className="hud-panel-collapse-button"
                  onClick={handleCollapseToggle}
                  aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
                >
                  <motion.div
                    animate={{ rotate: isCollapsed ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="hud-panel-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {showFooter && !isCollapsed && (
        <div className="hud-panel-footer">
          {footerContent}
        </div>
      )}

      {/* Resize handles */}
      {resizable && (
        <div className="hud-panel-resize-handles">
          <div className="hud-panel-resize-handle hud-panel-resize-handle--se" />
        </div>
      )}

      {/* Corner details */}
      <div className="hud-panel-corners">
        <div className="hud-panel-corner hud-panel-corner--tl" />
        <div className="hud-panel-corner hud-panel-corner--tr" />
        <div className="hud-panel-corner hud-panel-corner--bl" />
        <div className="hud-panel-corner hud-panel-corner--br" />
      </div>
    </motion.div>
  );
};

export default HUDPanel;