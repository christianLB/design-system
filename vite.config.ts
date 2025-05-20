import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isDev = command === 'serve';
  const isAnalyze = mode === 'analyze';

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      isAnalyze && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
        { find: '@components', replacement: resolve(__dirname, 'src/components') },
        { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
        { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
        { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      ],
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    build: {
      minify: isDev ? false : 'esbuild',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DesignSystem',
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
          '@emotion/react',
          '@emotion/styled',
          '@radix-ui/react-slot',
          'class-variance-authority',
          'tailwind-merge',
          'tailwindcss',
          'autoprefixer',
        ],
        output: [
          {
            dir: 'dist/esm',
            format: 'es',
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
            assetFileNames: 'assets/[name][extname]',
          },
          {
            dir: 'dist/cjs',
            format: 'cjs',
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: '[name].cjs',
            chunkFileNames: '[name].cjs',
            assetFileNames: 'assets/[name][extname]',
          },
        ],
      },
    },
  };
});
