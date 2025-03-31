import React from 'react';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { Container } from '../../common/Container';
import { AllLocales } from '../../locales';
import { CompressOutlined } from '@ant-design/icons';

export const ObjectContainer: DnFC<React.ComponentProps<typeof Container>> =
  Container;
ObjectContainer.Behavior = createBehavior({
  name: 'Object',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'object',
  designerProps: {
    droppable: true,
    propsSchema: new FieldSchema().createSchema({
      decorator: false,
      decoratorStyleGroup: false,
    }),
    icon: <CompressOutlined />,
  },
  designerLocales: AllLocales.ObjectLocale,
});

ObjectContainer.Resource = createResource({
  icon: <CompressOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
      },
    },
  ],
});
