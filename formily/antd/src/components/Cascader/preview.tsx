import React from 'react';
import { Cascader as FormilyCascader } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { UnorderedListOutlined } from '@ant-design/icons';

export const Cascader: DnFC<React.ComponentProps<typeof FormilyCascader>> =
  FormilyCascader;

Cascader.Behavior = createBehavior({
  name: 'Cascader',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Cascader',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Cascader,
    }),
    icon: <UnorderedListOutlined />,
  },
  designerLocales: AllLocales.Cascader,
});

Cascader.Resource = createResource({
  icon: <UnorderedListOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '级联选择',
        'x-decorator': 'FormItem',
        'x-component': 'Cascader',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
