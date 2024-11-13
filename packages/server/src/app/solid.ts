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
    const solid = (await import('vite-plugin-solid')).default;
    const vite = await createServer({
      plugins: [solid({ ssr: true })],
      appType: 'custom',
    });
    const { RenderSdk } = await vite.ssrLoadModule('@brick/solid');
    const sdk = new RenderSdk({ schemas });

    renderToString = sdk.renderToString;
  } else {
    renderToString = (await import('@/lib/solid')).renderToString;
  }

  const htmlPath = path.resolve(clientDir, 'solid/index.html');
  const htmlStr = fs.readFileSync(htmlPath, 'utf-8');

  const { domText, headerText } = await renderToString(schemas);

  ctx.type = 'html';
  ctx.body = htmlStr.replace('<!-- APP -->', domText).replace('<!-- HEAD -->', headerText);
});

export default app;
