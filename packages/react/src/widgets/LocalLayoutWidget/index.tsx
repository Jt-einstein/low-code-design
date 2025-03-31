import React, { useState } from 'react';
import { isResourceHost, isResourceList, IResource } from 'low-code-core';
import { isFn } from 'low-code-shared';
import { observer } from '@formily/reactive-react';
import { usePrefix } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { TextWidget } from '../TextWidget';
import cls from 'classnames';
import './styles.less';
import { IResourceWidgetProps } from '../ResourceWidget';

export type ILocalLayoutWidgetProps = IResourceWidgetProps;

export const LocalLayoutWidget: React.FC<ILocalLayoutWidgetProps> = observer(
  (props) => {
    const prefix = usePrefix('local-layout');
    const [expand, setExpand] = useState(props.defaultExpand);
    const renderNode = (source: IResource) => {
      const { node, icon, title, thumb, span } = source;
      return (
        <div
          className={prefix + '-item'}
          style={{ gridColumnStart: `span ${span || 1}` }}
          key={node.id}
          data-designer-source-id={node.id}
        >
          {thumb && <img className={prefix + '-item-thumb'} src={thumb} />}
          {icon && React.isValidElement(icon) ? (
            <>{icon}</>
          ) : (
            <IconWidget
              className={prefix + '-item-icon'}
              infer={icon}
              style={{ width: 30, height: 30 }}
            />
          )}
          <span className={prefix + '-item-text'}>
            {
              <TextWidget>
                {title || node.children[0]?.getMessage('title')}
              </TextWidget>
            }
          </span>
        </div>
      );
    };
    const sources = props.sources.reduce<IResource[]>((buf, source) => {
      if (isResourceList(source)) {
        return buf.concat(source);
      } else if (isResourceHost(source)) {
        return buf.concat(source.Resource);
      }
      return buf;
    }, []);

    const remainItems =
      sources.reduce((length, source) => {
        return length + (source.span ?? 1);
      }, 0) % 3;
    return (
      <div
        className={cls(prefix, props.className, {
          expand,
        })}
      >
        <div
          className={prefix + '-header'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setExpand(!expand);
          }}
        >
          <div className={prefix + '-header-expand'}>
            <IconWidget infer="Expand" size={10} />
          </div>
          <div className={prefix + '-header-content'}>
            <TextWidget>{props.title}</TextWidget>
          </div>
        </div>
        <div className={prefix + '-content-wrapper'}>
          <div className={prefix + '-content'}>
            {sources.map(isFn(props.children) ? props.children : renderNode)}
            {remainItems ? (
              <div
                className={prefix + '-item-remain'}
                style={{ gridColumnStart: `span ${3 - remainItems}` }}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

LocalLayoutWidget.defaultProps = {
  defaultExpand: true,
};
