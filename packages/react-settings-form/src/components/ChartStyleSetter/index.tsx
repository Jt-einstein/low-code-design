import { observer, useField } from '@formily/react';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { MonacoInput } from '../MonacoInput';

export type ChartStyleSetterProps = {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
  helpCode?: string;
};

export const ChartStyleSetter: React.FC<ChartStyleSetterProps> = observer(
  (props) => {
    const { onChange, style, className, value, helpCode } = props;
    const [visible, setVisible] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setVisible(false);
        onChange(localValue);
      }, 1200);
    };

    useEffect(() => {
      setLocalValue(visible ? value : '');
    }, [visible]);

    return (
      <div className={className} style={{ width: '100%', ...style }}>
        <Button
          block
          onClick={() => {
            setVisible(true);
          }}
        >
          配置响应器
        </Button>
        <Modal
          title={'配置响应器'}
          width={1200}
          open={visible}
          okText="确定"
          okButtonProps={{ loading }}
          cancelText="取消"
          onCancel={() => {
            setVisible(false);
          }}
          onOk={handleOk}
          destroyOnClose
        >
          <MonacoInput
            language="javascript"
            helpCode={helpCode}
            height={600}
            value={localValue}
            onChange={(expression) => {
              setLocalValue(expression);
            }}
          />
        </Modal>
      </div>
    );
  }
);
