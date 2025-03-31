import React from 'react';
import { NumberPicker as FormilyNumberPicker } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { FieldNumberOutlined } from '@ant-design/icons';

export const NumberPicker: DnFC<
  React.ComponentProps<typeof FormilyNumberPicker>
> = FormilyNumberPicker;

NumberPicker.Behavior = createBehavior({
  name: 'NumberPicker',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'NumberPicker',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.NumberPicker,
    }),
    icon: <FieldNumberOutlined />,
  },
  designerLocales: AllLocales.NumberPicker,
});

NumberPicker.Resource = createResource({
  icon: <FieldNumberOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: '数字输入',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
