import type { BaseValue, ComponentItem, ContextMeta } from '../types';
import { componentMap } from '.';

export const RenderComponent = ({ component, id, ...rest }: ComponentItem & { key: BaseValue; meta?: ContextMeta }) => {
  const Comp = componentMap[component].render as () => JSX.Element;
  if (Comp) {
    return <Comp {...rest} id={id} />;
  }
  return <>无此组件</>;
};
