import { ISchema } from '@formily/react';

export const Tooltip: ISchema = {
  type: 'object',
  properties: {
    arrowPointAtCenter: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    autoAdjustOverflow: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    color: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    defaultOpen: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    destroyTooltipOnHide: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    mouseEnterDelay: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    mouseLeaveDelay: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    overlayClassName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    placement: {
      type: 'string',
      enum: [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'top',
      },
    },
    trigger: {
      type: 'string',
      enum: ['hover', 'focus', 'click', 'contextMenu'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'hover',
      },
    },
  },
};
