import type { BaseCompProps, EventContext } from './common';

type SupportStylePart = 'main';

type SupportPropCover = 'src' | 'width' | 'height';

export type ImageProps = BaseCompProps<
  {
    props: {
      src: string;
      width?: number;
      height?: number;
      onClick?: ((p: EventContext) => void) | string;
    };
  },
  SupportStylePart,
  SupportPropCover
>;
