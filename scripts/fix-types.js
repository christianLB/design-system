const fs = require('fs');
const path = require('path');

// Create an index.d.ts file at the root that properly exports types
const mainDtsContent = `// Main type definition file for the design system
export * from './dist/types/components';
export * from './dist/types/index';
`;

fs.writeFileSync(path.join(__dirname, '..', 'index.d.ts'), mainDtsContent);

// Ensure the correct dist/types path exists
const typesDir = path.join(__dirname, '..', 'dist', 'types');
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// Create a package-level declaration file to satisfy TypeScript module resolution
const packageDtsContent = `// Package type definition
declare module '@k2600x/design-system' {
  export * from './components';
}
`;

fs.writeFileSync(path.join(typesDir, 'index.d.ts'), packageDtsContent);

console.log('✅ Type definitions fixed and created!');
