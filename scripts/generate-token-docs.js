const fs = require('fs');
const path = require('path');
const { tokens } = require('../src/lib/tokens');

// Create markdown content for tokens
function generateTokenDocs() {
  let content = [
    '# Design Tokens Reference\n',
    '## Colors\n',
    '### Base Colors\n',
    '| Token | Value | Preview |',
    '|-------|-------|---------|'
  ];

  // Add color tokens
  Object.entries(tokens.colors).forEach(([key, value]) => {
    if (typeof value === 'string' && value.startsWith('bg-')) {
      const colorClass = value.replace('bg-', '');
      content.push(`| \`${key}\` | \`${value}\` | <div style="background-color: var(--${colorClass}); width: 24px; height: 24px; border: 1px solid #ccc; display: inline-block;"></div> |`);
    }
  });

  // Spacing
  content.push(
    '\n## Spacing\n',
    '| Size | Value |',
    '|------|-------|',
    '| `spacing(1)` | 0.25rem (4px) |',
    '| `spacing(2)` | 0.5rem (8px) |',
    '| `spacing(3)` | 0.75rem (12px) |',
    '| `spacing(4)` | 1rem (16px) |',
    '| `spacing(5)` | 1.25rem (20px) |',
    '| `spacing(6)` | 1.5rem (24px) |'
  );

  // Border Radius
  content.push(
    '\n## Border Radius\n',
    '| Token | Value |',
    '|--------|-------|'
  );
  Object.entries(tokens.radius).forEach(([key, value]) => {
    content.push(`| \`${key}\` | \`${value}\` |`);
  });

  // Shadows
  content.push(
    '\n## Shadows\n',
    '| Token | Value |',
    '|--------|-------|'
  );
  Object.entries(tokens.shadow).forEach(([key, value]) => {
    content.push(`| \`${key}\` | \`${value.replace(/\n/g, ' ').trim()}\` |`);
  });

  // Transitions
  content.push(
    '\n## Transitions\n',
    '| Token | Value |',
    '|--------|-------|'
  );
  Object.entries(tokens.transition).forEach(([key, value]) => {
    content.push(`| \`${key}\` | \`${value}\` |`);
  });

  return content.join('\n');
}

// Write to file
const docsPath = path.join(__dirname, '../DOCS/TOKENS.md');
const docsContent = generateTokenDocs();

// Ensure DOCS directory exists
if (!fs.existsSync(path.dirname(docsPath))) {
  fs.mkdirSync(path.dirname(docsPath), { recursive: true });
}

fs.writeFileSync(docsPath, docsContent, 'utf8');
console.log(`Token documentation generated at: ${docsPath}`);
