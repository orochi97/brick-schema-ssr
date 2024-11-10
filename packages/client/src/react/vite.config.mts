import path from 'path';
import react from '@vitejs/plugin-react';

import { genConfig } from '../config';

export default genConfig({
  base: '/react',
  define: {
    'import.meta.env.APP_TYPE': JSON.stringify('react'),
  },
  plugins: [react()],
  build: {
    outDir: path.resolve(process.cwd(), 'dist/react'),
  }
});
