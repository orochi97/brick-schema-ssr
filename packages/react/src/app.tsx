import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { type AppProps, injectLibraries, type Libraries, RenderApp } from '@brick/core';

injectLibraries({
  useRef,
  useState,
  useEffect,
  useContext: useContext as unknown as Libraries['useContext'],
  createContext: createContext as unknown as Libraries['createContext'],
});

export function App(props: AppProps) {
  return <RenderApp {...props} />;
}
