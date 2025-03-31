import React, { useEffect, useMemo, useState } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { GlobalRegistry } from 'low-code-core';
import { requestIdle } from 'low-code-shared';
import { usePrefix, TextWidget } from 'low-code-react';
import { MonacoInput } from 'low-code-react-settings-form';
import { Form, FormCollapse } from '@formily/antd';
import { Modal, Button } from 'antd';
import { FuclickHelper } from './helpers';
import { IReaction } from './types';
import './styles.less';

export interface IButtonSetterProps {
  value?: IReaction;
  onChange?: (value: IReaction) => void;
}

const SchemaField = createSchemaField({
  components: {
    FormCollapse,
    MonacoInput,
  },
});

export const ButtonSetter: React.FC<IButtonSetterProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const prefix = usePrefix('reactions-setter');
  const form = useMemo(() => {
    return createForm({
      values: { click: props.value },
    });
  }, [modalVisible, props.value]);

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
  return (
    <>
      <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.ReactionsSetter.buttonReactions" />
      </Button>
      <Modal
        title={GlobalRegistry.getDesignerMessage(
          'SettingComponents.ReactionsSetter.buttonReactions'
        )}
        width="70%"
        centered
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={() => {
          form.submit((values) => {
            props.onChange?.(values?.click);
          });
          closeModal();
        }}
      >
        <div className={prefix}>
          {innerVisible && (
            <Form form={form}>
              <SchemaField>
                <SchemaField.String
                  name="click"
                  x-component="MonacoInput"
                  x-component-props={{
                    width: '100%',
                    height: 400,
                    language: 'typescript',
                    helpCode: FuclickHelper,
                    options: {
                      minimap: {
                        enabled: false,
                      },
                    },
                  }}
                />
              </SchemaField>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};
