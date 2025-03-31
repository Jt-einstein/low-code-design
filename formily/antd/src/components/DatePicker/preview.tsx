import React from 'react';
import { DatePicker as FormilyDatePicker } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { CarryOutOutlined } from '@ant-design/icons';

export const DatePicker: DnFC<React.ComponentProps<typeof FormilyDatePicker>> =
  FormilyDatePicker;

DatePicker.Behavior = createBehavior(
  {
    name: 'DatePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker',
    designerProps: {
      propsSchema: new FieldSchema().createSchema({
        component: AllSchemas.DatePicker,
      }),
      icon: <CarryOutOutlined />,
    },
    designerLocales: AllLocales.DatePicker,
  },
  {
    name: 'DatePicker.RangePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker.RangePicker',
    designerProps: {
      propsSchema: new FieldSchema().createSchema({
        component: AllSchemas.DatePicker.RangePicker,
      }),
      icon: <CarryOutOutlined />,
    },
    designerLocales: AllLocales.DateRangePicker,
  }
);

DatePicker.Resource = createResource(
  {
    icon: <CarryOutOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '日期选择',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  },
  {
    icon: <CarryOutOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string[]',
          title: '日期范围',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker.RangePicker',
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  }
);
