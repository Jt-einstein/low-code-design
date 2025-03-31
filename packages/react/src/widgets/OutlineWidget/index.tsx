import React, { useRef, useLayoutEffect } from 'react';
import cls from 'classnames';
import {
  useTree,
  usePrefix,
  useOutline,
  useWorkbench,
  useDesigner,
} from '../../hooks';
import { observer } from '@formily/reactive-react';
import { OutlineTreeNode } from './OutlineNode';
import { Insertion } from './Insertion';
import { TreeNode, Viewport } from 'low-code-core';
import { NodeContext } from './context';
import { globalThisPolyfill } from 'low-code-shared';

export interface IOutlineTreeWidgetProps {
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  renderTitle?: (node: TreeNode) => React.ReactNode;
  renderActions?: (node: TreeNode) => React.ReactNode;
}

export const OutlineTreeWidget: React.FC<IOutlineTreeWidgetProps> = observer(
  ({ onClose, style, renderActions, renderTitle, className, ...props }) => {
    const ref = useRef<HTMLDivElement>();
    const prefix = usePrefix('outline-tree');
    const Designer = useDesigner();
    const currentWorkid = Designer.workbench.currentWorkspace.id;

    const tree = useTree(currentWorkid);
    const outline = useOutline(currentWorkid);
    const outlineRef = useRef<Viewport>();
    useLayoutEffect(() => {
      if (!currentWorkid) return;
      if (outlineRef.current && outlineRef.current !== outline) {
        outlineRef.current.onUnmount();
      }
      if (ref.current && outline) {
        outline.onMount(ref.current, globalThisPolyfill);
      }
      outlineRef.current = outline;
      return () => {
        outline?.onUnmount();
      };
    }, [currentWorkid, outline]);

    if (!outline || !currentWorkid) return null;
    return (
      <NodeContext.Provider value={{ renderActions, renderTitle }}>
        <div
          {...props}
          className={cls(prefix + '-container', className)}
          style={style}
        >
          <div className={prefix + '-content'} ref={ref}>
            <OutlineTreeNode node={tree} workspaceId={currentWorkid} />
            <div
              className={prefix + '-aux'}
              style={{
                pointerEvents: 'none',
              }}
            >
              <Insertion workspaceId={currentWorkid} />
            </div>
          </div>
        </div>
      </NodeContext.Provider>
    );
  }
);
