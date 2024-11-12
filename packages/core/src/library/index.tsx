import { type Styles, type Libraries, type Context } from '../types';

export const libraries: Libraries = {
  useState: <T,>(s: T) => [s, (f: (d: T) => T) => f(s)],
  useContext: <T,>(s: Context<T>) => s.defaultValue,
  createContext: <T,>(s: T) => {
    return {
      id: Symbol('KEY'),
      Provider: () => <></>,
      defaultValue: s,
    };
  },
  useStyles: (s: Styles) => s,
};

export const injectLibraries = (lib: Partial<Libraries>) => {
  Object.assign(libraries, lib);
};
