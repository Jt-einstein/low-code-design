import { ISchema } from '@formily/react';
import { paramTypeSetting } from '../utils/schema-setting';

export const Radio: ISchema & { Group?: ISchema } = {
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

Radio.Group = {
  type: 'object',
  properties: {

    /** 参数类型 */
    ...paramTypeSetting(),
    optionType: {
      type: 'string',
      enum: ['default', 'button'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'default',
        optionType: 'button',
      },
    },
    buttonStyle: {
      type: 'string',
      enum: ['outline', 'solid'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'outline',
        optionType: 'button',
      },
    },
  },
};
