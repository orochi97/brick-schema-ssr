import type { ValueOf } from '..';
import type { ButtonProps } from './button';
import type { CheckboxProps } from './checkbox';
import type { ImageProps } from './image';
import type { RadioProps } from './radio';
import type { SelectProps } from './select';

export type * from './common';
export type * from './button';
export type * from './select';
export type * from './checkbox';
export type * from './image';
export type * from './radio';

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
