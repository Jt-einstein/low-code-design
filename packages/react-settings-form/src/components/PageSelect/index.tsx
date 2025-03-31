import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useDesigner } from 'low-code-react';
import { observer } from '@formily/react';
import { EOperationBtnType } from 'low-code-extension';
import { getEngineTrees } from '../../utils';
import { TreeNode } from 'low-code-core';
export interface IProps {
  value?: string;
  actionType: string;
  isPage: boolean;
  onChange?: (color: string) => void;
}

export type ComponentNameMatcher =
  | string
  | string[]
  | ((name: string, node: TreeNode, context?: any) => boolean);

export const matchComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true;
  const componentName = node?.props?.['x-component'];
  if (typeof name === 'function')
    return name(componentName || '', node, context);
  if (Array.isArray(name)) return name.includes(componentName);
  return componentName === name;
};

export const PageSelect: React.FC<IProps> = observer((props) => {
  const Designer = useDesigner();
  const workspaces = Designer.workbench.workspaces;
  const currentWorkid = Designer.workbench.currentWorkspace.id;
  const [arr, setArr] = useState([]);
  const worker = workspaces.slice(0);
  const pageAction = () => {
    let templateArr = [];
    worker
      .filter((item) => (props?.isPage ? item.id !== currentWorkid : item.id))
      .forEach((item) => {
        templateArr.push({
          label: item?.props?.title,
          value: item.operation.tree?.id,
        });
      });
    setArr(templateArr);
  };

  const createOptions = (
    workspaceTitle: string,
    id: string,
    current: TreeNode,
    componentName: string
  ) => {
    if (matchComponent(current, componentName)) {
      return [
        {
          label: `${workspaceTitle}-${current.props['name'] || current.id}`,
          value: `${id}.${current.props['name'] || current.id}`,
        },
      ];
    }
    return [];
  };

  const getPagedDialogOptions = (
    tree: TreeNode[],
    workspaceTitle: string,
    id: string,
    componentName: string
  ): {
    label: string;
    value: string;
  }[] => {
    return (tree ?? []).reduce<
      {
        label: string;
        value: string;
      }[]
    >((total, current) => {
      const options = createOptions(workspaceTitle, id, current, componentName);
      if (current?.children?.length) {
        return [
          ...total,
          ...options,
          ...getPagedDialogOptions(
            current?.children,
            workspaceTitle,
            `${id}.${current.id}`,
            componentName
          ),
        ];
      }
      return [...total, ...options];
    }, []);
  };

  /* 从合并的schema中找出对应的组件-返回组件字段标识 */
  const dialogAction = (componentName) => {
    const trees = getEngineTrees(Designer);
    const dialogOptions = (trees ?? []).reduce((total, current) => {
      const options = getPagedDialogOptions(
        current.children || [],
        current?.title,
        current?.id,
        componentName
      );
      return [...total, ...options];
    }, []);
    setArr(dialogOptions);
  };

  const bindAction = (type) => {
    switch (type) {
      case EOperationBtnType.OPEN_PAGE:
        pageAction();
        break;
      case EOperationBtnType.PAGE_DIALOG:
        dialogAction('Modal');
        break;
      case EOperationBtnType.OPEN_SIDESHEET:
        dialogAction('SideSheet');
        break;
      case EOperationBtnType.OPEN_POPUP:
        dialogAction('MobilePopup');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    bindAction(props.actionType);
  }, [props.actionType]);
  return (
    <Select
      style={{ width: '140px' }}
      options={arr}
      value={props.value || ''}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
});
