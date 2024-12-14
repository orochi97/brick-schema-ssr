import type { BaseValue, CheckboxProps, ComponentItem, EventContext, InjectLib } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseValue: BaseValue[] = [];

const baseProps = {
  options: [],
  onChange: `return async (context) => {
    console.info('Checkbox onchange', context);
  }`,
};

const baseStyle = {
  main: {
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'not-allowed',
    color: 'gray',
  },
};

export const initCheckboxSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'Checkbox') {
    const props: CheckboxProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Checkbox = ({ id, props, styles = { main: {} }, value = [], classes = {}, meta }: CheckboxProps) => {
  const mainStyle = Object.assign({}, 'main' in styles ? styles.main : {});

  const SchemasContext = getSchemasContext();
  const { changeSchemasValue } = libraries.useContext(SchemasContext);

  const onChange = (val: BaseValue) => {
    const newVal = [...value];
    if (value.includes(val)) {
      newVal.splice(value.indexOf(val), 1);
    } else {
      newVal.push(val);
    }
    if (isFunction(props?.onChange)) {
      props?.onChange({
        value: newVal,
        meta,
      });
    }
    changeSchemasValue(id, newVal);
  };

  return (
    <span style={libraries.useStyles(mainStyle)} className={libraries.useClass(classes)}>
      {props?.options?.map(({ value: itemValue, label, disabled }) => {
        const optionStyle = Object.assign({}, baseStyle.main, disabled ? baseStyle.disabled : {});
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
