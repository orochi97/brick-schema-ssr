import type {
  BaseClasses,
  BaseObject,
  BaseStyles,
  BaseValue,
  ClassNames,
  ComponentItem,
  UnionProps,
} from './component';

export type * from './component';

export type FunType = (...p: unknown[]) => unknown;

export type ValueOf<T extends object> = T[keyof T];

export type Context<T> = {
  id: symbol;
  Provider: () => JSX.Element;
  defaultValue: T;
};

export interface Libraries {
  useRef: <T extends object>(s: T | null) => { current: T | undefined };
  useState: <T extends object>(s: T) => [T, (f: (s: T) => T) => void];
  useEffect: (fun: () => void, deps?: unknown[]) => void;
  useContext: <T>(c: Context<T>) => T;
  createContext: <T>(defaultValue: T) => Context<T>;
  useStyles: (s: BaseStyles) => BaseStyles;
  useClasses: (c: BaseClasses, data?: BaseObject) => string;
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

export type SetClassFun = (id: number, classNames: ClassNames) => void;

export type FindComp = (id: number) => ComponentItem | undefined;

export type InjectDependentFun = (p: {
  findComp: FindComp;
  setProps: SetPropsFun;
  setValue: SetValueFun;
  addClasses: SetClassFun;
  removeClasses: SetClassFun;
}) => void;

export interface AppProps {
  schemas: Schemas;
  injectDependentFun: InjectDependentFun;
}

export interface SdkConstructorParams {
  schemas: Schemas;
  dependency: BaseObject;
}

type Relation = {
  parent: {
    parent: Relation['parent'];
    data: ComponentItem | null;
  } | null;
  self: ComponentItem | null;
};

export type InjectLib = { sys: Parameters<InjectDependentFun>[number] } & SdkConstructorParams['dependency'] & Relation;
