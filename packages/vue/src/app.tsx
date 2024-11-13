import { defineComponent } from 'vue';

import { type AppProps, injectLibraries, type Libraries, RenderApp } from '@brick/core';

import { createContext, useContext, useState } from './hooks';

injectLibraries({
  useState,
  useContext: useContext as unknown as Libraries['useContext'],
  createContext: createContext as unknown as Libraries['createContext'],
});

export const App = defineComponent({
  props: {
    schemas: {
      type: Object,
      required: true,
    },
    injectDependentFun: {
      type: Function,
      required: true,
    },
  },
  setup(props: AppProps) {
    return () => (
      <div class="app">
        <RenderApp {...props} />
      </div>
    );
  },
});
