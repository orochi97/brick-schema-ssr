export type ID = number | undefined;

export type BaseStyles = StyleValue;

export type BaseClasses = Record<string, string | boolean>;

export type ClassNames = string[];

export type BaseValue = number | string;

export type BaseOption = { value: BaseValue; label: string; disabled?: boolean };

export type BaseObject = Record<string, unknown>;

type ComponentValue = BaseValue | BaseValue[] | BaseOption[] | undefined;

export interface ContextMeta {
  index: number;
  data: BaseObject;
}

export interface EventContext {
  value: ComponentValue;
  meta: ContextMeta;
}

export type BaseCompProps<T extends object, S extends string, D extends string> = {
  id?: ID;
  styles?: {
    [K in S]?: BaseStyles;
  };
  classes?: BaseClasses;
  extern?: {
    dataMap?: {
      [K in D]?: string;
    };
  };
  meta?: ContextMeta;
} & T;
