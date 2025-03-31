import {
  DesignerToolsWidget,
  ToolbarPanel,
  ViewToolsWidget,
} from 'low-code-react';
import React from 'react';
import { observer } from '@formily/reactive-react';
import './styles.less';
import { ViewTabs } from '../ViewTabs';
import { TViewTabsProps } from 'formily/design/src/type';

export const ViewPort: React.FunctionComponent<TViewTabsProps> = observer(
  (props) => {
    const { engine, hideAdd, extendScope } = props;

    return (
      <div className={'view-port-wigdet'}>
        <div className={'view-port-wigdet-toolbar'}>
          <ToolbarPanel>
            <DesignerToolsWidget />
            <ViewToolsWidget
              use={[
                'DESIGNABLE',
                'CSSSTYLE',
                'JSONTREE',
                'MARKUP',
                'PREVIEW',
                'ONLINE',
              ]}
            />
          </ToolbarPanel>
        </div>
        <div className={'view-port-wigdet-workspace'}>
          <ViewTabs
            engine={engine}
            hideAdd={hideAdd}
            extendScope={extendScope}
          />
        </div>
      </div>
    );
  }
);
