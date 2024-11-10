import { useState, createContext, useContext } from 'react';
import { RenderApp, injectLibraries, type AppProps } from '@brick/core';

injectLibraries({
  useState,
  useContext,
  createContext,
});

export function App(props: AppProps) {
  return <RenderApp {...props} />;
}
