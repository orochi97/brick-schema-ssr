import Koa from 'koa';

import { getSchemas, isDev, renderHtmlString } from './common';

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
    renderToString = (await vite.ssrLoadModule('render/react')).renderToString;
  } else {
    renderToString = (await import('@/lib/react')).renderToString;
  }

  ctx.type = 'html';
  ctx.body = await renderHtmlString(schemas, 'react', renderToString);
});

export default app;
