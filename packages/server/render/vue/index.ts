import { type Schemas } from '@brick/core';
import { RenderSdk } from '@brick/vue';

import { render } from '../index';

export const renderToString = (schemas: Schemas) => {
  return render(RenderSdk, schemas);
};
