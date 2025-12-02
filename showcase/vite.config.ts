import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: __dirname,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../showcase-dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5555,
  },
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion', 'react', 'react-dom'],
  },
});
