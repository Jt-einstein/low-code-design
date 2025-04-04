import React, { useRef, useContext, useEffect } from 'react';
import {
  TreeNode,
  ClosestPosition,
  CursorStatus,
  DragMoveEvent,
} from 'low-code-core';
import { isFn } from 'low-code-shared';
import { autorun } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import {
  usePrefix,
  useCursor,
  useSelection,
  useOutlineDragon,
  useDesigner,
} from '../../hooks';
import { IconWidget } from '../IconWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';
import { NodeContext } from './context';
import cls from 'classnames';
import './styles.less';
import { COperationTypeName } from 'low-code-extension';
import { Dropdown, Input } from 'antd';

export interface IOutlineTreeNodeProps {
  node: TreeNode;
  style?: React.CSSProperties;
  className?: string;
  workspaceId?: string;
}

export const OutlineTreeNode: React.FC<IOutlineTreeNodeProps> = observer(
  ({ node, className, style, workspaceId }) => {
    const prefix = usePrefix('outline-tree-node');
    const engine = useDesigner();
    const ref = useRef<HTMLDivElement>();
    const ctx = useContext(NodeContext);
    const request = useRef(null);
    const cursor = useCursor();
    const selection = useSelection(workspaceId);
    const outlineDragon = useOutlineDragon(workspaceId);

    useEffect(() => {
      if (request.current) {
        clearTimeout(request.current);
      }
      return engine.subscribeTo(DragMoveEvent, () => {
        const closestNodeId = outlineDragon?.closestNode?.id;
        const closestDirection = outlineDragon?.closestDirection;
        const id = node.id;
        if (!ref.current) return;
        if (
          closestNodeId === id &&
          closestDirection === ClosestPosition.Inner
        ) {
          if (!ref.current.classList.contains('droppable')) {
            ref.current.classList.add('droppable');
          }
          if (!ref.current.classList.contains('expanded')) {
            if (request.current) {
              clearTimeout(request.current);
              request.current = null;
            }
            request.current = setTimeout(() => {
              ref.current.classList.add('expanded');
            }, 600);
          }
        } else {
          if (request.current) {
            clearTimeout(request.current);
            request.current = null;
          }
          if (ref.current.classList.contains('droppable')) {
            ref.current.classList.remove('droppable');
          }
        }
      });
    }, [node, outlineDragon, cursor]);

    useEffect(() => {
      return autorun(() => {
        const selectedIds = selection?.selected || [];
        const id = node.id;
        if (!ref.current) return;
        if (selectedIds.includes(id)) {
          if (!ref.current.classList.contains('selected')) {
            ref.current.classList.add('selected');
          }
        } else {
          if (ref.current.classList.contains('selected')) {
            ref.current.classList.remove('selected');
          }
        }
        if (cursor.status === CursorStatus.Dragging) {
          if (ref.current.classList.contains('selected')) {
            ref.current.classList.remove('selected');
          }
        }
      });
    }, [node, selection]);

    if (!node) return null;

    const renderIcon = (node: TreeNode) => {
      const icon = node.designerProps.icon;
      if (icon) {
        return <IconWidget infer={icon} />;
      }
      if (node === node?.root) {
        return <IconWidget infer="Page" size={16} />;
      } else if (node.designerProps?.droppable) {
        return <IconWidget infer="Container" size={12} />;
      }
      return <IconWidget infer="Component" size={12} />;
    };

    const renderTitle = (node: TreeNode, classNamePrefix: string) => {
      const { operationType } = node?.props?.['x-component-props'] || {};
      const { run } = node?.props?.['x-reactions']?.fulfill || {};
      const title = node?.props?.title
        ? node?.props?.title
        : node?.props?.['x-component-props']?.title;
      if (isFn(ctx.renderTitle)) return ctx.renderTitle(node);

      const runScript = (script) => (
        <div className={classNamePrefix + '-run-script'}>
          <Input.TextArea
            readOnly
            style={{ width: 650, height: 400 }}
            value={script}
            onClick={(e) => {
              /** 阻止冒泡，点击时不关闭 */
              e.stopPropagation();
            }}
          />
        </div>
      );

      return (
        <span>
          <NodeTitleWidget node={node} />
          <span className={classNamePrefix + '-remark'}>
            {title
              ? `-${title}`
              : operationType
              ? `-${COperationTypeName[operationType]}`
              : null}
          </span>
          {run ? (
            <Dropdown overlay={runScript(run)}>
              <span className={classNamePrefix + '-js'}>js</span>
            </Dropdown>
          ) : null}
        </span>
      );
    };

    const renderActions = (node: TreeNode) => {
      if (isFn(ctx.renderActions)) return ctx.renderActions(node);
    };

    return (
      <div
        style={style}
        ref={ref}
        className={cls(prefix, className, 'expanded')}
        data-designer-outline-node-id={node.id}
      >
        <div className={prefix + '-header'}>
          <div
            className={prefix + '-header-head'}
            style={{
              left: -node.depth * 32,
              width: node.depth * 32,
            }}
          ></div>
          <div className={prefix + '-header-content'}>
            <div className={prefix + '-header-base'}>
              {(node?.children?.length > 0 || node === node.root) && (
                <div
                  className={prefix + '-expand'}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (ref.current?.classList?.contains('expanded')) {
                      ref.current?.classList.remove('expanded');
                    } else {
                      ref.current?.classList.add('expanded');
                    }
                  }}
                >
                  <IconWidget infer="Expand" size={10} />
                </div>
              )}
              <div className={prefix + '-icon'}>{renderIcon(node)}</div>
              <div className={prefix + '-title'}>
                {renderTitle(node, prefix)}
              </div>
            </div>
            <div
              className={prefix + '-header-actions'}
              data-click-stop-propagation
            >
              {renderActions(node)}
              {node !== node.root && (
                <IconWidget
                  className={cls(prefix + '-hidden-icon', {
                    hidden: node.hidden,
                  })}
                  infer={node.hidden ? 'EyeClose' : 'Eye'}
                  size={14}
                  onClick={() => {
                    node.hidden = !node.hidden;
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={prefix + '-children'}>
          {node.children?.map((child) => {
            return (
              <OutlineTreeNode
                node={child}
                key={child.id}
                workspaceId={workspaceId}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
