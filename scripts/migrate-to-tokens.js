const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common patterns to replace with tokens
const patterns = [
  // Colors
  { pattern: /bg-(?!primary|secondary|accent|destructive|muted|popover|card|border|input|ring|background|foreground|muted-foreground|accent-foreground|popover-foreground|card-foreground|primary-foreground|secondary-foreground|destructive-foreground|success|success-foreground|warning|warning-foreground|info|info-foreground)([^\s'"]+)/g, replacement: 'bg-$1' },
  { pattern: /text-(?!primary|secondary|accent|destructive|muted|popover|card|border|input|ring|background|foreground|muted-foreground|accent-foreground|popover-foreground|card-foreground|primary-foreground|secondary-foreground|destructive-foreground|success|success-foreground|warning|warning-foreground|info|info-foreground)([^\s'"]+)/g, replacement: 'text-$1' },
  { pattern: /border-(?!primary|secondary|accent|destructive|muted|popover|card|border|input|ring|background|foreground|muted-foreground|accent-foreground|popover-foreground|card-foreground|primary-foreground|secondary-foreground|destructive-foreground|success|success-foreground|warning|warning-foreground|info|info-foreground)([^\s'"]+)/g, replacement: 'border-$1' },
  
  // Spacing
  { pattern: /\b(p|m|w|h|gap|top|right|bottom|left|space-[xy])-([0-9.]+)/g, replacement: (match, p1, p2) => {
    // Convert to token usage
    const value = parseFloat(p2);
    if (value % 1 === 0) {
      return `${p1}-${value}`; // Keep whole numbers as is
    }
    return `${p1}-[${value}rem]`; // Convert to arbitrary value
  }},
  
  // Border radius
  { pattern: /rounded-(none|sm|md|lg|xl|2xl|3xl|full)/g, replacement: (match, p1) => {
    return `tokens.radius.${p1 === 'none' ? 'none' : p1 === 'sm' ? 'sm' : p1 === 'md' ? 'DEFAULT' : p1 === 'lg' ? 'lg' : p1 === 'xl' ? 'xl' : 'full'}`;
  }},
  
  // Shadows
  { pattern: /shadow-(none|sm|md|lg|xl|2xl|inner)/g, replacement: (match, p1) => {
    return `tokens.shadow.${p1 === 'none' ? 'none' : p1}`;
  }},
  
  // Opacity
  { pattern: /opacity-([0-9]+)/g, replacement: (match, p1) => {
    return `opacity-${p1}/100`; // Convert to opacity scale
  }}
];

// Get all component files
function getComponentFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      files.push(...getComponentFiles(fullPath));
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.jsx'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Skip files that already use tokens
    if (content.includes('from "../src/lib/tokens"') || content.includes("from '../src/lib/tokens'")) {
      return false;
    }
    
    // Add tokens import if not present
    if (!content.includes('from "../src/lib/tokens"') && !content.includes("from '../src/lib/tokens'")) {
      const importStatement = 'import { tokens } from "../src/lib/tokens";\n';
      content = content.replace(/(import.*?['"];?\n)/, `$1${importStatement}`);
      updated = true;
    }
    
    // Apply patterns
    for (const { pattern, replacement } of patterns) {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  const componentsDir = path.join(__dirname, '../components');
  const files = getComponentFiles(componentsDir);
  
  console.log(`Found ${files.length} component files to process`);
  
  let updatedCount = 0;
  for (const file of files) {
    if (processFile(file)) {
      updatedCount++;
    }
  }
  
  console.log(`\nMigration complete! Updated ${updatedCount} files.`);
  
  // Run ESLint to fix any remaining issues
  try {
    console.log('\nRunning ESLint to fix remaining issues...');
    execSync('npx eslint --fix components/**/*.tsx', { stdio: 'inherit' });
  } catch (error) {
    console.error('ESLint encountered some issues. Please review and fix them.');
  }
}

main();
