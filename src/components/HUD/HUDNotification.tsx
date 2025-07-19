import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type HUDNotificationVariant = 'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost';
export type HUDNotificationType = 'info' | 'success' | 'warning' | 'error' | 'critical' | 'system' | 'combat' | 'objective';
export type HUDNotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
export type HUDNotificationSize = 'sm' | 'md' | 'lg';

export interface HUDNotificationData {
  id: string;
  type: HUDNotificationType;
  title: string;
  message?: string;
  duration?: number; // milliseconds, 0 = persistent
  priority?: number; // higher number = higher priority
  icon?: string;
  actions?: HUDNotificationAction[];
  data?: any;
  timestamp?: Date;
  source?: string;
  category?: string;
}

export interface HUDNotificationAction {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  callback: () => void;
}

export interface HUDNotificationProps {
  /** Notification data */
  notification: HUDNotificationData;
  /** Visual variant */
  variant?: HUDNotificationVariant;
  /** Notification size */
  size?: HUDNotificationSize;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to show timestamp */
  showTimestamp?: boolean;
  /** Whether to show source */
  showSource?: boolean;
  /** Whether to enable auto-dismiss */
  autoDismiss?: boolean;
  /** Auto-dismiss duration override */
  autoDismissDuration?: number;
  /** Whether to pause auto-dismiss on hover */
  pauseOnHover?: boolean;
  /** Whether to enable glow effect */
  enableGlow?: boolean;
  /** Whether to enable pulse animation */
  enablePulse?: boolean;
  /** Whether to enable glitch effect for critical notifications */
  enableGlitch?: boolean;
  /** Whether to enable sound integration points */
  enableSound?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when notification is dismissed */
  onDismiss?: (id: string) => void;
  /** Callback when action is clicked */
  onActionClick?: (notificationId: string, actionId: string) => void;
  /** Callback when notification is clicked */
  onClick?: (notification: HUDNotificationData) => void;
  /** Data attributes for testing */
  'data-testid'?: string;
}

export interface HUDNotificationManagerProps {
  /** Array of notifications */
  notifications?: HUDNotificationData[];
  /** Visual variant */
  variant?: HUDNotificationVariant;
  /** Position on screen */
  position?: HUDNotificationPosition;
  /** Maximum number of visible notifications */
  maxVisible?: number;
  /** Whether to stack notifications */
  stacked?: boolean;
  /** Gap between notifications */
  gap?: number;
  /** Default auto-dismiss duration */
  defaultDuration?: number;
  /** Whether to enable notification queue */
  enableQueue?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when notification is added */
  onNotificationAdd?: (notification: HUDNotificationData) => void;
  /** Callback when notification is removed */
  onNotificationRemove?: (id: string) => void;
  /** Callback when queue changes */
  onQueueChange?: (queue: HUDNotificationData[]) => void;
}

const notificationIcons = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✗',
  critical: '‼',
  system: '⚙',
  combat: '⚔',
  objective: '◆',
};

const notificationColors = {
  info: 'var(--cyber-swordfish-cyan)',
  success: 'var(--cyber-matrix-green)',
  warning: 'var(--cyber-tech-orange)',
  error: 'var(--cyber-doom-red)',
  critical: 'var(--cyber-bright-red)',
  system: 'var(--cyber-hot-pink)',
  combat: 'var(--cyber-doom-red)',
  objective: 'var(--cyber-evangelion-purple)',
};

// Individual Notification Component
const HUDNotification: React.FC<HUDNotificationProps> = ({
  notification,
  variant = 'matrix',
  size = 'md',
  showCloseButton = true,
  showTimestamp = false,
  showSource = false,
  autoDismiss = true,
  autoDismissDuration,
  pauseOnHover = true,
  enableGlow = true,
  enablePulse = false,
  enableGlitch = false,
  enableSound = false,
  className,
  style,
  onDismiss,
  onActionClick,
  onClick,
  'data-testid': dataTestId,
}) => {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Refs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get effective duration
  const effectiveDuration = autoDismissDuration || notification.duration || 5000;

  // Auto-dismiss logic
  useEffect(() => {
    if (!autoDismiss || effectiveDuration === 0) return;

    setTimeRemaining(effectiveDuration);

    const startTimer = () => {
      const startTime = Date.now();
      
      timeoutRef.current = setTimeout(() => {
        onDismiss?.(notification.id);
      }, effectiveDuration);

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(effectiveDuration - elapsed, 0);
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          clearInterval(intervalRef.current!);
        }
      }, 100);
    };

    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isHovered || !pauseOnHover) {
      startTimer();
    }

    return clearTimer;
  }, [autoDismiss, effectiveDuration, isHovered, pauseOnHover, notification.id, onDismiss]);

  // Glitch effect for critical notifications
  useEffect(() => {
    if (enableGlitch && notification.type === 'critical') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [enableGlitch, notification.type]);

  // Sound integration point
  useEffect(() => {
    if (enableSound) {
      console.log(`🔊 Sound effect: ${notification.type} notification`);
    }
  }, [enableSound, notification.type]);

  // Event handlers
  const handleClose = () => {
    onDismiss?.(notification.id);
  };

  const handleClick = () => {
    onClick?.(notification);
  };

  const handleActionClick = (actionId: string) => {
    onActionClick?.(notification.id, actionId);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // CSS classes
  const notificationClasses = clsx(
    'hud-notification',
    `hud-notification--${variant}`,
    `hud-notification--${notification.type}`,
    `hud-notification--${size}`,
    {
      'hud-notification--hovered': isHovered,
      'hud-notification--glitching': isGlitching,
      'hud-notification--critical': notification.type === 'critical',
      'hud-notification--glow': enableGlow,
      'hud-notification--pulse': enablePulse,
      'hud-notification--dismissible': autoDismiss && effectiveDuration > 0,
    },
    className
  );

  // Animation variants
  const notificationVariants = {
    initial: { opacity: 0, x: 300, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 300, scale: 0.9 },
    glitch: {
      x: [0, -2, 2, 0],
      filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
    },
  };

  return (
    <motion.div
      className={notificationClasses}
      style={{
        ...style,
        '--notification-color': notificationColors[notification.type],
        '--time-remaining': `${(timeRemaining / effectiveDuration) * 100}%`,
      } as React.CSSProperties}
      variants={notificationVariants}
      initial="initial"
      animate={isGlitching ? 'glitch' : 'animate'}
      exit="exit"
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {/* Progress bar for auto-dismiss */}
      {autoDismiss && effectiveDuration > 0 && (
        <div className="hud-notification-progress">
          <motion.div
            className="hud-notification-progress-bar"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: effectiveDuration / 1000, ease: 'linear' }}
          />
        </div>
      )}

      {/* Notification content */}
      <div className="hud-notification-content">
        {/* Header */}
        <div className="hud-notification-header">
          {/* Icon */}
          <div className="hud-notification-icon">
            {notification.icon || notificationIcons[notification.type]}
          </div>

          {/* Title and meta */}
          <div className="hud-notification-title-section">
            <h4 className="hud-notification-title">{notification.title}</h4>
            
            {/* Meta information */}
            <div className="hud-notification-meta">
              {showSource && notification.source && (
                <span className="hud-notification-source">{notification.source}</span>
              )}
              {showTimestamp && notification.timestamp && (
                <span className="hud-notification-timestamp">
                  {formatTimestamp(notification.timestamp)}
                </span>
              )}
              {notification.priority !== undefined && (
                <span className="hud-notification-priority">P{notification.priority}</span>
              )}
            </div>
          </div>

          {/* Close button */}
          {showCloseButton && (
            <button
              className="hud-notification-close"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close notification"
            >
              ×
            </button>
          )}
        </div>

        {/* Message */}
        {notification.message && (
          <div className="hud-notification-message">
            {notification.message}
          </div>
        )}

        {/* Actions */}
        {notification.actions && notification.actions.length > 0 && (
          <div className="hud-notification-actions">
            {notification.actions.map((action) => (
              <button
                key={action.id}
                className={clsx('hud-notification-action', `hud-notification-action--${action.variant || 'secondary'}`)}
                onClick={(e) => {
                  e.stopPropagation();
                  action.callback();
                  handleActionClick(action.id);
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Glow effect */}
      {enableGlow && (
        <div className="hud-notification-glow" />
      )}

      {/* Alert overlay for critical notifications */}
      {notification.type === 'critical' && (
        <motion.div
          className="hud-notification-alert-overlay"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// Notification Manager Component
const HUDNotificationManager: React.FC<HUDNotificationManagerProps> = ({
  notifications = [],
  variant = 'matrix',
  position = 'top-right',
  maxVisible = 5,
  stacked = true,
  gap = 12,
  defaultDuration = 5000,
  enableQueue = true,
  className,
  style,
  onNotificationAdd,
  onNotificationRemove,
  onQueueChange,
}) => {
  // State
  const [visibleNotifications, setVisibleNotifications] = useState<HUDNotificationData[]>([]);
  const [notificationQueue, setNotificationQueue] = useState<HUDNotificationData[]>([]);

  // Process notifications
  useEffect(() => {
    // Sort by priority (higher first) and timestamp
    const sortedNotifications = [...notifications].sort((a, b) => {
      const priorityDiff = (b.priority || 0) - (a.priority || 0);
      if (priorityDiff !== 0) return priorityDiff;
      
      const timeA = a.timestamp?.getTime() || 0;
      const timeB = b.timestamp?.getTime() || 0;
      return timeB - timeA;
    });

    const visible = sortedNotifications.slice(0, maxVisible);
    const queued = enableQueue ? sortedNotifications.slice(maxVisible) : [];

    setVisibleNotifications(visible);
    setNotificationQueue(queued);

    // Emit callbacks
    sortedNotifications.forEach(notification => {
      if (!visibleNotifications.find(n => n.id === notification.id)) {
        onNotificationAdd?.(notification);
      }
    });

    onQueueChange?.(queued);
  }, [notifications, maxVisible, enableQueue, onNotificationAdd, onQueueChange]);

  // Handle notification dismissal
  const handleNotificationDismiss = useCallback((id: string) => {
    onNotificationRemove?.(id);
  }, [onNotificationRemove]);

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'hud-notification-manager--top-left';
      case 'top-right':
        return 'hud-notification-manager--top-right';
      case 'bottom-left':
        return 'hud-notification-manager--bottom-left';
      case 'bottom-right':
        return 'hud-notification-manager--bottom-right';
      case 'top-center':
        return 'hud-notification-manager--top-center';
      case 'bottom-center':
        return 'hud-notification-manager--bottom-center';
      default:
        return 'hud-notification-manager--top-right';
    }
  };

  // CSS classes
  const managerClasses = clsx(
    'hud-notification-manager',
    `hud-notification-manager--${variant}`,
    getPositionClasses(),
    {
      'hud-notification-manager--stacked': stacked,
    },
    className
  );

  return (
    <div
      className={managerClasses}
      style={{
        ...style,
        '--notification-gap': `${gap}px`,
      } as React.CSSProperties}
    >
      {/* Visible notifications */}
      <AnimatePresence>
        {visibleNotifications.map((notification, index) => (
          <HUDNotification
            key={notification.id}
            notification={notification}
            variant={variant}
            autoDismissDuration={notification.duration || defaultDuration}
            onDismiss={handleNotificationDismiss}
            style={stacked ? { marginBottom: gap } : undefined}
          />
        ))}
      </AnimatePresence>

      {/* Queue indicator */}
      {notificationQueue.length > 0 && (
        <motion.div
          className="hud-notification-queue-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          +{notificationQueue.length} more
        </motion.div>
      )}
    </div>
  );
};

export default HUDNotification;
export { HUDNotificationManager };