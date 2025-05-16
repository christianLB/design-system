const fs = require('fs-extra');
const path = require('path');

// Get the current working directory
const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'docs', 'component-docs');
const destDir = path.join(rootDir, 'dist', 'docs', 'component-docs');

async function copyDocsToDist() {
  try {
    console.log('Copying documentation files...');
    console.log(`From: ${sourceDir}`);
    console.log(`To: ${destDir}`);

    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      console.log('No documentation files found to copy.');
      return;
    }

    // Ensure the destination directory exists
    await fs.ensureDir(destDir);

    // Get all JSON files from source directory
    const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.log('No JSON files found in the source directory.');
      return;
    }

    // Copy each file individually
    for (const file of files) {
      const sourceFile = path.join(sourceDir, file);
      const destFile = path.join(destDir, file);
      await fs.copyFile(sourceFile, destFile);
      console.log(`  ✓ Copied ${file}`);
    }

    // Create an index file to export all documentation
    const indexPath = path.join(rootDir, 'dist', 'docs', 'index.ts');
    const imports = files.map(file => {
      const name = file.replace('.json', '');
      return `import ${name} from './component-docs/${file}';`;
    });
    
    const exports = files.map(file => file.replace('.json', ''));
    const content = `${imports.join('\n')}\n\nexport const components = {\n  ${exports.join(',\n  ')}\n};\n`;
    
    // Ensure the directory exists before writing the file
    await fs.ensureDir(path.dirname(indexPath));
    await fs.writeFile(indexPath, content, 'utf8');
    
    console.log('✅ Documentation copied successfully!');
  } catch (error) {
    console.error('❌ Error copying documentation:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    console.error('Error al copiar documentación:', error);
    process.exit(1);
  }
}

copyDocsToDist().catch(error => {
  console.error('Error copying docs:', error);
  process.exit(1);
});
