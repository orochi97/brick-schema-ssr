import type { BaseCompProps, BaseOption, BaseValue, EventContext } from './common';

type SupportStylePart = 'main';

export type SelectProps = BaseCompProps<
  {
    props: {
      options: BaseOption[];
      onChange?: ((p: EventContext) => void) | string;
    };
    value?: BaseValue;
  },
  SupportStylePart
>;
