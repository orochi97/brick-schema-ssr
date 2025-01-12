import fs from 'node:fs';
import path from 'node:path';

import { type Schemas } from '@brick/core';
import { type Resource } from 'i18next';

const HEAD_MARK = '<!-- HEAD -->';
const STYLE_MARK = '<!-- STYLE -->';
const APP_MARK = '<!-- APP -->';

export const isDev = process.env.NODE_ENV === 'development';

export const clientDir = path.resolve(process.cwd(), '../client/dist');

function sleep(time = 200) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getSchemas = async () => {
  await sleep(200);
  delete require.cache[require.resolve('../schemas')];
  const { schemas } = await import('../schemas');
  return schemas;
};

export const getLangResource = async () => {
  await sleep(200);
  delete require.cache[require.resolve('../schemas')];
  const { langResource } = await import('../schemas');
  return langResource;
};

export const renderHtmlString = async (
  schemas: Schemas,
  type: 'react' | 'vue' | 'solid',
  renderToString: RenderToString,
  langResource: Resource,
  lng: string,
) => {
  const htmlPath = path.resolve(clientDir, `${type}/index.html`);
  const htmlStr = fs.readFileSync(htmlPath, 'utf-8');

  const { appText, headText, styleText } = await renderToString(schemas, langResource, lng);

  return htmlStr.replace(HEAD_MARK, headText).replace(STYLE_MARK, styleText).replace(APP_MARK, appText);
};
