import { libraries } from '../library';
import { type Context, type SetValueFun, type Store } from '../types';

type Value = { changeSchemasValue: SetValueFun; store: Store };

let schemasContext: Context<Value>;

export const getSchemasContext = () => {
  if (schemasContext) {
    return schemasContext;
  }
  schemasContext = libraries.createContext<Value>({ changeSchemasValue: () => {}, store: {} });
  return schemasContext;
};
