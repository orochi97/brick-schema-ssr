// import { http } from './api';
import { initSchemasMap } from '../components';
import { type AppProps, type InjectDependentFun, type Schemas, SetPropsFun, SetValueFun } from '../types';

interface ConstructorParams {
  schemas: Schemas;
}

export abstract class BaseSdk {
  protected schemas: Schemas;
  constructor({ schemas }: ConstructorParams) {
    this.schemas = schemas;
  }
  async initSchemas() {
    await new Function('lib', this.schemas.app.init)(this.lib)();
    this.schemas.components.forEach((item, index) => {
      this.schemas.components[index] = initSchemasMap[item.component](item, this.lib);
    });
  }
  setProps: SetPropsFun = (cid, props) => {
    const comp = this.schemas.components.find((item) => item.id === cid);
    if (comp) {
      Object.assign(comp.props, props);
    }
  };
  setValue: SetValueFun = (cid, value) => {
    const comp = this.schemas.components.find((item) => item.id === cid);
    if (comp && 'value' in comp) {
      comp.value = value;
    }
  };
  injectDependentFun: InjectDependentFun = (setProps, setValue) => {
    this.setProps = setProps;
    this.setValue = setValue;
  };
  get appProps(): AppProps {
    return {
      schemas: this.schemas,
      injectDependentFun: this.injectDependentFun,
    };
  }
  get lib(): {
    setProps: SetPropsFun;
    setValue: SetValueFun;
  } {
    return {
      setProps: (cid, props) => {
        this.setProps(cid, props);
      },
      setValue: (cid, value) => {
        this.setValue(cid, value);
      },
      // http,
    };
  }
  abstract createRoot: ($dom: HTMLElement) => void;
  abstract hydrateRoot: ($dom: HTMLElement) => void;
  abstract renderToString: () => Promise<{
    domText: string;
    headerText: string;
  }>;
}
