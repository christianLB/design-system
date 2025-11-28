#!/usr/bin/env tsx
/**
 * Component Generator
 *
 * Reads component schemas from foundry/schemas/ and generates:
 * - React component files
 * - TypeScript types
 * - CSS/Tailwind classes
 *
 * Usage: pnpm foundry:components
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FOUNDRY_DIR = path.join(__dirname, '..');
const SCHEMAS_DIR = path.join(FOUNDRY_DIR, 'schemas');
const OUTPUT_DIR = path.join(FOUNDRY_DIR, '..', 'src', 'components-generated');

interface ComponentSchema {
  name: string;
  description: string;
  category: string;
  primitive?: {
    package: string;
    component: string;
    usage: string;
  };
  variants: Record<string, {
    description: string;
    values: string[];
    default: string;
  }>;
  slots?: Record<string, {
    description: string;
    element: string;
    optional?: boolean;
  }>;
  states?: Record<string, {
    description: string;
    attribute?: string;
    prop?: string;
  }>;
  props?: Record<string, {
    type: string;
    default?: unknown;
    description: string;
    required?: boolean;
  }>;
  tokens: {
    base: Record<string, string>;
    size?: Record<string, Record<string, string>>;
    intent?: Record<string, Record<string, string | Record<string, string>>>;
    variant?: Record<string, Record<string, string>>;
    state?: Record<string, Record<string, string>>;
  };
  accessibility?: Record<string, string>;
  examples?: Array<{
    name: string;
    props: Record<string, unknown>;
    children?: unknown;
  }>;
}

function loadSchema(schemaPath: string): ComponentSchema | null {
  try {
    const content = fs.readFileSync(schemaPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load schema: ${schemaPath}`, error);
    return null;
  }
}

function generateTypeDefinitions(schema: ComponentSchema): string {
  const { name, variants, props } = schema;

  const variantTypes = Object.entries(variants)
    .map(([key, config]) => {
      const values = config.values.map(v => `'${v}'`).join(' | ');
      return `  ${key}?: ${values};`;
    })
    .join('\n');

  const propTypes = props
    ? Object.entries(props)
        .map(([key, config]) => {
          const optional = config.required ? '' : '?';
          // Replace ReactNode with React.ReactNode for proper import reference
          const typeStr = config.type.replace(/\bReactNode\b/g, 'React.ReactNode');
          return `  ${key}${optional}: ${typeStr};`;
        })
        .join('\n')
    : '';

  return `
export type ${name}Variant = ${variants.intent?.values.map(v => `'${v}'`).join(' | ') || 'string'};
export type ${name}Size = ${variants.size?.values.map(v => `'${v}'`).join(' | ') || 'string'};

export interface ${name}Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
${variantTypes}
${propTypes}
  className?: string;
  children?: React.ReactNode;
}
`.trim();
}

function generateVariantClasses(schema: ComponentSchema): string {
  const { variants, tokens } = schema;

  // Generate CVA-style variant definitions
  const variantDefs: string[] = [];

  for (const [variantKey, variantConfig] of Object.entries(variants)) {
    const tokenKey = variantKey === 'intent' ? 'intent' : variantKey;
    const tokenValues = tokens[tokenKey as keyof typeof tokens];

    if (tokenValues && typeof tokenValues === 'object') {
      const classMappings = variantConfig.values.map(value => {
        // Generate Tailwind-compatible classes based on token values
        return `      '${value}': '${generateTailwindClasses(value, variantKey)}',`;
      }).join('\n');

      variantDefs.push(`    ${variantKey}: {\n${classMappings}\n    }`);
    }
  }

  return variantDefs.join(',\n');
}

function generateTailwindClasses(value: string, variantType: string): string {
  // Map semantic values to Tailwind classes
  const intentClasses: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    success: 'bg-success text-success-foreground hover:bg-success/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  if (variantType === 'intent') {
    return intentClasses[value] || '';
  }
  if (variantType === 'size') {
    return sizeClasses[value] || '';
  }

  return '';
}

function generateComponent(schema: ComponentSchema): string {
  const { name, description, variants, props } = schema;

  const defaultVariants = Object.entries(variants)
    .map(([key, config]) => `      ${key}: '${config.default}'`)
    .join(',\n');

  const propsDestructure = [
    ...Object.keys(variants),
    ...(props ? Object.keys(props) : []),
    'className',
    'children',
    '...rest'
  ].join(', ');

  return `
/**
 * ${name}
 * ${description}
 *
 * @generated This file was generated by foundry/generators/generate-components.ts
 * DO NOT EDIT DIRECTLY - modify the schema instead: foundry/schemas/${name.toLowerCase()}.schema.json
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const ${name.toLowerCase()}Variants = cva(
  // Base classes
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
${generateVariantClasses(schema)}
    },
    defaultVariants: {
${defaultVariants}
    },
  }
);

${generateTypeDefinitions(schema)}

export const ${name} = React.forwardRef<HTMLButtonElement, ${name}Props>(
  ({ ${propsDestructure} }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          ${name.toLowerCase()}Variants({ ${Object.keys(variants).join(', ')} }),
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

${name}.displayName = '${name}';

export default ${name};
`.trim();
}

function generateIndexFile(componentNames: string[]): string {
  const exports = componentNames
    .map(name => `export { ${name} } from './${name}/${name}';`)
    .join('\n');

  return `/**
 * Generated Components Index
 *
 * @generated This file was generated by foundry/generators/generate-components.ts
 * DO NOT EDIT DIRECTLY
 */

${exports}
`;
}

async function main() {
  console.log('🏭 Foundry Component Generator\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Find all schema files
  const schemaFiles = fs.readdirSync(SCHEMAS_DIR)
    .filter(f => f.endsWith('.schema.json') && !f.startsWith('component.'));

  console.log(`📋 Found ${schemaFiles.length} component schemas\n`);

  const generatedComponents: string[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
    const schema = loadSchema(schemaPath);

    if (!schema) continue;

    console.log(`⚙️  Generating ${schema.name}...`);

    // Create component directory
    const componentDir = path.join(OUTPUT_DIR, schema.name);
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Generate component file
    const componentCode = generateComponent(schema);
    const componentPath = path.join(componentDir, `${schema.name}.tsx`);
    fs.writeFileSync(componentPath, componentCode);

    // Generate index file for component
    const indexCode = `export { ${schema.name} } from './${schema.name}';\nexport type { ${schema.name}Props } from './${schema.name}';\n`;
    fs.writeFileSync(path.join(componentDir, 'index.ts'), indexCode);

    generatedComponents.push(schema.name);
    console.log(`   ✅ ${schema.name} generated`);
  }

  // Generate main index file
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  fs.writeFileSync(indexPath, generateIndexFile(generatedComponents));

  console.log(`\n✨ Generated ${generatedComponents.length} components to src/components-generated/`);
  console.log('\nGenerated components:');
  generatedComponents.forEach(name => console.log(`  - ${name}`));
}

main().catch(console.error);
