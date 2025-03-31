import { Tooltip as AntdTooltip } from 'antd';
import { DnFC, DroppableWidget, useTreeNode } from 'low-code-react';
import { createBehavior, createResource } from 'low-code-core';
import React from 'react';
import { useField } from '@formily/react';
import type { Field } from '@formily/core/esm/models';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { ShakeOutlined } from '@ant-design/icons';

export const Tooltip: DnFC<React.ComponentProps<typeof AntdTooltip>> = (
  props
) => {
  const { className, title = '提示语', ...restProps } = props;
  const field = useField<Field>();
  const node = useTreeNode();

  if (node.children.length === 0) return <DroppableWidget {...props} />;
  return (
    <div>
      <AntdTooltip
        title={title}
        defaultOpen={true}
        {...restProps}
        className={
          field.description?.props?.children || field?.description || className
        }
      >
        {props.children}
      </AntdTooltip>
    </div>
  );
};

Tooltip.Behavior = createBehavior({
  name: 'Tooltip',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Tooltip',
  designerProps: {
    droppable: true,
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Tooltip,
    }),
    icon: <ShakeOutlined />,
  },
  designerLocales: AllLocales.Tooltip,
});

Tooltip.Resource = createResource({
  icon: <ShakeOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Tooltip',
        'x-component-props': {
          authorset: [],
        },
        'x-decorator-props': {
          colon: false,
        },
      },
    },
  ],
});
