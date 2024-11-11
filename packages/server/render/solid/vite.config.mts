import path from 'node:path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  root: __dirname,
  plugins: [solid({ ssr: true })],
  build: {
    lib: {
      entry: './index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [/^solid/],
    },
    outDir: path.resolve(process.cwd(), 'lib/solid'),
    emptyOutDir: true,
  },
});
