import type { BaseValue, ComponentItem, EventContext, InjectLib, RadioProps } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';

const baseValue = undefined;

const baseProps = {
  options: [],
  onChange: `return async (context) => {
    console.info('Radio onchange', context)
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

export const initRadioSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'Radio') {
    const props: RadioProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onChange) ? props.onChange : baseProps.onChange;
    const onChange = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onChange = onChange;
    return Object.assign({}, compProps, { props, value: baseValue });
  }
  return compProps;
};

export const Radio = ({ id, props, styles = { main: {} }, classes = {}, meta, value }: RadioProps) => {
  const mainStyle = Object.assign({}, styles.main);

  const SchemasContext = getSchemasContext();
  const { changeSchemasValue } = libraries.useContext(SchemasContext);

  const onChange = (newVal: BaseValue) => {
    if (isFunction(props?.onChange)) {
      props?.onChange?.({ value: newVal, meta });
    }
    changeSchemasValue(id, newVal);
  };

  return (
    <span style={libraries.useStyles(mainStyle)} className={libraries.useClasses(classes, meta?.data)}>
      {props?.options?.map(({ value: itemValue, label, disabled }) => {
        const optionStyle = Object.assign({}, baseStyle.main, disabled ? baseStyle.disabled : {});
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
