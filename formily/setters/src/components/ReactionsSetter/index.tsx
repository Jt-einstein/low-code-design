import React, { useEffect, useMemo, useState } from 'react';
import { clone, uid } from '@formily/shared';
import { createForm, Field, isVoidField, onFormMount } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { GlobalRegistry } from 'low-code-core';
import { utils } from 'low-code-extension';
import { requestIdle } from 'low-code-shared';
import { TextWidget, usePrefix } from 'low-code-react';
import { MonacoInput } from 'low-code-react-settings-form';
import {
  ArrayTable,
  Form,
  FormCollapse,
  FormItem,
  Input,
  Radio,
  Select,
  Space,
} from '@formily/antd';
import { PathSelector } from './PathSelector';
import { FieldPropertySetter } from './FieldPropertySetter';
import { RunHelper, FulfillRunHelper } from './helpers';
import { IReaction } from './types';
import { Tag, Tooltip, Card, message, Modal, Button } from 'antd';
import {
  Toast,
  Modal as MobileDialog,
  Modal as MobileModal,
  Popup as MobilePopup,
} from 'antd-mobile';
import './styles.less';
export interface IReactionsSetterProps {
  value?: IReaction;
  onChange?: (value: IReaction) => void;
}
const TypeView = ({ value }) => {
  const text = String(value);
  if (text.length <= 26) return <Tag>{text}</Tag>;
  return (
    <Tag>
      <Tooltip
        title={
          <div style={{ fontSize: 12 }}>
            <code>
              <pre style={{ whiteSpace: 'pre-wrap', padding: 0, margin: 0 }}>
                {text}
              </pre>
            </code>
          </div>
        }
      >
        {text.substring(0, 24)}...
      </Tooltip>
    </Tag>
  );
};

const SchemaField = createSchemaField({
  components: {
    Card,
    FormCollapse,
    Input,
    TypeView,
    Radio,
    Select,
    FormItem,
    PathSelector,
    FieldPropertySetter,
    ArrayTable,
    MonacoInput,
    Space,
  },
});

const FieldStateProperties = [
  'value',
  'initialValue',
  'inputValue',
  'inputValues',
  'modified',
  'initialized',
  'title',
  'description',
  'mounted',
  'unmounted',
  'active',
  'visited',
  'loading',
  'errors',
  'warnings',
  'successes',
  'feedbacks',
  'valid',
  'invalid',
  'pattern',
  'display',
  'disabled',
  'readOnly',
  'readPretty',
  'visible',
  'hidden',
  'editable',
  'validateStatus',
  'validating',
];

const FieldStateValueTypes = {
  modified: 'boolean',
  initialized: 'boolean',
  title: 'string',
  description: 'string',
  mounted: 'boolean',
  unmounted: 'boolean',
  active: 'boolean',
  visited: 'boolean',
  loading: 'boolean',
  errors: 'string[]',
  warnings: 'string[]',
  successes: 'string[]',
  feedbacks: `Array<
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  type?: 'error' | 'success' | 'warning'
  code?:
    | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages?: string[]
>
`,
  valid: 'boolean',
  invalid: 'boolean',
  pattern: "'editable' | 'disabled' | 'readOnly' | 'readPretty'",
  display: "'visible' | 'hidden' | 'none'",
  disabled: 'boolean',
  readOnly: 'boolean',
  readPretty: 'boolean',
  visible: 'boolean',
  hidden: 'boolean',
  editable: 'boolean',
  validateStatus: "'error' | 'warning' | 'success' | 'validating'",
  validating: 'boolean',
};
export const ReactionsSetter: React.FC<IReactionsSetterProps> = (
  props: any
) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const [errInfo, seterrInfo] = useState(null);
  const prefix = usePrefix('reactions-setter');
  const form = useMemo(() => {
    return createForm({
      values: clone(props.value),
      effects: function () {
        onFormMount(() => {
          // console.log('props', props);
        });
      },
    });
  }, [modalVisible, props.value]);

  /** 默认展开依赖字段和动作响应 */
  const formCollapse = useMemo(
    () => FormCollapse.createFormCollapse(['run']),
    [modalVisible]
  );
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          setInnerVisible(true);
        },
        {
          timeout: 400,
        }
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);
  const handleKey = (e) => {
    if (e.keyCode === 27) {
      // 触发事件
      Modal.confirm({
        title: '退出前是否保存改动？',
        onOk: save,
        okText: '确认',
        cancelText: '取消',
      });
    }
  };

  useEffect(() => {
    if (modalVisible) {
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [modalVisible]);

  const formatObj = (str: string) => {
    return str && typeof str === 'string' && str.startsWith('const')
      ? str.replace(/[^\.\{$]+/, '')
      : str.toString();
  };

  const declareToString = (Compoentdeclare) => {
    let obj = {};
    for (const key in Compoentdeclare) {
      let depObj = {};
      for (const k in Compoentdeclare[key]) {
        depObj[k] = formatObj(Compoentdeclare[key][k]);
      }
      obj[key] = depObj;
    }
    return JSON.stringify(obj);
  };

  const save = () => {
    let timer = null;
    setLoading(true);
    timer && clearTimeout(timer);
    /* 这里的定时器1秒-对应的是MonacoInput编辑器组件中onDidChangeModelContent
    方法有一个实时变化的setTimeout，详情可全局搜索 MonacoInput 组件查看 */
    timer = setTimeout(() => {
      form.submit((values) => {
        props.onChange?.(values);
      });
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <>
      <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />
      </Button>
      <Modal
        className="reactionsSetter-modal"
        title={GlobalRegistry.getDesignerMessage(
          'SettingComponents.ReactionsSetter.configureReactions'
        )}
        width={document.body.clientWidth - 54}
        centered
        // transitionName=""
        // maskTransitionName=""
        keyboard={false}
        open={modalVisible}
        maskClosable={false}
        onCancel={closeModal}
        bodyStyle={{
          width: document.body.clientWidth - 54,
          padding: 0,
          height: document.body.clientHeight - 110,
          maxHeight: document.body.clientHeight - 110,
          overflowY: 'scroll',
        }}
        footer={
          <Space>
            <Button type="primary" onClick={save} loading={loading}>
              确认
            </Button>
            <Button onClick={closeModal}>取消</Button>
          </Space>
        }
      >
        <div className={prefix}>
          {innerVisible && (
            <Form form={form}>
              <SchemaField>
                <SchemaField.Void
                  x-component="FormCollapse"
                  x-component-props={{
                    formCollapse,
                    defaultActiveKey: ['run'],
                    style: { marginBottom: 10 },
                  }}
                >
                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      key: 'deps',
                      header: GlobalRegistry.getDesignerMessage(
                        'SettingComponents.ReactionsSetter.relationsFields'
                      ),
                    }}
                  >
                    <SchemaField.Array
                      name="dependencies"
                      default={[{}]}
                      x-component="ArrayTable"
                    >
                      <SchemaField.Object>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title: GlobalRegistry.getDesignerMessage(
                              'SettingComponents.ReactionsSetter.sourceField'
                            ),
                            width: 240,
                          }}
                        >
                          <SchemaField.String
                            name="source"
                            x-decorator="FormItem"
                            x-component="PathSelector"
                            x-component-props={{
                              dropdownMatchSelectWidth: false,
                              dropdownStyle: { width: '400px' },
                              placeholder: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.pleaseSelect'
                              ),
                            }}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title: GlobalRegistry.getDesignerMessage(
                              'SettingComponents.ReactionsSetter.sourceProperty'
                            ),
                            width: 200,
                          }}
                        >
                          <SchemaField.String
                            name="property"
                            default="value"
                            x-decorator="FormItem"
                            x-component="Select"
                            x-component-props={{ showSearch: true }}
                            enum={FieldStateProperties}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title: GlobalRegistry.getDesignerMessage(
                              'SettingComponents.ReactionsSetter.variableName'
                            ),
                            width: 200,
                          }}
                        >
                          <SchemaField.String
                            name="name"
                            x-decorator="FormItem"
                            x-validator={{
                              pattern: /^[$_a-zA-Z]+[$_a-zA-Z0-9]*$/,
                              message: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.variableNameValidateMessage'
                              ),
                            }}
                            x-component="Input"
                            x-component-props={{
                              addonBefore: '$deps.',
                              placeholder: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.pleaseInput'
                              ),
                            }}
                            x-reactions={(field: Field) => {
                              if (isVoidField(field)) return;
                              field.query('.source').take((source) => {
                                if (isVoidField(source)) return;
                                if (
                                  source.value &&
                                  !field.value &&
                                  !field.modified
                                ) {
                                  field.value =
                                    source.inputValues[1]?.props?.name ||
                                    `v_${uid()}`;
                                }
                              });
                            }}
                          />
                        </SchemaField.Void>

                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title: GlobalRegistry.getDesignerMessage(
                              'SettingComponents.ReactionsSetter.variableType'
                            ),
                            ellipsis: {
                              showTitle: false,
                            },
                            width: 200,
                            align: 'center',
                          }}
                        >
                          <SchemaField.String
                            name="type"
                            default="any"
                            x-decorator="FormItem"
                            x-component="TypeView"
                            x-reactions={(field: Field) => {
                              if (isVoidField(field)) return;
                              const property = field
                                .query('.property')
                                .get('inputValues');
                              /** 修复长度没有判断的问题 */
                              if (!property?.length) {
                                return;
                              }
                              property[0] = property[0] || 'value';
                              field.query('.source').take((source) => {
                                if (isVoidField(source)) return;
                                if (source.value) {
                                  if (
                                    property[0] === 'value' ||
                                    property[0] === 'initialValue' ||
                                    property[0] === 'inputValue'
                                  ) {
                                    field.value =
                                      source.inputValues[1]?.props?.type ||
                                      'any';
                                  } else if (property[0] === 'inputValues') {
                                    field.value = `any[]`;
                                  } else if (property[0]) {
                                    field.value =
                                      FieldStateValueTypes[property[0]];
                                  } else {
                                    field.value = 'any';
                                  }
                                }
                              });
                            }}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{
                            title: GlobalRegistry.getDesignerMessage(
                              'SettingComponents.ReactionsSetter.operations'
                            ),
                            align: 'center',
                            width: 120,
                          }}
                        >
                          <SchemaField.Void
                            x-component="Space"
                            x-component-props={{ align: 'center' }}
                          >
                            <SchemaField.Markup
                              type="void"
                              x-component="ArrayTable.Remove"
                            />
                          </SchemaField.Void>
                        </SchemaField.Void>
                      </SchemaField.Object>
                      <SchemaField.Void
                        title={GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.addRelationField'
                        )}
                        x-component="ArrayTable.Addition"
                        x-component-props={{ style: { marginTop: 8 } }}
                      />
                    </SchemaField.Array>
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      key: 'run',
                      header: (
                        <div>
                          {GlobalRegistry.getDesignerMessage(
                            'SettingComponents.ReactionsSetter.actionReactions'
                          )}
                          {errInfo && (
                            <span className="reaction-errors">
                              存在语法错误:{errInfo.line}行{errInfo.column}列
                            </span>
                          )}
                        </div>
                      ),
                      className: 'reaction-runner',
                    }}
                  >
                    <SchemaField.String
                      name="fulfill.run"
                      x-component="MonacoInput"
                      x-component-props={{
                        width: '100vw',
                        height: '100vh',
                        language: 'typescript',
                        helpCode: props.value?.componentName
                          ? RunHelper[props.value?.componentName]
                          : FulfillRunHelper,
                        options: {
                          minimap: {
                            enabled: false,
                          },
                        },
                        seterrInfo,
                      }}
                      x-reactions={(field) => {
                        const declares = `
                        declare var $Modal: ${declareToString(Modal)}
                        declare var $MobileDialog: ${declareToString(
                          MobileDialog
                        )} 
                        declare var $MobileModal: ${declareToString(
                          MobileModal
                        )}
                        declare var MobilePopup: ${declareToString(MobilePopup)}
                        declare var $message : ${declareToString(message)}
                        declare var $Toast : ${declareToString(Toast)}
                        declare var $utils:${declareToString(utils)};
                        `;
                        const deps = field.query('dependencies').value();
                        field.componentProps.extraLib = declares;
                        if (Array.isArray(deps)) {
                          field.componentProps.extraLib = `
                          declare var $deps : {
                            ${deps.map(({ name, type }) => {
                              if (!name) return '';
                              return `${name}?:${type || 'any'},`;
                            })}
                          }
                        }`.concat(declares);
                        }
                      }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      header: GlobalRegistry.getDesignerMessage(
                        'SettingComponents.ReactionsSetter.propertyReactions'
                      ),
                      key: 'state',
                      className: 'reaction-state',
                    }}
                  >
                    <SchemaField.Markup
                      name="fulfill.state"
                      x-component="FieldPropertySetter"
                      x-component-props={
                        {
                          formValue: form?.values,
                        } as any
                      }
                    />
                  </SchemaField.Void>
                </SchemaField.Void>
              </SchemaField>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};
