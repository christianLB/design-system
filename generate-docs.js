// generate-docs.js
const fs = require('fs-extra');
const path = require('path');
const reactDocgen = require('react-docgen-typescript');

const COMPONENTS_DIR = path.join(__dirname, 'components');
const OUTPUT_DIR = path.join(__dirname, 'docs', 'component-docs');

// Configuración para react-docgen-typescript
const tsConfigParser = reactDocgen.withCompilerOptions(
  {},
  {
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => {
      // Filtrar props de librerías de node_modules
      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules');
      }
      return true;
    },
  }
);

async function generateDocs() {
  try {
    // Asegurarse de que el directorio de salida existe
    await fs.ensureDir(OUTPUT_DIR);
    
    // Leer archivos .tsx en el directorio de componentes
    const files = await fs.readdir(COMPONENTS_DIR);
    const tsxFiles = files.filter(f => f.endsWith('.tsx'));

    if (tsxFiles.length === 0) {
      console.log('No se encontraron archivos .tsx en la carpeta components.');
      return;
    }

    console.log(`Procesando ${tsxFiles.length} componentes...`);

    for (const file of tsxFiles) {
      const filePath = path.join(COMPONENTS_DIR, file);
      try {
        const componentDocs = tsConfigParser.parse(filePath);
        
        if (componentDocs.length === 0) {
          console.log(`  - ${file}: Sin documentación exportada`);
          continue;
        }

        // Procesar cada componente encontrado en el archivo
        for (const doc of componentDocs) {
          const componentName = doc.displayName || file.replace(/\.tsx$/, '');
          const outFile = path.join(OUTPUT_DIR, `${componentName}.json`);
          
          await fs.writeJson(outFile, doc, { spaces: 2 });
          console.log(`  ✓ ${file} -> ${path.relative(__dirname, outFile)}`);
        }
      } catch (err) {
        console.warn(`  ! Error procesando ${file}:`, err.message);
      }
    }

    console.log('\n✅ Documentación generada exitosamente!');
    console.log(`📂 Los archivos se guardaron en: ${path.relative(__dirname, OUTPUT_DIR)}`);
  } catch (error) {
    console.error('❌ Error al generar documentación:', error);
    process.exit(1);
  }
}

generateDocs();
