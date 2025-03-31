import React from 'react';
import { Space as FormilySpace } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC, DroppableWidget } from 'low-code-react';
import { VoidFieldSchema } from '../../components/Field';
import { AllLocales } from '../../locales';
import { observer } from '@formily/react';
import { ApartmentOutlined } from '@ant-design/icons';

const RepeatChildComponent: React.FunctionComponent<any> = (props) => {
  const { style, className } = props;
  return (
    <DroppableWidget className={className} style={{ ...style }}>
      {props.children}
    </DroppableWidget>
  );
};

export const RepeatChild = observer(RepeatChildComponent);

const RepeatComponent = (props) => {
  const { style, className } = props;
  return (
    <div
      data-designer-node-id={props?.['data-designer-node-id']}
      className={className}
      style={{ ...style }}
    >
      {props.children}
    </div>
  );
};

export const Repeat: DnFC<React.ComponentProps<typeof FormilySpace>> & {
  RepeatChild?: typeof RepeatChild;
} = observer(RepeatComponent);

Repeat.RepeatChild = RepeatChild;

const propsSchema = new VoidFieldSchema();

Repeat.Behavior = createBehavior(
  {
    name: 'Repeat',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Repeat',
    designerProps: {
      droppable: false,
      inlineChildrenLayout: true,
      propsSchema: propsSchema.createSchema(),
      icon: <ApartmentOutlined />,
    },
    designerLocales: AllLocales.Repeat,
  },
  {
    name: 'Repeat.RepeatChild',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Repeat.RepeatChild',
    designerProps: {
      droppable: true,
      deletable: false,
      draggable: false,
      cloneable: false,
      allowDrop: (node) => node.props['x-component'] === 'Repeat',
      propsSchema: propsSchema.createSchema(),
      icon: <ApartmentOutlined />,
    },
    designerLocales: AllLocales.RepeatItem,
  }
);

Repeat.Resource = createResource({
  icon: <ApartmentOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Repeat',
        'x-component-props': {
          style: {
            width: '100%',
            height: '150px',
            overflowY: 'auto',
          },
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Repeat.RepeatChild',
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
    },
  ],
});
