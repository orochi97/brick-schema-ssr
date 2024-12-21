import type { ComponentItem, EventContext, InjectLib, SelectProps } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseValue = undefined;

const baseProps = {
  options: [],
  onChange: `return async (context) => {
    console.info('Select onchange', context)
  }`,
};

const baseStyle = {
  disabled: {
    cursor: 'not-allowed',
    color: 'gray',
  },
};

export const initSelectSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'Select') {
    const props: SelectProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Select = ({ id, props, styles = { main: {} }, classes = {}, meta, value }: SelectProps) => {
  const mainStyle = Object.assign({}, styles.main);

  const SchemasContext = getSchemasContext();
  const { changeSchemasValue, store } = libraries.useContext(SchemasContext);

  const onChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const val = target.value;
    const newVal = props?.options?.find((item) => String(item.value) === val)?.value;

    if (isFunction(props?.onChange)) {
      props?.onChange?.({ value: newVal, meta });
    }
    changeSchemasValue(id, newVal);
  };
  return (
    <select
      style={libraries.useStyles(mainStyle)}
      className={libraries.useClasses(classes, meta?.data, store)}
      value={value}
      onChange={onChange}
    >
      {props?.options?.map(({ value: itemValue, label, disabled }) => {
        const optionStyle = Object.assign({}, disabled ? baseStyle.disabled : {});
        return (
          <option
            key={itemValue}
            value={String(itemValue)}
            // selected={String(itemValue) === value} react 会报错建议用 select value 赋值，但是 solid 仅使用 select value 会不生效
            disabled={disabled}
            style={libraries.useStyles(optionStyle)}
          >
            {label}
          </option>
        );
      })}
    </select>
  );
};
