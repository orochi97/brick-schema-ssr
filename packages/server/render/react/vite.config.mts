import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    lib: {
      entry: './index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [/^react/]
    },
    outDir: path.resolve(process.cwd(), 'lib/react'),
    emptyOutDir: true,
  }
});