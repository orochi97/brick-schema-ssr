import type { BaseValue, ComponentItem, RadioProps } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseValue = undefined;

const baseProps = {
  options: [],
  onChange: `return async (context) => {
    console.log('Radio onchange', context)
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

export const initRadioSchemas = <T extends object = object>(compProps: ComponentItem, lib: T) => {
  if (compProps.component === 'Radio') {
    const props = compProps.props;
    const funBody = isString(props.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (value: BaseValue) => {
      new Function('lib', funBody)(lib)(value);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Radio = ({ id, props, styles = {}, classes, value }: RadioProps) => {
  const style = Object.assign({}, styles);

  const SchemasContext = getSchemasContext();
  const { changeSchemasValue } = libraries.useContext(SchemasContext);

  const onChange = (newVal: BaseValue) => {
    if (isFunction(props?.onChange)) {
      props?.onChange?.(newVal);
    }
    changeSchemasValue(id, newVal);
  };

  return (
    <span style={libraries.useStyles(style)} className={libraries.useClass(classes)}>
      {props?.options?.map(({ value: itemValue, label, disabled }) => {
        const optionStyle = Object.assign({}, baseStyle.label, disabled ? baseStyle.disabled : {});
        return (
          <label key={itemValue} html-for={itemValue} style={libraries.useStyles(optionStyle)}>
            <input
              type="radio"
              value={itemValue}
              checked={itemValue === value}
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
