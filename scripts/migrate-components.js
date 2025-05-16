import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the components directory
const componentsDir = path.join(__dirname, '../components');

// Get all component files
const componentFiles = fs.readdirSync(componentsDir).filter(file => 
  file.endsWith('.tsx') && file !== 'index.tsx'
);

// Process each component file
componentFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace hardcoded colors with design tokens
  content = content.replace(/#[0-9a-fA-F]{3,6}/g, match => {
    // This is a simple example - you'll need to map colors to your actual tokens
    const colorMap = {
      '#007bff': 'tokens.colors.primary.DEFAULT',
      '#6c757d': 'tokens.colors.secondary.DEFAULT',
      '#ffffff': 'tokens.colors.background.DEFAULT',
      '#333333': 'tokens.colors.foreground.DEFAULT',
      '#dc3545': 'tokens.colors.destructive.DEFAULT',
      '#f5f5f5': 'tokens.colors.accent.DEFAULT',
      '#cccccc': 'tokens.colors.input.DEFAULT',
    };
    
    return colorMap[match.toLowerCase()] || match;
  });
  
  // Replace hardcoded spacing with design tokens
  content = content.replace(/([\s(])([0-9.]+)rem/g, (match, p1, p2) => {
    const remValue = parseFloat(p2);
    const spacingMap = {
      0.25: 'tokens.spacing.xs',
      0.5: 'tokens.spacing.sm',
      1: 'tokens.spacing.md',
      1.5: 'tokens.spacing.lg',
      2: 'tokens.spacing.xl',
    };
    
    return spacingMap[remValue] ? `${p1}${spacingMap[remValue]}` : match;
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file} with design tokens`);
});

console.log('Migration completed!');
