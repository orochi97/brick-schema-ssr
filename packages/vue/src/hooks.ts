import { computed, defineComponent, inject, type PropType, provide, reactive } from 'vue';

import { type Context } from '@brick/core';

const VALUE = Symbol('VALUE');

export const useState = <T extends object>(initState: T) => {
  const state = reactive({ [VALUE]: initState });

  const setState = (fun: (s: T) => T) => {
    const newState = fun(state[VALUE]);
    Object.assign(state[VALUE], newState);
  };

  return [state[VALUE], setState] as [T, (f: (s: T) => T) => void];
};

export const createContext = <T>(defaultValue: T) => {
  const id = Symbol('KEY');
  const Provider = defineComponent({
    props: {
      value: {
        type: [Object, Number, String, Boolean, null, undefined, Function] as PropType<T>,
        required: true,
      },
    },
    setup(props, ctx) {
      provide(
        id,
        computed(() => props.value || defaultValue),
      );
      return () => ctx.slots.default?.();
    },
  });
  return {
    id,
    Provider,
    defaultValue,
  };
};

export const useContext = <T extends { value: unknown }>(context: Context<T>) => {
  const data = inject<T>(context.id);
  return data?.value;
};
