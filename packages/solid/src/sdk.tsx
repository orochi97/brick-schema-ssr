import { generateHydrationScript, hydrate, render, renderToString } from 'solid-js/web';

import { BaseSdk } from '@brick/core';

import { App } from './app';

export class RenderSdk extends BaseSdk {
  createRoot = async ($dom: HTMLElement) => {
    await this.initSchemas();

    this.insertCss();

    render(() => <App {...this.appProps} />, $dom);
  };
  hydrateRoot = async ($dom: HTMLElement) => {
    await this.initSchemas();

    hydrate(() => <App {...this.appProps} />, $dom);
  };
  renderToString = async () => {
    await this.initSchemas();

    const headText = generateHydrationScript();
    const styleText = this.genStyle();
    const appText = await renderToString(() => <App {...this.appProps} />);

    return { headText, styleText, appText };
  };
}
