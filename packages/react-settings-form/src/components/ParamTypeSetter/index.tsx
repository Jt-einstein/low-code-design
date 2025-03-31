/**
 * @Author: 许伟茂
 * @Description: 参数类型自定义组件
 * @Date: 2022/08/12 17:40
 */
import React from 'react';
import { observer } from '@formily/react';
import { useCurrentNode, useWorkbench } from 'low-code-react';
import { Select } from 'antd';
import { ENodeType } from 'low-code-extension';
const { Option } = Select;

/** 组件参数 */
export interface IParamTypeSetterProps {
  /** 参数值 */
  value?: string;
  /** 改变事件 */
  onChange?: (value: string) => void;
}

/** 参数类型自定义组件 */
export const ParamTypeSetter: React.FC<IParamTypeSetterProps> = observer(
  (props) => {
    const { value, onChange } = props;
    const workbench = useWorkbench();
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace;
    const currentWorkspaceId = currentWorkspace?.id;
    const node = useCurrentNode(currentWorkspaceId);
    const nodeType = node?.parent?.props?.['x-component'];

    let options = [
      { label: '自定义', value: 'custom' },
      { label: '查询入参', value: 'query' },
      { label: '提交入参', value: 'commit' },
    ];
    // 查询入参
    if (
      [ENodeType.QUERY_AREA_PARENT, ENodeType.QUERY_AREA].includes(nodeType)
    ) {
      options = options.filter(({ value }) =>
        ['custom', 'query'].includes(value)
      );
    } else {
      // 提交入参
      options = options.filter(({ value }) =>
        ['custom', 'commit'].includes(value)
      );
    }

    return (
      <>
        <Select defaultValue={value || 'custom'} onChange={onChange}>
          {options.map(({ label, value }) => {
            return (
              <Option key={value} value={value || ''}>
                {label}
              </Option>
            );
          })}
          ;
        </Select>
      </>
    );
  }
);
