import { useContext, createContext } from 'solid-js';
import { RenderApp, injectLibraries, type AppProps, type Libraries } from '@brick/core';

import { useState, useStyles } from './hooks';

injectLibraries({
  useState,
  useStyles,
  useContext,
  createContext: createContext as unknown as Libraries['createContext'],
});

export function App(props: AppProps) {
  return <RenderApp {...props} />;
}
