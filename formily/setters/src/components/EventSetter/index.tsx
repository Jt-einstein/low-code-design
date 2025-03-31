import { observer } from '@formily/reactive-react';
import { Modal, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import './styles.less';

type EventSetterProps = {
  onChange: (value?) => void;
  events: string[];
  value: Record<string, string>;
};

export const defaultEvents = [
  'onChange',
  'onClick',
  'onDoubleClick',
  'onFocus',
  'onBlur',
];

/* 使用useState会出现设置值错误的问题 */
let eventsValue = null;

export const EventSetter: React.FunctionComponent<EventSetterProps> = observer(
  (props) => {
    const [visible, setVisible] = useState(false);
    const { value, events } = props;
    const [active, setActive] = useState((events ?? defaultEvents)?.[0]);

    const handleOk = () => {
      setVisible(false);
      props?.onChange?.(eventsValue);
    };

    useEffect(() => {
      eventsValue = JSON.parse(JSON.stringify(value ?? ''));
    }, [value]);

    return (
      <>
        <Button
          block
          onClick={() => {
            setVisible(true);
          }}
        >
          事件配置
        </Button>
        <Modal
          title="事件配置"
          open={visible}
          width={1600}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={handleOk}
          afterClose={() => {
            eventsValue = null;
          }}
          cancelText="取消"
          okText="保存"
        >
          <div className={'event-tabs'}>
            <ul className={'event-tabs-list'}>
              {(events ?? defaultEvents).map((item) => {
                return (
                  <li
                    key={item}
                    className={active === item ? 'active' : ''}
                    onClick={() => {
                      setActive(item);
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
            <div className={'event-tabs-content'}>
              {(events ?? defaultEvents).map((item) => {
                return (
                  <div
                    key={item}
                    style={{
                      display: active === item ? 'block' : 'none',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Editor
                      theme={'chrome-devtools'}
                      language={'javascript'}
                      options={{
                        glyphMargin: true,
                        minimap: {
                          enabled: false,
                        },
                        tabSize: 2,
                        smoothScrolling: true,
                        scrollbar: {
                          verticalScrollbarSize: 5,
                          horizontalScrollbarSize: 5,
                          alwaysConsumeMouseWheel: false,
                        },
                      }}
                      width="100%"
                      height="100%"
                      value={eventsValue?.[item]}
                      onChange={(value) => {
                        eventsValue = { ...eventsValue, [item]: value };
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </>
    );
  }
);
