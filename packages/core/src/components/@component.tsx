import type { BaseValue, ComponentItem } from '../types';
import { componentMap } from '.';

export const RenderComponent = ({ component, id, ...rest }: ComponentItem & { key: BaseValue }) => {
  const Comp = componentMap[component].render as () => JSX.Element;
  if (Comp) {
    return <Comp {...rest} id={id} />;
  }
  return <>无此组件</>;
};
