export const schemas = {
  app: {
    init: `
    return async function() {
      lib.setProps(1, { label: 'Click Me' });
    }
    `,
  },
  components: [
    {
      id: 1,
      component: 'Button',
      props: {
        type: 'primary',
        children: '按钮',
        onClick: `
          return async function() {
            lib.setProps(4, {
              options: [
                { value: 'beijing', label: 'beijing' },
                { value: 'shanghai', label: 'shanghai' },
                { value: 'guangzhou', label: 'guangzhou' },
                { value: 'shenzhen', label: 'shenzhen' },
              ],
            });
            lib.setValue(4, 'guangzhou');
          }
        `,
      },
    },
    {
      id: 2,
      component: 'Select',
      styles: { width: 120 },
      props: {
        options: [
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ],
      },
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
        width: 100,
        height: 100,
        objectFit: 'contain',
      },
    },
  ],
};
