import Koa from 'koa';

import { getLangResource, getSchemas, isDev, renderHtmlString } from './common';

const app = new Koa();

app.use(async (ctx) => {
  const schemas = await getSchemas();
  const langResource = await getLangResource();

  let renderToString;

  if (isDev) {
    const { createServer } = await import('vite');
    const solid = (await import('vite-plugin-solid')).default;
    const vite = await createServer({
      plugins: [solid({ ssr: true })],
      appType: 'custom',
    });
    renderToString = (await vite.ssrLoadModule('render/solid')).renderToString;
  } else {
    renderToString = (await import('@/lib/solid')).renderToString;
  }

  const lng = Array.isArray(ctx.query.lng) ? ctx.query.lng[0] : ctx.query.lng;

  ctx.type = 'html';
  ctx.body = await renderHtmlString(schemas, 'solid', renderToString, langResource, lng || 'en');
});

export default app;
