import { Button, Select, Checkbox, Radio, Image } from '../components';

import type { Schemas, ComponentItem, BaseValue, AppProps, SetPropsFun, SetValueFun } from '../types';

import { libraries } from '../library';
import { getSchemasContext } from './context';

const ComponentMap = {
  Button,
  Select,
  Checkbox,
  Radio,
  Image,
}

const Component = ({ component, id, ...rest }: ComponentItem & { key: BaseValue }) => {
  const Comp = ComponentMap[component] as any;
  if (Comp) {
    return <Comp {...rest} cid={id} />
  }
  return <>无此组件</>
}

export function RenderApp({ schemas, injectDependentFun }: AppProps) {
  const [state, setState] = libraries.useState<Schemas>(schemas);

  const SchemasContext = getSchemasContext();

  const changeSchemasProps: SetPropsFun = (cid, props) => {
    setState((schemas) => {
      const comp = schemas.components.find(item => item.id === cid);
      if (comp) {
        Object.assign(comp.props, props);
      }
      return { ...schemas };
    });
  }

  const changeSchemasValue: SetValueFun = (cid, value) => {
    setState((schemas) => {
      const comp = schemas.components.find(item => item.id === cid);
      if (comp && ('value' in comp)) {
        comp.value = value;
      }
      return { ...schemas };
    });
  }

  injectDependentFun(changeSchemasProps, changeSchemasValue);

  return (
    <SchemasContext.Provider value={{ changeSchemasValue }}>
      <div>
        {
          state.components.map(({id, ...rest}) => {
            return <Component {...rest} key={id} id={id} />
          })
        }
      </div>
    </SchemasContext.Provider>
  );
}
