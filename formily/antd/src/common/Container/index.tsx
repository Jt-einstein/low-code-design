import React from 'react';
import { observer } from '@formily/reactive-react';
import { DroppableWidget, useTreeNode } from 'low-code-react';
import './styles.less';

export const Container: React.FC = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>;
});

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    );
  };
};

export const withDroppableWidget = (
  Target: React.JSXElementConstructor<any>
) => {
  return observer((props) => {
    const node = useTreeNode();
    return (
      <Target {...props}>
        {!node.children.length ? <DroppableWidget /> : props.children}
      </Target>
    );
  });
};
