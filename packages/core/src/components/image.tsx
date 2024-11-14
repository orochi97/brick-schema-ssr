import type { ComponentItem, ImageProps } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

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
    const props = compProps.props;
    const funBody = isString(props.onClick) ? props?.onClick : baseProps.onClick;
    const onClick = () => {
      new Function('lib', funBody)(lib)();
    };
    props.onClick = onClick;
    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const Image = ({ props, styles = {}, classes }: ImageProps) => {
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
      className={libraries.useClass(classes)}
      onClick={onClick}
    />
  );
};
