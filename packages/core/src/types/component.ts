import { ValueOf } from '.';

export type Styles = StyleValue;

export type Classes = string[];

export type BaseValue = number | string;

type BaseCompProps<T extends object> = {
  id: number;
  styles: Styles;
  classes: Classes;
} & T;

export type ButtonKind = 'primary' | 'success' | 'danger' | 'default';

export type ButtonProps = BaseCompProps<{
  props: {
    label?: string;
    type?: ButtonKind;
    onClick?: (() => void) | string;
  };
}>;

export type CheckboxProps = BaseCompProps<{
  props: {
    options: { value: BaseValue; label: string; disabled?: boolean }[];
    onChange?: ((value: BaseValue[]) => void) | string;
  };
  value?: BaseValue[];
}>;

export type ImageProps = BaseCompProps<{
  props: {
    src: string;
    width?: number;
    height?: number;
    onClick?: (() => void) | string;
  };
}>;

export type RadioProps = BaseCompProps<{
  props: {
    options: { value: BaseValue; label: string; disabled?: boolean }[];
    onChange?: ((value: BaseValue) => void) | string;
  };
  value?: BaseValue;
}>;

export type SelectProps = BaseCompProps<{
  props: {
    options: { value: BaseValue; label: string; disabled?: boolean }[];
    onChange?: ((value: BaseValue | undefined) => void) | string;
  };
  value?: BaseValue;
}>;

export interface ComponentProps {
  Button: ButtonProps;
  Checkbox: CheckboxProps;
  Select: SelectProps;
  Radio: RadioProps;
  Image: ImageProps;
}

export type ComponentItem = {
  [K in keyof ComponentProps]: {
    id: number;
    component: K;
  } & ComponentProps[K];
}[keyof ComponentProps];

export type UnionProps = ValueOf<{
  Button: ButtonProps['props'];
  Checkbox: CheckboxProps['props'];
  Select: SelectProps['props'];
  Radio: RadioProps['props'];
  Image: ImageProps['props'];
}>;
