import type { BaseCompProps, BaseOption, BaseValue, EventContext } from './common';

type SupportStylePart = 'main';

type SupportPropCover = 'options';

export type CheckboxProps = BaseCompProps<
  {
    props: {
      options: BaseOption[];
      onChange?: ((p: EventContext) => void) | string;
    };
    value?: BaseValue[];
  },
  SupportStylePart,
  SupportPropCover
>;
