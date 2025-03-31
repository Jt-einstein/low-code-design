import React from 'react';
import { Rate as AntdRate } from 'antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { LineChartOutlined } from '@ant-design/icons';

export const Rate: DnFC<React.ComponentProps<typeof AntdRate>> = AntdRate;

Rate.Behavior = createBehavior({
  name: 'Rate',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Rate',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({ component: AllSchemas.Rate }),
    icon: <LineChartOutlined />,
  },
  designerLocales: AllLocales.Rate,
});

Rate.Resource = createResource({
  icon: <LineChartOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: '评分器',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
