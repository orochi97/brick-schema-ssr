import { minify } from 'csso';
import { insertCss } from 'insert-css';

import type {
  AppProps,
  InjectDependentFun,
  InjectLib,
  Schemas,
  SdkConstructorParams,
  SetClassFun,
  SetPropsFun,
  SetValueFun,
} from '../types';
import { initSchemasMap } from '../components';

export abstract class BaseSdk {
  protected schemas: Schemas;
  private dependency: SdkConstructorParams['dependency'];
  constructor({ schemas, dependency }: SdkConstructorParams) {
    this.schemas = schemas;
    this.dependency = dependency;
  }
  async initSchemas() {
    const inject: InjectLib = {
      sys: this.util,
      ...this.dependency,
      parent: {
        parent: null,
        data: null,
      },
      self: null,
    };
    await new Function('lib', this.schemas.app.init)(inject)();
    this.schemas.components.forEach((item, index) => {
      this.schemas.components[index] = initSchemasMap[item.component](item, inject);
    });
  }
  setProps: SetPropsFun = (id, props) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp) {
      Object.assign(comp.props, props);
    }
  };
  setValue: SetValueFun = (id, value) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp && 'value' in comp) {
      comp.value = value;
    }
  };
  addClasses: SetClassFun = (id, classNames) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp) {
      classNames.forEach((name) => {
        comp.classes[name] = true;
      });
    }
  };
  removeClasses: SetClassFun = (id, classNames) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp) {
      classNames.forEach((name) => {
        delete comp.classes[name];
      });
    }
  };
  injectDependentFun: InjectDependentFun = ({ setProps, setValue, addClasses, removeClasses }) => {
    this.setProps = setProps;
    this.setValue = setValue;
    this.addClasses = addClasses;
    this.removeClasses = removeClasses;
  };
  insertCss() {
    if (this.schemas.css) {
      insertCss(minify(this.schemas.css).css);
    }
  }
  genStyle() {
    if (this.schemas.css) {
      return `<style>${minify(this.schemas.css).css}</style>`;
    }
    return '';
  }
  get appProps(): AppProps {
    return {
      schemas: this.schemas,
      injectDependentFun: this.injectDependentFun,
    };
  }
  get util(): Parameters<InjectDependentFun>[number] {
    return {
      setProps: (id, props) => {
        this.setProps(id, props);
      },
      setValue: (id, value) => {
        this.setValue(id, value);
      },
      addClasses: (id, value) => {
        this.addClasses(id, value);
      },
      removeClasses: (id, value) => {
        this.removeClasses(id, value);
      },
    };
  }
  abstract createRoot: ($dom: HTMLElement) => void;
  abstract hydrateRoot: ($dom: HTMLElement) => void;
  abstract renderToString: () => Promise<{
    headText: string;
    styleText: string;
    appText: string;
  }>;
}
