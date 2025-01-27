import { libraries } from '../library';
import { type Context, type SetValueFun } from '../types';

type Value = { changeSchemasValue: SetValueFun };

let schemasContext: Context<Value>;

export const getSchemasContext = () => {
  if (schemasContext) {
    return schemasContext;
  }
  schemasContext = libraries.createContext<Value>({ changeSchemasValue: () => {} });
  return schemasContext;
};
