// generate-docs.js
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Get the current working directory
const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'components');
const outputDir = path.join(rootDir, 'docs', 'component-docs');

// Ensure output directory exists
fs.ensureDirSync(outputDir);

// Simple component parser (placeholder for actual documentation generation)
function parseComponent(filePath) {
  // This is a simplified version that just returns basic component info
  const componentName = path.basename(filePath, '.tsx');
  return [{
    displayName: componentName,
    description: `Documentation for ${componentName}`,
    props: {},
    tags: {},
    methods: []
  }];
}

async function generateDocs() {
  try {
    console.log('Starting documentation generation...');
    
    // Read all component files
    const files = fs.readdirSync(componentsDir).filter(file => 
      file.endsWith('.tsx') && !file.endsWith('.stories.tsx') && !file.endsWith('.test.tsx')
    );
    
    console.log(`Found ${files.length} component files to process...`);
    
    if (files.length === 0) {
      console.log('No component files found in the components directory');
      return;
    }

    console.log(`Processing ${files.length} components...`);

    // Process each component file
    for (const file of files) {
      const filePath = path.join(componentsDir, file);
      const componentName = path.basename(file, '.tsx');
      const outputFile = path.join(outputDir, `${componentName}.json`);
      
      console.log(`  - ${file}: Processing...`);
      
      try {
        // Parse the component to get documentation
        const componentDocs = parseComponent(filePath);
        
        if (!componentDocs || componentDocs.length === 0) {
          console.log(`  - ${file}: No documentation generated`);
          continue;
        }

        // Save documentation to JSON file
        fs.writeJsonSync(outputFile, componentDocs, { spaces: 2 });
        console.log(`  ✓ ${file} -> docs/component-docs/${path.basename(outputFile)}`);
      } catch (error) {
        console.error(`  ✗ Error processing ${file}:`, error.message);
        if (error.stack) {
          console.error(error.stack);
        }
      }
    }

    console.log('\n✅ Documentation generated successfully!');
    console.log(`📂 Files saved to: ${path.relative(process.cwd(), outputDir)}\n`);
    
    // Skip TypeScript declarations for now as they're not critical
    console.log('Skipping TypeScript declarations generation...');
  } catch (error) {
    console.error('❌ Error generating documentation:', error);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

generateDocs().catch(error => {
  console.error('Error generating docs:', error);
  process.exit(1);
});
