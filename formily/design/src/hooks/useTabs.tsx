import { Engine, IWorkspaceProps } from 'low-code-core';
import { useEffect } from 'react';

export type TtabProps = {
  title: string;
  key: string;
};

export type TworkProps = IWorkspaceProps & {
  istab?: boolean;
  tabname?: string;
  pageid?: string;
};

export type TUseTabsProps = {
  engine: Engine;
};

export const createTabName = (len: number) => {
  if (!len) {
    return { title: '主界面', tag: 'main' };
  }
  return { title: `页面${len}`, tag: 'page' };
};

export const createWorkspaceId = (tag: string) => {
  return `${Date.now()}-${tag}`;
};

export function useTabs(props: TUseTabsProps) {
  const { engine } = props;

  /* 新增tab */
  const handleAddTab = () => {
    const { title, tag } = createTabName(engine?.workbench?.workspaces?.length);
    const workspaceId = createWorkspaceId(tag);
    engine.workbench.addWorkspace({
      id: workspaceId,
      title,
    });
  };

  /* 删除tab */
  const handleRemoveTab = (id: string) => {
    engine.workbench.removeWorkspace(id);
  };

  /* 切换tab */
  const handleChangeTab = (id: string) => {
    engine.workbench.switchWorkspace(id);
    engine.workbench.setActiveWorkspace(id);
  };

  /** 标签名变更 */
  const handleChangeTabName = (value: string) => {
    engine.workbench.currentWorkspace.props.title = value;
    engine.workbench.currentWorkspace.title = value;
  };

  useEffect(() => {
    if (!engine?.workbench?.workspaces?.length) {
      handleAddTab();
    }
    const defaultActiveId = engine?.workbench?.workspaces?.[0]?.id;
    /* 默认选第一个 */
    engine.workbench.switchWorkspace(defaultActiveId);
  }, []);

  return {
    handleChangeTab,
    handleAddTab,
    handleRemoveTab,
    handleChangeTabName,
  };
}
