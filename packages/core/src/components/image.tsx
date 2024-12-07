import type { ComponentItem, ImageProps, InjectLib } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseProps = {
  onClick: `return async (context) => {
    console.info('Image onClick', context);
  }`,
};

const baseStyle = {
  main: {},
};

export const initImageSchemas = (compProps: ComponentItem, lib: InjectLib) => {
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

export const Image = ({ props, styles = { main: {} }, classes }: ImageProps) => {
  const mainStyle = Object.assign({}, baseStyle.main, styles.main);

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
      style={libraries.useStyles(mainStyle)}
      className={libraries.useClass(classes)}
      onClick={onClick}
    />
  );
};
