import { ISchema } from '@formily/react';

export const SideSheet: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: '抽屉',
      },
    },
    visible: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    mask: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
    maskClosable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    destroyOnClose: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
    keyboard: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    maskStyle: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
    placement: {
      type: 'string',
      enum: [
        { label: '上', value: 'top' },
        { label: '右', value: 'right' },
        { label: '下', value: 'bottom' },
        { label: '左', value: 'left' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'right',
      },
    },
    footer: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
    size: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 360,
      },
      enum: [
        { label: '大尺寸', value: 696 },
        { label: '默认尺寸', value: 360 },
      ],
    },
    zIndex: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
  },
};
