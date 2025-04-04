import React, { useMemo } from 'react';
import { createBehavior, createResource } from 'low-code-core';
import { createForm } from '@formily/core';
import { observer } from '@formily/react';
import { Form as FormilyForm } from '@formily/antd';
import { usePrefix, DnFC } from 'low-code-react';
import { mcPrefix } from 'low-code-extension';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import cls from 'classnames';
import './styles.less';

export const Form: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
  (props) => {
    const prefix = usePrefix('designable-form');
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    );

    return (
      <FormilyForm
        {...props}
        className={cls(prefix, `${mcPrefix}-form`)}
        form={form}
      >
        {props.children}
      </FormilyForm>
    );
  }
);

Form.Behavior = createBehavior({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: {
          ...(AllSchemas.FormLayout.properties as any),
          style: AllSchemas.CSSStyle,
        },
      },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    };
  },
  designerLocales: AllLocales.Form,
});

Form.Resource = createResource({
  title: { 'zh-CN': '表单', 'en-US': 'Form' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Form',
      },
    },
  ],
});
