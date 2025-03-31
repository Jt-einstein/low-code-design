import React from 'react';
import { Space, Divider, Button } from 'antd';
import { observer } from '@formily/reactive-react';
import { WorkbenchTypes } from 'low-code-core';
import { IconWidget } from '../IconWidget';
import { usePrefix, useWorkbench } from '../../hooks';
import cls from 'classnames';

export interface ITableToolsWidget {
  use?: WorkbenchTypes[];
  style?: React.CSSProperties;
  className?: string;
}

export const TableToolsWidget: React.FC<ITableToolsWidget> = observer(
  ({ use, style, className }) => {
    const workbench = useWorkbench();
    const prefix = usePrefix('view-tools');
    return (
      <Space
        split={<Divider type="vertical" />}
        style={style}
        className={cls(prefix, className)}
      >
        {use.includes('ADD') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'DESIGNABLE';
            }}
            size="small"
          >
            <IconWidget infer="add" />
            新增
          </Button>
        )}
        {use.includes('SAVE') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'JSONTREE';
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
            保存
          </Button>
        )}
        {use.includes('EDIT') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'JSONTREE';
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
            编辑
          </Button>
        )}
        {use.includes('DELETE') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'JSONTREE';
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
            删除
          </Button>
        )}
        {use.includes('RESET') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'JSONTREE';
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
            重置
          </Button>
        )}
        {use.includes('REFRESH') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'MARKUP';
            }}
            size="small"
          >
            <IconWidget infer="Code" />
            刷新
          </Button>
        )}
        {use.includes('PRINT') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'MARKUP';
            }}
            size="small"
          >
            <IconWidget infer="Code" />
            打印
          </Button>
        )}
        {use.includes('BACK') && (
          <Button
            type="primary"
            ghost
            onClick={() => {
              workbench.type = 'PREVIEW';
            }}
            size="small"
          >
            <IconWidget infer="Play" />
            返回
          </Button>
        )}
      </Space>
    );
  }
);

TableToolsWidget.defaultProps = {
  use: ['ADD', 'SAVE', 'DELETE', 'EDIT', 'PREVIEW'],
};
