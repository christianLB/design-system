/**
 * Script to clean up the remaining component files after migration
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

// List of remaining files to clean up
const filesToCleanup = [
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
  'ThemeToggle.tsx',
  // Add any other files that need to be cleaned up
  'Button.stories.tsx'  // Storybook file is likely no longer needed
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
const cleanupRemainingFiles = () => {
  console.log('Cleaning up remaining component files after migration...');
  
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
    
    // Run tests to ensure functionality is preserved
    console.log('\nRunning tests to ensure functionality is preserved...');
    execSync('npm test', { stdio: 'inherit' });
    console.log('\n✅ Tests passed! The component functionality is preserved.');
  } catch (error) {
    console.error('\n❌ Build or tests failed after deleting files. Restoring from backups...');
    
    // Restore files from backups
    backupFiles.forEach(({ original, backup }) => {
      fs.copyFileSync(backup, original);
      console.log(`Restored ${path.basename(original)}`);
    });
    
    console.log('\nFiles have been restored. Please check your code for references to the old file structure.');
  }
};

// Run the script
cleanupRemainingFiles();
