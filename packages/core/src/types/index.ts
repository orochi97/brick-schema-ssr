import { type ButtonProps, type SelectProps, type CheckboxProps, type RadioProps, type ImageProps } from '../components';

export type Styles = StyleValue;

export type ValueOf<T extends object> = T[keyof T];

export type BaseValue = number | string;

export interface ComponentProps {
  Button: ButtonProps;
  Checkbox: CheckboxProps;
  Select: SelectProps;
  Radio: RadioProps;
  Image: ImageProps,
}

export type UnionProps = ValueOf<{
  Button: ButtonProps['props'];
  Checkbox: CheckboxProps['props'];
  Select: SelectProps['props'];
  Radio: RadioProps['props'];
  Image: ImageProps['props'];
}>

export type ComponentItem = {
  [K in keyof ComponentProps]: {
    id: number;
    component: K;
  } & ComponentProps[K];
}[keyof ComponentProps];

export interface Schemas {
  app: {
    init: string,
  },
  components: ComponentItem[]
}

export type SetPropsFun = (cid: number, props: UnionProps) => void;

export type SetValueFun = (cid: number, value: BaseValue) => void;

export type InjectDependentFun = (setProps: SetPropsFun, setValue: SetValueFun) => void;

export interface AppProps {
  schemas: Schemas,
  injectDependentFun: InjectDependentFun,
}