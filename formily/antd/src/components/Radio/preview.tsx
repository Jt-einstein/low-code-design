import React from 'react';
import { Radio as FormilyRadio } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';

const radioIcon = (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <use xlinkHref="#lc-radio"></use>
  </svg>
);

export const Radio: DnFC<React.ComponentProps<typeof FormilyRadio>> =
  FormilyRadio;

Radio.Behavior = createBehavior({
  name: 'Radio.Group',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Radio.Group',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Radio.Group,
    }),
    icon: radioIcon,
  },
  designerLocales: AllLocales.RadioGroup,
});

Radio.Resource = createResource({
  icon: radioIcon,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string | number',
        title: '单选框',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
