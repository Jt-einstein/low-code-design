import React from 'react';
import { Card as AntdCard } from 'antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { VoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { CreditCardOutlined } from '@ant-design/icons';

export const Card: DnFC<React.ComponentProps<typeof AntdCard>> = (props) => {
  return (
    <AntdCard
      {...props}
      title={
        <span data-content-editable="x-component-props.title">
          {props.title}
        </span>
      }
    >
      {props.children}
    </AntdCard>
  );
};

Card.Behavior = createBehavior({
  name: 'Card',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Card',
  designerProps: {
    droppable: true,
    propsSchema: new VoidFieldSchema().createSchema({
      component: AllSchemas.Card,
    }),
    icon: <CreditCardOutlined />,
  },
  designerLocales: AllLocales.Card,
});

Card.Resource = createResource({
  icon: <CreditCardOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Card',
        'x-component-props': {
          title: 'Title',
        },
      },
    },
  ],
});
