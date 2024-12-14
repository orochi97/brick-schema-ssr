import type { BaseStyles, ComponentItem, EventContext, InjectLib, TextProps } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseProps = {
  label: 'Text',
  onClick: `return async (context) => {
    console.info('Text onClick', context);
  }`,
};

const baseStyle = {
  main: {},
};

export const initTextSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'Text') {
    const props: TextProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onClick) ? props.onClick : baseProps.onClick;
    const onClick = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onClick = onClick;
    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const Text = ({ props, styles = { main: {} }, classes = {}, meta }: TextProps) => {
  const mainStyle: BaseStyles = Object.assign({}, baseStyle.main, styles.main);

  const onClick = () => {
    if (isFunction(props?.onClick)) {
      props?.onClick({
        value: undefined,
        meta,
      });
    }
  };

  return (
    <div style={libraries.useStyles(mainStyle)} className={libraries.useClass(classes, meta?.data)} onClick={onClick}>
      {props?.label || baseProps.label}
    </div>
  );
};
