import React from 'react';
import { FormLayout as FormilyFormLayout } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { withContainer } from '../../common/Container';
import { VoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { ContainerOutlined } from '@ant-design/icons';

export const FormLayout: DnFC<React.ComponentProps<typeof FormilyFormLayout>> =
  withContainer(FormilyFormLayout);

FormLayout.Behavior = createBehavior({
  name: 'FormLayout',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'FormLayout',
  designerProps: {
    droppable: true,
    propsSchema: new VoidFieldSchema().createSchema({
      component: AllSchemas.FormLayout,
    }),
    icon: <ContainerOutlined />,
  },
  designerLocales: AllLocales.FormLayout,
});

FormLayout.Resource = createResource({
  icon: <ContainerOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormLayout',
      },
    },
  ],
});
