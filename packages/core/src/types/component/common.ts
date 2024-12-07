export type BaseStyles = StyleValue;

export type BaseClasses = Record<string, string | boolean>;

export type ClassNames = string[];

export type BaseValue = number | string;

export type BaseOption = { value: BaseValue; label: string; disabled?: boolean };

export type BaseObject = Record<string, unknown>;

type ComponentValue = BaseValue | BaseValue[] | BaseOption[] | undefined;

export type BaseCompProps<T extends object, S extends string> = {
  id: number;
  styles: Record<S, BaseStyles>;
  classes: BaseClasses;
  extern?: {
    dataMap?: BaseObject;
  };
  meta?: EventContext['meta'];
} & T;

export interface EventContext {
  value: ComponentValue;
  meta: {
    index: number;
    data: BaseObject;
  };
}
