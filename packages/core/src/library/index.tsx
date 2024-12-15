import { clsx } from 'clsx';

import { type Context, type Libraries } from '../types';
import { isString } from '../utils';

export const libraries: Libraries = {
  useRef: () => ({ current: undefined }),
  useState: <T,>(s: T) => [s, (f: (d: T) => T) => f(s)],
  useEffect: () => {},
  useContext: <T,>(s: Context<T>) => s.defaultValue,
  createContext: <T,>(s: T) => {
    return {
      id: Symbol('KEY'),
      Provider: () => <></>,
      defaultValue: s,
    };
  },
  useStyles: (s) => s,
  useClasses: (cls, data = {}) => {
    if (cls) {
      const newCls = { ...cls };
      for (const key in cls) {
        if (isString(cls[key])) {
          newCls[key] = !!data[cls[key]];
        }
      }
      return clsx(newCls);
    }
    return '';
  },
};

export const injectLibraries = (lib: Partial<Libraries>) => {
  Object.assign(libraries, lib);
};
