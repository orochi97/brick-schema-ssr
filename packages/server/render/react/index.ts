import { RenderSdk } from '@brick/react'

export const renderToString = (schemas) => {
  const sdk = new RenderSdk({ schemas });

  return sdk.renderToString();
}