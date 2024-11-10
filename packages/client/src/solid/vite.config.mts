import path from 'path';
import solid from 'vite-plugin-solid';

import { genConfig } from '../config';

export default genConfig({
  base: '/solid',
  define: {
    'import.meta.env.APP_TYPE': JSON.stringify('solid'),
  },
  plugins: [solid({ dev: true })],
  build: {
    outDir: path.resolve(process.cwd(), 'dist/solid'),
  }
});
