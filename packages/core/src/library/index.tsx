import { type Context, type Libraries } from '../types';

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
  useStyles: (s) => s,
  useClass: (cls) => {
    if (cls) {
      return cls.join(' ');
    }
    return '';
  },
};

export const injectLibraries = (lib: Partial<Libraries>) => {
  Object.assign(libraries, lib);
};
