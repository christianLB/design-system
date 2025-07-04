import { colord, type Colord } from 'colord';

/**
 * Color scale configuration interface
 */
export interface ColorScaleConfig {
  steps: number;
  minLightness: number;
  maxLightness: number;
  saturationCurve?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  lightnessDistribution?: 'linear' | 'perceptual';
}

/**
 * Default configuration for generating color scales
 */
export const defaultColorScaleConfig: ColorScaleConfig = {
  steps: 11,
  minLightness: 5,
  maxLightness: 95,
  saturationCurve: 'ease-out',
  lightnessDistribution: 'perceptual',
};

/**
 * Generate a perceptually uniform color scale from a base color
 * Creates 11 color steps (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
 * 
 * @param baseColor - Base color in any format (hex, rgb, hsl, etc.)
 * @param config - Configuration for the color scale generation
 * @returns Object with numbered color steps
 */
export function generateColorScale(
  baseColor: string | Colord,
  config: Partial<ColorScaleConfig> = {}
): Record<string, string> {
  const cfg = { ...defaultColorScaleConfig, ...config };
  const color = typeof baseColor === 'string' ? colord(baseColor) : baseColor;
  
  // Get the HSL values of the base color
  const hsl = color.toHsl();
  
  // Define the scale steps with their corresponding lightness values
  const steps = [
    { step: '50', lightness: 95 },
    { step: '100', lightness: 90 },
    { step: '200', lightness: 80 },
    { step: '300', lightness: 70 },
    { step: '400', lightness: 60 },
    { step: '500', lightness: 50 }, // Base color approximation
    { step: '600', lightness: 40 },
    { step: '700', lightness: 30 },
    { step: '800', lightness: 20 },
    { step: '900', lightness: 10 },
    { step: '950', lightness: 5 },
  ];

  const colorScale: Record<string, string> = {};

  steps.forEach(({ step, lightness }) => {
    // Adjust saturation based on lightness for better perceptual uniformity
    let adjustedSaturation = hsl.s;
    
    if (cfg.saturationCurve === 'ease-out') {
      // Reduce saturation at extremes (very light and very dark)
      const normalizedLightness = lightness / 100;
      const saturationMultiplier = 1 - Math.pow(Math.abs(normalizedLightness - 0.5) * 2, 2);
      adjustedSaturation = hsl.s * (0.3 + saturationMultiplier * 0.7);
    }

    // Create the color with adjusted values
    const adjustedColor = colord({
      h: hsl.h,
      s: adjustedSaturation,
      l: lightness,
    });

    colorScale[step] = adjustedColor.toHex();
  });

  return colorScale;
}

/**
 * Generate semantic color variants for a base color
 * Creates background, foreground, and border variants
 * 
 * @param baseColor - Base color in any format
 * @returns Object with semantic color variants
 */
export function generateSemanticColors(baseColor: string | Colord): {
  background: string;
  foreground: string;
  border: string;
  muted: string;
  accent: string;
} {
  const color = typeof baseColor === 'string' ? colord(baseColor) : baseColor;
  const hsl = color.toHsl();

  return {
    background: color.lighten(0.4).desaturate(0.2).toHex(),
    foreground: color.isDark() ? '#ffffff' : '#000000',
    border: color.lighten(0.2).desaturate(0.1).toHex(),
    muted: color.lighten(0.3).desaturate(0.3).toHex(),
    accent: color.saturate(0.1).toHex(),
  };
}

/**
 * Calculate color contrast ratio between two colors
 * 
 * @param color1 - First color
 * @param color2 - Second color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string | Colord, color2: string | Colord): number {
  const c1 = typeof color1 === 'string' ? colord(color1) : color1;
  const c2 = typeof color2 === 'string' ? colord(color2) : color2;
  
  // Use colord's built-in contrast method
  try {
    // Try the contrast method first
    return (c1 as any).contrast?.(c2) || calculateContrastRatio(c1, c2);
  } catch {
    // Fallback to manual calculation
    return calculateContrastRatio(c1, c2);
  }
}

/**
 * Manual contrast ratio calculation
 */
function calculateContrastRatio(c1: Colord, c2: Colord): number {
  // Get relative luminance using HSL lightness as approximation
  const l1 = c1.toHsl().l / 100;
  const l2 = c2.toHsl().l / 100;
  
  // Calculate contrast ratio
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 * 
 * @param foreground - Foreground color
 * @param background - Background color
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns Boolean indicating if combination meets standards
 */
export function isAccessible(
  foreground: string | Colord,
  background: string | Colord,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const contrastRatio = getContrastRatio(foreground, background);
  
  const requirements = {
    'AA': { normal: 4.5, large: 3 },
    'AAA': { normal: 7, large: 4.5 },
  };
  
  return contrastRatio >= requirements[level][size];
}

/**
 * Find the best foreground color for a given background
 * 
 * @param background - Background color
 * @param candidates - Array of candidate foreground colors
 * @param level - WCAG level to meet
 * @returns Best foreground color or null if none meet requirements
 */
export function findBestForeground(
  background: string | Colord,
  candidates: (string | Colord)[],
  level: 'AA' | 'AAA' = 'AA'
): string | null {
  let bestColor: string | null = null;
  let bestRatio = 0;

  candidates.forEach(candidate => {
    const ratio = getContrastRatio(candidate, background);
    if (ratio > bestRatio && isAccessible(candidate, background, level)) {
      bestRatio = ratio;
      bestColor = typeof candidate === 'string' ? candidate : candidate.toHex();
    }
  });

  return bestColor;
}

/**
 * Generate a complete color palette with semantic variants
 * 
 * @param colors - Base colors with their names
 * @returns Complete color palette with scales and semantic variants
 */
export function generateColorPalette(colors: Record<string, string>): Record<string, any> {
  const palette: Record<string, any> = {};

  Object.entries(colors).forEach(([name, color]) => {
    const scale = generateColorScale(color);
    const semantic = generateSemanticColors(color);
    
    palette[name] = {
      ...scale,
      ...semantic,
    };
  });

  return palette;
}

/**
 * Validate color palette accessibility
 * 
 * @param palette - Color palette to validate
 * @returns Validation report with accessibility issues
 */
export function validateColorPalette(palette: Record<string, any>): {
  valid: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  Object.entries(palette).forEach(([colorName, colorData]) => {
    if (typeof colorData === 'object' && colorData.background && colorData.foreground) {
      const isValid = isAccessible(colorData.foreground, colorData.background);
      
      if (!isValid) {
        issues.push(`${colorName}: foreground/background combination fails WCAG AA`);
        const ratio = getContrastRatio(colorData.foreground, colorData.background);
        recommendations.push(`${colorName}: Current ratio ${ratio.toFixed(2)}, needs 4.5+`);
      }
    }
  });

  return {
    valid: issues.length === 0,
    issues,
    recommendations,
  };
}