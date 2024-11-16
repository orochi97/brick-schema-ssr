import { createHttp } from '@brick/client/http';
import { type Schemas } from '@brick/core';
import { type RenderSdk as ReactSdk } from '@brick/react';
import { type RenderSdk as SolidSdk } from '@brick/solid';
import { type RenderSdk as VueSdk } from '@brick/vue';
import fetch from 'node-fetch';

const http = createHttp(fetch);

export const render = (RenderSdk: typeof ReactSdk | typeof SolidSdk | typeof VueSdk, schemas: Schemas) => {
  const sdk = new RenderSdk({ schemas, dependency: { http } });

  return sdk.renderToString();
};
