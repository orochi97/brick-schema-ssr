import koaCors from '@koa/cors';
import Koa from 'koa';
import koaMount from 'koa-mount';
import koaRouter from 'koa-router';
import koaStatic from 'koa-static';

import { clientDir, getSchemas } from './app/common';
import reactApp from './app/react';
import solidApp from './app/solid';
import vueApp from './app/vue';

const PORT = 3000;

const app = new Koa();

const router = new koaRouter({ prefix: '/api' });

app.use(
  koaCors({
    origin(ctx) {
      return ctx.get('Origin') || '*';
    },
  }),
);

router.get('/schemas', async (ctx) => {
  const schemas = await getSchemas();
  ctx.body = schemas;
});

router.get('/options', async (ctx) => {
  ctx.body = [
    { value: 'beijing', label: 'beijing' },
    { value: 'shanghai', label: 'shanghai' },
    { value: 'guangzhou', label: 'guangzhou' },
    { value: 'shenzhen', label: 'shenzhen' },
  ];
});

router.get('/image', async (ctx) => {
  ctx.body = {
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  };
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
    http://localhost:${PORT}/ssr/solid`,
  );
});
