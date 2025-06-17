import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.build.json'),
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@k2600x/design-system',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
        // Asset file names, including CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'design-system.css'; // Output a single, predictably named CSS file
          }
          return assetInfo.name ?? 'assets/[name]-[hash][extname]'; // Keep original names for other assets like fonts/images
        },
      },
    },
    // Ensure the dist/types directory from tsc is not cleared if dts plugin doesn't handle it all
    // emptyOutDir: false, // This might be needed if tsc runs separately and its output needs to be preserved.
                         // However, vite-plugin-dts should handle type generation.
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
