/**
 * Color Conversion Utility
 * 
 * This script helps convert hex colors to HSL format for CSS variables.
 * 
 * Usage:
 * node scripts/color-converter.js "#3b82f6"
 * Output: 217 91% 60%
 */

// Convert hex to RGB
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  return { r, g, b };
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  // Convert to degrees, percentage, percentage
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
}

// Convert hex to HSL string
function hexToHslString(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}

// Process command line arguments
if (process.argv.length > 2) {
  const hex = process.argv[2];
  console.log(hexToHslString(hex));
} else {
  console.log('Please provide a hex color to convert, e.g., "#3b82f6"');
  
  // Example table for reference
  const examples = [
    '#ffffff', // white
    '#0f172a', // dark blue
    '#3b82f6', // primary blue
    '#8b5cf6', // secondary purple
    '#e2e8f0', // light gray
    '#ef4444', // destructive red
    '#64748b', // muted text
    '#f8fafc', // very light gray
  ];
  
  console.log('\nExample conversions:');
  console.log('Hex Color  | HSL Format');
  console.log('-----------|------------');
  
  examples.forEach(hex => {
    console.log(`${hex} | ${hexToHslString(hex)}`);
  });
}

// Export functions for use in other modules
export {
  hexToRgb,
  rgbToHsl,
  hexToHslString
};
