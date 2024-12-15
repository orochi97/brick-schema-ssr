import type { ComponentItem, EventContext, ImageProps, InjectLib } from '../types';
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
    const props: ImageProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onClick) ? props?.onClick : baseProps.onClick;
    const onClick = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onClick = onClick;
    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const Image = ({ props, styles = { main: {} }, classes = {}, meta }: ImageProps) => {
  const mainStyle = Object.assign({}, baseStyle.main, 'main' in styles ? styles.main : {});

  const onClick = () => {
    if (isFunction(props?.onClick)) {
      props?.onClick({
        value: undefined,
        meta,
      });
    }
  };

  return (
    <img
      src={props?.src}
      width={props?.width}
      height={props?.height}
      style={libraries.useStyles(mainStyle)}
      className={libraries.useClasses(classes, meta?.data)}
      onClick={onClick}
    />
  );
};
