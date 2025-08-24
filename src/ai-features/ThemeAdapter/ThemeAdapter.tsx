/**
 * AI-Powered Theme Adapter
 * Learns from user behavior and adapts themes in real-time
 * This is a unique feature not available in MUI
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { useThemeBuilder } from '@/hooks/useThemeBuilder';
import type { BuiltTheme } from '@/theme/builder/types';

// AI Learning Model Interface
interface UserPreferences {
  colorPreference: {
    warm: number;
    cool: number;
    neutral: number;
    vibrant: number;
    muted: number;
  };
  contrastPreference: 'low' | 'medium' | 'high';
  animationPreference: 'none' | 'reduced' | 'normal' | 'enhanced';
  densityPreference: 'compact' | 'comfortable' | 'spacious';
  timeOfDayAdaptation: boolean;
  contentAwareAdaptation: boolean;
}

interface AIThemeModel {
  preferences: UserPreferences;
  interactions: InteractionData[];
  adaptations: AdaptationHistory[];
  confidence: number;
}

interface InteractionData {
  timestamp: number;
  action: string;
  component: string;
  context: Record<string, any>;
}

interface AdaptationHistory {
  timestamp: number;
  fromTheme: string;
  toTheme: string;
  reason: string;
  userAccepted: boolean;
}

// AI Theme Learning Engine
class ThemeLearningEngine {
  private model: AIThemeModel;
  private worker: Worker | null = null;

  constructor() {
    this.model = this.loadModel() || this.initializeModel();
    this.initializeWebWorker();
  }

  private initializeModel(): AIThemeModel {
    return {
      preferences: {
        colorPreference: {
          warm: 0.5,
          cool: 0.5,
          neutral: 0.5,
          vibrant: 0.5,
          muted: 0.5,
        },
        contrastPreference: 'medium',
        animationPreference: 'normal',
        densityPreference: 'comfortable',
        timeOfDayAdaptation: true,
        contentAwareAdaptation: true,
      },
      interactions: [],
      adaptations: [],
      confidence: 0,
    };
  }

  private initializeWebWorker() {
    // In production, this would be a separate worker file
    const workerCode = `
      self.onmessage = function(e) {
        const { type, data } = e.data;
        
        switch(type) {
          case 'analyze':
            const analysis = analyzeInteractions(data);
            self.postMessage({ type: 'analysis', data: analysis });
            break;
            
          case 'predict':
            const prediction = predictPreferences(data);
            self.postMessage({ type: 'prediction', data: prediction });
            break;
        }
      };
      
      function analyzeInteractions(interactions) {
        // Simplified analysis logic
        const colorClicks = {};
        interactions.forEach(i => {
          if (i.context.color) {
            colorClicks[i.context.color] = (colorClicks[i.context.color] || 0) + 1;
          }
        });
        return { colorPreferences: colorClicks };
      }
      
      function predictPreferences(model) {
        // Simplified prediction logic
        return {
          suggestedTheme: model.confidence > 0.7 ? 'personalized' : 'default',
          confidence: model.confidence
        };
      }
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    
    try {
      this.worker = new Worker(workerUrl);
    } catch (error) {
      console.warn('Web Worker not supported, falling back to main thread');
    }
  }

  public recordInteraction(interaction: InteractionData) {
    this.model.interactions.push(interaction);
    
    // Keep only last 1000 interactions
    if (this.model.interactions.length > 1000) {
      this.model.interactions = this.model.interactions.slice(-1000);
    }
    
    this.updateConfidence();
    this.saveModel();
  }

  public async analyzeUserBehavior(): Promise<UserPreferences> {
    if (this.worker) {
      return new Promise((resolve) => {
        this.worker!.onmessage = (e) => {
          if (e.data.type === 'analysis') {
            resolve(this.updatePreferences(e.data.data));
          }
        };
        this.worker!.postMessage({ type: 'analyze', data: this.model.interactions });
      });
    } else {
      // Fallback to synchronous analysis
      return this.analyzeSync();
    }
  }

  private analyzeSync(): UserPreferences {
    // Simplified synchronous analysis
    const recentInteractions = this.model.interactions.slice(-100);
    
    // Analyze color preferences
    const colorCounts = { warm: 0, cool: 0, neutral: 0, vibrant: 0, muted: 0 };
    recentInteractions.forEach(interaction => {
      if (interaction.context.colorType) {
        colorCounts[interaction.context.colorType as keyof typeof colorCounts]++;
      }
    });
    
    // Update preferences based on analysis
    const total = Object.values(colorCounts).reduce((a, b) => a + b, 1);
    Object.keys(colorCounts).forEach(key => {
      this.model.preferences.colorPreference[key as keyof typeof colorCounts] = 
        colorCounts[key as keyof typeof colorCounts] / total;
    });
    
    return this.model.preferences;
  }

  private updatePreferences(analysis: any): UserPreferences {
    // Update model based on analysis
    // This is simplified - real implementation would use ML algorithms
    return this.model.preferences;
  }

  private updateConfidence() {
    // Increase confidence based on interaction count
    const interactionCount = this.model.interactions.length;
    this.model.confidence = Math.min(1, interactionCount / 500);
  }

  public getConfidence(): number {
    return this.model.confidence;
  }

  public recordAdaptation(adaptation: AdaptationHistory) {
    this.model.adaptations.push(adaptation);
    this.saveModel();
  }

  private saveModel() {
    try {
      localStorage.setItem('ai-theme-model', JSON.stringify(this.model));
    } catch (error) {
      console.warn('Failed to save AI model to localStorage');
    }
  }

  private loadModel(): AIThemeModel | null {
    try {
      const saved = localStorage.getItem('ai-theme-model');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  public destroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}

// React Hook for AI Theme Adaptation
export function useAIThemeAdapter() {
  const { theme, setCustomTheme } = useTheme();
  const themeBuilder = useThemeBuilder();
  const [isLearning, setIsLearning] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [lastAdaptation, setLastAdaptation] = useState<Date | null>(null);
  const engineRef = useRef<ThemeLearningEngine>();

  useEffect(() => {
    engineRef.current = new ThemeLearningEngine();
    
    return () => {
      engineRef.current?.destroy();
    };
  }, []);

  const recordInteraction = useCallback((
    action: string,
    component: string,
    context: Record<string, any>
  ) => {
    engineRef.current?.recordInteraction({
      timestamp: Date.now(),
      action,
      component,
      context,
    });
  }, []);

  const adaptTheme = useCallback(async () => {
    if (!engineRef.current || isLearning) return;
    
    setIsLearning(true);
    
    try {
      const preferences = await engineRef.current.analyzeUserBehavior();
      const currentConfidence = engineRef.current.getConfidence();
      setConfidence(currentConfidence);
      
      if (currentConfidence > 0.5) {
        // Generate adapted theme based on preferences
        const adaptedTheme = generateAdaptedTheme(preferences, themeBuilder);
        
        // Apply the adapted theme
        setCustomTheme(adaptedTheme);
        setLastAdaptation(new Date());
        
        // Record the adaptation
        engineRef.current.recordAdaptation({
          timestamp: Date.now(),
          fromTheme: typeof theme === 'string' ? theme : 'default',
          toTheme: 'ai-adapted',
          reason: 'User behavior analysis',
          userAccepted: true, // Will be updated based on user action
        });
      }
    } finally {
      setIsLearning(false);
    }
  }, [isLearning, theme, themeBuilder, setCustomTheme]);

  // Time-based adaptation
  useEffect(() => {
    if (!engineRef.current) return;
    
    const checkTimeBasedAdaptation = () => {
      const hour = new Date().getHours();
      
      if (hour >= 20 || hour < 6) {
        // Evening/Night - suggest darker, warmer theme
        recordInteraction('time-trigger', 'system', { 
          timeOfDay: 'night',
          suggestedAdjustment: 'darker-warmer',
        });
      } else if (hour >= 6 && hour < 12) {
        // Morning - suggest brighter, cooler theme
        recordInteraction('time-trigger', 'system', {
          timeOfDay: 'morning',
          suggestedAdjustment: 'brighter-cooler',
        });
      }
    };
    
    const interval = setInterval(checkTimeBasedAdaptation, 3600000); // Check every hour
    checkTimeBasedAdaptation(); // Initial check
    
    return () => clearInterval(interval);
  }, [recordInteraction]);

  return {
    recordInteraction,
    adaptTheme,
    isLearning,
    confidence,
    lastAdaptation,
  };
}

// Helper function to generate adapted theme
function generateAdaptedTheme(
  preferences: UserPreferences,
  themeBuilder: any
): BuiltTheme {
  const builder = themeBuilder.builder.clone();
  
  // Apply color preferences
  const baseColor = calculateBaseColor(preferences.colorPreference);
  builder.withColors({
    primary: baseColor,
    secondary: adjustColor(baseColor, preferences.colorPreference),
  });
  
  // Apply contrast preference
  switch (preferences.contrastPreference) {
    case 'high':
      builder.withVariant('high-contrast');
      break;
    case 'low':
      builder.withColors({
        background: '#f5f5f5',
        foreground: '#666666',
      });
      break;
  }
  
  // Apply density preference
  const spacingMultiplier = 
    preferences.densityPreference === 'compact' ? 0.75 :
    preferences.densityPreference === 'spacious' ? 1.25 : 1;
    
  builder.withSpacing({
    base: 8 * spacingMultiplier,
  });
  
  // Apply animation preference
  builder.withMotion({
    reducedMotion: preferences.animationPreference === 'reduced',
    animationSpeed: 
      preferences.animationPreference === 'none' ? 0 :
      preferences.animationPreference === 'enhanced' ? 1.5 : 1,
  });
  
  return builder.build();
}

function calculateBaseColor(colorPref: UserPreferences['colorPreference']): string {
  // Simplified color calculation based on preferences
  const hue = 
    colorPref.warm * 30 +    // Orange range
    colorPref.cool * 210 +    // Blue range
    colorPref.neutral * 0;    // Gray
    
  const saturation = colorPref.vibrant * 80 + colorPref.muted * 20;
  const lightness = 50;
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function adjustColor(base: string, colorPref: UserPreferences['colorPreference']): string {
  // Create a complementary color based on preferences
  // This is a simplified implementation
  return base;
}

// AI Theme Adapter Component
export const AIThemeAdapter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const adapter = useAIThemeAdapter();
  
  // Auto-adapt every 30 minutes if confidence is high
  useEffect(() => {
    const interval = setInterval(() => {
      if (adapter.confidence > 0.7) {
        adapter.adaptTheme();
      }
    }, 1800000); // 30 minutes
    
    return () => clearInterval(interval);
  }, [adapter]);
  
  // Track all clicks for learning
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const component = target.closest('[data-component]')?.getAttribute('data-component') || 'unknown';
      const color = window.getComputedStyle(target).backgroundColor;
      
      adapter.recordInteraction('click', component, {
        color,
        timestamp: Date.now(),
        path: target.getAttribute('data-path'),
      });
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [adapter]);
  
  return (
    <>
      {adapter.isLearning && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg animate-pulse">
          AI is learning your preferences...
        </div>
      )}
      {adapter.confidence > 0 && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-500">
          AI Confidence: {(adapter.confidence * 100).toFixed(0)}%
        </div>
      )}
      {children}
    </>
  );
};