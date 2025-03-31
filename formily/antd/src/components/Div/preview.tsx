import React from 'react';
import { Space as FormilySpace } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC, DroppableWidget } from 'low-code-react';
import { AllLocales } from '../../locales';
import { observer } from '@formily/react';
import { VoidFieldSchema } from '../../components';
import { BorderOutlined } from '@ant-design/icons';

const DivComponent = (props) => {
  const { style, className } = props;
  return (
    <DroppableWidget className={className} style={{ ...style }}>
      {props.children}
    </DroppableWidget>
  );
};

export const Div: DnFC<React.ComponentProps<typeof FormilySpace>> =
  observer(DivComponent);

const propsSchema = new VoidFieldSchema();

Div.Behavior = createBehavior({
  name: 'Div',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Div',
  designerProps: {
    droppable: true,
    inlineChildrenLayout: true,
    propsSchema: propsSchema.createSchema(),
    icon: <BorderOutlined />,
  },
  designerLocales: AllLocales.Div,
});

Div.Resource = createResource({
  icon: <BorderOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Div',
        'x-component-props': {
          style: {
            width: '100%',
            height: '100px',
            overflow: 'hidden',
          },
        },
      },
    },
  ],
});
