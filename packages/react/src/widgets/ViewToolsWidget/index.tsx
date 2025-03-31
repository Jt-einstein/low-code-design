import React from 'react';
import { observer } from '@formily/reactive-react';
import { WorkbenchTypes } from 'low-code-core';
import { IconWidget } from '../IconWidget';
import { useWorkbench } from '../../hooks';
import { Radio, Tooltip } from 'antd';
import storage from '../../utils';
import { utils } from 'low-code-extension';
export interface IViewToolsWidget {
  use?: WorkbenchTypes[];
  style?: React.CSSProperties;
  className?: string;
}

export const ViewToolsWidget: React.FC<IViewToolsWidget> = observer(
  ({ use }) => {
    const workbench = useWorkbench();
    return (
      <Radio.Group
        size="small"
        onChange={(e) => (workbench.type = e.target.value)}
        value={workbench.type}
      >
        {use.includes('DESIGNABLE') && (
          <Radio.Button value={'DESIGNABLE'}>
            <Tooltip title="设计">
              <IconWidget infer="Design" />
            </Tooltip>
          </Radio.Button>
        )}
        {use.includes('CSSSTYLE') && (
          <Radio.Button value={'CSSSTYLE'}>
            <Tooltip title="样式">
              <IconWidget infer="Container" />
            </Tooltip>
          </Radio.Button>
        )}
        {use.includes('JSONTREE') && (
          <Radio.Button value={'JSONTREE'}>
            <Tooltip title="查看json">
              <IconWidget infer="JSON" />
            </Tooltip>
          </Radio.Button>
        )}
        {use.includes('MARKUP') && (
          <Radio.Button value={'MARKUP'}>
            <Tooltip title="查看代码">
              <IconWidget infer="Code" />
            </Tooltip>
          </Radio.Button>
        )}
        {use.includes('PREVIEW') && (
          <Radio.Button value={'PREVIEW'}>
            <Tooltip title="预览">
              <IconWidget infer="Play" />
            </Tooltip>
          </Radio.Button>
        )}
      </Radio.Group>
    );
  }
);

ViewToolsWidget.defaultProps = {
  use: ['DESIGNABLE', 'CSSSTYLE', 'JSONTREE', 'MARKUP', 'PREVIEW', 'ONLINE'],
};
