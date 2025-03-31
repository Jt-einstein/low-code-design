import React from 'react';
import { Password as FormilyPassword } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';

export const Password: DnFC<React.ComponentProps<typeof FormilyPassword>> =
  FormilyPassword;

Password.Behavior = createBehavior({
  name: 'Password',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Password',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Password,
    }),
  },
  designerLocales: AllLocales.Password,
});

Password.Resource = createResource({
  icon: 'PasswordSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '密码输入',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-decorator-props': DEFAULT_DECORATOR_PROPS,
      },
    },
  ],
});
