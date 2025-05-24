/**
 * Script to clean up files that have been migrated to the component folder structure
 * This should be run after verifying that the components have been properly migrated
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

// List of files to clean up
const filesToCleanup = [
  'Accordion.tsx',
  'Alert.tsx',
  'Avatar.tsx',
  'Badge.tsx',
  'Breadcrumb.tsx',
  'Button.tsx',
  'Card.tsx',
  'Checkbox.tsx',
  'Dialog.tsx',
  'Input.tsx',
  'Pagination.tsx',
  'Popover.tsx',
  'ProgressBar.tsx',
  'Switch.tsx',
  'Table.tsx',
  'Tabs.tsx',
  'Tooltip.tsx'
];

// Function to backup a file before deletion
const backupFile = (filePath) => {
  const backupDir = path.join(__dirname, '..', 'backup-migrated-files');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
  
  const backupPath = path.join(backupDir, path.basename(filePath));
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
};

// Main function
const cleanupMigratedFiles = () => {
  console.log('Cleaning up migrated component files...');
  
  const deletedFiles = [];
  const backupFiles = [];
  
  // First create backups of all files
  filesToCleanup.forEach(file => {
    const filePath = path.join(COMPONENTS_DIR, file);
    if (fs.existsSync(filePath)) {
      const backupPath = backupFile(filePath);
      backupFiles.push({ original: filePath, backup: backupPath });
      console.log(`Backed up ${file} to backup-migrated-files directory`);
    } else {
      console.log(`File ${file} does not exist, skipping.`);
    }
  });
  
  // Then delete the files
  filesToCleanup.forEach(file => {
    const filePath = path.join(COMPONENTS_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deletedFiles.push(filePath);
      console.log(`Deleted ${file}`);
    }
  });
  
  console.log(`\nDeleted ${deletedFiles.length} files.`);
  console.log(`Created ${backupFiles.length} backup files in backup-migrated-files directory.`);
  
  // Test build to ensure nothing broke
  console.log('\nTesting build to ensure everything still works...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('\n✅ Build successful! The deleted files were safely removed.');
  } catch (error) {
    console.error('\n❌ Build failed after deleting files. Restoring from backups...');
    
    // Restore files from backups
    backupFiles.forEach(({ original, backup }) => {
      fs.copyFileSync(backup, original);
      console.log(`Restored ${path.basename(original)}`);
    });
    
    console.log('\nFiles have been restored. Please check your code for references to the old file structure.');
  }
};

// Run the script
cleanupMigratedFiles();
