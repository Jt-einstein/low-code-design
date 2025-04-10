import { AppendNodeEvent, TreeNode } from '@astraflux/low-code-core';
import { useDesigner } from '@astraflux/low-code-react';
import { matchComponent, matchChildComponent } from '../shared';

export const useDropTemplate = (
  name: string,
  getChildren: (source: TreeNode[]) => TreeNode[]
) => {
  return useDesigner((designer) => {
    return (designer as any).subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data;
      if (Array.isArray(target)) return;
      if (!Array.isArray(source)) return;
      if (
        matchComponent(
          target,
          (key) =>
            key === name &&
            source.every((child) => !matchChildComponent(child, name))
        ) &&
        target.children.length === 0
      ) {
        target.setChildren(...getChildren(source));
        return false;
      }
    });
  });
};
