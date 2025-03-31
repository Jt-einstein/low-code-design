import React, { memo } from 'react';
import {
  LowCodeDesigner,
  // withCenterLayout,
  hooks,
} from 'low-code-formily-design';
// import { Tabs } from 'antd';

// const AntdTabs = withCenterLayout(Tabs);
// const Workflow = React.lazy(() => import('./Workflow'));

const Designer = memo(() => {
  const { designer } = hooks.useDesignerLayout();

  return <LowCodeDesigner designer={designer} />;

  // return (
  //   <React.Suspense fallback={<div>loading...</div>}>
  //     <AntdTabs
  //       style={{ height: '100vh' }}
  //       defaultActiveKey="form"
  //       // centered
  //       tabBarStyle={{ margin: 0, height: 56 }}
  //       destroyInactiveTabPane={false}
  //     >
  //       <AntdTabs.TabPane
  //         tab={<div className={'tab-label'}>表单设计</div>}
  //         key="form"
  //       >
  //         <div className={'tab-pane'}>
  //           <LowCodeDesigner
  //             designer={designer}
  //             isUseAI
  //             isShowLocalTemplateComponents
  //           />
  //         </div>
  //       </AntdTabs.TabPane>
  //     </AntdTabs>
  //   </React.Suspense>
  // );
});

export default Designer;
