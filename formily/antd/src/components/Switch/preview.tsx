import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { SwitcherOutlined } from '@ant-design/icons';

export const Switch: DnFC<React.ComponentProps<typeof AntdSwitch>> = AntdSwitch;

Switch.Behavior = createBehavior({
  name: 'Switch',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Switch',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Switch,
    }),
    icon: <SwitcherOutlined />,
  },
  designerLocales: AllLocales.Switch,
});

Switch.Resource = createResource({
  icon: <SwitcherOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        title: '开关',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
