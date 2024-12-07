import { type Schemas } from '@brick/core';

export const schemas: Schemas = {
  app: {
    init: `
      return async function() {
        const image = await lib.http.get('http://localhost:3000/api/image')
        lib.sys.setProps(6, { src: image.src });
      }
    `,
  },
  css: `
    .warn {
      color: orange;
    }
    .error {
      color: red;
    }
  `,
  components: [
    {
      id: 1,
      component: 'Button',
      props: {
        type: 'primary',
        label: '按钮',
        onClick: `
          return async function() {
            const options = await lib.http.get('http://localhost:3000/api/options')
            lib.sys.setProps(4, { options });
            lib.sys.setValue(4, 'guangzhou');
            lib.sys.removeClasses(3, ['warn']);
            lib.sys.addClasses(3, ['error']);
          }
        `,
      },
      styles: { main: {} },
      classes: {},
    },
    {
      id: 2,
      component: 'Select',
      props: {
        options: [
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ],
      },
      styles: { main: { width: 120 } },
      classes: {},
    },
    {
      id: 3,
      component: 'Checkbox',
      props: {
        options: [
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ],
      },
      styles: { main: {} },
      classes: { warn: true },
    },
    {
      id: 4,
      component: 'Radio',
      props: {
        options: [
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ],
      },
      styles: { main: {} },
      classes: {},
    },
    {
      id: 5,
      component: 'Image',
      props: {
        src: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        width: 100,
        height: 100,
      },
      styles: {
        main: {
          width: 100,
          height: 100,
          objectFit: 'contain',
        },
      },
      classes: {},
    },
    {
      id: 6,
      component: 'Image',
      props: {
        src: '',
        width: 100,
        height: 100,
      },
      styles: {
        main: {
          width: 100,
          height: 100,
          objectFit: 'contain',
        },
      },
      classes: {},
    },
  ],
};
