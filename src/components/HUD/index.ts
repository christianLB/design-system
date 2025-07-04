// HUD Component Exports
export { default as HUD } from './HUD';
export type {
  HUDPosition,
  HUDVariant,
  HUDSize,
  HUDOrientation,
  HUDPosition2D,
  HUDLayout,
  HUDTheme,
  HUDConfig,
  HUDProps,
} from './HUD';

export { default as HUDPanel } from './HUDPanel';
export type {
  HUDPanelVariant,
  HUDPanelSize,
  HUDPanelShape,
  HUDPanelProps,
} from './HUDPanel';

export { default as HUDMetric } from './HUDMetric';
export type {
  HUDMetricVariant,
  HUDMetricType,
  HUDMetricFormat,
  HUDMetricSize,
  HUDMetricOrientation,
  HUDMetricThresholds,
  HUDMetricAnimation,
  HUDMetricProps,
} from './HUDMetric';

export { default as HUDRadar } from './HUDRadar';
export type {
  HUDRadarVariant,
  HUDRadarSize,
  HUDRadarMode,
  RadarContact,
  RadarZone,
  HUDRadarProps,
} from './HUDRadar';

export { default as HUDProgressBar } from './HUDProgressBar';
export type {
  HUDProgressBarVariant,
  HUDProgressBarSize,
  HUDProgressBarOrientation,
  HUDProgressBarShape,
  HUDProgressBarMode,
  HUDProgressBarSegment,
  HUDProgressBarProps,
} from './HUDProgressBar';

export { default as HUDNotification, HUDNotificationManager } from './HUDNotification';
export type {
  HUDNotificationVariant,
  HUDNotificationType,
  HUDNotificationPosition,
  HUDNotificationSize,
  HUDNotificationData,
  HUDNotificationAction,
  HUDNotificationProps,
  HUDNotificationManagerProps,
} from './HUDNotification';

// Note: Components are already exported above with default exports

// Import component types for utility interfaces
import type { FC } from 'react';
import type { HUDProps, HUDVariant, HUDPosition } from './HUD';
import type { HUDPanelProps } from './HUDPanel';
import type { HUDMetricProps, HUDMetricFormat } from './HUDMetric';
import type { HUDRadarProps } from './HUDRadar';
import type { HUDProgressBarProps } from './HUDProgressBar';
import type { HUDNotificationData, HUDNotificationType } from './HUDNotification';

// Utility types for HUD system
export interface HUDSystem {
  hud: FC<HUDProps>;
  panels: FC<HUDPanelProps>[];
  metrics: FC<HUDMetricProps>[];
  radar?: FC<HUDRadarProps>;
  progressBars: FC<HUDProgressBarProps>[];
  notifications: HUDNotificationData[];
}

// Common HUD configuration
export interface HUDSystemConfig {
  theme: {
    variant: HUDVariant;
    enableGlow: boolean;
    enableScanlines: boolean;
    enableAnimations: boolean;
  };
  layout: {
    responsive: boolean;
    autoHide: boolean;
    collapsible: boolean;
  };
  performance: {
    enableOptimizations: boolean;
    maxNotifications: number;
    animationDuration: number;
  };
}

// HUD event types
export interface HUDEvents {
  onPanelToggle: (panelId: string, collapsed: boolean) => void;
  onMetricThreshold: (metricId: string, threshold: string, value: number) => void;
  onRadarContact: (contactId: string) => void;
  onNotificationAction: (notificationId: string, actionId: string) => void;
  onSystemAlert: (alertType: string, message: string) => void;
}

// Preset HUD configurations
export const HUDPresets = {
  gaming: {
    variant: 'matrix' as HUDVariant,
    enableGlow: true,
    enableScanlines: true,
    enableAnimations: true,
    layout: {
      responsive: true,
      autoHide: false,
      collapsible: true,
    },
  },
  tactical: {
    variant: 'doom' as HUDVariant,
    enableGlow: true,
    enableScanlines: false,
    enableAnimations: true,
    layout: {
      responsive: true,
      autoHide: false,
      collapsible: false,
    },
  },
  cyberpunk: {
    variant: 'neon' as HUDVariant,
    enableGlow: true,
    enableScanlines: true,
    enableAnimations: true,
    layout: {
      responsive: true,
      autoHide: false,
      collapsible: true,
    },
  },
  minimal: {
    variant: 'ghost' as HUDVariant,
    enableGlow: false,
    enableScanlines: false,
    enableAnimations: false,
    layout: {
      responsive: true,
      autoHide: true,
      collapsible: false,
    },
  },
} as const;

// HUD utilities
export const HUDUtils = {
  // Generate unique IDs for HUD components
  generateId: (prefix: string = 'hud') => 
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  
  // Calculate optimal HUD positioning
  calculatePosition: (
    element: HTMLElement,
    position: HUDPosition,
    offset: { x: number; y: number } = { x: 20, y: 20 }
  ) => {
    const rect = element.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    switch (position) {
      case 'top-left':
        return { x: offset.x, y: offset.y };
      case 'top-right':
        return { x: viewport.width - rect.width - offset.x, y: offset.y };
      case 'bottom-left':
        return { x: offset.x, y: viewport.height - rect.height - offset.y };
      case 'bottom-right':
        return { 
          x: viewport.width - rect.width - offset.x, 
          y: viewport.height - rect.height - offset.y 
        };
      case 'center':
        return { 
          x: (viewport.width - rect.width) / 2, 
          y: (viewport.height - rect.height) / 2 
        };
      default:
        return { x: offset.x, y: offset.y };
    }
  },

  // Format values for HUD display
  formatValue: (value: number, format: HUDMetricFormat): string => {
    switch (format) {
      case 'percentage':
        return `${Math.round(value)}%`;
      case 'decimal':
        return value.toFixed(1);
      case 'integer':
        return Math.round(value).toString();
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        }).format(value);
      case 'time':
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      default:
        return value.toString();
    }
  },

  // Create notification data
  createNotification: (
    type: HUDNotificationType,
    title: string,
    message?: string,
    options: Partial<HUDNotificationData> = {}
  ): HUDNotificationData => ({
    id: HUDUtils.generateId('notification'),
    type,
    title,
    message,
    timestamp: new Date(),
    duration: 5000,
    priority: 1,
    ...options,
  }),

  // Validate HUD configuration
  validateConfig: (config: Partial<HUDSystemConfig>): boolean => {
    try {
      // Basic validation logic
      if (config.theme && !['matrix', 'doom', 'swordfish', 'neon', 'ghost'].includes(config.theme.variant)) {
        return false;
      }
      if (config.performance && config.performance.maxNotifications < 0) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
} as const;