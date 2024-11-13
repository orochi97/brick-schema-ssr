import type { ComponentItem, Styles } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

export interface ImageProps {
  id: number;
  props: {
    src: string;
    width?: number;
    height?: number;
    onClick?: (() => void) | string;
  };
  styles: Styles;
}

const baseProps = {
  onClick: `return async () => {
    console.log('Image onClick')
  }`,
};

const baseStyle = {
  image: {},
};

export const initImageSchemas = <T extends object = object>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Image') {
    const props = compProps.props || (structuredClone(baseProps) as typeof baseProps);
    const funBody = isString(props?.onClick) ? props?.onClick : baseProps.onClick;
    const onClick = () => {
      new Function('lib', funBody)(lib)();
    };
    props.onClick = onClick;
    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const Image = ({ props, styles = {} }: ImageProps) => {
  const imageStyles = Object.assign({}, baseStyle.image, styles);

  const onClick = () => {
    if (isFunction(props?.onClick)) {
      props?.onClick();
    }
  };

  return (
    <img
      src={props?.src}
      width={props?.width}
      height={props?.height}
      style={libraries.useStyles(imageStyles)}
      onClick={onClick}
    />
  );
};
