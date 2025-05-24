/**
 * Script to migrate remaining component files to the standardized folder structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Components to migrate
const componentsToMigrate = [
  'Carousel.tsx',
  'ConfirmDialog.tsx',
  'DatePicker.tsx',
  'FileUpload.tsx',
  'Label.tsx',
  'Loader.tsx',
  'MultiSelect.tsx',
  'RadioGroup.tsx',
  'Select.tsx',
  'Textarea.tsx',
  'ThemeToggle.tsx'
];

// Template for index.ts file
const generateIndexFile = (componentName) => {
  return `export { ${componentName} } from './${componentName}';\nexport type { ${componentName}Props } from './${componentName}';`;
};

// Template for empty test file
const generateTestFile = (componentName) => {
  return `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${componentName} } from '../${componentName}';

describe('${componentName} Component', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    // Add appropriate assertions based on component functionality
    expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});`;
};

// Function to update import path in component file
const updateImportPaths = (content) => {
  // Update utility imports
  return content.replace(/from ['"]\.\.\/utils['"]/g, "from '../../utils'")
                .replace(/from ['"]\.\.\/contexts['"]/g, "from '../../contexts'")
                .replace(/from ['"]\.\.\/hooks['"]/g, "from '../../hooks'")
                .replace(/from ['"]\.\.\/types['"]/g, "from '../../types'");
};

// Function to create component directory structure
const migrateComponent = (fileName) => {
  const componentName = fileName.replace('.tsx', '');
  const sourcePath = path.join(COMPONENTS_DIR, fileName);
  const targetDir = path.join(COMPONENTS_DIR, componentName);
  const targetPath = path.join(targetDir, fileName);
  const indexPath = path.join(targetDir, 'index.ts');
  const testDir = path.join(targetDir, '__tests__');
  const testPath = path.join(testDir, `${componentName}.test.tsx`);
  
  console.log(`Migrating ${componentName}...`);
  
  try {
    // Read the component file
    let componentContent = fs.readFileSync(sourcePath, 'utf-8');
    
    // Update import paths
    componentContent = updateImportPaths(componentContent);
    
    // Create component directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
      console.log(`  Created directory: ${componentName}/`);
    }
    
    // Create test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
      console.log(`  Created directory: ${componentName}/__tests__/`);
    }
    
    // Write component file to new location
    fs.writeFileSync(targetPath, componentContent);
    console.log(`  Created file: ${componentName}/${fileName}`);
    
    // Create index.ts
    fs.writeFileSync(indexPath, generateIndexFile(componentName));
    console.log(`  Created file: ${componentName}/index.ts`);
    
    // Create test file if it doesn't exist
    if (!fs.existsSync(testPath)) {
      fs.writeFileSync(testPath, generateTestFile(componentName));
      console.log(`  Created file: ${componentName}/__tests__/${componentName}.test.tsx`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error migrating ${componentName}:`, error);
    return false;
  }
};

// Main function
const migrateRemainingComponents = () => {
  console.log('Migrating remaining components to folder structure...\n');
  
  const successful = [];
  const failed = [];
  
  componentsToMigrate.forEach(component => {
    const result = migrateComponent(component);
    if (result) {
      successful.push(component);
    } else {
      failed.push(component);
    }
  });
  
  console.log('\nMigration summary:');
  console.log(`Successfully migrated: ${successful.length} components`);
  console.log(`Failed to migrate: ${failed.length} components`);
  
  if (failed.length > 0) {
    console.log('\nFailed components:');
    failed.forEach(component => console.log(`- ${component}`));
  }
  
  console.log('\nNext steps:');
  console.log('1. Check the migrated components and fix any issues');
  console.log('2. Run tests to ensure functionality is preserved');
  console.log('3. Update imports in other files to use the new structure');
  console.log('4. Run the cleanup script to remove the original files');
};

// Run the script
migrateRemainingComponents();
