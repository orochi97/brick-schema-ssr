import type { AppProps, FindComp, Schemas, SetClassFun, SetPropsFun, SetValueFun } from '../types';
import { RenderComponent } from '../components/@component';
import { libraries } from '../library';
import { getSchemasContext } from './context';

export function RenderApp({ schemas, injectDependentFun }: AppProps) {
  const [state, setState] = libraries.useState<Schemas>(schemas);

  const SchemasContext = getSchemasContext();

  const findComp: FindComp = (id) => {
    return state.components.find((i) => i.id === id);
  };

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

  const addClasses: SetClassFun = (id, classNames) => {
    setState((schemas) => {
      const comp = schemas.components.find((item) => item.id === id);
      if (comp) {
        classNames.forEach((name) => {
          comp.classes ||= {};
          comp.classes[name] = true;
        });
      }
      return { ...schemas };
    });
  };

  const removeClasses: SetClassFun = (id, classNames) => {
    setState((schemas) => {
      const comp = schemas.components.find((item) => item.id === id);
      if (comp) {
        classNames.forEach((name) => {
          if (comp.classes?.[name]) {
            delete comp.classes[name];
          }
        });
      }
      return { ...schemas };
    });
  };

  injectDependentFun({
    findComp,
    setProps: changeSchemasProps,
    setValue: changeSchemasValue,
    addClasses,
    removeClasses,
  });

  return (
    <SchemasContext.Provider value={{ changeSchemasValue }}>
      <div>
        {state.components.map(({ id, ...rest }) => {
          return <RenderComponent {...rest} key={id} id={id} />;
        })}
      </div>
    </SchemasContext.Provider>
  );
}
