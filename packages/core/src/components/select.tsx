import type { BaseValue, ComponentItem, SelectProps } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseValue = undefined;

const baseProps = {
  options: [],
  onChange: `return async (context) => {
    console.log('Select onchange', context)
  }`,
};

const baseStyle = {
  disabled: {
    cursor: 'not-allowed',
    color: 'gray',
  },
};

export const initSelectSchemas = <T extends object = object>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Select') {
    const props = compProps.props;
    const funBody = isString(props.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (value: BaseValue | undefined) => {
      new Function('lib', funBody)(lib)(value);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Select = ({ id, props, styles = {}, classes, value }: SelectProps) => {
  const SchemasContext = getSchemasContext();
  const { changeSchemasValue } = libraries.useContext(SchemasContext);

  const onChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const val = target.value;
    const realValue = props?.options?.find((item) => String(item.value) === val)?.value;

    if (isFunction(props?.onChange)) {
      props?.onChange?.(realValue);
    }
    changeSchemasValue(id, realValue);
  };
  return (
    <select
      style={libraries.useStyles(styles)}
      className={libraries.useClass(classes)}
      value={value}
      onChange={onChange}
    >
      {props?.options?.map(({ value: itemValue, label, disabled }) => {
        const optionStyle = Object.assign({}, disabled ? baseStyle.disabled : {});
        return (
          <option
            key={itemValue}
            value={String(itemValue)}
            selected={String(itemValue) === value}
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
