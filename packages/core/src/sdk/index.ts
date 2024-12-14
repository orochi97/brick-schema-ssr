import { minify } from 'csso';
import { insertCss } from 'insert-css';

import type {
  AppProps,
  FindComp,
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
    await new Function('lib', this.schemas.app.init)({
      sys: this.util,
      ...this.dependency,
      parent: {
        parent: null,
        data: null,
      },
      self: null,
    } satisfies InjectLib)();

    this.schemas.components.forEach((item, index) => {
      this.schemas.components[index] = initSchemasMap[item.component](item, {
        sys: this.util,
        ...this.dependency,
        parent: {
          parent: null,
          data: null,
        },
        self: item,
      } satisfies InjectLib);
    });
  }
  findComp: FindComp = () => undefined;
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
        comp.classes ||= {};
        comp.classes[name] = true;
      });
    }
  };
  removeClasses: SetClassFun = (id, classNames) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp) {
      classNames.forEach((name) => {
        if (comp.classes?.[name]) {
          delete comp.classes[name];
        }
      });
    }
  };
  injectDependentFun: InjectDependentFun = ({ findComp, setProps, setValue, addClasses, removeClasses }) => {
    this.findComp = findComp;
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
      findComp: (id) => {
        return this.findComp(id);
      },
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
