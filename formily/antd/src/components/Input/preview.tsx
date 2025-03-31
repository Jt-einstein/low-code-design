import React from 'react';
import { Input as FormilyInput } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { CodeOutlined } from '@ant-design/icons';

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> =
  FormilyInput;

Input.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: new FieldSchema().createSchema({
        component: AllSchemas.Input,
      }),
      icon: <CodeOutlined />,
    },
    designerLocales: AllLocales.Input,
  },
  {
    name: 'Input.TextArea',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input.TextArea',
    designerProps: {
      propsSchema: new FieldSchema().createSchema({
        component: AllSchemas.Input.TextArea,
      }),
      icon: <CodeOutlined />,
    },
    designerLocales: AllLocales.TextArea,
  }
);
Input.Resource = createResource(
  {
    icon: <CodeOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  },
  {
    icon: <CodeOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '多行输入',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  }
);
