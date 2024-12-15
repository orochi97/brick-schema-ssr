import type { ComponentItem, ComponentMap, EventContext, InjectLib, ViewProps } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';
import { SlotItemChild } from './@common';

const baseProps = {
  children: [],
  onClick: `return async (context) => {
    console.info('View onClick', context);
  }`,
};

const baseStyle = {
  main: {},
};

export const initViewSchemas = (compProps: ComponentItem, lib: InjectLib, componentMap: ComponentMap) => {
  if (compProps.component === 'View') {
    const props: ViewProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onClick) ? props?.onClick : baseProps.onClick;
    const onClick = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onClick = onClick;

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

export const View = ({ props, children, styles = { main: {} }, classes = {}, meta }: ViewProps) => {
  const mainStyle = Object.assign({}, baseStyle.main, styles.main);

  const $ref = libraries.useRef<HTMLElement>(null);

  libraries.useEffect(() => {
    if ($ref.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isFunction(props?.onClick)) {
          props?.onClick({ value: undefined, meta });
        }
      });
      observer.observe($ref.current);
    }
  }, []);

  return (
    <div style={libraries.useStyles(mainStyle)} className={libraries.useClasses(classes, meta?.data)}>
      <SlotItemChild meta={meta} slots={children} />
    </div>
  );
};
