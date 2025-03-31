import React from 'react';
import { Layout, LayoutProps } from 'antd';
import { observer } from '@formily/react';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC, DroppableWidget } from 'low-code-react';
import { VoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import cls from 'classnames';
import './styles.less';

const { Header, Sider, Content, Footer } = Layout;

type TLayout = typeof Layout;

type TAntdLayoutInstance = {
  Header?: TLayout['Header'];
  Sider?: TLayout['Sider'];
  Content?: TLayout['Content'];
  Footer?: TLayout['Footer'];
};

export const AntdLayout: DnFC<LayoutProps> & TAntdLayoutInstance = observer(
  (props) => {
    return (
      <Layout {...props} className={cls('antd-layout', props.className)}>
        {props.children || <DroppableWidget />}
      </Layout>
    );
  }
);

AntdLayout.Header = observer((props) => {
  return (
    <Header {...props} className={cls('antd-layout-header', props.className)}>
      {props.children || (
        <DroppableWidget style={{ height: '100%' }} height="100%" />
      )}
    </Header>
  );
});

AntdLayout.Sider = observer((props) => {
  return (
    <Sider {...props} className={cls('antd-layout-sider', props.className)}>
      {props.children || (
        <DroppableWidget
          style={{ height: '100%', minHeight: 60 }}
          height="100%"
        />
      )}
    </Sider>
  );
});

AntdLayout.Content = observer((props) => {
  return (
    <Content {...props} className={cls('antd-layout-content', props.className)}>
      {props.children || <DroppableWidget />}
    </Content>
  );
});

AntdLayout.Footer = observer((props) => {
  return (
    <Footer {...props} className={cls('antd-layout-footer', props.className)}>
      {props.children || <DroppableWidget />}
    </Footer>
  );
});

const voidFieldSchema = new VoidFieldSchema();

AntdLayout.Behavior = createBehavior(
  {
    name: 'AntdLayout',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'AntdLayout',
    designerProps: {
      droppable: true,
      propsSchema: voidFieldSchema.createSchema(),
    },
    designerLocales: AllLocales.AntdLayout,
  },
  {
    name: 'AntdLayout.Header',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'AntdLayout.Header',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'AntdLayout',
      propsSchema: voidFieldSchema.createSchema(),
    },
    designerLocales: AllLocales.AntdLayoutHeader,
  },
  {
    name: 'AntdLayout.Sider',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'AntdLayout.Sider',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'AntdLayout',
      propsSchema: voidFieldSchema.createSchema({
        component: AllSchemas.AntdLayout.Sider,
      }),
    },
    designerLocales: AllLocales.AntdLayoutSider,
  },
  {
    name: 'AntdLayout.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'AntdLayout.Content',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'AntdLayout',
      propsSchema: voidFieldSchema.createSchema(),
    },
    designerLocales: AllLocales.AntdLayoutContent,
  },
  {
    name: 'AntdLayout.Footer',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'AntdLayout.Footer',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'AntdLayout',
      propsSchema: voidFieldSchema.createSchema(),
    },
    designerLocales: AllLocales.AntdLayoutFooter,
  }
);

const LayoutResource = {
  componentName: 'Field',
  props: {
    type: 'void',
    // 'x-decorator': 'FormItem',
    'x-component': 'AntdLayout',
  },
};

const HeaderResource = {
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'AntdLayout.Header',
  },
};

const SiderResource = {
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'AntdLayout.Sider',
  },
};

const ContentResource = {
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'AntdLayout.Content',
  },
};

const FooterResource = {
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'AntdLayout.Footer',
  },
};

AntdLayout.Resource = createResource(
  {
    icon: 'FormLayoutSource',
    title: 'Header + Content + Footer',
    elements: [
      {
        ...LayoutResource,
        children: [HeaderResource, ContentResource, FooterResource],
      },
    ],
  },
  {
    icon: 'FormLayoutSource',
    title: 'Header + Sider + Content + Footer',
    elements: [
      {
        ...LayoutResource,
        children: [
          HeaderResource,
          {
            ...LayoutResource,
            children: [SiderResource, ContentResource],
          },
          FooterResource,
        ],
      },
    ],
  },
  {
    icon: 'FormLayoutSource',
    title: 'Sider + Header + Content + Footer',
    elements: [
      {
        ...LayoutResource,
        children: [
          SiderResource,
          {
            ...LayoutResource,
            children: [HeaderResource, ContentResource, FooterResource],
          },
        ],
      },
    ],
  },
  {
    icon: 'FormLayoutSource',
    elements: [LayoutResource],
  },
  {
    icon: 'FormLayoutSource',
    elements: [HeaderResource],
  },
  {
    icon: 'FormLayoutSource',
    elements: [SiderResource],
  },
  {
    icon: 'FormLayoutSource',
    elements: [ContentResource],
  },
  {
    icon: 'FormLayoutSource',
    elements: [FooterResource],
  }
);
