import type { BaseStyles, ButtonProps, ComponentItem, EventContext, InjectLib } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseProps = {
  disabled: false,
  label: 'button',
  type: 'default',
  onClick: `return async (context) => {
    console.info('Button onClick', context);
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
    const props: ButtonProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onClick) ? props.onClick : baseProps.onClick;
    const onClick = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onClick = onClick;
    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const Button = ({ props, styles = { main: {} }, classes = {}, meta }: ButtonProps) => {
  const mainStyle: BaseStyles = Object.assign(
    {},
    baseStyle.main,
    baseStyle[props?.type || 'default'],
    props.disabled ? baseStyle.disabled : {},
    styles.main,
  );

  const SchemasContext = getSchemasContext();
  const { store } = libraries.useContext(SchemasContext);

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
      className={libraries.useClasses(classes, meta?.data, store)}
      onClick={onClick}
    >
      {libraries.useI18n(props?.label || baseProps.label, Object.assign({}, meta?.data, store))}
    </button>
  );
};
