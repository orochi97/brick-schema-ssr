import { minify } from 'csso';
import { insertCss } from 'insert-css';

import type {
  AppProps,
  FindComp,
  GetStore,
  InjectDependentFun,
  InjectLib,
  Schemas,
  SdkConstructorParams,
  SetClassFun,
  SetPropsFun,
  SetStore,
  SetValueFun,
  Store,
} from '../types';
import { componentMap } from '../components';
import { injectLibraries } from '../library';

export abstract class BaseSdk {
  protected schemas: Schemas;
  private declare store: Store;
  private dependency: SdkConstructorParams['dependency'];
  constructor({ schemas, store, dependency, i18n }: SdkConstructorParams) {
    this.schemas = schemas;
    this.store = store || {};
    this.dependency = dependency;
    if (i18n) {
      injectLibraries({
        useI18n: i18n,
      });
    }
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
      this.schemas.components[index] = componentMap[item.component].init(
        item,
        {
          sys: this.util,
          ...this.dependency,
          parent: {
            parent: null,
            data: null,
          },
          self: item,
        } satisfies InjectLib,
        componentMap,
      );
    });
  }
  setStore: SetStore = () => {};
  getStore: GetStore = () => ({});
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
  injectDependentFun: InjectDependentFun = ({
    findComp,
    setProps,
    setValue,
    addClasses,
    removeClasses,
    getStore,
    setStore,
  }) => {
    this.findComp = findComp;
    this.setProps = setProps;
    this.setValue = setValue;
    this.addClasses = addClasses;
    this.removeClasses = removeClasses;
    this.getStore = getStore;
    this.setStore = setStore;
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
      store: this.store,
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
      getStore: () => {
        return this.getStore();
      },
      setStore: (p) => {
        this.setStore(p);
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
