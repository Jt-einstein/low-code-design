import React, { useEffect } from 'react';
import {
  transformToSchema,
  transformToTreeNode,
} from 'low-code-formily-transformer';
import { TreeNode, ITreeNode } from 'low-code-core';
import { MonacoInput } from 'low-code-react-settings-form';
import { CEditConfig } from './layouts/CardLayout/ViewTabs/editConfig';
import { utils } from 'low-code-extension';
import { message } from 'antd';
interface ICssEditorWidgetProps {
  tree: TreeNode;
  onChange?: (tree: ITreeNode) => void;
}

export const CssEditorWidget: React.FC<ICssEditorWidgetProps> = (props) => {
  const properties = transformToSchema(props?.tree)?.schema.properties;
  const css = Object.values(properties)?.[0]?.data;
  const treeProps = transformToSchema(props?.tree);
  const firstChildKeys = Object.keys(treeProps.schema.properties)?.[0];
  useEffect(() => {
    if (JSON.stringify(properties) === '{}') {
      message.warning({ content: '请至少添加一个,再设置样式!' });
    }
    return () => {
      utils.loadcss([treeProps.schema.properties[firstChildKeys]]);
    };
  }, []);

  return (
    <MonacoInput
      {...props}
      value={css}
      onChange={(value) => {
        treeProps.schema.properties[firstChildKeys].data = value;
        props.onChange?.(transformToTreeNode(treeProps));
      }}
      language="less"
      options={{ ...CEditConfig }}
    />
  );
};
