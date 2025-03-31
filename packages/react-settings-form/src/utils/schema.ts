import { Engine, TreeNode } from 'low-code-core';

export const getEngineTrees = (engine: Engine) => {
  return (engine?.workbench?.workspaces ?? []).map((workspace) => {
    return {
      ...workspace.operation.tree,
      title: workspace?.title,
      workspaceId: workspace?.id,
    } as TreeNode & { title: string; workspaceId: string };
  });
};
