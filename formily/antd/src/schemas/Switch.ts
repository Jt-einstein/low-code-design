import { ISchema } from '@formily/react';
import { paramTypeSetting } from '../utils/schema-setting';

export const Switch: ISchema = {
  type: 'object',
  properties: {

    /** 参数类型 */
    ...paramTypeSetting(),
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
  },
};
