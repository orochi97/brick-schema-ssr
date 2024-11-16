import { minify } from 'csso';
import { insertCss } from 'insert-css';

import type { AppProps, InjectDependentFun, Schemas, SetClassFun, SetPropsFun, SetValueFun } from '../types';
import { initSchemasMap } from '../components';

interface ConstructorParams {
  schemas: Schemas;
  dependency: Record<string, unknown>;
}

export abstract class BaseSdk {
  protected schemas: Schemas;
  private dependency: ConstructorParams['dependency'];
  constructor({ schemas, dependency }: ConstructorParams) {
    this.schemas = schemas;
    this.dependency = dependency;
  }
  async initSchemas() {
    await new Function('lib', this.schemas.app.init)(this.lib)();
    this.schemas.components.forEach((item, index) => {
      this.schemas.components[index] = initSchemasMap[item.component](item, this.lib);
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
  addClass: SetClassFun = (id, className) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp && !comp.classes.includes(className)) {
      comp.classes.push(className);
    }
  };
  removeClass: SetClassFun = (id, className) => {
    const comp = this.schemas.components.find((item) => item.id === id);
    if (comp && comp.classes.includes(className)) {
      comp.classes = comp.classes.filter((cls) => cls !== className);
    }
  };
  injectDependentFun: InjectDependentFun = (setProps, setValue, addClass, removeClass) => {
    this.setProps = setProps;
    this.setValue = setValue;
    this.addClass = addClass;
    this.removeClass = removeClass;
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
  get lib(): {
    setProps: SetPropsFun;
    setValue: SetValueFun;
    addClass: SetClassFun;
    removeClass: SetClassFun;
  } & ConstructorParams['dependency'] {
    return {
      setProps: (id, props) => {
        this.setProps(id, props);
      },
      setValue: (id, value) => {
        this.setValue(id, value);
      },
      addClass: (id, value) => {
        this.addClass(id, value);
      },
      removeClass: (id, value) => {
        this.removeClass(id, value);
      },
      ...this.dependency,
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
