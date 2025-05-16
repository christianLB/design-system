const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components');
const DOCS_DIR = path.join(__dirname, '..', 'docs', 'component-docs');

// Plantillas de documentación JSDoc para diferentes tipos de componentes
const DOC_TEMPLATES = {
  default: `/**
 * Componente {componentName}.
 * @component
 * @example
 * import { {componentName} } from "@/components/{componentName}"
 *
 * function App() {
 *   return <{componentName} />
 * }
 */`,
  
  button: `/**
 * Botón reutilizable con múltiples variantes y tamaños.
 * @component
 * @example
 * import { Button } from "@/components/button"
 *
 * function App() {
 *   return <Button>Haz clic</Button>
 * }
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [props.variant='outline'] - Variante del botón
 * @param {'default'|'sm'|'lg'|'icon'} [props.size='default'] - Tamaño del botón
 * @param {boolean} [props.asChild=false] - Si es true, renderiza el contenido como hijo
 * @param {React.ReactNode} props.children - Contenido del botón
 */`,

  input: `/**
 * Campo de entrada de texto.
 * @component
 * @example
 * import { Input } from "@/components/input"
 *
 * function App() {
 *   return <Input placeholder="Escribe algo..." />
 * }
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {string} [props.type='text'] - Tipo de entrada
 * @param {string} [props.placeholder] - Texto de marcador de posición
 * @param {boolean} [props.disabled] - Si el campo está deshabilitado
 * @param {string} [props.value] - Valor controlado
 * @param {function} [props.onChange] - Manejador de cambio
 */`
};

// Mapeo de componentes a plantillas específicas
const COMPONENT_TEMPLATES = {
  'button.tsx': 'button',
  'input.tsx': 'input',
  'textarea.tsx': 'input',
  'checkbox.tsx': 'input',
  'select.tsx': 'input',
  'switch.tsx': 'input',
};

async function addJSDocToComponents() {
  try {
    const files = await fs.readdir(COMPONENTS_DIR);
    const tsxFiles = files.filter(f => f.endsWith('.tsx'));

    for (const file of tsxFiles) {
      const filePath = path.join(COMPONENTS_DIR, file);
      let content = await fs.readFile(filePath, 'utf8');
      
      // Verificar si ya tiene documentación JSDoc
      if (content.includes('/**') && content.includes('@component')) {
        console.log(`✓ ${file} ya tiene documentación JSDoc`);
        continue;
      }

      // Obtener el nombre del componente
      const componentName = file.replace(/\.tsx$/, '');
      const componentNamePascal = componentName
        .split('-') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      // Usar plantilla específica o la predeterminada
      const templateType = COMPONENT_TEMPLATES[file] || 'default';
      const docTemplate = DOC_TEMPLATES[templateType] || DOC_TEMPLATES.default;
      
      // Aplicar la plantilla
      const docContent = docTemplate
        .replace(/{componentName}/g, componentNamePascal)
        .replace(/{componentNameLower}/g, componentName);

      // Insertar la documentación antes del componente
      const lines = content.split('\n');
      const componentStartIndex = lines.findIndex(line => 
        line.startsWith('export function ') || 
        line.startsWith('const ') && lines[lines.indexOf(line) + 1]?.includes('= (') ||
        line.startsWith('function ')
      );

      if (componentStartIndex !== -1) {
        // Insertar documentación
        lines.splice(componentStartIndex, 0, docContent);
        await fs.writeFile(filePath, lines.join('\n'), 'utf8');
        console.log(`✓ Documentación agregada a ${file}`);
      } else {
        console.warn(`No se pudo encontrar el componente en ${file}`);
      }
    }
  } catch (error) {
    console.error('Error al agregar documentación JSDoc:', error);
    process.exit(1);
  }
}

// Actualizar el índice de tipos para incluir documentación en el bundle
async function updateTypeDeclarations() {
  const indexPath = path.join(__dirname, '..', 'index.ts');
  let content = await fs.readFile(indexPath, 'utf8');
  
  // Agregar exportación de documentación si no existe
  if (!content.includes('export * from "./docs/component-docs"')) {
    content += '\n// Exportar documentación para LLM\nexport * from "./docs/component-docs";\n';
    await fs.writeFile(indexPath, content, 'utf8');
    console.log('✓ Índice de tipos actualizado para incluir documentación');
  }
}

async function main() {
  console.log('\n🔍 Agregando documentación JSDoc a los componentes...');
  await addJSDocToComponents();
  
  console.log('\n📦 Actualizando configuración de TypeScript...');
  await updateTypeDeclarations();
  
  console.log('\n✅ Documentación mejorada exitosamente!');
  console.log('\nEjecuta `npm run build` para actualizar los tipos con la documentación.');
}

main();
