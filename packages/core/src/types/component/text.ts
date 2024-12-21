import type { BaseCompProps, EventContext } from './common';

type SupportStylePart = 'main';

type SupportPropCover = 'label';

export type TextProps = BaseCompProps<
  {
    props: {
      label?: string;
      onClick?: ((p: EventContext) => void) | string;
    };
  },
  SupportStylePart,
  SupportPropCover
>;
