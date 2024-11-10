import { libraries } from '../library';

let schemasContext: {
  Provider: () => JSX.Element
};

export const getSchemasContext = () => {
  if (schemasContext) {
    return schemasContext;
  }
  schemasContext = libraries.createContext();
  return schemasContext;
}
