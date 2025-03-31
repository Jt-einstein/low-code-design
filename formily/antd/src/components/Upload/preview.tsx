import React from 'react';
import { Upload as FormilyUpload } from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { FieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { DEFAULT_DECORATOR_PROPS } from '../../const';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

export const Upload: DnFC<React.ComponentProps<typeof FormilyUpload>> =
  FormilyUpload;

const fieldSchema = new FieldSchema();

Upload.Behavior = createBehavior(
  {
    name: 'Upload',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Upload',
    designerProps: {
      propsSchema: fieldSchema.createSchema({
        component: AllSchemas.Upload,
      }),
      icon: <UploadOutlined />,
    },
    designerLocales: AllLocales.Upload,
  },
  {
    name: 'Upload.Dragger',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Upload.Dragger',
    designerProps: {
      propsSchema: fieldSchema.createSchema({
        component: AllSchemas.Upload.Dragger,
      }),
      icon: <InboxOutlined />,
    },
    designerLocales: AllLocales.UploadDragger,
  }
);

Upload.Resource = createResource(
  {
    icon: <UploadOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'Array<object>',
          title: '上传',
          'x-decorator': 'FormItem',
          'x-component': 'Upload',
          'x-component-props': {
            textcontent: 'Upload',
          },
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  },
  {
    icon: <UploadOutlined />,
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'Array<object>',
          title: '拖拽上传',
          'x-decorator': 'FormItem',
          'x-component': 'Upload.Dragger',
          'x-component-props': {
            textcontent: 'Click or drag file to this area to upload',
          },
          'x-decorator-props': DEFAULT_DECORATOR_PROPS,
        },
      },
    ],
  }
);
