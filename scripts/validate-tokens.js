const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Check if a file uses hardcoded values instead of tokens
function checkFileForHardcodedValues(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];
    
    // Common patterns to check for hardcoded values
    const patterns = [
      // Color values
      /#[0-9a-fA-F]{3,6}\b/g,
      /(?:rgb|hsl)a?\([^)]*\)/g,
      /(?:bg|text|border|ring|fill|stroke|accent|caret|shadow|outline|from|via|to)-[a-z]+-(?:50|[1-9]\d{0,2})/g,
      // Spacing values
      /[^a-z](?:p|m|w|h|gap|top|right|bottom|left|space-[xy])-[0-9.]+/g,
      // Border radius
      /rounded-(?:none|sm|md|lg|xl|2xl|3xl|full)/g,
      // Shadows
      /shadow-(?:none|sm|md|lg|xl|2xl|inner)/g,
      // Opacity
      /opacity-[0-9]+/g
    ];
    
    patterns.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const lineNumber = content.substring(0, match.index).split('\n').length;
        const lineContent = lines[lineNumber - 1]?.trim() || '';
        
        // Skip if this is in a comment or string
        if (lineContent.includes('//') || lineContent.includes('/*') || lineContent.includes('*/') || 
            lineContent.includes("'") || lineContent.includes('"')) {
          continue;
        }
        
        issues.push({
          line: lineNumber,
          column: match.index - content.substring(0, match.index).lastIndexOf('\n'),
          message: `Hardcoded value detected: ${match[0]}`,
          type: 'hardcoded-value',
          file: filePath
        });
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`Error checking ${filePath}:`, error);
    return [];
  }
}

// Main function
function main() {
  const componentsDir = path.join(__dirname, '../components');
  const files = getComponentFiles(componentsDir);
  
  console.log(`Checking ${files.length} component files for hardcoded values...\n`);
  
  let totalIssues = 0;
  files.forEach(file => {
    const issues = checkFileForHardcodedValues(file);
    if (issues.length > 0) {
      console.log(`\n${file}`);
      console.log('-'.repeat(80));
      
      issues.forEach(issue => {
        console.log(`  ${issue.line}:${issue.column} - ${issue.message}`);
        totalIssues++;
      });
    }
  });
  
  console.log(`\nFound ${totalIssues} potential issues across ${files.length} files.`);
  
  if (totalIssues > 0) {
    console.log('\nRecommendations:');
    console.log('1. Replace hardcoded values with design tokens from src/lib/tokens.ts');
    console.log('2. Run the migration script: npm run migrate-tokens');
    console.log('3. Run the linter: npx eslint . --fix');
    process.exit(1);
  } else {
    console.log('\n✅ All components are using design tokens correctly!');
    process.exit(0);
  }
}

// Run the validation
main();
