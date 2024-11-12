import { useState, createContext, useContext } from 'react';
import { RenderApp, injectLibraries, type AppProps, type Libraries } from '@brick/core';

injectLibraries({
  useState,
  useContext: useContext as unknown as Libraries['useContext'],
  createContext: createContext as unknown as Libraries['createContext'],
});

export function App(props: AppProps) {
  return <RenderApp {...props} />;
}
