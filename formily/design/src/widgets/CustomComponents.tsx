import { CompositePanel, DnFC, ResourceWidget } from 'low-code-react';
import React from 'react';
import { useContext } from 'react';
import { TComponent } from '../type';
import { AppstoreOutlined } from '@ant-design/icons';

export type TCustomComponentsContext = {
  customComponents?: TComponent[];
};

export const CustomComponentsContext =
  React.createContext<TCustomComponentsContext>({} as TCustomComponentsContext);

/* 组装在设计器中使用的组件列表 */
export function useCustomComponentsToDesignContext() {
  const _components = useContext(CustomComponentsContext);
  return (_components?.customComponents ?? []).reduce(
    (componentsObj, { name, design }) => {
      return {
        ...componentsObj,
        [name]: design,
      };
    },
    {}
  );
}

/* 组装在预览器中使用的组件列表 */
export function useCustomComponentsToPreviewContext() {
  const _components = useContext(CustomComponentsContext);
  return (_components?.customComponents ?? []).reduce(
    (componentsObj, { name, preview }) => {
      return {
        ...componentsObj,
        [name]: preview,
      };
    },
    {}
  );
}

/* 组装在panel中使用的组件列表 */
export function useCustomComponentsToPanelContext() {
  const _components = useContext(CustomComponentsContext);
  const result = Object.entries(
    (_components?.customComponents ?? []).reduce((componentsObj, current) => {
      const currentTypeComponents = componentsObj?.[current?.type];
      if (!currentTypeComponents?.length) {
        return { ...componentsObj, [current?.type]: [current?.design] };
      }
      return {
        ...componentsObj,
        [current?.type]: [...currentTypeComponents, current?.design],
      };
    }, {} as { [key: string]: DnFC<{}>[] })
  ).map(([title, components]) => {
    return { title, components };
  });

  const renderCustomComponentsPanel = () => {
    return (
      <CompositePanel.Item
        title="panels.CustomUI"
        icon={<AppstoreOutlined style={{ fontSize: 20 }} />}
      >
        {(result ?? []).map((item) => {
          return (
            <ResourceWidget
              key={item?.title}
              title={item?.title}
              sources={item?.components}
            />
          );
        })}
      </CompositePanel.Item>
    );
  };

  return { renderCustomComponentsPanel };
}

export const CustomComponentsProvider: React.FunctionComponent<
  TCustomComponentsContext
> = (props) => {
  return (
    <CustomComponentsContext.Provider value={props}>
      {props.children}
    </CustomComponentsContext.Provider>
  );
};

export const withCustomComponents = <T,>(
  Component: React.FunctionComponent<T>
) => {
  return (props: TCustomComponentsContext & T) => {
    const { customComponents, ...childrenProps } = props;

    return (
      <CustomComponentsProvider {...{ customComponents }}>
        <Component {...(childrenProps as T)} />
      </CustomComponentsProvider>
    );
  };
};
