import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type HUDMetricVariant = 'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost';
export type HUDMetricType = 'health' | 'shields' | 'energy' | 'ammo' | 'armor' | 'oxygen' | 'temperature' | 'speed' | 'custom';
export type HUDMetricFormat = 'percentage' | 'fraction' | 'decimal' | 'integer' | 'currency' | 'time' | 'custom';
export type HUDMetricSize = 'sm' | 'md' | 'lg' | 'xl';
export type HUDMetricOrientation = 'horizontal' | 'vertical';

export interface HUDMetricThresholds {
  critical?: number;  // Red alert threshold (e.g., 15%)
  warning?: number;   // Warning threshold (e.g., 30%)
  optimal?: number;   // Optimal threshold (e.g., 80%)
}

export interface HUDMetricAnimation {
  duration?: number;
  easing?: string | number[];
  enableCounter?: boolean;
  enablePulse?: boolean;
  enableGlitch?: boolean;
  enableFlicker?: boolean;
}

export interface HUDMetricProps {
  /** Metric label */
  label: string;
  /** Current value */
  value: number;
  /** Maximum value */
  maxValue?: number;
  /** Minimum value */
  minValue?: number;
  /** Previous value for change indication */
  previousValue?: number;
  /** Metric type */
  type?: HUDMetricType;
  /** Visual variant */
  variant?: HUDMetricVariant;
  /** Metric size */
  size?: HUDMetricSize;
  /** Display orientation */
  orientation?: HUDMetricOrientation;
  /** Value format */
  format?: HUDMetricFormat;
  /** Custom format function */
  formatFunction?: (value: number) => string;
  /** Unit symbol */
  unit?: string;
  /** Threshold values */
  thresholds?: HUDMetricThresholds;
  /** Animation configuration */
  animation?: Partial<HUDMetricAnimation>;
  /** Whether to show progress bar */
  showProgressBar?: boolean;
  /** Whether to show percentage value */
  showPercentage?: boolean;
  /** Whether to show numeric value */
  showValue?: boolean;
  /** Whether to show change indicator */
  showChangeIndicator?: boolean;
  /** Whether to show status icon */
  showStatusIcon?: boolean;
  /** Whether to show sparkline chart */
  showSparkline?: boolean;
  /** Historical data for sparkline */
  sparklineData?: number[];
  /** Whether metric is critical */
  critical?: boolean;
  /** Whether metric is in warning state */
  warning?: boolean;
  /** Custom icon */
  icon?: string;
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when value changes */
  onValueChange?: (value: number, previousValue: number) => void;
  /** Callback when threshold is crossed */
  onThresholdCross?: (threshold: 'critical' | 'warning' | 'optimal', value: number) => void;
  /** Callback when metric is clicked */
  onClick?: () => void;
  /** Data attributes for testing */
  'data-testid'?: string;
}

// Helper function to convert CSS cubic-bezier strings to framer-motion format
const convertEasing = (easing: string | number[]): string | number[] => {
  if (Array.isArray(easing)) return easing;
  
  // Convert common CSS cubic-bezier strings to arrays
  const cubicBezierMatch = easing.match(/cubic-bezier\(([^)]+)\)/);
  if (cubicBezierMatch) {
    const values = cubicBezierMatch[1].split(',').map(v => parseFloat(v.trim()));
    if (values.length === 4) {
      return values;
    }
  }
  
  // Convert common easing keywords
  switch (easing) {
    case 'ease': return [0.25, 0.1, 0.25, 1];
    case 'ease-in': return [0.42, 0, 1, 1];
    case 'ease-out': return [0, 0, 0.58, 1];
    case 'ease-in-out': return [0.42, 0, 0.58, 1];
    case 'linear': return 'linear';
    default: return easing;
  }
};

const defaultAnimation: HUDMetricAnimation = {
  duration: 300,
  easing: 'easeOut',
  enableCounter: true,
  enablePulse: false,
  enableGlitch: false,
  enableFlicker: false,
};

const defaultThresholds: HUDMetricThresholds = {
  critical: 15,
  warning: 30,
  optimal: 80,
};

const metricIcons = {
  health: '❤',
  shields: '🛡',
  energy: '⚡',
  ammo: '🔫',
  armor: '🔧',
  oxygen: '💨',
  temperature: '🌡',
  speed: '🚀',
  custom: '●',
};

const HUDMetric: React.FC<HUDMetricProps> = ({
  label,
  value,
  maxValue = 100,
  minValue = 0,
  previousValue,
  type = 'custom',
  variant = 'matrix',
  size = 'md',
  orientation = 'horizontal',
  format = 'percentage',
  formatFunction,
  unit,
  thresholds = {},
  animation = {},
  showProgressBar = true,
  showChangeIndicator = true,
  showStatusIcon = true,
  showSparkline = false,
  sparklineData = [],
  critical = false,
  warning = false,
  icon,
  className,
  style,
  onValueChange,
  onThresholdCross,
  onClick,
  'data-testid': dataTestId,
}) => {
  // Merge configurations
  const mergedAnimation = { ...defaultAnimation, ...animation };
  const mergedThresholds = { ...defaultThresholds, ...thresholds };

  // State
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [statusState, setStatusState] = useState<'critical' | 'warning' | 'optimal' | 'normal'>('normal');

  // Refs
  const metricRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Calculate percentage
  const percentage = Math.min(Math.max(((value - minValue) / (maxValue - minValue)) * 100, 0), 100);
  const change = previousValue !== undefined ? value - previousValue : 0;

  // Determine status based on thresholds
  useEffect(() => {
    let newStatus: 'critical' | 'warning' | 'optimal' | 'normal' = 'normal';
    
    if (critical || (mergedThresholds.critical !== undefined && percentage <= mergedThresholds.critical)) {
      newStatus = 'critical';
    } else if (warning || (mergedThresholds.warning !== undefined && percentage <= mergedThresholds.warning)) {
      newStatus = 'warning';
    } else if (mergedThresholds.optimal !== undefined && percentage >= mergedThresholds.optimal) {
      newStatus = 'optimal';
    }

    if (newStatus !== statusState) {
      setStatusState(newStatus);
      if (newStatus === 'critical' || newStatus === 'warning' || newStatus === 'optimal') {
        onThresholdCross?.(newStatus, value);
      }
    }
  }, [value, percentage, critical, warning, mergedThresholds, statusState, onThresholdCross]);

  // Animated counter effect
  useEffect(() => {
    if (mergedAnimation.enableCounter && displayValue !== value) {
      setIsAnimating(true);
      const startValue = displayValue;
      const endValue = value;
      const startTime = Date.now();
      const duration = mergedAnimation.duration || 300;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = progress; // Simple linear for now
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        
        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          onValueChange?.(value, previousValue || startValue);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, mergedAnimation.enableCounter, mergedAnimation.duration, onValueChange, previousValue]);

  // Glitch effect for critical status
  useEffect(() => {
    if (mergedAnimation.enableGlitch && statusState === 'critical') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [mergedAnimation.enableGlitch, statusState]);

  // Format value
  const formatValue = (val: number): string => {
    if (formatFunction) {
      return formatFunction(val);
    }

    switch (format) {
      case 'percentage':
        return `${Math.round(val)}%`;
      case 'fraction':
        return `${Math.round(val)}/${maxValue}`;
      case 'decimal':
        return val.toFixed(1);
      case 'integer':
        return Math.round(val).toString();
      case 'currency':
        return `$${val.toFixed(2)}`;
      case 'time':
        const minutes = Math.floor(val / 60);
        const seconds = Math.floor(val % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      default:
        return val.toString();
    }
  };

  // CSS classes
  const metricClasses = clsx(
    'hud-metric',
    `hud-metric--${variant}`,
    `hud-metric--${type}`,
    `hud-metric--${size}`,
    `hud-metric--${orientation}`,
    `hud-metric--${statusState}`,
    {
      'hud-metric--animating': isAnimating,
      'hud-metric--glitching': isGlitching,
      'hud-metric--critical': statusState === 'critical',
      'hud-metric--warning': statusState === 'warning',
      'hud-metric--optimal': statusState === 'optimal',
      'hud-metric--pulse': mergedAnimation.enablePulse,
      'hud-metric--flicker': mergedAnimation.enableFlicker,
      'hud-metric--with-progress': showProgressBar,
      'hud-metric--with-sparkline': showSparkline,
    },
    className
  );

  // Animation variants
  const metricVariants = {
    normal: { scale: 1, filter: 'none' },
    glitch: { 
      scale: [1, 1.02, 0.98, 1],
      filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(-90deg)', 'hue-rotate(0deg)'],
    },
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { width: `${percentage}%` },
  };

  const changeVariants = {
    positive: { y: -5, opacity: [0, 1, 1, 0] },
    negative: { y: 5, opacity: [0, 1, 1, 0] },
  };

  return (
    <motion.div
      ref={metricRef}
      className={metricClasses}
      style={style}
      variants={metricVariants}
      animate={isGlitching ? 'glitch' : 'normal'}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {/* Metric Header */}
      <div className="hud-metric-header">
        {/* Status Icon */}
        {showStatusIcon && (
          <div className="hud-metric-icon">
            {icon || metricIcons[type]}
          </div>
        )}

        {/* Label */}
        <div className="hud-metric-label">
          {label}
        </div>

        {/* Change Indicator */}
        {showChangeIndicator && change !== 0 && (
          <AnimatePresence>
            <motion.div
              className={clsx('hud-metric-change', {
                'hud-metric-change--positive': change > 0,
                'hud-metric-change--negative': change < 0,
              })}
              variants={changeVariants}
              animate={change > 0 ? 'positive' : 'negative'}
              transition={{ duration: 2 }}
            >
              {change > 0 ? '+' : ''}{change}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Value Display */}
      <div className="hud-metric-value">
        <motion.span
          className="hud-metric-number"
          key={Math.floor(displayValue)} // Force re-render for counter effect
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {formatValue(displayValue)}
        </motion.span>
        {unit && (
          <span className="hud-metric-unit">{unit}</span>
        )}
      </div>

      {/* Progress Bar */}
      {showProgressBar && (
        <div className="hud-metric-progress">
          <div className="hud-metric-progress-track">
            <motion.div
              className="hud-metric-progress-fill"
              variants={progressVariants}
              initial="initial"
              animate="animate"
              transition={{ 
                duration: mergedAnimation.duration! / 1000, 
                ease: convertEasing(mergedAnimation.easing!)
              }}
            />
          </div>
          {/* Threshold markers */}
          {mergedThresholds.critical && (
            <div 
              className="hud-metric-threshold hud-metric-threshold--critical"
              style={{ left: `${mergedThresholds.critical}%` }}
            />
          )}
          {mergedThresholds.warning && (
            <div 
              className="hud-metric-threshold hud-metric-threshold--warning"
              style={{ left: `${mergedThresholds.warning}%` }}
            />
          )}
          {mergedThresholds.optimal && (
            <div 
              className="hud-metric-threshold hud-metric-threshold--optimal"
              style={{ left: `${mergedThresholds.optimal}%` }}
            />
          )}
        </div>
      )}

      {/* Sparkline */}
      {showSparkline && sparklineData.length > 0 && (
        <div className="hud-metric-sparkline">
          <svg className="hud-metric-sparkline-svg" viewBox="0 0 100 20">
            <motion.polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              points={sparklineData.map((val, index) => 
                `${(index / (sparklineData.length - 1)) * 100},${20 - (val / maxValue) * 20}`
              ).join(' ')}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
        </div>
      )}

      {/* Status Effects */}
      {statusState === 'critical' && (
        <div className="hud-metric-alert-overlay" />
      )}
    </motion.div>
  );
};

export default HUDMetric;