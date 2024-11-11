import { isString, isFunction } from '../utils';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import type { BaseValue, Styles, ComponentItem } from '../types';

export interface CheckboxProps {
  cid: number;
  props: {
    options: { value: BaseValue; label: string; disabled?: boolean }[];
    onChange?: ((value: BaseValue[]) => void) | string;
  };
  styles: Styles;
  value?: BaseValue[];
}

const baseValue: BaseValue[] = [];

const baseProps = {
  options: [],
  onChange: `return async (context) => {
    console.log('Checkbox onchange', context)
  }`,
};

const baseStyle = {
  label: {
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'not-allowed',
  },
};

export const initCheckboxSchemas = <T extends object = object>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Checkbox') {
    const props = compProps.props || structuredClone(baseProps);
    const funBody = isString(props?.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (value: BaseValue[]) => {
      new Function('lib', funBody)(lib)(value);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Checkbox = ({ cid, props, styles = {}, value = [] }: CheckboxProps) => {
  const style = Object.assign({}, styles);

  const SchemasContext = getSchemasContext();
  const { changeSchemasValue } = libraries.useContext(SchemasContext);

  const onChange = (val: BaseValue) => {
    const nowVal = [...value];
    if (value.includes(val)) {
      nowVal.splice(value.indexOf(val), 1);
    } else {
      nowVal.push(val);
    }
    if (isFunction(props?.onChange)) {
      props?.onChange(nowVal);
    }
    changeSchemasValue(cid, nowVal);
  };

  return (
    <span style={libraries.useStyles(style)}>
      {props?.options?.map(({ value: itemValue, label, disabled }) => {
        const optionStyle = Object.assign({}, baseStyle.label, disabled ? baseStyle.disabled : {});
        return (
          <label key={itemValue} html-for={itemValue} style={libraries.useStyles(optionStyle)}>
            <input
              type="checkbox"
              value={itemValue}
              checked={value.includes(itemValue)}
              disabled={disabled}
              style={libraries.useStyles(optionStyle)}
              onChange={() => onChange(itemValue)}
            />
            {label}
          </label>
        );
      })}
    </span>
  );
};
