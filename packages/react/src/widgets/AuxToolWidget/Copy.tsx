import React from 'react';
import { TreeNode } from 'low-code-core';
import { useOperation, usePrefix } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { Button } from 'antd';
export interface ICopyProps {
  node: TreeNode;
  style?: React.CSSProperties;
}

export const Copy: React.FC<ICopyProps> = ({ node, style }) => {
  const operation = useOperation();
  const prefix = usePrefix('aux-copy');
  if (node === node.root) return null;
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        operation.cloneNodes([node]);
      }}
    >
      <IconWidget infer="Clone" />
    </Button>
  );
};

Copy.displayName = 'Copy';
