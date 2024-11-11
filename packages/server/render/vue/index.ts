import { RenderSdk } from '@brick/vue';

export const renderToString = (schemas) => {
  const sdk = new RenderSdk({ schemas });

  return sdk.renderToString();
};
