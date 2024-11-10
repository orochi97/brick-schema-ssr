import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { genConfig } from '../config';

export default genConfig({
  base: '/vue',
  define: {
    'import.meta.env.APP_TYPE': JSON.stringify('vue'),
  },
  plugins: [vue(), vueJsx()],
  build: {
    outDir: path.resolve(process.cwd(), 'dist/vue'),
  }
});
