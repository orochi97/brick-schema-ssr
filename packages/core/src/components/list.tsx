import type { ComponentItem, EventContext, InjectLib, ListProps } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';
import { SlotItemChild } from './@common';
import { initButtonSchemas } from './button';
import { initCheckboxSchemas } from './checkbox';
import { initImageSchemas } from './image';
import { initRadioSchemas } from './radio';
import { initSelectSchemas } from './select';

const baseProps = {
  children: [],
  onScrollEnd: `return async (context) => {
    console.info('List onScrollEnd', context);
  }`,
};

const baseStyle = {
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export const initListSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'List') {
    const initSchemasMap = {
      Button: initButtonSchemas,
      Select: initSelectSchemas,
      Checkbox: initCheckboxSchemas,
      Radio: initRadioSchemas,
      Image: initImageSchemas,
      List: initListSchemas,
    };

    const props: ListProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onScrollEnd) ? props?.onScrollEnd : baseProps.onScrollEnd;
    const onScrollEnd = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onScrollEnd = onScrollEnd;

    compProps.children?.forEach((item, index) => {
      compProps.children[index] = initSchemasMap[item.component](item, {
        ...lib,
        parent: {
          parent: lib.parent,
          data: compProps,
        },
        self: item,
      });
    });

    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const List = ({ props, children, styles = { main: {}, item: {} }, classes = {}, meta }: ListProps) => {
  const mainStyle = Object.assign({}, baseStyle.main, styles.main);
  const itemStyle = Object.assign({}, styles.item);

  const $ref = libraries.useRef<HTMLElement>(null);

  libraries.useEffect(() => {
    if ($ref.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isFunction(props?.onScrollEnd)) {
          props?.onScrollEnd({ value: undefined, meta });
        }
      });
      observer.observe($ref.current);
    }
  }, []);

  return (
    <div style={libraries.useStyles(mainStyle)} className={libraries.useClass(classes, meta?.data)}>
      {props.list.map((item, index) => {
        const meta = {
          data: item,
          index,
        };
        return (
          <div key={index} style={libraries.useStyles(itemStyle)}>
            <SlotItemChild meta={meta} slots={children} />
          </div>
        );
      })}
      <div ref={$ref} style={{ width: '100%', height: '1px' }} />
    </div>
  );
};
