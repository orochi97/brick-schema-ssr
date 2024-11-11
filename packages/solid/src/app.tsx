import { useContext, createContext } from 'solid-js';
import { RenderApp, injectLibraries, type AppProps } from '@brick/core';

import { useState, useStyles } from './hooks';

injectLibraries({
  useState,
  useStyles,
  useContext,
  createContext,
});

export function App(props: AppProps) {
  return <RenderApp {...props} />;
}
