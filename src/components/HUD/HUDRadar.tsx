import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type HUDRadarVariant = 'matrix' | 'doom' | 'swordfish' | 'neon' | 'ghost';
export type HUDRadarSize = 'sm' | 'md' | 'lg' | 'xl';
export type HUDRadarMode = 'sweep' | 'pulse' | 'scan' | 'static';

export interface RadarContact {
  id: string;
  x: number; // -1 to 1 coordinate system
  y: number; // -1 to 1 coordinate system
  type: 'friendly' | 'hostile' | 'neutral' | 'unknown' | 'objective';
  distance?: number; // 0 to 1 (center to edge)
  angle?: number; // 0 to 360 degrees
  strength?: number; // 0 to 1 signal strength
  label?: string;
  data?: any; // Additional data
}

export interface RadarZone {
  id: string;
  centerX: number; // -1 to 1
  centerY: number; // -1 to 1
  radius: number; // 0 to 1
  type: 'danger' | 'safe' | 'objective' | 'patrol';
  opacity?: number;
  label?: string;
}

export interface HUDRadarProps {
  /** Radar contacts to display */
  contacts?: RadarContact[];
  /** Radar zones to display */
  zones?: RadarZone[];
  /** Visual variant */
  variant?: HUDRadarVariant;
  /** Radar size */
  size?: HUDRadarSize;
  /** Radar mode */
  mode?: HUDRadarMode;
  /** Sweep rotation speed (degrees per second) */
  sweepSpeed?: number;
  /** Pulse frequency (pulses per second) */
  pulseFrequency?: number;
  /** Maximum range display */
  maxRange?: number;
  /** Current zoom level */
  zoomLevel?: number;
  /** Whether to show range rings */
  showRangeRings?: boolean;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to show contact labels */
  showContactLabels?: boolean;
  /** Whether to show contact trails */
  showContactTrails?: boolean;
  /** Whether to enable contact fade based on sweep */
  enableContactFade?: boolean;
  /** Whether to enable ping animation on contact detection */
  enablePingAnimation?: boolean;
  /** Whether to show compass bearings */
  showCompass?: boolean;
  /** Whether to show scan lines */
  showScanLines?: boolean;
  /** Radar title */
  title?: string;
  /** Whether radar is active */
  active?: boolean;
  /** Whether radar is in jamming state */
  jammed?: boolean;
  /** Noise intensity (0-1) */
  noiseIntensity?: number;
  /** Custom center point (for mobile radar) */
  centerPoint?: { x: number; y: number };
  /** Custom CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when contact is clicked */
  onContactClick?: (contact: RadarContact) => void;
  /** Callback when radar area is clicked */
  onRadarClick?: (x: number, y: number) => void;
  /** Callback when sweep completes a rotation */
  onSweepComplete?: () => void;
  /** Data attributes for testing */
  'data-testid'?: string;
}

const contactColors = {
  friendly: 'var(--cyber-matrix-green)',
  hostile: 'var(--cyber-doom-red)',
  neutral: 'var(--cyber-swordfish-cyan)',
  unknown: 'var(--cyber-tech-orange)',
  objective: 'var(--cyber-hot-pink)',
};

const zoneColors = {
  danger: 'var(--cyber-doom-red)',
  safe: 'var(--cyber-matrix-green)',
  objective: 'var(--cyber-hot-pink)',
  patrol: 'var(--cyber-swordfish-cyan)',
};

const HUDRadar: React.FC<HUDRadarProps> = ({
  contacts = [],
  zones = [],
  variant = 'matrix',
  size = 'md',
  mode = 'sweep',
  sweepSpeed = 90, // degrees per second
  pulseFrequency = 1, // pulses per second
  maxRange = 1000,
  zoomLevel = 1,
  showRangeRings = true,
  showGrid = true,
  showContactLabels = false,
  showContactTrails = false,
  enableContactFade = true,
  enablePingAnimation = true,
  showCompass = true,
  showScanLines = true,
  title,
  active = true,
  jammed = false,
  noiseIntensity = 0,
  centerPoint = { x: 0, y: 0 },
  className,
  style,
  onContactClick,
  onRadarClick,
  onSweepComplete,
  'data-testid': dataTestId,
}) => {
  // State
  const [sweepAngle, setSweepAngle] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [detectedContacts, setDetectedContacts] = useState<Set<string>>(new Set());
  const [contactTrails, setContactTrails] = useState<Map<string, { x: number; y: number }[]>>(new Map());

  // Refs
  const radarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastSweepAngle = useRef(0);

  // Calculate radar dimensions
  const radarSizes = {
    sm: 120,
    md: 180,
    lg: 240,
    xl: 320,
  };
  const radarSize = radarSizes[size];
  const radius = radarSize / 2;

  // Sweep animation
  useEffect(() => {
    if (!active || mode !== 'sweep') return;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - (animationRef.current || timestamp);
      animationRef.current = timestamp;

      const deltaAngle = (sweepSpeed * deltaTime) / 1000;
      setSweepAngle(prev => {
        const newAngle = (prev + deltaAngle) % 360;
        
        // Check for full rotation completion
        if (lastSweepAngle.current > newAngle) {
          onSweepComplete?.();
        }
        lastSweepAngle.current = newAngle;
        
        return newAngle;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, mode, sweepSpeed, onSweepComplete]);

  // Pulse animation
  useEffect(() => {
    if (!active || mode !== 'pulse') return;

    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 4);
    }, 1000 / pulseFrequency);

    return () => clearInterval(interval);
  }, [active, mode, pulseFrequency]);

  // Contact detection and trails
  useEffect(() => {
    if (!enableContactFade && !showContactTrails) return;

    contacts.forEach(contact => {
      const contactAngle = Math.atan2(contact.y, contact.x) * (180 / Math.PI);
      const normalizedAngle = (contactAngle + 360) % 360;
      
      // Check if contact is within sweep range (±10 degrees)
      const angleDiff = Math.abs(sweepAngle - normalizedAngle);
      const isDetected = angleDiff <= 10 || angleDiff >= 350;

      if (isDetected && !detectedContacts.has(contact.id)) {
        setDetectedContacts(prev => new Set([...prev, contact.id]));
        
        // Update trails
        if (showContactTrails) {
          setContactTrails(prev => {
            const newTrails = new Map(prev);
            const trail = newTrails.get(contact.id) || [];
            trail.push({ x: contact.x, y: contact.y });
            if (trail.length > 10) trail.shift(); // Keep last 10 positions
            newTrails.set(contact.id, trail);
            return newTrails;
          });
        }
      }
    });
  }, [contacts, sweepAngle, enableContactFade, showContactTrails, detectedContacts]);

  // Convert radar coordinates to screen coordinates
  const radarToScreen = (x: number, y: number) => {
    const adjustedX = (x - centerPoint.x) * zoomLevel;
    const adjustedY = (y - centerPoint.y) * zoomLevel;
    return {
      x: radius + adjustedX * radius,
      y: radius + adjustedY * radius,
    };
  };

  // Handle radar click
  const handleRadarClick = (event: React.MouseEvent) => {
    if (!onRadarClick) return;

    const rect = radarRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((event.clientX - centerX) / radius) / zoomLevel + centerPoint.x;
    const y = ((event.clientY - centerY) / radius) / zoomLevel + centerPoint.y;

    onRadarClick(x, y);
  };

  // Generate range rings
  const rangeRings = useMemo(() => {
    if (!showRangeRings) return [];
    return [0.25, 0.5, 0.75, 1.0].map(scale => ({
      radius: radius * scale,
      range: (maxRange * scale).toFixed(0),
    }));
  }, [showRangeRings, radius, maxRange]);

  // Generate grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return [];
    const lines = [];
    
    // Horizontal and vertical lines
    for (let i = -1; i <= 1; i += 0.5) {
      if (i === 0) continue;
      lines.push({
        type: 'horizontal',
        y: radius + i * radius,
      });
      lines.push({
        type: 'vertical',
        x: radius + i * radius,
      });
    }
    
    return lines;
  }, [showGrid, radius]);

  // CSS classes
  const radarClasses = clsx(
    'hud-radar',
    `hud-radar--${variant}`,
    `hud-radar--${size}`,
    `hud-radar--${mode}`,
    {
      'hud-radar--active': active,
      'hud-radar--jammed': jammed,
      'hud-radar--with-scanlines': showScanLines,
      'hud-radar--with-trails': showContactTrails,
    },
    className
  );

  // Sweep line angle
  const sweepLineAngle = active && mode === 'sweep' ? sweepAngle : 0;

  return (
    <div
      ref={radarRef}
      className={radarClasses}
      style={{
        ...style,
        width: radarSize,
        height: radarSize,
        '--radar-size': `${radarSize}px`,
        '--sweep-angle': `${sweepLineAngle}deg`,
        '--pulse-phase': pulsePhase,
      } as React.CSSProperties}
      onClick={handleRadarClick}
      data-testid={dataTestId}
    >
      {/* Radar Background */}
      <div className="hud-radar-background">
        {/* Scan lines overlay */}
        {showScanLines && (
          <div className="hud-radar-scanlines" />
        )}

        {/* Noise overlay for jamming */}
        {jammed && (
          <div 
            className="hud-radar-noise"
            style={{ opacity: noiseIntensity }}
          />
        )}
      </div>

      {/* Radar Grid */}
      <svg className="hud-radar-grid" viewBox={`0 0 ${radarSize} ${radarSize}`}>
        {/* Range rings */}
        {rangeRings.map((ring, index) => (
          <g key={index}>
            <circle
              cx={radius}
              cy={radius}
              r={ring.radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />
            {showCompass && (
              <text
                x={radius + ring.radius - 10}
                y={radius - 5}
                fontSize="8"
                fill="currentColor"
                opacity="0.6"
              >
                {ring.range}
              </text>
            )}
          </g>
        ))}

        {/* Grid lines */}
        {gridLines.map((line, index) => (
          <line
            key={index}
            {...(line.type === 'horizontal' 
              ? { x1: 0, y1: line.y, x2: radarSize, y2: line.y }
              : { x1: line.x, y1: 0, x2: line.x, y2: radarSize }
            )}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}

        {/* Center crosshairs */}
        <g>
          <line
            x1={radius - 5}
            y1={radius}
            x2={radius + 5}
            y2={radius}
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1={radius}
            y1={radius - 5}
            x2={radius}
            y2={radius + 5}
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>

        {/* Compass bearings */}
        {showCompass && (
          <g>
            {[0, 90, 180, 270].map(angle => (
              <text
                key={angle}
                x={radius + Math.cos((angle - 90) * Math.PI / 180) * (radius - 15)}
                y={radius + Math.sin((angle - 90) * Math.PI / 180) * (radius - 15) + 3}
                fontSize="10"
                fill="currentColor"
                textAnchor="middle"
                opacity="0.8"
              >
                {angle === 0 ? 'N' : angle === 90 ? 'E' : angle === 180 ? 'S' : 'W'}
              </text>
            ))}
          </g>
        )}
      </svg>

      {/* Radar Zones */}
      <svg className="hud-radar-zones" viewBox={`0 0 ${radarSize} ${radarSize}`}>
        {zones.map(zone => {
          const screenPos = radarToScreen(zone.centerX, zone.centerY);
          const screenRadius = zone.radius * radius * zoomLevel;
          
          return (
            <circle
              key={zone.id}
              cx={screenPos.x}
              cy={screenPos.y}
              r={screenRadius}
              fill={zoneColors[zone.type]}
              fillOpacity={zone.opacity || 0.1}
              stroke={zoneColors[zone.type]}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          );
        })}
      </svg>

      {/* Contact Trails */}
      {showContactTrails && (
        <svg className="hud-radar-trails" viewBox={`0 0 ${radarSize} ${radarSize}`}>
          {Array.from(contactTrails.entries()).map(([contactId, trail]) => {
            if (trail.length < 2) return null;
            
            const pathData = trail.map((point, index) => {
              const screenPos = radarToScreen(point.x, point.y);
              return `${index === 0 ? 'M' : 'L'} ${screenPos.x} ${screenPos.y}`;
            }).join(' ');
            
            return (
              <path
                key={contactId}
                d={pathData}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="2,2"
              />
            );
          })}
        </svg>
      )}

      {/* Radar Contacts */}
      <div className="hud-radar-contacts">
        <AnimatePresence>
          {contacts.map(contact => {
            const screenPos = radarToScreen(contact.x, contact.y);
            const isDetected = detectedContacts.has(contact.id);
            const shouldShow = !enableContactFade || isDetected;
            
            if (!shouldShow && enableContactFade) return null;

            return (
              <motion.div
                key={contact.id}
                className={clsx('hud-radar-contact', `hud-radar-contact--${contact.type}`)}
                style={{
                  left: screenPos.x - 4,
                  top: screenPos.y - 4,
                  '--contact-color': contactColors[contact.type],
                } as React.CSSProperties}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: shouldShow ? (contact.strength || 1) : 0.3,
                }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick?.(contact);
                }}
              >
                {/* Ping animation */}
                {enablePingAnimation && isDetected && (
                  <motion.div
                    className="hud-radar-contact-ping"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                )}
                
                {/* Contact dot */}
                <div className="hud-radar-contact-dot" />
                
                {/* Contact label */}
                {showContactLabels && contact.label && (
                  <div className="hud-radar-contact-label">
                    {contact.label}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sweep Line */}
      {active && mode === 'sweep' && (
        <div className="hud-radar-sweep">
          <motion.div
            className="hud-radar-sweep-line"
            style={{
              transformOrigin: `${radius}px ${radius}px`,
            }}
            animate={{ rotate: sweepAngle }}
            transition={{ ease: 'linear', duration: 0 }}
          />
          <div
            className="hud-radar-sweep-fade"
            style={{
              background: `conic-gradient(from ${sweepAngle - 60}deg, transparent, rgba(var(--radar-color-rgb), 0.1), transparent)`,
            }}
          />
        </div>
      )}

      {/* Pulse Effect */}
      {active && mode === 'pulse' && (
        <div className="hud-radar-pulse">
          {[0, 1, 2, 3].map(index => (
            <motion.div
              key={index}
              className="hud-radar-pulse-ring"
              style={{
                width: radius * 2,
                height: radius * 2,
                left: 0,
                top: 0,
              }}
              animate={{
                scale: [0, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 4,
                ease: 'easeOut',
                delay: index * 1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      {/* Radar Title */}
      {title && (
        <div className="hud-radar-title">
          {title}
        </div>
      )}

      {/* Status Indicators */}
      <div className="hud-radar-status">
        {jammed && (
          <div className="hud-radar-status-indicator hud-radar-status-indicator--jammed">
            JAMMED
          </div>
        )}
        {!active && (
          <div className="hud-radar-status-indicator hud-radar-status-indicator--offline">
            OFFLINE
          </div>
        )}
      </div>
    </div>
  );
};

export default HUDRadar;