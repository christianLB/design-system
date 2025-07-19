import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type HUDProgressBarVariant = 'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost';
export type HUDProgressBarSize = 'sm' | 'md' | 'lg' | 'xl';
export type HUDProgressBarOrientation = 'horizontal' | 'vertical';
export type HUDProgressBarShape = 'rectangular' | 'rounded' | 'pill' | 'hexagonal';
export type HUDProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export interface HUDProgressBarSegment {
  value: number;
  color?: string;
  label?: string;
  critical?: boolean;
}

export interface HUDProgressBarProps {
  /** Current progress value (0-100) */
  value?: number;
  /** Buffer value for buffer mode (0-100) */
  bufferValue?: number;
  /** Maximum value */
  maxValue?: number;
  /** Minimum value */
  minValue?: number;
  /** Visual variant */
  variant?: HUDProgressBarVariant;
  /** Progress bar size */
  size?: HUDProgressBarSize;
  /** Orientation */
  orientation?: HUDProgressBarOrientation;
  /** Shape style */
  shape?: HUDProgressBarShape;
  /** Progress mode */
  mode?: HUDProgressBarMode;
  /** Multi-segment data */
  segments?: HUDProgressBarSegment[];
  /** Progress bar label */
  label?: string;
  /** Whether to show percentage text */
  showPercentage?: boolean;
  /** Whether to show value text */
  showValue?: boolean;
  /** Custom format function for value display */
  formatValue?: (value: number, maxValue: number) => string;
  /** Unit symbol */
  unit?: string;
  /** Whether to animate progress changes */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether to show glow effect */
  enableGlow?: boolean;
  /** Whether to show scanlines */
  enableScanlines?: boolean;
  /** Whether to show pulse effect */
  enablePulse?: boolean;
  /** Whether to show data stream effect */
  enableDataStream?: boolean;
  /** Whether to show critical alert */
  critical?: boolean;
  /** Critical threshold (percentage) */
  criticalThreshold?: number;
  /** Warning threshold (percentage) */
  warningThreshold?: number;
  /** Optimal threshold (percentage) */
  optimalThreshold?: number;
  /** Whether to enable gradient fill */
  enableGradient?: boolean;
  /** Custom gradient colors */
  gradientColors?: string[];
  /** Whether to show loading state */
  loading?: boolean;
  /** Custom width */
  width?: number | string;
  /** Custom height */
  height?: number | string;
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when progress changes */
  onProgressChange?: (value: number) => void;
  /** Callback when threshold is crossed */
  onThresholdCross?: (threshold: 'critical' | 'warning' | 'optimal', value: number) => void;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
  /** Data attributes for testing */
  'data-testid'?: string;
}

const HUDProgressBar: React.FC<HUDProgressBarProps> = ({
  value = 0,
  bufferValue = 0,
  maxValue = 100,
  minValue = 0,
  variant = 'matrix',
  size = 'md',
  orientation = 'horizontal',
  shape = 'rectangular',
  mode = 'determinate',
  segments = [],
  label,
  showPercentage = false,
  showValue = false,
  formatValue,
  unit,
  animated = true,
  animationDuration = 300,
  enableGlow = true,
  enableScanlines = true,
  enablePulse = false,
  enableDataStream = false,
  critical = false,
  criticalThreshold = 15,
  warningThreshold = 30,
  optimalThreshold = 80,
  enableGradient = false,
  gradientColors = [],
  loading = false,
  width,
  height,
  className,
  style,
  onProgressChange,
  onThresholdCross,
  onAnimationComplete,
  'data-testid': dataTestId,
}) => {
  // State
  const [displayValue, setDisplayValue] = useState(value);
  const [currentThreshold, setCurrentThreshold] = useState<'critical' | 'warning' | 'optimal' | 'normal'>('normal');
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs
  const progressRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Calculate percentage
  const percentage = Math.min(Math.max(((displayValue - minValue) / (maxValue - minValue)) * 100, 0), 100);
  const bufferPercentage = Math.min(Math.max(((bufferValue - minValue) / (maxValue - minValue)) * 100, 0), 100);

  // Determine threshold status
  useEffect(() => {
    let newThreshold: 'critical' | 'warning' | 'optimal' | 'normal' = 'normal';
    
    if (critical || percentage <= criticalThreshold) {
      newThreshold = 'critical';
    } else if (percentage <= warningThreshold) {
      newThreshold = 'warning';
    } else if (percentage >= optimalThreshold) {
      newThreshold = 'optimal';
    }

    if (newThreshold !== currentThreshold) {
      setCurrentThreshold(newThreshold);
      if (newThreshold !== 'normal') {
        onThresholdCross?.(newThreshold, displayValue);
      }
    }
  }, [percentage, critical, criticalThreshold, warningThreshold, optimalThreshold, currentThreshold, displayValue, onThresholdCross]);

  // Animated value change
  useEffect(() => {
    if (!animated || displayValue === value) return;

    setIsAnimating(true);
    const startValue = displayValue;
    const endValue = value;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Ease out cubic function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeProgress;
      
      setDisplayValue(currentValue);
      onProgressChange?.(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onAnimationComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, animated, animationDuration, onProgressChange, onAnimationComplete]);

  // Sync display value when not animated
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
    }
  }, [value, animated]);

  // Format display value
  const getFormattedValue = () => {
    if (formatValue) {
      return formatValue(displayValue, maxValue);
    }
    
    if (showPercentage) {
      return `${Math.round(percentage)}%`;
    }
    
    if (showValue) {
      return `${Math.round(displayValue)}${unit ? ` ${unit}` : ''}`;
    }
    
    return '';
  };

  // Generate gradient
  const getGradient = () => {
    if (!enableGradient) return undefined;
    
    if (gradientColors.length > 0) {
      return `linear-gradient(${orientation === 'horizontal' ? '90deg' : '0deg'}, ${gradientColors.join(', ')})`;
    }
    
    // Default gradient based on threshold
    const colors = {
      critical: ['var(--cyber-doom-red)', 'var(--cyber-bright-red)'],
      warning: ['var(--cyber-tech-orange)', 'var(--cyber-cyber-yellow)'],
      optimal: ['var(--cyber-matrix-green)', 'var(--cyber-bright-matrix)'],
      normal: ['var(--cyber-swordfish-cyan)', 'var(--cyber-matrix-green)'],
    };
    
    return `linear-gradient(${orientation === 'horizontal' ? '90deg' : '0deg'}, ${colors[currentThreshold].join(', ')})`;
  };

  // CSS classes
  const progressClasses = clsx(
    'hud-progress-bar',
    `hud-progress-bar--${variant}`,
    `hud-progress-bar--${size}`,
    `hud-progress-bar--${orientation}`,
    `hud-progress-bar--${shape}`,
    `hud-progress-bar--${mode}`,
    `hud-progress-bar--${currentThreshold}`,
    {
      'hud-progress-bar--animated': animated,
      'hud-progress-bar--animating': isAnimating,
      'hud-progress-bar--loading': loading,
      'hud-progress-bar--critical': currentThreshold === 'critical',
      'hud-progress-bar--warning': currentThreshold === 'warning',
      'hud-progress-bar--optimal': currentThreshold === 'optimal',
      'hud-progress-bar--glow': enableGlow,
      'hud-progress-bar--scanlines': enableScanlines,
      'hud-progress-bar--pulse': enablePulse,
      'hud-progress-bar--data-stream': enableDataStream,
      'hud-progress-bar--gradient': enableGradient,
      'hud-progress-bar--segments': segments.length > 0,
    },
    className
  );

  // Animation variants
  const progressVariants = {
    initial: orientation === 'horizontal' ? { width: 0 } : { height: 0 },
    animate: orientation === 'horizontal' 
      ? { width: `${percentage}%` } 
      : { height: `${percentage}%` },
  };

  const bufferVariants = {
    initial: orientation === 'horizontal' ? { width: 0 } : { height: 0 },
    animate: orientation === 'horizontal' 
      ? { width: `${bufferPercentage}%` } 
      : { height: `${bufferPercentage}%` },
  };

  // Indeterminate animation
  const indeterminateVariants = {
    animate: orientation === 'horizontal'
      ? {
          x: ['-100%', '100%'],
          transition: {
            duration: 2,
            ease: 'linear',
            repeat: Infinity,
          },
        }
      : {
          y: ['-100%', '100%'],
          transition: {
            duration: 2,
            ease: 'linear',
            repeat: Infinity,
          },
        },
  };

  return (
    <div
      ref={progressRef}
      className={progressClasses}
      style={{
        ...style,
        width,
        height,
        '--progress-percentage': `${percentage}%`,
        '--buffer-percentage': `${bufferPercentage}%`,
        '--animation-duration': `${animationDuration}ms`,
      } as React.CSSProperties}
      data-testid={dataTestId}
    >
      {/* Label */}
      {label && (
        <div className="hud-progress-bar-label">
          {label}
        </div>
      )}

      {/* Progress Track */}
      <div className="hud-progress-bar-track">
        {/* Background effects */}
        {enableScanlines && (
          <div className="hud-progress-bar-scanlines" />
        )}

        {/* Buffer fill (for buffer mode) */}
        {mode === 'buffer' && (
          <motion.div
            className="hud-progress-bar-buffer"
            variants={bufferVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: animationDuration / 1000, ease: 'easeOut' }}
          />
        )}

        {/* Segments (for segmented progress) */}
        {segments.length > 0 ? (
          <div className="hud-progress-bar-segments">
            {segments.map((segment, index) => {
              const segmentPercentage = (segment.value / maxValue) * 100;
              return (
                <motion.div
                  key={index}
                  className={clsx('hud-progress-bar-segment', {
                    'hud-progress-bar-segment--critical': segment.critical,
                  })}
                  style={{
                    backgroundColor: segment.color,
                    [orientation === 'horizontal' ? 'width' : 'height']: `${segmentPercentage}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              );
            })}
          </div>
        ) : (
          /* Standard progress fill */
          <div className="hud-progress-bar-fill-container">
            {mode === 'indeterminate' ? (
              <motion.div
                className="hud-progress-bar-fill hud-progress-bar-fill--indeterminate"
                style={{ background: getGradient() }}
                variants={indeterminateVariants}
                animate="animate"
              />
            ) : (
              <motion.div
                className="hud-progress-bar-fill"
                style={{ background: getGradient() }}
                variants={progressVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: animationDuration / 1000, ease: 'easeOut' }}
              />
            )}

            {/* Data stream effect */}
            {enableDataStream && (
              <div className="hud-progress-bar-data-stream">
                <motion.div
                  className="hud-progress-bar-data-stream-line"
                  animate={orientation === 'horizontal' 
                    ? { x: ['0%', '100%'] }
                    : { y: ['0%', '100%'] }
                  }
                  transition={{
                    duration: 1,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Threshold markers */}
        <div className="hud-progress-bar-thresholds">
          {criticalThreshold > 0 && (
            <div
              className="hud-progress-bar-threshold hud-progress-bar-threshold--critical"
              style={{
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${criticalThreshold}%`,
              }}
            />
          )}
          {warningThreshold > 0 && (
            <div
              className="hud-progress-bar-threshold hud-progress-bar-threshold--warning"
              style={{
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${warningThreshold}%`,
              }}
            />
          )}
          {optimalThreshold < 100 && (
            <div
              className="hud-progress-bar-threshold hud-progress-bar-threshold--optimal"
              style={{
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${optimalThreshold}%`,
              }}
            />
          )}
        </div>

        {/* Glow effect */}
        {enableGlow && (
          <div className="hud-progress-bar-glow" />
        )}

        {/* Critical alert overlay */}
        {currentThreshold === 'critical' && (
          <motion.div
            className="hud-progress-bar-alert-overlay"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      {/* Value Display */}
      {(showPercentage || showValue || formatValue) && (
        <div className="hud-progress-bar-value">
          <AnimatePresence mode="wait">
            <motion.span
              key={Math.floor(displayValue)}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              {getFormattedValue()}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="hud-progress-bar-loading">
          <motion.div
            className="hud-progress-bar-loading-indicator"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
};

export default HUDProgressBar;