import React from 'react';
import { Transfer as FormilyTransfer } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { MergeCellsOutlined } from '@ant-design/icons';

export const Transfer: DnFC<React.ComponentProps<typeof FormilyTransfer>> =
  FormilyTransfer;

Transfer.Behavior = createBehavior({
  name: 'Transfer',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Transfer',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Transfer,
    }),
    icon: <MergeCellsOutlined />,
  },
  designerLocales: AllLocales.Transfer,
});

Transfer.Resource = createResource({
  icon: <MergeCellsOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '穿梭框',
        'x-decorator': 'FormItem',
        'x-component': 'Transfer',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
