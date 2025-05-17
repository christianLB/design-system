import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Simpler configuration to avoid compatibility issues
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  // Ensure Tailwind and other CSS processing works correctly
  css: {
    postcss: './postcss.config.js',
  },
  // Simplify build settings
  build: {
    sourcemap: true,
  },
  // Avoid custom server configuration that might conflict with Storybook
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
});
