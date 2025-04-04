import React from 'react';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import cls from 'classnames';
import './styles.less';
import { FieldStringOutlined } from '@ant-design/icons';

export interface IDesignableTextProps {
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
  style?: React.CSSProperties;
  className?: string;
}

export const Text: DnFC<IDesignableTextProps> = (props) => {
  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode;
  return React.createElement(
    tagName,
    {
      ...props,
      className: cls(props.className, 'dn-text'),
      'data-content-editable': 'x-component-props.content',
    },
    props.content
  );
};

Text.Behavior = createBehavior({
  name: 'Text',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Text',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.Text(),
      decorator: false,
      decoratorStyleGroup: false,
    }),
    icon: <FieldStringOutlined />,
  },
  designerLocales: AllLocales.Text,
});

Text.Resource = createResource({
  icon: <FieldStringOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Text',
        'x-component-props': {
          authorset: [],
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
