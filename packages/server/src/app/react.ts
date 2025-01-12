import Koa from 'koa';

import { getLangResource, getSchemas, isDev, renderHtmlString } from './common';

const app = new Koa();

app.use(async (ctx) => {
  const schemas = await getSchemas();
  const langResource = await getLangResource();

  let renderToString;

  if (isDev) {
    const { createServer } = await import('vite');
    const react = (await import('@vitejs/plugin-react')).default;
    const vite = await createServer({
      plugins: [react()],
      appType: 'custom',
    });
    renderToString = (await vite.ssrLoadModule('render/react')).renderToString;
  } else {
    renderToString = (await import('@/lib/react')).renderToString;
  }

  const lng = Array.isArray(ctx.query.lng) ? ctx.query.lng[0] : ctx.query.lng;

  ctx.type = 'html';
  ctx.body = await renderHtmlString(schemas, 'react', renderToString, langResource, lng || 'en');
});

export default app;
