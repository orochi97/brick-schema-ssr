import { type Styles } from '../types';

export type Context<T> = {
  id: symbol,
  Provider: JSX.Element,
  defaultValue: T|undefined,
}

export interface Libraries {
  useState: <T extends object, >(s: T) => [T, (f: (s: T) => T) => void];
  useContext: any;
  createContext: any;
  useStyles: (s: Styles) => Styles;
};

export const libraries: Libraries = {
  useState: (s) => [s, (s) => {}],
  useContext: () => {},
  createContext: () => {},
  useStyles: (s: Styles) => s,
};

export const injectLibraries = (lib: Partial<Libraries>) => {
  Object.assign(libraries, lib);
};