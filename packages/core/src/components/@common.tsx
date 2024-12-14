import type { BaseValue, ComponentItem, ContextMeta } from '../types';
import { isFunction } from '../utils';
import { RenderComponent } from './@component';

interface Props {
  key?: BaseValue;
  meta: ContextMeta;
  slots: ComponentItem[];
}

export const SlotItemChild = ({ meta, slots }: Props) => {
  return (
    <>
      {slots.map((item, index) => {
        const dataMap = item.extern?.dataMap;
        if (dataMap) {
          for (const key in dataMap) {
            if (key in item.props && !isFunction(item.props[key as keyof typeof item.props])) {
              (item.props as Record<string, unknown>)[key] = meta?.data[dataMap[key]];
            }
          }
        }
        return <RenderComponent {...item} meta={meta} key={index} />;
      })}
    </>
  );
};
