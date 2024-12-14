import type { BaseValue, ComponentItem } from '../types';
import { Button, Checkbox, Image, List, Radio, Select } from '../components';

export const RenderComponent = ({ component, id, ...rest }: ComponentItem & { key: BaseValue }) => {
  const ComponentMap = {
    Button,
    Select,
    Checkbox,
    Radio,
    Image,
    List,
  };
  const Comp = ComponentMap[component] as () => JSX.Element;
  if (Comp) {
    return <Comp {...rest} id={id} />;
  }
  return <>无此组件</>;
};
