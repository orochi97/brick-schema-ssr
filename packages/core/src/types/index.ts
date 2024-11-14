import type { BaseValue, Classes, ComponentItem, Styles, UnionProps } from './component';

export type * from './component';

export type FunType = (...p: unknown[]) => unknown;

export type ValueOf<T extends object> = T[keyof T];

export type Context<T> = {
  id: symbol;
  Provider: () => JSX.Element;
  defaultValue: T;
};

export interface Libraries {
  useState: <T extends object>(s: T) => [T, (f: (s: T) => T) => void];
  useContext: <T>(c: Context<T>) => T;
  createContext: <T>(defaultValue: T) => Context<T>;
  useStyles: (s: Styles) => Styles;
  useClass: (c: Classes) => string;
}

export interface Schemas {
  app: {
    init: string;
  };
  css: string;
  components: ComponentItem[];
}

export type SetPropsFun = (id: number, props: UnionProps) => void;

export type SetValueFun = (id: number, value?: BaseValue | BaseValue[]) => void;

export type SetClassFun = (id: number, className: Classes[number]) => void;

export type InjectDependentFun = (
  setProps: SetPropsFun,
  setValue: SetValueFun,
  addClass: SetClassFun,
  removeClass: SetClassFun,
) => void;

export interface AppProps {
  schemas: Schemas;
  injectDependentFun: InjectDependentFun;
}
