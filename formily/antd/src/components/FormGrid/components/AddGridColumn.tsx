import React from 'react';
import { TreeNode } from 'low-code-core';
import { Button } from 'antd';
import { usePrefix } from 'low-code-react';
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export type TAddGridColumnProps = {
  node: TreeNode;
};

export const AddGridColumn: React.FC<TAddGridColumnProps> = ({ node }) => {
  const prefix = usePrefix('aux-merge');
  if (node === node.root) return null;
  const handleAdd = () => {
    const column = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormGrid.GridColumn',
      },
    });
    node.parent.append(column);
  };

  return (
    <div className={prefix}>
      <Button className={`${prefix}-button`} type="primary" onClick={handleAdd}>
        <Tooltip title="新增网格列">
          <PlusOutlined />
        </Tooltip>
      </Button>
    </div>
  );
};
