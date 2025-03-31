import { TDesigner } from '../type';

/** 检验是否修改过schema */
export const useModified = (designer: TDesigner) => {
  const handleModified = () => {
    return (designer?.engine?.workbench?.workspaces ?? []).some(
      (tab) =>
        [...(tab?.history?.list() ?? [])].filter(
          (item) => item?.type && item?.type !== 'from:node'
        )?.length
    );
  };
  return { handleModified };
};
