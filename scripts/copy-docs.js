const fs = require('fs-extra');
const path = require('path');

async function copyDocsToDist() {
  try {
    const sourceDir = path.join(__dirname, '..', 'docs', 'component-docs');
    const destDir = path.join(__dirname, '..', 'dist', 'docs', 'component-docs');
    
    // Asegurarse de que el directorio de destino exista
    await fs.ensureDir(destDir);
    
    // Copiar archivos de documentación
    const files = await fs.readdir(sourceDir);
    
    // Copiar solo archivos JSON y .d.ts
    for (const file of files) {
      if (file.endsWith('.json') || file.endsWith('.d.ts')) {
        await fs.copy(
          path.join(sourceDir, file),
          path.join(destDir, file)
        );
      }
    }
    
    // Crear un archivo de índice para exportar toda la documentación
    const indexPath = path.join(__dirname, '..', 'dist', 'docs', 'index.ts');
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    const exports = jsonFiles
      .map(f => `export * from './component-docs/${f.replace(/\.json$/, '')}';`)
      .join('\n');
    
    // Crear el archivo de índice en la raíz de docs
    await fs.ensureDir(path.dirname(indexPath));
    await fs.writeFile(indexPath, `// Documentación generada automáticamente\n${exports}\n`, 'utf8');
    
    // Copiar el archivo de índice al directorio de componentes
    await fs.copy(
      path.join(__dirname, '..', 'docs', 'component-docs', 'index.d.ts'),
      path.join(destDir, 'index.d.ts')
    );
    
    console.log('✅ Documentación copiada al directorio de distribución');
  } catch (error) {
    console.error('Error al copiar documentación:', error);
    process.exit(1);
  }
}

copyDocsToDist();
