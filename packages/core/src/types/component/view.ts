import type { ComponentItem } from '.';
import type { BaseCompProps, EventContext } from './common';

type SupportStylePart = 'main';

export type ViewProps = BaseCompProps<
  {
    props: {
      onClick?: ((p: EventContext) => void) | string;
    };
    children: ComponentItem[];
  },
  SupportStylePart
>;
