import { observer } from '@formily/reactive-react';
import { ArrayCards, ArrayTable, Text } from 'low-code-formily-antd';
import {
  CompositePanel,
  Designer,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
} from 'low-code-react';
import { SettingsForm } from 'low-code-react-settings-form';
import React from 'react';
import { getBaseComponents, getLayoutComponents } from './const/components';
import { LowCodeDesignerProps } from './type';
import { Locales } from './const/locales';
import { GlobalRegistry } from 'low-code-core';
import { ConfigProvider as AConfigProvider } from 'antd';
import { Layout } from './widgets/layouts';
import { LocalFormworkWidget } from './widgets/LocalFormworkWidget';
import {
  useCustomComponentsToPanelContext,
  withCustomComponents,
} from './widgets/CustomComponents';
import './widgets/styles.less';
/* style */
import 'antd/dist/antd.less';
import './style.less';
import { FontSize } from 'packages/react/src/icons';
import {
  BarsOutlined,
  DeploymentUnitOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

GlobalRegistry.registerDesignerLocales(Locales);

export const LowCodeDesigner = observer(
  withCustomComponents(((props: LowCodeDesignerProps) => {
    const { designer, keepJustOneTab, extendForm, extendScope } = props;
    const baseComponents = getBaseComponents();
    const layoutComponents = getLayoutComponents();
    const { renderCustomComponentsPanel } = useCustomComponentsToPanelContext();

    return (
      <AConfigProvider prefixCls="ant">
        <Designer engine={designer?.engine}>
          <StudioPanel>
            <CompositePanel>
              <CompositePanel.Item
                title="panels.preComponent"
                icon={<DeploymentUnitOutlined style={{ fontSize: 20 }} />}
              >
                {[
                  {
                    content: baseComponents,
                    title: 'sources.Inputs',
                  },
                  {
                    content: layoutComponents,
                    title: 'sources.Layouts',
                  },
                  {
                    content: [ArrayCards, ArrayTable],
                    title: 'sources.Arrays',
                  },
                  {
                    content: [Text],
                    title: 'sources.Displays',
                  },
                ].map(({ content, title }, index) => (
                  <ResourceWidget title={title} sources={content} key={index} />
                ))}
              </CompositePanel.Item>
              {props?.isShowCustomComponents
                ? renderCustomComponentsPanel()
                : null}
              <CompositePanel.Item
                title="panels.OutlinedTree"
                icon={<BarsOutlined style={{ fontSize: 20 }} />}
              >
                <OutlineTreeWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                title="panels.History"
                icon={<HistoryOutlined style={{ fontSize: 20 }} />}
              >
                <HistoryWidget />
              </CompositePanel.Item>
            </CompositePanel>
            <Layout.CardLayout
              engine={designer?.engine}
              hideAdd={keepJustOneTab}
              extendScope={extendScope}
            />
            <SettingsPanel title="panels.PropertySettings">
              <SettingsForm extendForm={extendForm} />
            </SettingsPanel>
          </StudioPanel>
        </Designer>
      </AConfigProvider>
    );
  }) as React.FunctionComponent<LowCodeDesignerProps>)
);
