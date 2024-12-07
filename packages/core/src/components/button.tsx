import type { ButtonProps, ComponentItem, InjectLib } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseProps = {
  label: 'Button',
  type: 'default',
  onClick: `return async (context) => {
    console.info('button onClick', context);
  }`,
};

const baseStyle = {
  main: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '6px 10px',
    cursor: 'pointer',
  },
  primary: {
    backgroundColor: '#1677ff',
    color: 'white',
    borderColor: '#1677ff',
  },
  success: {
    backgroundColor: '#52c41a',
    color: 'white',
    borderColor: '#52c41a',
  },
  danger: {
    backgroundColor: '#f5222d',
    color: 'white',
    borderColor: '#f5222d',
  },
  default: {
    backgroundColor: 'white',
  },
  disabled: {
    borderColor: '#ccc',
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
};

export const initButtonSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'Button') {
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

export const Button = ({ props, styles = { main: {} }, classes, meta }: ButtonProps) => {
  const mainStyle = Object.assign(
    {},
    baseStyle.main,
    baseStyle[props?.type || 'default'],
    props.disabled ? baseStyle.disabled : {},
    styles.main,
  );

  const onClick = () => {
    if (isFunction(props?.onClick)) {
      props?.onClick({
        value: undefined,
        meta,
      });
    }
  };

  return (
    <button
      disabled={props.disabled}
      style={libraries.useStyles(mainStyle)}
      className={libraries.useClass(classes, meta?.data)}
      onClick={onClick}
    >
      {props?.label || 'Button'}
    </button>
  );
};
