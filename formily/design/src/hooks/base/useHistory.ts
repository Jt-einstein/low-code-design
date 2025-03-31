import { TDesigner } from '../../type';

/** 处理历史记录功能 */
export const useHistory = (designer: TDesigner) => {
  /* 清除设计器历史记录 */
  const handleClearHistory = () => {
    (designer?.engine?.workbench?.workspaces ?? []).forEach((workspace) => {
      workspace?.history?.clear();
    });
  };

  return { handleClearHistory };
};
