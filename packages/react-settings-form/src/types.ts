import React from 'react';
import { Form } from '@formily/core';
import { ISchema } from '@formily/react';
import type { TreeNode } from 'low-code-core';

export type ExtendForm = {
  components?: Record<string, any>;
  effects?: (form: Form) => void;
  extendSchema?: (
    schema: ISchema,
    options: Record<string, any> & { node: TreeNode }
  ) => ISchema;
};

export interface ISettingFormProps {
  className?: string;
  style?: React.CSSProperties;
  components?: Record<string, React.FC<any>>;
  extendForm?: ExtendForm;
  scope?: any;
  idLowCodeLayOut?: string;
  idProduct?: string;
  designType?: string;
  restful?: {
    listDataSet: any;
    preview: any;
    pagedListRoleUser: any;
  };
  userAuthor?: any[];
  roleAuthor?: any[];
  api?: any;
}
