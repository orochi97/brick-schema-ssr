import { createApp, createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';

import { BaseSdk } from '@brick/core';

import { App } from './app';

export class RenderSdk extends BaseSdk {
  createRoot = async ($dom: HTMLElement) => {
    await this.initSchemas();

    this.insertCss();

    createApp(App, { ...this.appProps }).mount($dom);
  };
  hydrateRoot = async ($dom: HTMLElement) => {
    await this.initSchemas();

    createSSRApp(App, { ...this.appProps }).mount($dom);
  };
  renderToString = async () => {
    await this.initSchemas();

    const styleText = this.genStyle();
    const appText = await renderToString(createSSRApp(App, { ...this.appProps }));

    return { headText: '', styleText, appText };
  };
}
