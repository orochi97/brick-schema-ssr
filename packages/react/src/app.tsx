import { createContext, useContext, useState } from 'react';

import { type AppProps, injectLibraries, type Libraries, RenderApp } from '@brick/core';

injectLibraries({
  useState,
  useContext: useContext as unknown as Libraries['useContext'],
  createContext: createContext as unknown as Libraries['createContext'],
});

export function App(props: AppProps) {
  return <RenderApp {...props} />;
}
