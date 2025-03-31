import React from 'react';
import { TreeSelect as FormilyTreeSelect } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { BarsOutlined } from '@ant-design/icons';

export const TreeSelect: DnFC<React.ComponentProps<typeof FormilyTreeSelect>> =
  FormilyTreeSelect;

TreeSelect.Behavior = createBehavior({
  name: 'TreeSelect',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'TreeSelect',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.TreeSelect,
    }),
    icon: <BarsOutlined />,
  },
  designerLocales: AllLocales.TreeSelect,
});

TreeSelect.Resource = createResource({
  icon: <BarsOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '树选择',
        'x-decorator': 'FormItem',
        'x-component': 'TreeSelect',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
