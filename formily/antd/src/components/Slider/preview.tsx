import React from 'react';
import { Slider as AntdSlider } from 'antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { LineOutlined } from '@ant-design/icons';

export const Slider: DnFC<React.ComponentProps<typeof AntdSlider>> = AntdSlider;

Slider.Behavior = createBehavior({
  name: 'Slider',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Slider',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Slider,
    }),
    icon: <LineOutlined />,
  },
  designerLocales: AllLocales.Slider,
});

Slider.Resource = createResource({
  icon: <LineOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: '滑动条',
        'x-decorator': 'FormItem',
        'x-component': 'Slider',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
