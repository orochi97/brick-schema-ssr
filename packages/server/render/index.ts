import { createHttp } from '@brick/client/http';
import { type Schemas } from '@brick/core';
import { type RenderSdk as ReactSdk } from '@brick/react';
import { type RenderSdk as SolidSdk } from '@brick/solid';
import { type RenderSdk as VueSdk } from '@brick/vue';
import i18next, { type Resource } from 'i18next';
import fetch from 'node-fetch';

const initI18n = (langResource: Resource, lng: string) => {
  if (!langResource[lng]) {
    lng = 'en';
  }
  i18next.init({
    lng,
    resources: langResource,
  });
};

const http = createHttp(fetch);

const consts = { SERVER_URL: 'http://localhost:3000' };

const store = { isLogin: false, loginText: 'notLogin' };

export const render = (
  RenderSdk: typeof ReactSdk | typeof SolidSdk | typeof VueSdk,
  schemas: Schemas,
  langResource: Resource,
  lng: string,
) => {
  initI18n(langResource, lng);

  const sdk = new RenderSdk({ schemas, store, dependency: { http, consts }, i18n: i18next.t });

  return sdk.renderToString();
};
