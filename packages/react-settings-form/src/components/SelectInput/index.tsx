/*
 * @Descripttion:
 * @Author: 曾鹏宇
 * @Date: 2022-06-13 17:01:19
 * @LastEditTime: 2022-06-13 17:10:21
 */
/*
 * 支持文本、数字、布尔、表达式
 * Todo: JSON、富文本，公式
 */
import React from 'react';
import { createPolyInput } from '../PolyInput';
import { Input, InputNumber, Select } from 'antd';

const STARTTAG_REX =
  /<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;

const EXPRESSION_REX = /^\{\{([\s\S]*)\}\}$/;

const isNumber = (value: any) => typeof value === 'number';

const isExpression = (value: any) => {
  return typeof value === 'string' && EXPRESSION_REX.test(value);
};

const isRichText = (value: any) => {
  return typeof value === 'string' && STARTTAG_REX.test(value);
};

const isNormalText = (value: any) => {
  return (
    typeof value === 'string' && !isExpression(value) && !isRichText(value)
  );
};

const takeNumber = (value: any) => {
  const num = String(value).replace(/[^\d\.]+/, '');
  if (num === '') return;
  return Number(num);
};

export const SelectInput = createPolyInput([
  {
    type: 'TEXT',
    icon: 'Text',
    component: Input,
    checker: isNormalText,
  },
  {
    type: 'SElECT',
    icon: 'Boolean',
    component: (props: any) => (
      <Select
        {...props}
        defaultValue="default"
        options={[
          { label: 'large', value: 'large' },
          { label: 'default', value: 'default' },
        ]}
        value={props?.value || ''}
      />
    ),
    checker: isNormalText,
    toInputValue: (value) => {
      return value;
    },
    toChangeValue: (value) => {
      return value;
    },
  },
  {
    type: 'NUMBER',
    icon: 'Number',
    component: InputNumber,
    checker: isNumber,
    toInputValue: takeNumber,
    toChangeValue: takeNumber,
  },
]);
