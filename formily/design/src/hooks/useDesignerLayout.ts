import { ISchema } from '@formily/json-schema';
import { isFn } from '@formily/shared';
import { createDesigner, KeyCode, Shortcut, Workspace } from 'low-code-core';
import { transformToTreeNode } from 'low-code-formily-transformer';
import { useMemo } from 'react';
import { EWorkbenchType } from '../const/enum';
import { getEngineSchema, handleSplitSchema } from '../utils/schema';
import { useTabs } from './useTabs';

export const useDesignerLayout = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler() {
              const btn: HTMLButtonElement = document.querySelector('#save');
              if (isFn(btn.click)) {
                btn.click();
              }
            },
          }),
          /** 切换预览和编辑态 */
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.D],
              [KeyCode.Control, KeyCode.D],
            ],
            handler(ctx) {
              ctx.workbench.type =
                ctx.workbench.type == EWorkbenchType.Desingable
                  ? EWorkbenchType.Preview
                  : EWorkbenchType.Desingable;
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  );
  const { handleAddTab } = useTabs({ engine });

  const getSchema = () => {
    return getEngineSchema(engine);
  };

  const handleSortWorkspaces = (workspaces: Record<string, any>) => {
    return Object.entries(workspaces)?.sort(([, prev], [, next]) => {
      return prev?.['idx'] - next?.['idx'];
    });
  };

  const transformToWorkspace = (
    workspaceSchema: ISchema & { workspaceId: string; id: string }
  ) => {
    const workspace = new Workspace(engine, {
      id: workspaceSchema?.workspaceId,
      title: workspaceSchema?.title,
    });
    workspace.operation.tree.from({
      ...transformToTreeNode({
        form: {
          labelCol: 6,
          wrapperCol: 12,
        },
        schema: {
          type: 'object',
          properties: workspaceSchema?.properties,
        },
      }),
      id: workspaceSchema?.id,
    });
    return workspace;
  };

  const setSchema = (content: string) => {
    engine?.workbench?.clearWorkspace();
    if (!content) {
      handleAddTab();
      return;
    }
    const workspaces: Record<string, any> = handleSplitSchema(content);
    engine.workbench.workspaces = (handleSortWorkspaces(workspaces) ?? []).map(
      ([, workspace]) => {
        return transformToWorkspace(workspace);
      }
    );
    /* 默认选择第0个 */
    engine.workbench.switchWorkspace(engine.workbench.workspaces?.[0]?.id);
  };

  const handleModified = () => {
    return (designer?.engine?.workbench?.workspaces ?? []).some(
      (tab) =>
        [...(tab?.history?.list() ?? [])].filter(
          (item) => item?.type && item?.type !== 'from:node'
        )?.length
    );
  };

  const designer = {
    getSchema,
    setSchema,
    engine,
    isModified: handleModified,
  };

  return { designer };
};
