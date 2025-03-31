import React from 'react';
import { Checkbox as FormilyCheckbox } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { CheckSquareOutlined } from '@ant-design/icons';

export const Checkbox: DnFC<React.ComponentProps<typeof FormilyCheckbox>> =
  FormilyCheckbox;

Checkbox.Behavior = createBehavior({
  name: 'Checkbox.Group',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Checkbox.Group',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Checkbox.Group,
    }),
    icon: <CheckSquareOutlined />,
  },
  designerLocales: AllLocales.CheckboxGroup,
});

Checkbox.Resource = createResource({
  icon: <CheckSquareOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<string | number>',
        title: '复选框',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
