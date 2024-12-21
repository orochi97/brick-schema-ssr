import type { ComponentItem, ComponentMap, EventContext, InjectLib, ListProps } from '../types';
import { getSchemasContext } from '../app/context';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';
import { SlotItemChild } from './@common';

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

export const initListSchemas = (compProps: ComponentItem, lib: InjectLib, componentMap: ComponentMap) => {
  if (compProps.component === 'List') {
    const props: ListProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onScrollEnd) ? props?.onScrollEnd : baseProps.onScrollEnd;
    const onScrollEnd = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onScrollEnd = onScrollEnd;

    compProps.children?.forEach((item, index) => {
      compProps.children[index] = componentMap[item.component].init(
        item,
        {
          ...lib,
          parent: {
            parent: lib.parent,
            data: compProps,
          },
          self: item,
        },
        componentMap,
      );
    });

    return Object.assign({}, compProps, { props });
  }
  return compProps;
};

export const List = ({ props, children, styles = { main: {}, item: {} }, classes = {}, meta }: ListProps) => {
  const mainStyle = Object.assign({}, baseStyle.main, styles.main);
  const itemStyle = Object.assign({}, styles.item);

  const $ref = libraries.useRef<HTMLElement>(null);

  const SchemasContext = getSchemasContext();
  const { store } = libraries.useContext(SchemasContext);

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
    <div style={libraries.useStyles(mainStyle)} className={libraries.useClasses(classes, meta?.data, store)}>
      {props.list.map((item, index) => {
        const meta = {
          data: item,
          index,
        };
        return (
          <div key={index} style={libraries.useStyles(itemStyle)}>
            <SlotItemChild meta={meta} store={store} slots={children} />
          </div>
        );
      })}
      <div ref={$ref} style={{ width: '100%', height: '1px' }} />
    </div>
  );
};
