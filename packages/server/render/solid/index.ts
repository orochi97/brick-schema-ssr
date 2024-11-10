import { RenderSdk } from '@brick/solid';

export const renderToString = (schemas) => {
  const sdk = new RenderSdk({ schemas });

  return sdk.renderToString();
}