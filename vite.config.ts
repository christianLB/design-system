import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

  const isProduction = mode === 'production';
  
  // Base configuration
  const config: UserConfig = {
    plugins: [
      react({
        // React plugin options (fastRefresh is enabled by default)
      }),
    ],
    resolve: {
      alias: [
        { find: '@components', replacement: path.resolve(__dirname, './components') },
        { find: '@lib', replacement: path.resolve(__dirname, './lib') },
      ],
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    // Environment variables and build settings
    define: {
      'process.env': {},
      'process.env.NODE_ENV': JSON.stringify(mode || 'development'),

    },
  };
  
  // Development server configuration
  if (!isProduction) {
    config.server = {
      fs: {
        allow: [path.resolve(__dirname, '.'), path.resolve(__dirname, 'demo')],
      },
      cors: true,
      open: false,
      hmr: {
        overlay: true,
      },
      proxy: {},
    };
    // NOTE: To view your demo, open http://localhost:5173/demo/index.html in your browser.
  }
  
  // Production build configuration
  if (isProduction) {
    config.base = env.VITE_BASE_URL || '/';
    config.build = {
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: path.resolve(__dirname, './components/index.ts'),
        name: 'DesignSystem',
        formats: ['es', 'cjs'],
        fileName: (format) => `design-system.${format}.js`,
      },
      sourcemap: !!process.env.SOURCE_MAP,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
        ],
      },
      cssCodeSplit: true,
      target: 'esnext',
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      modulePreload: {
        polyfill: false,
      },
    };
  }
  
  // Optimize dependencies for faster builds
  config.optimizeDeps = {
    include: ['react', 'react-dom'],
    // Force dependency pre-bundling in development
    force: mode === 'development',

  };
  
  return config;
});
