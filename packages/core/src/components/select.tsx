import { isString, isFunction } from '../utils';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import type { BaseValue, Styles, ComponentItem } from '../types';

export interface SelectProps {
  cid: number;
  props: {
    options: { value: BaseValue; label: string; disabled?: boolean }[];
    onChange?: ((value: BaseValue | undefined) => void) | string;
  };
  styles: Styles;
  value?: BaseValue;
}

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
  },
};

export const initSelectSchemas = <T extends object = object>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Select') {
    const props = compProps.props || (structuredClone(baseProps) as typeof baseProps);
    const funBody = isString(props?.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (value: BaseValue | undefined) => {
      new Function('lib', funBody)(lib)(value);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Select = ({ cid, props, styles = {}, value }: SelectProps) => {
  const SchemasContext = getSchemasContext();
  const { changeSchemasValue } = libraries.useContext(SchemasContext);

  const onChange = (e: any) => {
    const val = e.target.value;
    const realValue = props?.options?.find((item) => String(item.value) === val)?.value;

    if (isFunction(props?.onChange)) {
      props?.onChange?.(realValue);
    }
    changeSchemasValue(cid, realValue);
  };
  return (
    <select style={libraries.useStyles(styles)} value={value} onChange={onChange}>
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
