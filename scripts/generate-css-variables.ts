#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { colorTokens, type SemanticColorTokens } from '../src/theme/tokens/colors.js';
import { validateColorPalette, isAccessible } from '../src/theme/utils/colorScale.js';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Convert camelCase to kebab-case for CSS variable names
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate CSS variables from a color token object
 */
function generateCSSVariables(
  tokens: SemanticColorTokens,
  prefix: string = ''
): string {
  const variables: string[] = [];
  
  function processObject(obj: any, currentPrefix: string = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      const variableName = currentPrefix ? `${currentPrefix}-${camelToKebab(key)}` : camelToKebab(key);
      
      if (typeof value === 'string') {
        variables.push(`  --${prefix}${variableName}: ${value};`);
      } else if (typeof value === 'object' && value !== null) {
        processObject(value, variableName);
      }
    });
  }
  
  processObject(tokens);
  return variables.join('\n');
}

/**
 * Generate CSS file with theme variables
 */
function generateThemeCSS(): string {
  const lightVariables = generateCSSVariables(colorTokens.light);
  const darkVariables = generateCSSVariables(colorTokens.dark);
  const futuristicVariables = generateCSSVariables(colorTokens.futuristic);
  const alienVariables = generateCSSVariables(colorTokens.alien);
  
  return `/**
 * Design System CSS Variables
 * Generated automatically from TypeScript theme tokens
 * DO NOT EDIT MANUALLY - This file is auto-generated
 */

/* Light Theme Variables */
:root {
${lightVariables}
}

/* Dark Theme Variables */
:root[data-theme="dark"] {
${darkVariables}
}

/* Futuristic Theme Variables */
:root[data-theme="futuristic"] {
${futuristicVariables}
}

/* Alien Theme Variables */
:root[data-theme="alien"] {
${alienVariables}
}

/* Utility Classes for Theme Variables */
.theme-light {
${lightVariables}
}

.theme-dark {
${darkVariables}
}

.theme-futuristic {
${futuristicVariables}
}

.theme-alien {
${alienVariables}
}

/* CSS Custom Properties for JavaScript Access */
:root {
  /* Theme switching helper */
  --theme-mode: "light";
}

:root[data-theme="dark"] {
  --theme-mode: "dark";
}

:root[data-theme="futuristic"] {
  --theme-mode: "futuristic";
}

:root[data-theme="alien"] {
  --theme-mode: "alien";
}

/* Color scale utilities */
${Object.entries(colorTokens.scales).map(([name, scale]) => `
/* ${name} color scale */
.${name}-50 { color: ${scale['50']}; }
.bg-${name}-50 { background-color: ${scale['50']}; }
.border-${name}-50 { border-color: ${scale['50']}; }
.${name}-100 { color: ${scale['100']}; }
.bg-${name}-100 { background-color: ${scale['100']}; }
.border-${name}-100 { border-color: ${scale['100']}; }
.${name}-200 { color: ${scale['200']}; }
.bg-${name}-200 { background-color: ${scale['200']}; }
.border-${name}-200 { border-color: ${scale['200']}; }
.${name}-300 { color: ${scale['300']}; }
.bg-${name}-300 { background-color: ${scale['300']}; }
.border-${name}-300 { border-color: ${scale['300']}; }
.${name}-400 { color: ${scale['400']}; }
.bg-${name}-400 { background-color: ${scale['400']}; }
.border-${name}-400 { border-color: ${scale['400']}; }
.${name}-500 { color: ${scale['500']}; }
.bg-${name}-500 { background-color: ${scale['500']}; }
.border-${name}-500 { border-color: ${scale['500']}; }
.${name}-600 { color: ${scale['600']}; }
.bg-${name}-600 { background-color: ${scale['600']}; }
.border-${name}-600 { border-color: ${scale['600']}; }
.${name}-700 { color: ${scale['700']}; }
.bg-${name}-700 { background-color: ${scale['700']}; }
.border-${name}-700 { border-color: ${scale['700']}; }
.${name}-800 { color: ${scale['800']}; }
.bg-${name}-800 { background-color: ${scale['800']}; }
.border-${name}-800 { border-color: ${scale['800']}; }
.${name}-900 { color: ${scale['900']}; }
.bg-${name}-900 { background-color: ${scale['900']}; }
.border-${name}-900 { border-color: ${scale['900']}; }
.${name}-950 { color: ${scale['950']}; }
.bg-${name}-950 { background-color: ${scale['950']}; }
.border-${name}-950 { border-color: ${scale['950']}; }`).join('\n')}
`;
}

/**
 * Generate TypeScript type definitions for CSS variables
 */
function generateTypeDefinitions(): string {
  const lightVariables = generateCSSVariables(colorTokens.light);
  
  // Extract variable names from the CSS
  const variableNames = lightVariables
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('--'))
    .map(line => line.split(':')[0].replace('--', '').trim())
    .filter(name => name.length > 0);
  
  return `/**
 * CSS Variable Type Definitions
 * Generated automatically from TypeScript theme tokens
 * DO NOT EDIT MANUALLY - This file is auto-generated
 */

export interface CSSVariables {
${variableNames.map(name => `  '--${name}': string;`).join('\n')}
}

export type CSSVariableName = keyof CSSVariables;

export const cssVariableNames: CSSVariableName[] = [
${variableNames.map(name => `  '--${name}'`).join(',\n')},
];

/**
 * Get a CSS variable value
 */
export function getCSSVariable(name: CSSVariableName): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

/**
 * Set a CSS variable value
 */
export function setCSSVariable(name: CSSVariableName, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

/**
 * Remove a CSS variable
 */
export function removeCSSVariable(name: CSSVariableName): void {
  document.documentElement.style.removeProperty(name);
}
`;
}

/**
 * Generate accessibility report for color tokens
 */
function generateAccessibilityReport(): string {
  const themes = ['light', 'dark', 'futuristic', 'alien'] as const;
  const reports = themes.map(theme => {
    const tokens = colorTokens[theme];
    const validation = validateColorPalette(tokens);
    
    return {
      theme,
      validation,
      details: {
        primaryContrast: isAccessible(tokens.primary.foreground, tokens.primary.background),
        secondaryContrast: isAccessible(tokens.secondary.foreground, tokens.secondary.background),
        backgroundContrast: isAccessible(tokens.foreground, tokens.background),
        destructiveContrast: isAccessible(tokens.destructive.foreground, tokens.destructive.background),
        successContrast: isAccessible(tokens.success.foreground, tokens.success.background),
        warningContrast: isAccessible(tokens.warning.foreground, tokens.warning.background),
      }
    };
  });
  
  return `/**
 * Accessibility Report
 * Generated automatically from color token validation
 * DO NOT EDIT MANUALLY - This file is auto-generated
 */

export const accessibilityReport = ${JSON.stringify(reports, null, 2)};

export const accessibilitySummary = {
  totalThemes: ${themes.length},
  validThemes: ${reports.filter(r => r.validation.valid).length},
  issues: ${reports.reduce((acc, r) => acc + r.validation.issues.length, 0)},
  recommendations: ${reports.reduce((acc, r) => acc + r.validation.recommendations.length, 0)},
};

export function printAccessibilityReport(): void {
  console.log('\\n=== Accessibility Report ===');
  console.log(\`Total themes: \\\${accessibilitySummary.totalThemes}\`);
  console.log(\`Valid themes: \\\${accessibilitySummary.validThemes}\`);
  console.log(\`Total issues: \\\${accessibilitySummary.issues}\`);
  console.log(\`Total recommendations: \\\${accessibilitySummary.recommendations}\`);
  
  accessibilityReport.forEach(report => {
    console.log(\`\\n--- \\\${report.theme.toUpperCase()} Theme ---\`);
    console.log(\`Valid: \\\${report.validation.valid}\`);
    
    if (report.validation.issues.length > 0) {
      console.log('Issues:');
      report.validation.issues.forEach(issue => console.log(\`  - \\\${issue}\`));
    }
    
    if (report.validation.recommendations.length > 0) {
      console.log('Recommendations:');
      report.validation.recommendations.forEach(rec => console.log(\`  - \\\${rec}\`));
    }
  });
}
`;
}

/**
 * Main function to generate all CSS variable files
 */
function main(): void {
  const outputDir = join(__dirname, '../dist/css');
  const srcDir = join(__dirname, '../src/theme/generated');
  
  // Create output directories if they don't exist
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  if (!existsSync(srcDir)) {
    mkdirSync(srcDir, { recursive: true });
  }
  
  try {
    // Generate CSS variables file
    const cssContent = generateThemeCSS();
    writeFileSync(join(outputDir, 'variables.css'), cssContent);
    console.log('✅ Generated CSS variables file: dist/css/variables.css');
    
    // Generate TypeScript type definitions
    const typeDefinitions = generateTypeDefinitions();
    writeFileSync(join(srcDir, 'css-variables.ts'), typeDefinitions);
    console.log('✅ Generated TypeScript types: src/theme/generated/css-variables.ts');
    
    // Generate accessibility report
    const accessibilityReport = generateAccessibilityReport();
    writeFileSync(join(srcDir, 'accessibility-report.ts'), accessibilityReport);
    console.log('✅ Generated accessibility report: src/theme/generated/accessibility-report.ts');
    
    // Print accessibility summary
    console.log('\\n=== Accessibility Summary ===');
    const themes = ['light', 'dark', 'futuristic', 'alien'] as const;
    themes.forEach(theme => {
      const validation = validateColorPalette(colorTokens[theme]);
      console.log(`${theme.toUpperCase()} Theme: ${validation.valid ? '✅ VALID' : '❌ INVALID'}`);
      if (!validation.valid) {
        console.log(`  Issues: ${validation.issues.length}`);
        validation.issues.forEach(issue => console.log(`    - ${issue}`));
      }
    });
    
    console.log('\\n✅ All CSS variable files generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating CSS variables:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as generateCSSVariables };