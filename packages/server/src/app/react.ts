import fs from 'node:fs';
import path from 'node:path';

import Koa from 'koa';

import { clientDir, getSchemas, isDev } from './common';

const app = new Koa();

app.use(async (ctx) => {
  const schemas = await getSchemas();

  let renderToString;

  if (isDev) {
    const { createServer } = await import('vite');
    const react = (await import('@vitejs/plugin-react')).default;
    const vite = await createServer({
      plugins: [react()],
      appType: 'custom',
    });
    const { RenderSdk } = await vite.ssrLoadModule('@brick/react');
    const sdk = new RenderSdk({ schemas });

    renderToString = sdk.renderToString;
  } else {
    renderToString = (await import('@/lib/react')).renderToString;
  }

  const htmlPath = path.resolve(clientDir, 'react/index.html');
  const htmlStr = fs.readFileSync(htmlPath, 'utf-8');

  const { domText } = await renderToString(schemas);

  ctx.type = 'html';
  ctx.body = htmlStr.replace('<!-- APP -->', domText);
});

export default app;
