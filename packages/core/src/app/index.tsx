import type { AppProps, FindComp, GetStore, Schemas, SetClassFun, SetPropsFun, SetStore, SetValueFun } from '../types';
import { SlotItemChild } from '../components/@common';
import { libraries } from '../library';
import { getSchemasContext } from './context';

export function RenderApp({ schemas, store, injectDependentFun }: AppProps) {
  const [state, setState] = libraries.useState<Schemas>(schemas);
  const [storeState, setStoreState] = libraries.useState(store || {});

  const SchemasContext = getSchemasContext();

  const getStore: GetStore = () => storeState;

  const setStore: SetStore = (newStore) => {
    setStoreState((store) => {
      Object.assign(store, newStore);
      return { ...store };
    });
  };

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
    getStore,
    setStore,
  });

  return (
    <SchemasContext.Provider value={{ changeSchemasValue, store: storeState }}>
      <div>
        <SlotItemChild store={storeState} slots={state.components} />
      </div>
    </SchemasContext.Provider>
  );
}
