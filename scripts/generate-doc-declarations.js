const fs = require('fs-extra');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs', 'component-docs');

async function generateDeclarations() {
  try {
    // Leer todos los archivos JSON de documentación
    const files = await fs.readdir(DOCS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json') && !f.endsWith('.d.ts'));

    for (const file of jsonFiles) {
      const componentName = path.basename(file, '.json');
      const dtsPath = path.join(DOCS_DIR, `${componentName}.d.ts`);
      
      // Crear archivo de declaración TypeScript
      const dtsContent = `// Documentación de tipo para ${componentName}
declare const _default: any;
export default _default;
`;
      
      await fs.writeFile(dtsPath, dtsContent, 'utf8');
      console.log(`✓ Generada declaración para ${componentName}`);
    }

    console.log('✅ Declaraciones de documentación generadas exitosamente!');
  } catch (error) {
    console.error('Error al generar declaraciones de documentación:', error);
    process.exit(1);
  }
}

generateDeclarations();
