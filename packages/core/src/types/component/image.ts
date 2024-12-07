import type { BaseCompProps, EventContext } from './common';

type SupportStylePart = 'main';

export type ImageProps = BaseCompProps<
  {
    props: {
      src: string;
      width?: number;
      height?: number;
      onClick?: ((p: EventContext) => void) | string;
    };
  },
  SupportStylePart
>;
