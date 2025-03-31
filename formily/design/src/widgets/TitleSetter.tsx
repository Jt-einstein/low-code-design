import { isFn } from '@formily/shared';
import { Input, message } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';

import './styles.less';
import { DashOutlined } from '@ant-design/icons';

const DEFAULT_TITLE = '未命名表单';

export type TTitleSetterProps = {
  title: string;
  onChange: (title: string) => void;
  isEdit?: boolean;
};

export const TitleSetter: React.FunctionComponent<TTitleSetterProps> = memo(
  (props) => {
    const [isEditAreaVisible, setIsEditAreaVisible] = useState(props?.isEdit);
    const [title, setTitle] = useState(props?.title ?? DEFAULT_TITLE);
    const input = useRef(null);

    const handleChange = (value: string) => {
      if (!value) {
        return message.warning('标题不能为空');
      }
      if (isFn(props?.onChange)) {
        setIsEditAreaVisible(false);
        props?.onChange(value);
      }
    };

    useEffect(() => {
      if (isEditAreaVisible) {
        input?.current?.focus();
      }
    }, [isEditAreaVisible]);

    return (
      <div style={{ width: 240, display: 'block', padding: '14px 0' }}>
        {isEditAreaVisible ? (
          <Input
            ref={input}
            style={{ width: 208 }}
            value={title}
            onBlur={() => handleChange(title)}
            onChange={(evt) => {
              setTitle(evt?.target?.value);
            }}
          />
        ) : (
          <div className="layout-title">
            <span>{props?.title}</span>
            <DashOutlined
              onClick={() => {
                setIsEditAreaVisible(true);
              }}
              style={{ color: '#4471F6', fontSize: 20 }}
            />
          </div>
        )}
      </div>
    );
  }
);
