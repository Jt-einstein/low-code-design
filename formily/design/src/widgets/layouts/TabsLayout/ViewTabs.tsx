import React from 'react';
import { EWorkbenchType } from '../../../const/enum';
import { EditText } from '../../EditText';
import { useTabs } from '../../../hooks';
import { RenderView } from './RenderView';
import { TViewTabsProps } from '../../../type';
import { observer } from '@formily/reactive-react';
import { lcPrefix } from 'low-code-extension';
import { Popover, Tabs } from 'antd';
import './styles.less';
import { LockOutlined, PlusOutlined } from '@ant-design/icons';

export const ViewTabs: React.FunctionComponent<TViewTabsProps> = observer(
  (props) => {
    const { engine } = props;
    const activeKey = engine?.workbench?.currentWorkspace?.id;
    const {
      handleChangeTabName,
      handleChangeTab,
      handleRemoveTab,
      handleAddTab,
    } = useTabs({
      engine,
    });
    if (engine?.workbench?.type === EWorkbenchType.Desingable) {
      return (
        <Tabs
          type="editable-card"
          onChange={handleChangeTab}
          activeKey={activeKey}
          className="view-tabs-layout"
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
              <RenderView panekey={workspace?.id} {...props}>
                {props?.children}
              </RenderView>
            </Tabs.TabPane>
          ))}
        </Tabs>
      );
    }
    return (
      <RenderView panekey={activeKey} {...props}>
        {props?.children}
      </RenderView>
    );
  }
);
