import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: './index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [/^vue/],
    },
    outDir: path.resolve(process.cwd(), 'lib/vue'),
    emptyOutDir: true,
  },
});
