import React, { useEffect, useMemo } from 'react';
import { Form } from '@formily/antd';
import * as formilyCore from '@formily/core';
import * as formilyReact from '@formily/react';
import { cancelIdle, requestIdle } from 'low-code-shared';
import {
  IconWidget,
  NodePathWidget,
  useCurrentNode,
  useOperation,
  usePrefix,
  useSelected,
  useWorkbench,
} from 'low-code-react';
import { SchemaField } from './SchemaField';
import { ISettingFormProps } from './types';
import { SettingsFormContext } from './shared/context';
import { useLocales, useSnapshot } from './effects';
import cls from 'classnames';
import { Empty } from 'antd';
import './styles.less';

const GlobalState = {
  idleRequest: null,
};

/* 从SettingsForm中抽出来，防止无限制的循环渲染 */
const SettingsFormInner = (props) => {
  const { node, prefix, selected, schema, operation, currentWorkspaceId } =
    props;
  const isEmpty = !(
    node &&
    node.designerProps?.propsSchema &&
    selected.length === 1
  );

  const form = useMemo(() => {
    return formilyCore?.createForm({
      initialValues: node?.designerProps?.defaultProps,
      values: node?.props,
      effects() {
        useLocales(node);
        useSnapshot(operation);
      },
    });
  }, [node?.id]);

  useEffect(() => {
    props?.extendForm?.effects?.({ form, formilyCore });
  }, [node?.id]);

  const render = () => {
    if (!isEmpty) {
      return (
        <div
          className={cls(prefix, props.className)}
          style={props.style}
          key={node.id}
        >
          <SettingsFormContext.Provider value={props}>
            <Form
              form={form}
              colon={false}
              labelWidth={120}
              labelAlign="left"
              wrapperAlign="right"
              tooltipLayout="text"
            >
              <SchemaField
                schema={schema}
                components={props?.extendForm?.components}
                scope={{ $node: node, ...props.scope }}
              />
            </Form>
          </SettingsFormContext.Provider>
        </div>
      );
    }
    return (
      <div className={prefix + '-empty'}>
        <Empty />
      </div>
    );
  };

  return (
    <IconWidget.Provider tooltip>
      <div className={prefix + '-wrapper'}>
        {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}
        <div className={prefix + '-content'}>{render()}</div>
      </div>
    </IconWidget.Provider>
  );
};

const getSchema = (schema, node, extendSchema) => {
  if (extendSchema) {
    return extendSchema(schema, { node });
  }
  return schema;
};

export const SettingsForm: React.FC<ISettingFormProps> = formilyReact?.observer(
  (props) => {
    const workbench = useWorkbench();
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace;
    const currentWorkspaceId = currentWorkspace?.id;
    const operation = useOperation(currentWorkspaceId);
    const node = useCurrentNode(currentWorkspaceId);
    const selected = useSelected(currentWorkspaceId);
    const prefix = usePrefix('settings-form');
    const schema = getSchema(
      node?.designerProps?.propsSchema,
      node,
      props?.extendForm?.extendSchema
    );

    return (
      <SettingsFormInner
        {...{
          ...props,
          operation,
          selected,
          prefix,
          schema,
          node,
          currentWorkspaceId,
        }}
      />
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  }
);
