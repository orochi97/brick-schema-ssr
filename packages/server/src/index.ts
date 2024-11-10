import Koa from 'koa';
import koaRouter from 'koa-router';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';

import { clientDir, getSchemas } from './app/common';
import reactApp from './app/react';
import vueApp from './app/vue';
import solidApp from './app/solid';

const PORT = 3000;

const app = new Koa();

const router = new koaRouter({ prefix: '/api' });

router.get('/schemas', async (ctx) => {
  const schemas = await getSchemas();
  ctx.body = schemas;
});

app.use(koaStatic(clientDir));

app.use(router.routes());

app.use(koaMount('/ssr/react', reactApp));
app.use(koaMount('/ssr/vue', vueApp));
app.use(koaMount('/ssr/solid', solidApp));

app.listen(PORT, () => {
  console.info(
    `Server listening on port ${PORT}:
    http://localhost:${PORT}/ssr/react
    http://localhost:${PORT}/ssr/vue
    http://localhost:${PORT}/ssr/solid`
  );
});
