import { clsx } from 'clsx';

import { type Context, type Libraries } from '../types';
import { isString } from '../utils';

const reverseValue = (val: boolean, isOpposite: boolean) => {
  return isOpposite ? !val : val;
};

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
  useClasses: (cls, data = {}, store = {}) => {
    if (cls) {
      const newCls = { ...cls };
      for (const key in cls) {
        let value = cls[key];
        if (isString(value)) {
          const isOpposite = value.startsWith('!');
          if (isOpposite) {
            value = value.slice(1);
          }
          if (value in data) {
            newCls[key] = reverseValue(!!data[value], isOpposite);
          } else if (value in store) {
            newCls[key] = reverseValue(!!store[value], isOpposite);
          }
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
