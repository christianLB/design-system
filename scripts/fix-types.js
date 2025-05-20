import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
const typesDir = path.join(distDir, 'types');
const componentsDir = path.join(distDir, 'components');

// Create directories if they don't exist
[distDir, typesDir, componentsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate type declarations
try {
  console.log('Generating TypeScript declarations...');
  execSync('tsc --emitDeclarationOnly --declaration --declarationDir dist/types --declarationMap true', { stdio: 'inherit' });
  console.log('TypeScript declarations generated successfully!');
} catch (error) {
  console.error('Error generating TypeScript declarations:', error);
  process.exit(1);
}

// Create a barrel file for components
try {
  console.log('Creating component barrel files...');
  
  // Get all component directories
  const componentDirs = fs.readdirSync(path.join(__dirname, '..', 'components'))
    .filter(file => {
      const stat = fs.statSync(path.join(__dirname, '..', 'components', file));
      return stat.isDirectory() || file.endsWith('.tsx') || file.endsWith('.ts');
    })
    .map(file => file.replace(/\.[^/.]+$/, '')); // Remove extensions

  // Create index.d.ts for each component
  componentDirs.forEach(component => {
    const componentName = component.replace(/\.[^/.]+$/, '');
    const componentTypeFile = path.join(typesDir, 'components', `${componentName}.d.ts`);
    
    if (fs.existsSync(componentTypeFile)) {
      const content = `// Auto-generated type definitions for ${componentName}
${fs.readFileSync(componentTypeFile, 'utf-8')}
`;
      fs.writeFileSync(componentTypeFile, content);
    }
  });

  // Create main index.d.ts
  const mainDtsContent = `// Main type definition file for the design system
declare module '@k2600x/design-system' {
  // Re-export all components
  export * from './components';
  
  // Export individual components
${componentDirs.map(comp => `  export * from './components/${comp}';`).join('\n')}
}
`;

  fs.writeFileSync(path.join(typesDir, 'index.d.ts'), mainDtsContent);
  
  // Create components/index.d.ts
  const componentsIndexContent = `// Components index
export * from './Button';
export * from './Card';
export * from './Input';
export * from './Table';
// Add other component exports here
`;
  
  const componentsTypesDir = path.join(typesDir, 'components');
  if (!fs.existsSync(componentsTypesDir)) {
    fs.mkdirSync(componentsTypesDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(componentsTypesDir, 'index.d.ts'), componentsIndexContent);
  
  console.log('✅ Type definitions fixed and created!');
} catch (error) {
  console.error('Error creating type definitions:', error);
  process.exit(1);
}
