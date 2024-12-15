import type { ComponentItem } from '.';
import type { BaseCompProps, BaseObject, EventContext } from './common';

type SupportStylePart = 'main' | 'item';

export type ListProps = BaseCompProps<
  {
    props: {
      list: BaseObject[];
      onScrollEnd?: ((p: EventContext) => void) | string;
    };
    children: ComponentItem[];
  },
  SupportStylePart
>;