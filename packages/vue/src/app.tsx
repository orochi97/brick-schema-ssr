import { defineComponent } from 'vue';
import { RenderApp, injectLibraries, type AppProps } from '@brick/core';

import { useState, useContext, createContext } from './hooks';

injectLibraries({
  useState,
  useContext,
  createContext,
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
