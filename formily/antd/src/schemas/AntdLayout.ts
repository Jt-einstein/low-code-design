import { ISchema } from '@formily/react';

export const AntdLayout: ISchema & { Sider?: ISchema } = {
  type: 'object',
  properties: {

    /** 绑定字段 */
    
  },
};

AntdLayout.Sider = {
  type: 'object',
  properties: {
    /** 绑定字段 */
  
    collapsed: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    defaultCollapsed: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    collapsible: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    width: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    collapsedWidth: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
  },
};
