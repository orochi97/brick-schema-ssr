import { RenderSdk as ReactSdk } from '@brick/react';
import { RenderSdk as SolidSdk } from '@brick/solid';
import { RenderSdk as VueSdk } from '@brick/vue';
import i18next, { type Resource } from 'i18next';

import { createHttp } from './http';

import './index.css';

const initI18n = (langResource: Resource) => {
  let lng = new URLSearchParams(window.location.search).get('lng') || 'en';
  if (!langResource[lng]) {
    lng = 'en';
  }
  i18next.init({
    lng,
    resources: langResource,
  });
};

const http = createHttp(fetch.bind(window));

const consts = { SERVER_URL: 'http://localhost:3000' };

const store = { isLogin: false, loginText: 'notLogin' };

export const init = async (RenderSdk: typeof ReactSdk | typeof SolidSdk | typeof VueSdk) => {
  const schemas = await fetch('/api/schemas').then((res) => res.json());

  const langResource = await fetch('/api/language').then((res) => res.json());
  initI18n(langResource);

  const startTime = performance.now();

  const $root = document.getElementById('root');
  if ($root && schemas) {
    const sdk = new RenderSdk({
      schemas,
      store,
      dependency: { http, consts },
      i18n: i18next.t,
    });
    if (process.env.RENDER_TYPE === 'csr') {
      sdk.createRoot($root);
    } else if (process.env.RENDER_TYPE === 'ssr') {
      sdk.hydrateRoot($root);
    }
  }

  console.info(`render in ${process.env.RENDER_TYPE}, cost time: ${performance.now() - startTime} ms`);
};
