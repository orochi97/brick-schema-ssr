import { createContext, useContext } from 'solid-js';

import { type AppProps, injectLibraries, type Libraries, RenderApp } from '@brick/core';

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
