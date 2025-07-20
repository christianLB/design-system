import { Theme, baseTheme } from '../src/themes/base.theme';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ThemeGeneratorOptions {
  name: string;
  description: string;
  baseColors?: {
    primary?: string;
    secondary?: string;
  };
  mood?: 'light' | 'dark' | 'colorful' | 'minimal';
}

export async function generateTheme(options: ThemeGeneratorOptions): Promise<Theme> {
  // Claude Code puede expandir esta función para generar temas inteligentemente
  const newTheme: Theme = {
    ...baseTheme,
    name: options.name,
    colors: {
      ...baseTheme.colors,
      ...options.baseColors,
    },
  };

  // Aplicar ajustes según el mood
  if (options.mood === 'dark') {
    newTheme.colors.background = '#1f2937';
    newTheme.colors.surface = '#374151';
    newTheme.colors.text = '#f9fafb';
    newTheme.colors.textSecondary = '#d1d5db';
  } else if (options.mood === 'minimal') {
    newTheme.colors.primary = '#000000';
    newTheme.colors.secondary = '#6b7280';
    newTheme.borderRadius = {
      none: '0',
      sm: '0',
      base: '0',
      md: '0',
      lg: '0',
      full: '0',
    };
  }

  // Guardar el tema
  const themePath = path.join(__dirname, `../src/themes/${options.name}.theme.ts`);
  const themeContent = `import { Theme } from './base.theme';

/**
 * ${options.description}
 * Generated automatically by Claude Code
 */
export const ${options.name}Theme: Theme = ${JSON.stringify(newTheme, null, 2)};
`;

  await fs.writeFile(themePath, themeContent);

  // Actualizar el índice de temas
  await updateThemeIndex(options.name);

  return newTheme;
}

async function updateThemeIndex(themeName: string) {
  const indexPath = path.join(__dirname, '../src/themes/index.ts');
  const exportLine = `export * from './${themeName}.theme';\n`;

  await fs.appendFile(indexPath, exportLine);
}

// Función CLI para uso interactivo
async function main() {
  const args = process.argv.slice(2);
  const [name, description, mood = 'light', primary, secondary] = args;

  if (!name || !description) {
    console.log('Usage: tsx generate-theme.ts <name> <description> [mood] [primary] [secondary]');
    console.log(
      'Example: tsx generate-theme.ts ocean "Ocean inspired theme" dark "#0ea5e9" "#06b6d4"',
    );
    process.exit(1);
  }

  const options: ThemeGeneratorOptions = {
    name,
    description,
    mood: mood as 'light' | 'dark' | 'colorful' | 'minimal',
    baseColors: {},
  };

  if (primary) options.baseColors!.primary = primary;
  if (secondary) options.baseColors!.secondary = secondary;

  try {
    const theme = await generateTheme(options);
    console.log(`✅ Theme "${name}" generated successfully!`);
    console.log(`📁 File: src/themes/${name}.theme.ts`);
    console.log(`🎨 Primary: ${theme.colors.primary}`);
    console.log(`🎨 Secondary: ${theme.colors.secondary}`);
  } catch (error) {
    console.error('❌ Error generating theme:', error);
    process.exit(1);
  }
}

// Run if called directly (ES module compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
