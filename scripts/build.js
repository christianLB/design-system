import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

async function cleanDist() {
  console.log('Cleaning dist directory...');
  await fs.remove(distDir);
  await fs.ensureDir(distDir);
}

async function buildPackage() {
  console.log('Building package...');
  
  try {
    // Clean the dist directory
    await fs.remove(distDir);
    await fs.ensureDir(distDir);

    // Generate type declarations
    console.log('Generating type declarations...');
    execSync('tsc --emitDeclarationOnly --outDir dist/types', { stdio: 'inherit' });

    // Build the library using Vite in library mode
    console.log('Building library...');
    await build({
      mode: 'lib',
      configFile: 'vite.config.ts',
      build: {
        outDir: 'dist',
        lib: {
          entry: 'src/index.ts',
          name: 'DesignSystem',
          formats: ['es', 'cjs']
        },
        sourcemap: true,
        minify: true,
        reportCompressedSize: true
      }
    });

    // Copy package.json with only necessary fields
    const packageJson = require('../package.json');
    const { dependencies = {}, peerDependencies = {} } = packageJson;
    
    // Filter out devDependencies from dependencies
    const productionDependencies = Object.keys(dependencies).reduce((acc, key) => {
      if (!peerDependencies[key]) {
        acc[key] = dependencies[key];
      }
      return acc;
    }, {});

    const minimalPackageJson = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      main: './cjs/index.cjs',
      module: './esm/index.js',
      types: './types/index.d.ts',
      sideEffects: false,
      files: ['cjs', 'esm', 'types'],
      exports: {
        '.': {
          types: './types/index.d.ts',
          import: './esm/index.js',
          require: './cjs/index.cjs',
        },
        './*': {
          types: './types/*.d.ts',
          import: './esm/*.js',
          require: './cjs/*.cjs',
        },
      },
      peerDependencies,
      peerDependenciesMeta: packageJson.peerDependenciesMeta,
      dependencies: productionDependencies,
      keywords: packageJson.keywords,
      author: packageJson.author,
      license: packageJson.license,
      repository: packageJson.repository,
      bugs: packageJson.bugs,
      homepage: packageJson.homepage
    };

    // Create the minimal package.json in dist
    await fs.writeJson(join(distDir, 'package.json'), minimalPackageJson, { spaces: 2 });
    
    // Copy README and LICENSE
    await Promise.all([
      fs.copyFile(join(rootDir, 'README.md'), join(distDir, 'README.md')).catch(() => {}),
      fs.copyFile(join(rootDir, 'LICENSE'), join(distDir, 'LICENSE')).catch(() => {})
    ]);

    console.log('Build complete!');
    console.log('Output directory:', distDir);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

async function main() {
  try {
    await cleanDist();
    await buildPackage();
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();
