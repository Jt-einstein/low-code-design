import { Engine, TreeNode } from 'low-code-core';
import {
  IFormilySchema,
  transformToSchema,
} from 'low-code-formily-transformer';
import { message } from 'antd';
import { getEngineTrees as getEngine } from 'low-code-react-settings-form';

const DEFAULT_WORKSPACE_ID = 'main';
const DEFAULT_WORKSPACE_NAME = '主页面';
const DEFAULT_WORKSPACE_SORT = -1;

export const getEngineTrees = getEngine;

export const getEngineSchema = (engine: Engine) => {
  const trees = getEngineTrees(engine);
  const treeNode = handleMergeTree(trees);
  const schema = transformToSchema(treeNode);
  return schema;
};

export const handleTransferSchemaToJson = (schemas: IFormilySchema) => {
  return JSON.stringify(schemas);
};

export const handleMergeTree = (
  trees: (TreeNode & { title: string; workspaceId: string })[]
) => {
  return new TreeNode({
    children: (trees ?? []).reduce((total, item) => {
      const treeNode = new TreeNode({
        componentName: 'Field',
        props: {
          ...item?.props,
          title: item?.title,
          workspaceId: item?.workspaceId,
          type: 'void',
          id: item?.id,
        },
        id: item?.id,
        children: item?.children,
      });
      return [...total, treeNode];
    }, []),
    componentName: 'Form',
    props: { labelCol: 6, wrapperCol: 12 },
  });
};

const handleCreateWorkspaceSchema = (
  item,
  workspaceId: string,
  idx: number
) => {
  return {
    labelCol: 6,
    wrapperCol: 12,
    title: item?.tabname ?? DEFAULT_WORKSPACE_NAME,
    workspaceId: workspaceId,
    type: 'void',
    /* 如果不存在item?.tab则认为当前页面为主页面，序号为-1 */
    idx: item?.tabname ? idx : DEFAULT_WORKSPACE_SORT,
    properties: {
      [item?.['x-designable-id']]: item,
    },
  };
};

const handleAnalysisOldSchemaToWorkSpaces = (children: [string, any][]) => {
  return (children ?? []).reduce((total, [, item], idx) => {
    const workspaceId = item?.pageid ?? DEFAULT_WORKSPACE_ID;
    if (total?.[workspaceId]) {
      total[workspaceId].properties[item?.['x-designable-id']] = item;
      return total;
    }
    return {
      ...total,
      [workspaceId]: handleCreateWorkspaceSchema(item, workspaceId, idx),
    };
  }, {});
};

const handleAnalysisSchemaToWorkSpaces = (children: [string, any][]) => {
  return children?.reduce((total, [, item]) => {
    return { ...total, [item?.workspaceId]: item };
  }, {});
};

export const handleSplitSchema = (content: string) => {
  try {
    const schema: IFormilySchema = JSON.parse(content || '{}');
    const children = Object?.entries(schema?.schema?.properties);
    /* 如果子节点都是Object，则认为当前schema是新组件，执行新的解析逻辑 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (children.every(([_, item]) => item?.workspaceId)) {
      return handleAnalysisSchemaToWorkSpaces(children);
    }
    /* 兼容旧的解析逻辑 */
    return handleAnalysisOldSchemaToWorkSpaces(children);
  } catch (_) {
    message.error('解析导入文件出错');
  }
};
