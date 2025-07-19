import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { Theme } from '../src/themes/base.theme';
import { themeToCSSVariables } from '../src/themes/theme-utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate CSS variables files for all themes
 */
async function generateAllThemeCSS() {
  const themesDir = path.join(__dirname, '../src/themes');
  const outputDir = path.join(__dirname, '../dist/themes');

  await fs.ensureDir(outputDir);

  // Get all theme files
  const files = await fs.readdir(themesDir);
  const themeFiles = files.filter((file) => file.endsWith('.theme.ts') && file !== 'base.theme.ts');

  const themes: Theme[] = [];

  // Import and collect all themes
  for (const file of themeFiles) {
    try {
      const themePath = path.join(themesDir, file);
      const themeModule = await import(themePath);

      // Find the theme export
      const themeExport = Object.values(themeModule).find(
        (exp: any) => exp && typeof exp === 'object' && exp.name && exp.colors,
      ) as Theme;

      if (themeExport) {
        themes.push(themeExport);
      }
    } catch (error) {
      console.warn(`Could not load theme from ${file}:`, error);
    }
  }

  console.log(`Found ${themes.length} themes to process`);

  // Generate CSS for each theme
  for (const theme of themes) {
    const cssContent = generateThemeCSS(theme);
    const outputPath = path.join(outputDir, `${theme.name}.css`);

    await fs.writeFile(outputPath, cssContent);
    console.log(`✅ Generated CSS for theme: ${theme.name}`);
  }

  // Generate combined CSS file
  const combinedCSS = generateCombinedCSS(themes);
  await fs.writeFile(path.join(outputDir, 'all-themes.css'), combinedCSS);
  console.log(`✅ Generated combined themes CSS`);

  // Generate theme manifest
  const manifest = {
    themes: themes.map((theme) => ({
      name: theme.name,
      cssFile: `${theme.name}.css`,
      preview: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        background: theme.colors.background,
      },
    })),
    generated: new Date().toISOString(),
  };

  await fs.writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`✅ Generated theme manifest`);
}

function generateThemeCSS(theme: Theme): string {
  const baseCSS = themeToCSSVariables(theme);

  return `/**
 * Theme: ${theme.name}
 * Generated automatically by Claude Code Theme System
 * Generated at: ${new Date().toISOString()}
 */

${baseCSS}

/* Theme-specific utility classes */
.theme-${theme.name} {
  ${Object.entries(theme.colors)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n  ')}
}

/* Component integration */
.theme-${theme.name} .btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.theme-${theme.name} .btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.theme-${theme.name} .card {
  background-color: var(--color-surface);
  color: var(--color-text);
}

.theme-${theme.name} .input {
  background-color: var(--color-background);
  color: var(--color-text);
  border-color: var(--color-text-secondary);
}
`;
}

function generateCombinedCSS(themes: Theme[]): string {
  const header = `/**
 * Combined Themes CSS
 * Contains all available themes for the design system
 * Generated automatically by Claude Code Theme System
 * Generated at: ${new Date().toISOString()}
 */

/* Base theme variables */
:root {
  /* Default to base theme */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-background: #ffffff;
  --color-surface: #f3f4f6;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-success: #10b981;
  --color-info: #3b82f6;
}

`;

  const themeSelectors = themes
    .map(
      (theme) =>
        `/* ${theme.name} theme */
[data-theme="${theme.name}"] {
  ${Object.entries(theme.colors)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n  ')}
}`,
    )
    .join('\n\n');

  return header + themeSelectors;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllThemeCSS()
    .then(() => {
      console.log('🎨 Theme CSS generation completed successfully!');
    })
    .catch((error) => {
      console.error('❌ Error generating theme CSS:', error);
      process.exit(1);
    });
}
