import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';

// Read package.json to get dependencies
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default defineConfig([
  // JavaScript bundles
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: false, // Disable for now until TS issues are resolved
    splitting: false,
    sourcemap: true,
    clean: true,
    external: [
      // Peer dependencies
      ...Object.keys(pkg.peerDependencies || {}),
      // Dependencies that should be bundled with the component library
      // but external to prevent duplication
      'react',
      'react-dom',
      'react/jsx-runtime',
      // External CSS imports - will be ignored in JS bundles
      '../index.css',
      './index.css',
    ],
    esbuildOptions(options) {
      options.jsx = 'automatic';
      options.banner = {
        js: '"use client";',
      };
    },
    onSuccess: 'echo "✅ Build completed successfully!"',
    minify: process.env.NODE_ENV === 'production',
    treeshake: true,
    target: 'es2020',
    outDir: 'dist',
  },
]);
