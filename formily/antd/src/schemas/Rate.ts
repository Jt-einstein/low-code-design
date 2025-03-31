import { ISchema } from '@formily/react';
import { paramTypeSetting } from '../utils/schema-setting';

export const Rate: ISchema = {
  type: 'object',
  properties: {

    /** 参数类型 */
    ...paramTypeSetting(),
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    count: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 5,
      },
    },
    allowHalf: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    tooltips: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
};
