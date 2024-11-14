import type { AppProps, BaseValue, ComponentItem, Schemas, SetClassFun, SetPropsFun, SetValueFun } from '../types';
import { Button, Checkbox, Image, Radio, Select } from '../components';
import { libraries } from '../library';
import { getSchemasContext } from './context';

const ComponentMap = {
  Button,
  Select,
  Checkbox,
  Radio,
  Image,
};

const Component = ({ component, id, ...rest }: ComponentItem & { key: BaseValue }) => {
  const Comp = ComponentMap[component] as () => JSX.Element;
  if (Comp) {
    return <Comp {...rest} id={id} />;
  }
  return <>无此组件</>;
};

export function RenderApp({ schemas, injectDependentFun }: AppProps) {
  const [state, setState] = libraries.useState<Schemas>(schemas);

  const SchemasContext = getSchemasContext();

  const changeSchemasProps: SetPropsFun = (id, props) => {
    setState((schemas) => {
      const comp = schemas.components.find((item) => item.id === id);
      if (comp) {
        Object.assign(comp.props, props);
      }
      return { ...schemas };
    });
  };

  const changeSchemasValue: SetValueFun = (id, value) => {
    setState((schemas) => {
      const comp = schemas.components.find((item) => item.id === id);
      if (comp && 'value' in comp) {
        comp.value = value;
      }
      return { ...schemas };
    });
  };

  const addClass: SetClassFun = (id, className) => {
    setState((schemas) => {
      const comp = schemas.components.find((item) => item.id === id);
      if (comp && !comp.classes.includes(className)) {
        comp.classes.push(className);
      }
      return { ...schemas };
    });
  };

  const removeClass: SetClassFun = (id, className) => {
    setState((schemas) => {
      const comp = schemas.components.find((item) => item.id === id);
      if (comp && comp.classes.includes(className)) {
        comp.classes = comp.classes.filter((cls) => cls !== className);
      }
      return { ...schemas };
    });
  };

  injectDependentFun(changeSchemasProps, changeSchemasValue, addClass, removeClass);

  return (
    <SchemasContext.Provider value={{ changeSchemasValue }}>
      <div>
        {state.components.map(({ id, ...rest }) => {
          return <Component {...rest} key={id} id={id} />;
        })}
      </div>
    </SchemasContext.Provider>
  );
}
