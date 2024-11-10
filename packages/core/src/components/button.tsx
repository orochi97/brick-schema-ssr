import { isString, isFunction } from '../utils';
import { libraries } from '../library';
import type { Styles, ComponentItem } from '../types';

type ButtonKind = 'primary' | 'success' | 'danger' | 'default';

export interface ButtonProps {
  id: number,
  props: {
    label?: string;
    type?: ButtonKind;
    onClick?: (() => void) | string;
  },
  styles: Styles,
}

const baseProps = {
  label: 'Button',
  type: 'default',
  onClick: `return async () => {
    console.log('button onClick')
  }`
};

const baseStyle: Record<ButtonKind | 'button', Styles> = {
  button: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '6px 10px',
    cursor: 'pointer'
  },
  primary: {
    backgroundColor: '#1677ff',
    color: 'white',
    borderColor: '#1677ff'
  },
  success: {
    backgroundColor: '#52c41a',
    color: 'white',
    borderColor: '#52c41a'
  },
  danger: {
    backgroundColor: '#f5222d',
    color: 'white',
    borderColor: '#f5222d'
  },
  default: {
    backgroundColor: 'white',
  },
}

export const initButtonSchemas = <T extends object = object,>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Button') {
    const props = compProps.props || structuredClone(baseProps) as typeof baseProps;
    const funBody = isString(props?.onClick) ? props?.onClick : baseProps.onClick;
    const onClick = () => {
      (new Function('lib', funBody)(lib))();
    };
    props.onClick = onClick;
    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const Button = ({ props, styles = {} }: ButtonProps) => {
  const buttonStyle = Object.assign({}, baseStyle.button, baseStyle[props?.type || 'default'], styles )

  const onClick = () => {
    if (isFunction(props?.onClick)) {
      props?.onClick()
    }
  }

  return <button style={libraries.useStyles(buttonStyle)} onClick={onClick}>{props?.label || 'Button'}</button>
};
