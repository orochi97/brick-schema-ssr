import Koa from 'koa';

import { getSchemas, isDev, renderHtmlString } from './common';

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
    renderToString = (await vite.ssrLoadModule('render/vue')).renderToString;
  } else {
    renderToString = (await import('@/lib/vue')).renderToString;
  }

  ctx.type = 'html';
  ctx.body = await renderHtmlString(schemas, 'vue', renderToString);
});

export default app;
