import { useContext } from 'react';
import { useDesigner } from './useDesigner';
import { WorkspaceContext } from '../context';
import { Workspace } from '@astraflux/low-code-core';
import { globalThisPolyfill } from '@astraflux/low-code-shared';

export const useWorkspace = (id?: string): Workspace => {
  const designer = useDesigner();
  const workspaceId = id || useContext(WorkspaceContext)?.id;
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId);
  }
  if (globalThisPolyfill['__DESIGNABLE_WORKSPACE__'])
    return globalThisPolyfill['__DESIGNABLE_WORKSPACE__'];
  return designer.workbench.currentWorkspace;
};
