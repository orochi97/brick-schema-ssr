import { reactive, provide, inject, defineComponent, computed, type PropType, type UnwrapRef } from 'vue';

import { type Context } from '@brick/core';

export const useState = <T extends object>(initState: T) => {
  const state = reactive<{ value: T }>({ value: initState });

  const setState = (fun: (s: UnwrapRef<T>) => T) => {
    const newState = fun(state.value);
    // @ts-ignore
    Object.assign(state.value, newState);
  };

  return [state.value, setState] as [T, (f: (s: T) => T) => void];
};

export const createContext = <T>(defaultValue: T): Context<T> => {
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
