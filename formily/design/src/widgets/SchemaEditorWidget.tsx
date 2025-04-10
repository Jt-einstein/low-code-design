import React from 'react';
import {
  transformToSchema,
  transformToTreeNode,
} from '@astraflux/low-code-formily-transformer';
import { TreeNode, ITreeNode } from '@astraflux/low-code-core';
import { MonacoInput } from '@astraflux/low-code-react-settings-form';
export interface ISchemaEditorWidgetProps {
  tree: TreeNode;
  onChange?: (tree: ITreeNode) => void;
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(transformToSchema(props.tree), null, 2)}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value)));
      }}
      language="json"
      options={{
        // 代码可分小段折叠
        foldingStrategy: 'indentation',
      }}
    />
  );
};
