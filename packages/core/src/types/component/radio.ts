import type { BaseCompProps, BaseOption, BaseValue, EventContext } from './common';

type SupportStylePart = 'main';

type SupportPropCover = 'options';

export type RadioProps = BaseCompProps<
  {
    props: {
      options: BaseOption[];
      onChange?: ((p: EventContext) => void) | string;
    };
    value?: BaseValue;
  },
  SupportStylePart,
  SupportPropCover
>;
