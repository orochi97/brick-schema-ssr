import type { BaseValue, ComponentItem, ContextMeta, Store } from '../types';
import { isFunction } from '../utils';
import { RenderComponent } from './@component';

interface Props {
  key?: BaseValue;
  meta?: ContextMeta;
  store?: Store;
  slots: ComponentItem[];
}

export const SlotItemChild = ({ meta, store, slots }: Props) => {
  return (
    <>
      {slots.map((item, index) => {
        const dataMap = item.extern?.dataMap;
        if (dataMap) {
          for (const key in dataMap) {
            if (key in item.props && !isFunction(item.props[key as keyof typeof item.props])) {
              const dataKey = dataMap[key];
              if (meta?.data && dataKey in meta.data) {
                (item.props as Record<string, unknown>)[key] = meta.data[dataKey];
              } else if (store && dataKey in store) {
                (item.props as Record<string, unknown>)[key] = store[dataKey];
              }
            }
          }
        }
        return <RenderComponent {...item} meta={meta} key={index} />;
      })}
    </>
  );
};
