import { type Schemas } from '@brick/core';
import { RenderSdk } from '@brick/solid';
import { type Resource } from 'i18next';

import { render } from '../index';

export const renderToString = (schemas: Schemas, langResource: Resource, lng: string) => {
  return render(RenderSdk, schemas, langResource, lng);
};
