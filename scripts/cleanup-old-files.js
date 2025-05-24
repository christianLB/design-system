/**
 * Script to clean up old component files after successful migration to folder structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const BACKUP_DIR = path.join(__dirname, '..', 'backup-migrated-files');

// Components that have been migrated to folder structure
const migratedComponents = [
  'Accordion',
  'Carousel',
  'Checkbox',
  'ConfirmDialog',
  'DatePicker',
  'FileUpload',
  'Label',
  'Loader',
  'MultiSelect',
  'ProgressBar',
  'RadioGroup',
  'Select',
  'Textarea',
  'ThemeToggle',
  'Tooltip'
];

// Backup a file before deleting it
const backupFile = (filePath) => {
  const fileName = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, fileName);
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  // Copy file to backup
  fs.copyFileSync(filePath, backupPath);
  console.log(`  Backed up ${fileName} to ${backupPath}`);
  
  return backupPath;
};

// Delete the original file
const deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
  console.log(`  Deleted original file: ${filePath}`);
};

// Main cleanup function
const cleanupOldFiles = () => {
  console.log('Cleaning up old component files after successful migration...\n');
  
  let backupFiles = [];
  
  // Process each migrated component
  for (const componentName of migratedComponents) {
    // Look for old component files directly in src/components/
    const oldComponentPath = path.join(COMPONENTS_DIR, `${componentName}.tsx`);
    const oldStoriesPath = path.join(COMPONENTS_DIR, `${componentName}.stories.tsx`);
    const oldTestPath = path.join(COMPONENTS_DIR, `${componentName}.test.tsx`);
    
    if (fs.existsSync(oldComponentPath)) {
      const backupPath = backupFile(oldComponentPath);
      backupFiles.push({
        original: oldComponentPath,
        backup: backupPath
      });
      deleteFile(oldComponentPath);
    }
    
    if (fs.existsSync(oldStoriesPath)) {
      const backupPath = backupFile(oldStoriesPath);
      backupFiles.push({
        original: oldStoriesPath,
        backup: backupPath
      });
      deleteFile(oldStoriesPath);
    }
    
    if (fs.existsSync(oldTestPath)) {
      const backupPath = backupFile(oldTestPath);
      backupFiles.push({
        original: oldTestPath,
        backup: backupPath
      });
      deleteFile(oldTestPath);
    }
  }
  
  console.log(`\nBackup and cleanup complete. ${backupFiles.length} files were processed.`);
  console.log(`Backup files are stored in: ${BACKUP_DIR}`);
  
  // Save a manifest of backups for potential restoration
  const manifest = {
    date: new Date().toISOString(),
    files: backupFiles
  };
  
  fs.writeFileSync(
    path.join(BACKUP_DIR, 'backup-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Backup manifest created: backup-manifest.json');
};

// Run the script
cleanupOldFiles();
