import { type Schemas } from '@brick/core';

export const schemas: Schemas = {
  app: {
    init: `
      return async function() {
        const { http, consts } = lib;
        const image = await http.get(consts.SERVER_URL + '/api/image')
        lib.sys.setProps(6, { src: image.src });

        const list = await http.get(consts.SERVER_URL + '/api/list')
        lib.sys.setProps(7, { list: list.map((item, index) => ({
          ...item,
          index,
          label: 'Image' + (index + 1),
          disabled: false,
        })) });
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
    .selected {
      border: 2px solid #87d068;
      border-radius: 8px;
    }
    .flex {
      display: flex !important;
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
            const { http, consts } = lib;
            const options = await http.get(consts.SERVER_URL + '/api/options')
            lib.sys.setProps(4, { options });
            lib.sys.setValue(4, 'guangzhou');
            lib.sys.removeClasses(3, ['warn']);
            lib.sys.addClasses(3, ['error']);
          }
        `,
      },
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
    },
    {
      id: 7,
      component: 'List',
      props: {
        list: [],
        onScrollEnd: `
          return async function() {
            const { sys, http, consts, parent } = lib;
            const listComp = sys.findComp(7);
            const list = [...listComp.props.list]
            const newList = await http.get(consts.SERVER_URL + '/api/list');
            const len = list.length;
            sys.setProps(7, {
              list: list.concat(newList.map((item, index) => ({
                ...item,
                index: index + len,
                label: 'Image' + (index + len + 1),
                disabled: false,
              }))),
            });
          }
        `,
      },
      styles: {
        main: {
          padding: 10,
          backgroundColor: 'white',
          height: 480,
          overflow: 'auto',
        },
        item: {
          padding: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#ccc',
          display: 'flex',
          position: 'relative',
        },
      },
      children: [
        {
          id: 10086,
          component: 'Image',
          props: {
            src: '',
            width: 100,
            height: 100,
          },
          styles: {
            main: {
              objectFit: 'contain',
            },
          },
          classes: {
            selected: 'disabled',
          },
          extern: {
            dataMap: {
              src: 'src',
            },
          },
        },
        {
          id: 10090,
          component: 'Text',
          props: {
            label: '✔',
          },
          styles: {
            main: {
              color: 'white',
              backgroundColor: '#87d068',
              position: 'absolute',
              width: 24,
              height: 24,
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              left: 16,
              top: 16,
            },
          },
          classes: {
            flex: 'disabled',
          },
        },
        {
          id: 10089,
          component: 'View',
          props: {},
          styles: {
            main: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
              marginLeft: 10,
            },
          },
          children: [
            {
              id: 10087,
              component: 'Text',
              props: {},
              extern: {
                dataMap: {
                  label: 'label',
                },
              },
            },
            {
              id: 10088,
              component: 'Button',
              props: {
                type: 'danger',
                label: 'delete',
                onClick: `
                  return async function(context) {
                    const { sys, http, consts, parent } = lib;
                    const listComp = sys.findComp(parent.parent.data.id);
                    const list = [...listComp.props.list]
                    list[context.meta.index].label = 'deleted';
                    list[context.meta.index].disabled = true;
                    sys.setProps(listComp.id, { list });
                  }
                `,
              },
              extern: {
                dataMap: {
                  disabled: 'disabled',
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 8,
      component: 'Button',
      props: {
        type: 'primary',
        label: 'Confirm',
        onClick: `
          return async function(context) {
            const { sys, http, consts, parent } = lib;
            const listComp = sys.findComp(7);
            console.info(listComp.props.list.filter(i => i.disabled).map(i => i.index))
          }
        `,
      },
    },
  ],
};
