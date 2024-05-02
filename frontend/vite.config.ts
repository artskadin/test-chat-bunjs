import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dir, './src'),
    },
  },
  plugins: [react()],
  css: {
    modules: { localsConvention: 'camelCase' },
  },
});
