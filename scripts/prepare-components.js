const fs = require('fs');
const path = require('path');

// Ensure the dist/components directory exists
const componentsDestDir = path.join(__dirname, '..', 'dist', 'components');
if (!fs.existsSync(componentsDestDir)) {
  fs.mkdirSync(componentsDestDir, { recursive: true });
}

// Get list of component files from components directory
const componentSrcDir = path.join(__dirname, '..', 'components');
const componentFiles = fs.readdirSync(componentSrcDir)
  .filter(file => file.endsWith('.tsx') && !file.includes('.stories.') && !file.includes('.test.'));

// Create individual re-export files in dist/components
componentFiles.forEach(file => {
  const componentName = file.replace('.tsx', '');
  
  // Create the re-export file
  const destFile = path.join(componentsDestDir, `${componentName}.js`);
  const content = `
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../design-system.cjs.js');
} else {
  module.exports = require('../design-system.cjs.js');
}
`;
  
  fs.writeFileSync(destFile, content);
  
  // Create the corresponding .d.ts file
  const dtsContent = `export { ${componentName} as default } from '../../';`;
  const dtsDest = path.join(componentsDestDir, `${componentName}.d.ts`);
  fs.writeFileSync(dtsDest, dtsContent);
});

// Create index.js in components directory
const indexContent = `
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../design-system.cjs.js');
} else {
  module.exports = require('../design-system.cjs.js');
}
`;
fs.writeFileSync(path.join(componentsDestDir, 'index.js'), indexContent);
fs.writeFileSync(path.join(componentsDestDir, 'index.d.ts'), `export * from '../../';`);

console.log('✅ Component files generated successfully in dist/components.');
