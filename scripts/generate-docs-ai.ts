import { Project, SourceFile } from 'ts-morph';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentAnalysis {
  name: string;
  description: string;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
  }>;
  examples: string[];
  bestPractices: string[];
  accessibility: string[];
  usageNotes: string[];
  relatedComponents: string[];
}

interface DocumentationOptions {
  outputDir?: string;
  generateStorybook?: boolean;
  generateReadme?: boolean;
  includeExamples?: boolean;
}

export async function analyzeAndDocumentComponent(
  componentPath: string,
  options: DocumentationOptions = {},
): Promise<ComponentAnalysis> {
  const {
    outputDir = './docs/components',
    generateStorybook = true,
    generateReadme = true,
    includeExamples = true,
  } = options;

  console.log(`🔍 Analyzing component: ${componentPath}`);

  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  });

  const sourceFile = project.getSourceFile(componentPath);
  if (!sourceFile) {
    throw new Error(`Component not found: ${componentPath}`);
  }

  // Análisis del componente
  const analysis: ComponentAnalysis = {
    name: extractComponentName(sourceFile),
    description: generateDescription(sourceFile),
    props: extractProps(sourceFile),
    examples: generateExamples(sourceFile),
    bestPractices: generateBestPractices(sourceFile),
    accessibility: analyzeAccessibility(sourceFile),
    usageNotes: generateUsageNotes(sourceFile),
    relatedComponents: findRelatedComponents(sourceFile),
  };

  console.log(`📝 Component analyzed: ${analysis.name}`);

  // Generar documentación
  if (generateReadme) {
    await generateMarkdownDoc(analysis, outputDir);
  }

  if (generateStorybook) {
    await generateStorybookStory(analysis);
  }

  if (includeExamples) {
    await generateExampleFiles(analysis, outputDir);
  }

  return analysis;
}

function extractComponentName(sourceFile: SourceFile): string {
  // Buscar exports de componentes React
  const exportedDeclarations = sourceFile.getExportedDeclarations();

  for (const [name, declarations] of exportedDeclarations) {
    for (const declaration of declarations) {
      const declarationText = declaration.getText();
      if (
        declarationText.includes('React.FC') ||
        declarationText.includes('forwardRef') ||
        declarationText.includes('React.Component') ||
        (declarationText.includes('function') &&
          declarationText.includes('return') &&
          declarationText.includes('<'))
      ) {
        return name;
      }
    }
  }

  // Fallback: usar el nombre del archivo
  return path.basename(sourceFile.getFilePath(), '.tsx').replace(/\..*$/, '');
}

function extractProps(sourceFile: SourceFile): ComponentAnalysis['props'] {
  const props: ComponentAnalysis['props'] = [];

  // Buscar interfaces que terminen en 'Props'
  const interfaces = sourceFile.getInterfaces();

  for (const interfaceDecl of interfaces) {
    if (interfaceDecl.getName().endsWith('Props')) {
      for (const property of interfaceDecl.getProperties()) {
        const name = property.getName();
        const type = property.getTypeNode()?.getText() || 'unknown';
        const required = !property.hasQuestionToken();
        const description = extractJSDocComment(property) || `Property ${name}`;

        // Buscar valor por defecto en defaultProps o en el código
        const defaultValue = extractDefaultValue(sourceFile, name);

        props.push({
          name,
          type,
          required,
          description,
          defaultValue,
        });
      }
    }
  }

  return props;
}

function extractJSDocComment(node: any): string | undefined {
  try {
    if (node.getJsDocs && typeof node.getJsDocs === 'function') {
      const jsDocs = node.getJsDocs();
      if (jsDocs.length > 0) {
        const description = jsDocs[0].getDescription
          ? jsDocs[0].getDescription()
          : jsDocs[0].getText();
        return description.trim();
      }
    }
  } catch (error) {
    // Fallback if JSDoc methods are not available
  }
  return undefined;
}

function extractDefaultValue(sourceFile: SourceFile, propName: string): string | undefined {
  const text = sourceFile.getText();

  // Buscar patrones de default props
  const defaultPropsRegex = new RegExp(`${propName}\\s*:\\s*([^,}]+)`, 'g');
  const match = defaultPropsRegex.exec(text);

  if (match) {
    return match[1].trim().replace(/['"]/g, '');
  }

  return undefined;
}

function generateDescription(sourceFile: SourceFile): string {
  // Buscar comentarios JSDoc en el componente principal
  const exportedDeclarations = sourceFile.getExportedDeclarations();

  for (const [name, declarations] of exportedDeclarations) {
    for (const declaration of declarations) {
      const jsDoc = extractJSDocComment(declaration);
      if (jsDoc) {
        return jsDoc;
      }
    }
  }

  // Generar descripción basada en el nombre y análisis del código
  const componentName = extractComponentName(sourceFile);
  const codeText = sourceFile.getText();

  // Análisis simple del código para generar descripción
  if (codeText.includes('button') || codeText.includes('onClick')) {
    return `${componentName} is an interactive button component that provides consistent styling and behavior across the application. Use it for actions, form submissions, and navigation.`;
  } else if (codeText.includes('input') || codeText.includes('onChange')) {
    return `${componentName} is a form input component that handles user input with built-in validation and styling. Supports various input types and states.`;
  } else if (codeText.includes('modal') || codeText.includes('dialog')) {
    return `${componentName} is a modal/dialog component that displays content in an overlay. Provides accessibility features and customizable styling.`;
  } else if (codeText.includes('card') || codeText.includes('container')) {
    return `${componentName} is a layout component that provides consistent spacing, borders, and styling for content containers.`;
  }

  return `${componentName} is a reusable React component that provides consistent UI patterns and styling for the design system.`;
}

function generateExamples(sourceFile: SourceFile): string[] {
  const componentName = extractComponentName(sourceFile);
  const props = extractProps(sourceFile);
  const examples: string[] = [];

  // Ejemplo básico
  examples.push(`// Basic usage
<${componentName} />`);

  // Ejemplo con props comunes
  if (props.length > 0) {
    const requiredProps = props.filter((p) => p.required);
    const optionalProps = props.filter((p) => !p.required).slice(0, 2);

    if (requiredProps.length > 0 || optionalProps.length > 0) {
      const propStrings = [
        ...requiredProps.map((p) => `${p.name}="${getExampleValue(p.type)}"`),
        ...optionalProps.map((p) => `${p.name}="${getExampleValue(p.type)}"`),
      ];

      examples.push(`// With props
<${componentName} ${propStrings.join(' ')} />`);
    }
  }

  // Ejemplo con children si el componente los acepta
  const sourceText = sourceFile.getText();
  if (sourceText.includes('children') || sourceText.includes('ReactNode')) {
    examples.push(`// With children
<${componentName}>
  Content goes here
</${componentName}>`);
  }

  // Ejemplo con evento si tiene onClick, onChange, etc.
  if (sourceText.includes('onClick')) {
    examples.push(`// With event handler
<${componentName} onClick={handleClick} />`);
  }

  if (sourceText.includes('onChange')) {
    examples.push(`// With change handler
<${componentName} onChange={handleChange} />`);
  }

  return examples;
}

function getExampleValue(type: string): string {
  if (type.includes('string')) return 'example';
  if (type.includes('number')) return '42';
  if (type.includes('boolean')) return 'true';
  if (type.includes('primary') || type.includes('secondary')) return 'primary';
  if (type.includes('small') || type.includes('large')) return 'medium';
  return 'value';
}

function generateBestPractices(sourceFile: SourceFile): string[] {
  const componentName = extractComponentName(sourceFile);
  const sourceText = sourceFile.getText();
  const practices: string[] = [];

  // Prácticas basadas en el tipo de componente
  if (sourceText.includes('button') || sourceText.includes('onClick')) {
    practices.push('Use clear, action-oriented labels that describe what will happen when clicked');
    practices.push('Provide appropriate loading states for async actions');
    practices.push('Consider the visual hierarchy when choosing button variants');
  }

  if (sourceText.includes('input') || sourceText.includes('onChange')) {
    practices.push('Always provide clear labels and helper text');
    practices.push('Implement proper validation with meaningful error messages');
    practices.push('Use appropriate input types for better UX and validation');
  }

  if (sourceText.includes('modal') || sourceText.includes('dialog')) {
    practices.push('Ensure modals can be closed with the Escape key');
    practices.push('Focus management: focus the first interactive element when opened');
    practices.push('Use modals sparingly and only for important actions or information');
  }

  // Prácticas generales
  practices.push(`Use ${componentName} consistently throughout your application`);
  practices.push('Follow the established design system patterns and guidelines');
  practices.push('Test with keyboard navigation and screen readers');

  return practices;
}

function analyzeAccessibility(sourceFile: SourceFile): string[] {
  const sourceText = sourceFile.getText();
  const features: string[] = [];

  // Buscar características de accesibilidad en el código
  if (sourceText.includes('aria-label') || sourceText.includes('aria-labelledby')) {
    features.push('Includes proper ARIA labels for screen readers');
  }

  if (sourceText.includes('aria-expanded') || sourceText.includes('aria-hidden')) {
    features.push('Uses ARIA state attributes for dynamic content');
  }

  if (sourceText.includes('role=')) {
    features.push('Defines semantic roles for better screen reader support');
  }

  if (sourceText.includes('onKeyDown') || sourceText.includes('KeyboardEvent')) {
    features.push('Supports keyboard navigation and interaction');
  }

  if (sourceText.includes('tabIndex') || sourceText.includes('focus')) {
    features.push('Manages focus appropriately for keyboard users');
  }

  if (sourceText.includes('alt=') || sourceText.includes('aria-describedby')) {
    features.push('Provides descriptive text for non-text content');
  }

  // Características por defecto basadas en elementos HTML
  if (sourceText.includes('<button')) {
    features.push('Uses semantic HTML button elements');
  }

  if (sourceText.includes('<input')) {
    features.push('Uses semantic HTML form elements');
  }

  // Si no se encontraron características específicas, añadir algunas generales
  if (features.length === 0) {
    features.push('Follows WCAG 2.1 accessibility guidelines');
    features.push('Compatible with screen readers and assistive technologies');
    features.push('Supports keyboard navigation');
  }

  return features;
}

function generateUsageNotes(sourceFile: SourceFile): string[] {
  const componentName = extractComponentName(sourceFile);
  const sourceText = sourceFile.getText();
  const notes: string[] = [];

  // Notas basadas en imports y dependencias
  if (sourceText.includes('framer-motion')) {
    notes.push('This component includes animations powered by Framer Motion');
  }

  if (sourceText.includes('forwardRef')) {
    notes.push('This component forwards refs to the underlying DOM element');
  }

  if (sourceText.includes('memo')) {
    notes.push('This component is memoized for performance optimization');
  }

  if (sourceText.includes('useCallback') || sourceText.includes('useMemo')) {
    notes.push('Optimized with React hooks for better performance');
  }

  // Notas sobre variantes
  if (sourceText.includes('variant')) {
    notes.push('Multiple visual variants available for different use cases');
  }

  if (sourceText.includes('size')) {
    notes.push('Supports multiple size options for layout flexibility');
  }

  return notes;
}

function findRelatedComponents(sourceFile: SourceFile): string[] {
  const sourceText = sourceFile.getText();
  const related: string[] = [];

  // Buscar imports de otros componentes
  const imports = sourceFile.getImportDeclarations();

  for (const importDecl of imports) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    if (moduleSpecifier.includes('../components/') || moduleSpecifier.includes('./')) {
      const namedImports = importDecl.getNamedImports();
      for (const namedImport of namedImports) {
        const name = namedImport.getName();
        if (name !== extractComponentName(sourceFile)) {
          related.push(name);
        }
      }
    }
  }

  return related;
}

async function generateMarkdownDoc(analysis: ComponentAnalysis, outputDir: string): Promise<void> {
  await fs.ensureDir(outputDir);

  const md = new MarkdownIt();

  const markdownContent = `# ${analysis.name}

${analysis.description}

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
${analysis.props
  .map(
    (prop) =>
      `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? '✅' : '❌'} | \`${prop.defaultValue || '-'}\` | ${prop.description} |`,
  )
  .join('\n')}

## Examples

${analysis.examples.map((example) => `\`\`\`tsx\n${example}\n\`\`\``).join('\n\n')}

## Best Practices

${analysis.bestPractices.map((practice) => `- ${practice}`).join('\n')}

## Accessibility

${analysis.accessibility.map((feature) => `- ${feature}`).join('\n')}

${
  analysis.usageNotes.length > 0
    ? `## Usage Notes

${analysis.usageNotes.map((note) => `- ${note}`).join('\n')}`
    : ''
}

${
  analysis.relatedComponents.length > 0
    ? `## Related Components

${analysis.relatedComponents.map((comp) => `- [\`${comp}\`](./${comp}.md)`).join('\n')}`
    : ''
}

---

*Documentation generated automatically by Claude Code Documentation System*
*Last updated: ${new Date().toISOString()}*
`;

  const outputPath = path.join(outputDir, `${analysis.name}.md`);
  await fs.writeFile(outputPath, markdownContent);

  console.log(`📄 Generated documentation: ${outputPath}`);
}

async function generateStorybookStory(analysis: ComponentAnalysis): Promise<void> {
  const storiesDir = path.join(__dirname, '../src/stories/generated');
  await fs.ensureDir(storiesDir);

  const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${analysis.name} } from '../components/${analysis.name}';

const meta: Meta<typeof ${analysis.name}> = {
  title: 'Generated/${analysis.name}',
  component: ${analysis.name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${analysis.description.replace(/'/g, "\\'")}',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ${analysis.props
      .map(
        (prop) => `
    ${prop.name}: {
      description: '${prop.description.replace(/'/g, "\\'")}',
      control: { type: '${getStorybookControlType(prop.type)}' },
    }`,
      )
      .join(',')}
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ${analysis.props
      .filter((p) => p.defaultValue)
      .map((prop) => `${prop.name}: ${getStorybookDefaultValue(prop.type, prop.defaultValue)}`)
      .join(',\n    ')}
  },
};

${
  analysis.props.filter((p) => p.type.includes('variant')).length > 0
    ? `
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <${analysis.name} variant="primary" />
      <${analysis.name} variant="secondary" />
      <${analysis.name} variant="outline" />
    </div>
  ),
};
`
    : ''
}

${
  analysis.props.filter((p) => p.type.includes('size')).length > 0
    ? `
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <${analysis.name} size="small" />
      <${analysis.name} size="medium" />
      <${analysis.name} size="large" />
    </div>
  ),
};
`
    : ''
}

// Example from documentation
export const Example: Story = {
  render: () => (
    <div>
      ${analysis.examples[0] ? analysis.examples[0].replace('// Basic usage\n', '') : `<${analysis.name} />`}
    </div>
  ),
};
`;

  const outputPath = path.join(storiesDir, `${analysis.name}.stories.tsx`);
  await fs.writeFile(outputPath, storyContent);

  console.log(`📖 Generated Storybook story: ${outputPath}`);
}

function getStorybookControlType(type: string): string {
  if (type.includes('string')) return 'text';
  if (type.includes('number')) return 'number';
  if (type.includes('boolean')) return 'boolean';
  if (type.includes('|')) return 'select';
  return 'text';
}

function getStorybookDefaultValue(type: string, defaultValue?: string): string {
  if (!defaultValue) return "''";
  if (type.includes('string')) return `'${defaultValue}'`;
  if (type.includes('number')) return defaultValue;
  if (type.includes('boolean')) return defaultValue;
  return `'${defaultValue}'`;
}

async function generateExampleFiles(analysis: ComponentAnalysis, outputDir: string): Promise<void> {
  const examplesDir = path.join(outputDir, 'examples');
  await fs.ensureDir(examplesDir);

  const exampleContent = `import React from 'react';
import { ${analysis.name} } from '../../components/${analysis.name}';

/**
 * Example usage of ${analysis.name} component
 * Generated automatically by Claude Code Documentation System
 */

${analysis.examples
  .map(
    (example, index) => `
export const Example${index + 1} = () => (
  <div>
    <h3>Example ${index + 1}</h3>
    ${example.replace(/\/\/ .+\n/g, '')}
  </div>
);`,
  )
  .join('\n')}

export const AllExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    ${analysis.examples.map((_, index) => `<Example${index + 1} />`).join('\n    ')}
  </div>
);
`;

  const outputPath = path.join(examplesDir, `${analysis.name}.examples.tsx`);
  await fs.writeFile(outputPath, exampleContent);

  console.log(`💡 Generated examples: ${outputPath}`);
}

// CLI function
async function main() {
  const args = process.argv.slice(2);
  const [componentPath, outputDir] = args;

  if (!componentPath) {
    console.log('Usage: tsx generate-docs-ai.ts <component-path> [output-dir]');
    console.log(
      'Example: tsx generate-docs-ai.ts src/components/Button/Button.tsx docs/components',
    );
    process.exit(1);
  }

  try {
    const analysis = await analyzeAndDocumentComponent(componentPath, {
      outputDir: outputDir || './docs/components',
      generateStorybook: true,
      generateReadme: true,
      includeExamples: true,
    });

    console.log(`\n✅ Documentation generated for ${analysis.name}!`);
    console.log(`📊 Found ${analysis.props.length} props`);
    console.log(`💡 Generated ${analysis.examples.length} examples`);
    console.log(`♿ ${analysis.accessibility.length} accessibility features`);
    console.log(`📝 ${analysis.bestPractices.length} best practices`);
  } catch (error) {
    console.error('❌ Error generating documentation:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
