import fs from 'fs/promises';
import path from 'node:path';
import Koa from 'koa';

import { isDev, clientDir, getSchemas } from './common';

const app = new Koa();

app.use(async (ctx) => {
  const schemas = await getSchemas();

  let renderToString;

  if (isDev) {
    const { createServer } = await import('vite');
    const vue = (await import('@vitejs/plugin-vue')).default;
    const vueJsx = (await import('@vitejs/plugin-vue-jsx')).default;
    const vite = await createServer({
      plugins: [vue(), vueJsx()],
      appType: 'custom',
    });
    const { RenderSdk } = await vite.ssrLoadModule('@brick/vue');
    const sdk = new RenderSdk({ schemas });

    renderToString = sdk.renderToString;
  } else {
    renderToString = (await import('@/lib/vue')).renderToString;
  }

  const htmlPath = path.resolve(clientDir, 'vue/index.html');
  const htmlStr = await fs.readFile(htmlPath, 'utf-8');

  const { domText } = await renderToString(schemas);

  ctx.type = 'html';
  ctx.body = htmlStr.replace('<!-- APP -->', domText);
});

export default app;