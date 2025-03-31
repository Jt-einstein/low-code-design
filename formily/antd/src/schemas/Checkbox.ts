import { ISchema } from '@formily/react';
import { paramTypeSetting } from '../utils/schema-setting';

export const Checkbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {

    /** 参数类型 */
    ...paramTypeSetting(),
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
};

Checkbox.Group = {
  type: 'object',
  properties: {
    /** 参数类型 */
    ...paramTypeSetting(),
  }
};
