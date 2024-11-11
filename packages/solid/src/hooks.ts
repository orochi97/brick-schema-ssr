import { createStore, produce } from 'solid-js/store';
import { type Styles, type ValueOf } from '@brick/core';

export const useState = <T extends object>(initState: T) => {
  const [state, set] = createStore<T>(initState);

  const setState = (fun: (s: T) => T) => {
    set(produce(fun));
  };

  return [state, setState] as [T, (f: (s: T) => T) => void];
};

export const useStyles = (styles: Styles) => {
  const newStyles: Record<string, ValueOf<Styles>> = {};

  for (const key in styles) {
    const newKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    newStyles[newKey] = styles[key];
  }

  return newStyles;
};
