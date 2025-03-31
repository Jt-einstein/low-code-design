import React from 'react';
import { Tabs, TabsProps } from 'antd';
import './styles.less';
import * as antd from '@formily/antd';
import * as core from '@formily/core';
import * as react from '@formily/react';
import * as reactive from '@formily/reactive';
import * as reactiveReact from '@formily/reactive-react';
import * as shared from '@formily/shared';

export const Formily = {
  Core: core,
  React: react,
  Reactive: reactive,
  Antd: antd,
  ReactiveReact: reactiveReact,
  Shared: shared,
};

export const withCenterLayout = (Component: typeof Tabs) => {
  const tabs = (props: TabsProps) => {
    if (!props?.centered) {
      return <Component {...props} />;
    }
    return (
      <div className={'width-center-layout-outer'}>
        <Component {...props} />
      </div>
    );
  };
  tabs.TabPane = Component.TabPane;
  return tabs;
};
