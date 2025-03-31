import React from 'react';
import { Space as FormilySpace } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { VoidFieldSchema } from '../Field';
import { withContainer } from '../../common/Container';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { observer, useField } from '@formily/react';
import { InsertRowBelowOutlined } from '@ant-design/icons';

export const McSpace = (props) => {
  const { style, className, ...rest } = props;
  const field = useField();
  let width;
  if (style?.width === 'inherit') {
    width = '-webkit-fill-available';
  } else {
    width = style?.width;
  }
  return (
    <FormilySpace
      {...rest}
      style={{ ...style, width }}
      className={field.description?.props?.children || className}
    />
  );
};
export const Space: DnFC<React.ComponentProps<typeof FormilySpace>> = observer(
  withContainer(McSpace)
);

Space.Behavior = createBehavior({
  name: 'Space',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Space',
  designerProps: {
    droppable: true,
    inlineChildrenLayout: true,
    propsSchema: new VoidFieldSchema().createSchema({
      component: AllSchemas.Space,
    }),
    icon: <InsertRowBelowOutlined />,
  },
  designerLocales: AllLocales.Space,
});

Space.Resource = createResource({
  icon: <InsertRowBelowOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Space',
        'x-component-props': {
          authorset: [],
          style: {
            width: '100%',
            height: '40px',
          },
        },
        'x-reactions': {
          fulfill: {
            run: '',
          },
        },
      },
    },
  ],
});
