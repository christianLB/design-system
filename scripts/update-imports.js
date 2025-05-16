const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common imports to check for and update
const importsToUpdate = [
  // Tailwind classes
  { 
    regex: /import\s+.*\s+from\s+['"]tailwindcss\/colors['"]/g,
    replacement: 'import { tokens } from "../src/lib/tokens";',
    message: 'Replaced tailwind/colors import with tokens'
  },
  // Direct color imports
  {
    regex: /import\s+\{([^}]*)\}\s+from\s+['"]@\/styles\/colors['"]/g,
    replacement: 'import { tokens } from "../src/lib/tokens";',
    message: 'Replaced @/styles/colors import with tokens'
  },
  // Spacing utilities
  {
    regex: /import\s+\{([^}]*)\}\s+from\s+['"]@\/utils\/spacing['"]/g,
    replacement: 'import { spacing } from "../src/lib/tokens";',
    message: 'Replaced @/utils/spacing import with tokens'
  }
];

// Get all component files
function getComponentFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.name === 'node_modules' || item.name === '.next' || item.name === 'dist') {
      continue;
    }
    
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      files.push(...getComponentFiles(fullPath));
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.jsx') || item.name.endsWith('.ts') || item.name.endsWith('.js'))) {
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
    
    // Check if we need to add tokens import
    const hasTokensImport = content.includes('from "../src/lib/tokens"') || 
                          content.includes("from '../src/lib/tokens'");
    
    // Process each import pattern
    importsToUpdate.forEach(({ regex, replacement, message }) => {
      if (regex.test(content)) {
        content = content.replace(regex, (match) => {
          console.log(`${message} in ${filePath}`);
          return replacement;
        });
        updated = true;
      }
    });
    
    // Add tokens import if we made changes and it's not already there
    if (updated && !hasTokensImport) {
      const importStatement = 'import { tokens } from "../src/lib/tokens";\n';
      content = importStatement + content;
      console.log(`Added tokens import to ${filePath}`);
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
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
  const componentsDir = path.join(__dirname, '..');
  const files = getComponentFiles(componentsDir);
  
  console.log(`Checking ${files.length} files for imports to update...\n`);
  
  let updatedCount = 0;
  files.forEach(file => {
    if (processFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\nUpdated imports in ${updatedCount} files.`);
  
  if (updatedCount > 0) {
    console.log('\nRunning formatter...');
    try {
      execSync('npx prettier --write "**/*.{ts,tsx,js,jsx}"', { stdio: 'inherit' });
    } catch (error) {
      console.error('Error running formatter:', error);
    }
  }
}

// Run the update
main();
