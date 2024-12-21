import type { BaseCompProps, EventContext } from './common';

export type ButtonKind = 'primary' | 'success' | 'danger' | 'default';

type SupportStylePart = 'main';

type SupportPropCover = 'disabled' | 'label' | 'type';

export type ButtonProps = BaseCompProps<
  {
    props: {
      disabled?: boolean;
      label?: string;
      type?: ButtonKind;
      onClick?: ((p: EventContext) => void) | string;
    };
  },
  SupportStylePart,
  SupportPropCover
>;
