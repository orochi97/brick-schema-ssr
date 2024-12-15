import type { ComponentItem, EventContext, InjectLib, ViewProps } from '../types';
import { libraries } from '../library';
import { isFunction, isString } from '../utils';
import { SlotItemChild } from './@common';
import { initButtonSchemas } from './button';
import { initCheckboxSchemas } from './checkbox';
import { initImageSchemas } from './image';
import { initListSchemas } from './list';
import { initRadioSchemas } from './radio';
import { initSelectSchemas } from './select';
import { initTextSchemas } from './text';

const baseProps = {
  children: [],
  onClick: `return async (context) => {
    console.info('View onClick', context);
  }`,
};

const baseStyle = {
  main: {},
};

export const initViewSchemas = (compProps: ComponentItem, lib: InjectLib) => {
  if (compProps.component === 'View') {
    const initSchemasMap = {
      Button: initButtonSchemas,
      Select: initSelectSchemas,
      Checkbox: initCheckboxSchemas,
      Radio: initRadioSchemas,
      Image: initImageSchemas,
      List: initListSchemas,
      Text: initTextSchemas,
      View: initViewSchemas,
    };

    const props: ViewProps['props'] = Object.assign({}, baseProps, compProps.props);
    const funBody = isString(props.onClick) ? props?.onClick : baseProps.onClick;
    const onClick = (params: EventContext) => {
      new Function('lib', funBody)(lib)(params);
    };
    props.onClick = onClick;

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
    <div style={libraries.useStyles(mainStyle)} className={libraries.useClass(classes, meta?.data)}>
      <SlotItemChild meta={meta} slots={children} />
    </div>
  );
};
