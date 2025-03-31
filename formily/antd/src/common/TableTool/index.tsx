import React from 'react';
import { NodeActionsWidget } from 'low-code-react';

export interface ITemplateAction {
  title: React.ReactNode;
  tooltip?: React.ReactNode;
  icon?: string | React.ReactNode;
  onClick: () => void;
}

export interface ITableToolProps {
  className?: string;
  style?: React.CSSProperties;
  actions?: ITemplateAction[];
}

export const TableTool: React.FC<ITableToolProps> = (props) => {
  return (
    <NodeActionsWidget>
      {props.actions?.map((action, key) => {
        return <NodeActionsWidget.Action {...action} key={key} />;
      })}
    </NodeActionsWidget>
  );
};
