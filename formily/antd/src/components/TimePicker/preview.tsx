import React from 'react';
import { TimePicker as FormilyTimePicker } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { ClockCircleOutlined } from '@ant-design/icons';

export const TimePicker: DnFC<React.ComponentProps<typeof FormilyTimePicker>> =
  FormilyTimePicker;

const fieldSchema = new FieldSchema();

TimePicker.Behavior = createBehavior(
  {
    name: 'TimePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'TimePicker',
    designerProps: {
      propsSchema: fieldSchema.createSchema({
        component: AllSchemas.TimePicker,
      }),
      icon: <ClockCircleOutlined />,
    },
    designerLocales: AllLocales.TimePicker,
  },
  {
    name: 'TimePicker.RangePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'TimePicker.RangePicker',
    designerProps: {
      propsSchema: fieldSchema.createSchema({
        component: AllSchemas.TimePicker.RangePicker,
      }),
      icon: <ClockCircleOutlined />,
    },
    designerLocales: AllLocales.TimeRangePicker,
  }
);

TimePicker.Resource = createResource(
  {
    icon: <ClockCircleOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '时间选择',
          'x-decorator': 'FormItem',
          'x-component': 'TimePicker',
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  },
  {
    icon: <ClockCircleOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string[]',
          title: '时间范围',
          'x-decorator': 'FormItem',
          'x-component': 'TimePicker.RangePicker',
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  }
);
