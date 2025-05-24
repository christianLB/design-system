/**
 * Script to find potentially unused files in the design system
 * Specifically targets component files that may have been left behind after migration
 * to the component folder structure.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');
const IGNORE_PATTERNS = [
  'node_modules',
  'dist',
  'build',
  '.git',
  '.github',
  '.vscode',
  'coverage'
];

// Utility functions
const isMigratedComponent = (filePath) => {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  
  // Check if we have a component directory with the same name
  const componentDirPath = path.join(dirName, fileNameWithoutExt);
  const componentFilePath = path.join(componentDirPath, fileName);
  
  return fs.existsSync(componentDirPath) && fs.existsSync(componentFilePath);
};

const isUsedInCode = (filePath) => {
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  
  try {
    // Use grep to find imports of this file
    // Note: This is a simple approach and might not catch all usages
    const grepCommand = `grep -r "from '.*/${fileNameWithoutExt}'" --include="*.ts*" --exclude-dir=node_modules ../src`;
    const result = execSync(grepCommand, { cwd: __dirname, stdio: ['pipe', 'pipe', 'ignore'] });
    return result.toString().trim().length > 0;
  } catch (error) {
    // If grep doesn't find anything, it returns non-zero exit code
    return false;
  }
};

// Main function
const findUnusedFiles = () => {
  console.log('Finding potentially unused files in the design system...');
  
  // Find all TypeScript/TSX files directly in the components directory
  const componentFiles = [];
  
  fs.readdirSync(COMPONENTS_DIR).forEach(file => {
    const filePath = path.join(COMPONENTS_DIR, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    
    if (!isDirectory && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      componentFiles.push(filePath);
    }
  });
  
  console.log(`Found ${componentFiles.length} component files to check.`);
  
  // Filter to find potentially unused files
  const potentiallyUnusedFiles = componentFiles.filter(filePath => {
    // If the file has been migrated to a component directory
    if (isMigratedComponent(filePath)) {
      // And it's not used anywhere else in the code
      return !isUsedInCode(filePath);
    }
    return false;
  });
  
  console.log('\nPotentially unused files:');
  if (potentiallyUnusedFiles.length === 0) {
    console.log('No unused files found!');
  } else {
    potentiallyUnusedFiles.forEach(file => {
      console.log(`- ${path.relative(process.cwd(), file)}`);
    });
    
    console.log(`\nFound ${potentiallyUnusedFiles.length} potentially unused files.`);
    console.log('These files might be safe to delete since they have been migrated to the new folder structure.');
    console.log('IMPORTANT: Please verify each file manually before deleting!');
  }
};

// Run the script
findUnusedFiles();
