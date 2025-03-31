import React from 'react';
import {
  Workspace,
  ViewPanel,
  ViewportPanel,
  WorkspacePanel,
  ComponentTreeWidget,
} from 'low-code-react';
import { Popover, Tabs } from 'antd';
import { observer } from '@formily/reactive-react';
import DesignerContainer from '../../../DesignerContainer';
import { SchemaEditorWidget } from '../../../SchemaEditorWidget';
import { CssEditorWidget } from '../../../CssEditorWidget';
import { MarkupSchemaWidget } from '../../../MarkupSchemaWidget';
import { PreviewWidget } from '../../../PreviewWidget';
import { TViewTabsProps } from 'formily/design/src/type';
import { EWorkbenchType } from '../../../../const/enum';
import { EditText } from '../../../EditText';
import { useTabs } from '../../../../hooks';
import { getRenderViewComponents } from '../../../../const/components';
import { lcPrefix } from 'low-code-extension';
import { useCustomComponentsToDesignContext } from '../../../CustomComponents';
import './styles.less';
import { LockOutlined, PlusOutlined } from '@ant-design/icons';

export const ViewTabs: React.FunctionComponent<TViewTabsProps> = observer(
  (props) => {
    const { engine, hideAdd, extendScope } = props;
    const activeKey = engine?.workbench?.currentWorkspace?.id;
    const customComponents = useCustomComponentsToDesignContext();
    /** 组件组 */
    const components = getRenderViewComponents();
    const {
      handleChangeTabName,
      handleChangeTab,
      handleRemoveTab,
      handleAddTab,
    } = useTabs({
      engine,
    });

    const render = (_activeKey: string) => {
      return (
        <Workspace id={_activeKey}>
          <WorkspacePanel>
            <ViewportPanel>
              <ViewPanel type={EWorkbenchType.Desingable}>
                {() => (
                  <DesignerContainer>
                    <ComponentTreeWidget
                      components={{ ...components, ...customComponents }}
                    />
                  </DesignerContainer>
                )}
              </ViewPanel>
              <ViewPanel type={EWorkbenchType.Cssstyle}>
                {(tree, onChange) => (
                  <CssEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type={EWorkbenchType.Jsontree} scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type={EWorkbenchType.Makeup} scrollable={false}>
                {(tree) => (
                  <MarkupSchemaWidget
                    extendScope={extendScope}
                    tree={tree}
                    engine={engine}
                  />
                )}
              </ViewPanel>
              <ViewPanel type={EWorkbenchType.Preview}>
                {(tree) => (
                  <PreviewWidget
                    extendScope={extendScope}
                    tree={tree}
                    engine={engine}
                  />
                )}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
      );
    };

    if (engine?.workbench?.type === EWorkbenchType.Desingable) {
      return (
        <Tabs
          hideAdd={hideAdd}
          type="editable-card"
          onChange={handleChangeTab}
          activeKey={activeKey}
          className="view-tabs"
          size="small"
          destroyInactiveTabPane
          addIcon={<PlusOutlined onClick={handleAddTab} />}
        >
          {(engine?.workbench?.workspaces ?? []).map((workspace, index) => (
            <Tabs.TabPane
              tab={
                <span className={`${lcPrefix}-TabPane`}>
                  {!index && (
                    <Popover
                      content="主页面不允许删除"
                      title={null}
                      trigger="hover"
                      placement="top"
                    >
                      <LockOutlined />
                    </Popover>
                  )}
                  <EditText
                    value={workspace?.title}
                    onChange={handleChangeTabName}
                    id={workspace?.id}
                    isShowDropdown={workspace?.id === activeKey}
                    onRemove={handleRemoveTab}
                  />
                </span>
              }
              key={workspace?.id}
              closeIcon={<></>}
            >
              {render(workspace?.id)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      );
    }
    return <>{render(activeKey)}</>;
  }
);
