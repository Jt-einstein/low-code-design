import {
  Workspace,
  DesignerToolsWidget,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  WorkspacePanel,
  ComponentTreeWidget,
} from 'low-code-react';
import React from 'react';
import { TRenderViewProps } from '../../../type';
import {
  MarkupSchemaWidget,
  PreviewWidget,
  SchemaEditorWidget,
} from '../../../widgets';
import DesignerContainer from '../../../widgets/DesignerContainer';
import { EWorkbenchType } from '../../../const/enum';
import { getRenderViewComponents } from '../../../const/components';
import { observer } from '@formily/reactive-react';

export const RenderView: React.FunctionComponent<TRenderViewProps> = observer(
  (props) => {
    const { panekey, engine } = props;
    /** 组件组 */
    const components = getRenderViewComponents();

    return (
      <Workspace id={panekey}>
        <WorkspacePanel>
          <ToolbarPanel>
            <DesignerToolsWidget />
            <ViewToolsWidget
              use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW', 'ONLINE']}
            />
          </ToolbarPanel>
          <ViewportPanel>
            <ViewPanel type={EWorkbenchType.Desingable}>
              {() => (
                <DesignerContainer>
                  <ComponentTreeWidget components={components} />
                </DesignerContainer>
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
                  extendScope={props?.extendScope}
                  tree={tree}
                  engine={engine}
                />
              )}
            </ViewPanel>
            <ViewPanel type={EWorkbenchType.Preview}>
              {(tree) => (
                <PreviewWidget
                  extendScope={props?.extendScope}
                  tree={tree}
                  engine={engine}
                />
              )}
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
      </Workspace>
    );
  }
);
