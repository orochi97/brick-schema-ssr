import { createRoot, hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { BaseSdk } from '@brick/core';

import { App } from './app';

export class RenderSdk extends BaseSdk {
  createRoot = async ($dom: HTMLElement) => {
    await this.initSchemas();

    createRoot($dom).render(<App {...this.appProps} />)
  }
  hydrateRoot = async ($dom: HTMLElement) => {
    await this.initSchemas();

    hydrateRoot($dom, <App {...this.appProps} />)
  }
  renderToString = async () => {
    await this.initSchemas();

    const domText = renderToString(<App {...this.appProps} />);

    return { domText, headerText: '' };
  }
}
