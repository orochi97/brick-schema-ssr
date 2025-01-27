import { RenderSdk as ReactSdk } from '@brick/react';
import { RenderSdk as SolidSdk } from '@brick/solid';
import { RenderSdk as VueSdk } from '@brick/vue';

import { createHttp } from './http';

import './index.css';

const http = createHttp(fetch.bind(window));

export const init = async (RenderSdk: typeof ReactSdk | typeof SolidSdk | typeof VueSdk) => {
  const schemas = await fetch('/api/schemas').then((res) => res.json());

  const startTime = performance.now();

  const $root = document.getElementById('root');

  if ($root && schemas) {
    const sdk = new RenderSdk({ schemas, dependency: { http } });
    if (process.env.RENDER_TYPE === 'csr') {
      sdk.createRoot($root);
    } else if (process.env.RENDER_TYPE === 'ssr') {
      sdk.hydrateRoot($root);
    }
  }

  console.info(`render in ${process.env.RENDER_TYPE}, cost time: ${performance.now() - startTime} ms`);
};
