import Koa from 'koa';

import { getLangResource, getSchemas, isDev, renderHtmlString } from './common';

const app = new Koa();

app.use(async (ctx) => {
  const schemas = await getSchemas();
  const langResource = await getLangResource();

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

  const lng = Array.isArray(ctx.query.lng) ? ctx.query.lng[0] : ctx.query.lng;

  ctx.type = 'html';
  ctx.body = await renderHtmlString(schemas, 'vue', renderToString, langResource, lng || 'en');
});

export default app;
