import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import tokens using dynamic import
let tokens;
try {
  const tokensModule = await import('../tokens');
  tokens = tokensModule.tokens;
} catch (error) {
  console.error('Error importing tokens:', error);
  process.exit(1);
}

// Path to the Tailwind config file
const tailwindConfigPath = path.join(__dirname, '../tailwind.config.js');

// Check if Tailwind config exists
if (!fs.existsSync(tailwindConfigPath)) {
  console.error('Error: tailwind.config.js not found in the project root');
  process.exit(1);
}

// Read the current config
let configContent = fs.readFileSync(tailwindConfigPath, 'utf8');

// Check if tokens are already imported
if (configContent.includes('from "./tokens"') || configContent.includes("from './tokens'")) {
  console.log('Tokens are already imported in the Tailwind config');
  process.exit(0);
}

// Add tokens import at the top of the file
const importStatement = 'import { tokens } from "./tokens.js";\n\n';
configContent = importStatement + configContent;

// Update theme configuration
const themeRegex = /theme:\s*\{[\s\S]*?\}(?=,|\})/;
const themeMatch = configContent.match(themeRegex);

if (themeMatch) {
  const themeConfig = themeMatch[0];
  
  // Update colors
  let updatedTheme = themeConfig
    .replace(/(colors:\s*{[\s\S]*?})(?=,|\s*})/, 'colors: tokens.colors')
    .replace(/(borderRadius:\s*{[\s\S]*?})(?=,|\s*})/, 'borderRadius: tokens.radius')
    .replace(/(boxShadow:\s*{[\s\S]*?})(?=,|\s*})/, 'boxShadow: tokens.shadow')
    .replace(/(transitionProperty:\s*{[\s\S]*?})(?=,|\s*})/, 'transitionProperty: tokens.transition');
  
  // Update the content with the new theme config
  configContent = configContent.replace(themeRegex, updatedTheme);
  
  // Write the updated config
  fs.writeFileSync(tailwindConfigPath, configContent, 'utf8');
  console.log('Successfully updated Tailwind config to use design tokens');
  
  // Run formatter
  try {
    console.log('\nRunning formatter...');
    const { execSync } = await import('child_process');
    execSync('npx prettier --write tailwind.config.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running formatter:', error);
  }
} else {
  console.error('Could not find theme configuration in tailwind.config.js');
  process.exit(1);
}
