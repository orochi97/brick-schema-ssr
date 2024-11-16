import { type Schemas } from '@brick/core';
import { RenderSdk } from '@brick/solid';

import { render } from '../index';

export const renderToString = (schemas: Schemas) => {
  return render(RenderSdk, schemas);
};
