import React, { useImperativeHandle, useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import cls from 'classnames';
import { utils, fns, mcPrefix, lcPrefix } from 'low-code-extension';
import moment from 'moment';
import { message as $message } from 'antd';
import { ECharts } from 'low-code-formily-antd';
import {
  Space,
  Div,
  ProgressBar,
  Repeat,
  Tooltip,
} from 'low-code-formily-antd/esm/preview';
import {
  Form,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormTab,
  FormItem,
} from '@formily/antd';
import { Card, Slider, Rate } from 'antd';
import { Form as TForm } from '@formily/core';
import { ErrorBoundary } from 'low-code-react';
import { IFormilySchema } from 'low-code-formily-transformer';
import Watermark, { WatermarkProps } from './components/Watermark';
import './style/index.less';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(
    tagName,
    {
      ...props,
      className: cls('dn-text'),
    },
    value || content
  );
};

export type TLowCodeRenderProps = {
  form?: TForm;
  schema?: IFormilySchema;
  extendScope?: Record<string, any>;
  customComponents?: any;
  watermarkConfig?: WatermarkProps;
};

export type TLowCodeRenderRefProps = {
  getFormInstance: () => TForm;
};

const defaultComponents = {
  Space,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  Text,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Card,
  Slider,
  Rate,
  ECharts,
  Div,
  ProgressBar,
  Repeat,
  Tooltip,
};

const LowCodeRender = React.forwardRef<
  TLowCodeRenderRefProps,
  TLowCodeRenderProps
>((props, ref) => {
  const form = useMemo(
    () => props.form || createForm(),
    [props.form, props.schema]
  );

  const SchemaField = useMemo(() => {
    return createSchemaField({
      components: { ...defaultComponents, ...props.customComponents },
    });
  }, [props.customComponents]);

  useImperativeHandle(ref, () => ({
    getFormInstance: () => {
      return form;
    },
  }));

  if (!props.schema) {
    return null;
  }
  const { form: formProps, schema } = props.schema || {};
  /* 将存储在schema中的css样式转换为css文件加载 */
  utils.loadcss(
    Object.values(
      Object.values(schema?.properties || {})?.[0]?.properties || {}
    )
  );

  return (
    <ErrorBoundary>
      <Watermark {...(props?.watermarkConfig ?? {})}>
        <Form
          {...formProps}
          form={form}
          className={cls(`${lcPrefix}-form`, `${mcPrefix}-form`)}
        >
          <SchemaField
            schema={schema}
            scope={{
              $message,
              $utils: utils,
              $fns: fns,
              $moment: moment,
              ...props?.extendScope,
            }}
          />
        </Form>
      </Watermark>
    </ErrorBoundary>
  );
});

export default LowCodeRender;
