import type { BaseValue, CheckboxProps, ComponentItem } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

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
    color: 'gray',
  },
};

export const initCheckboxSchemas = <T extends object = object>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Checkbox') {
    const props = compProps.props;
    const funBody = isString(props.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (value: BaseValue[]) => {
      new Function('lib', funBody)(lib)(value);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Checkbox = ({ id, props, styles = {}, value = [], classes }: CheckboxProps) => {
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
    changeSchemasValue(id, nowVal);
  };

  return (
    <span style={libraries.useStyles(style)} className={libraries.useClass(classes)}>
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
