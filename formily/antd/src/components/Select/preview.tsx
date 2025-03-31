import React from 'react';
import { Select as FormilySelect } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { observer } from '@formily/reactive-react';
import { transformMode } from '../../utils/value-transform';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { DatabaseOutlined } from '@ant-design/icons';

export const Select: DnFC<React.ComponentProps<typeof FormilySelect>> =
  observer((props) => {
    return <FormilySelect {...props} mode={transformMode(props.mode)} />;
  });

Select.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Select,
    }),
    icon: <DatabaseOutlined />,
  },
  designerLocales: AllLocales.Select,
});

Select.Resource = createResource({
  icon: <DatabaseOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '下拉选择器',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
