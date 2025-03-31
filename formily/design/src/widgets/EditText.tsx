import { isFn } from '@formily/shared';
import { Modal, Dropdown, Input } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, DashOutlined } from '@ant-design/icons';

type TEditTextProps = {
  value: string;
  onChange: (value: string) => void;
  isShowDropdown: boolean;
  onRemove: (id: string) => void;
  id: string;
};

export const EditText: React.FunctionComponent<TEditTextProps> = (props) => {
  const { onChange, onRemove, isShowDropdown, id } = props;
  const [inputValue, setInputValue] = useState(props?.value);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (val) => {
    if (isFn(onChange)) {
      onChange(val);
    }
  };

  const handleCalcStrLength = (value: string) => {
    if (!value) {
      return 0;
    }
    const cnLen = value.match(/[\u4E00-\u9FA5]/g)?.length;
    return cnLen * 2 + value.replace(/[\u4E00-\u9FA5]/g, '')?.length;
  };

  const options = [
    {
      label: '编辑',
      icon: <EditOutlined />,
      onClick: () => {
        setIsEditing(true);
      },
      key: '1-1',
    },
    {
      label: '删除',
      icon: <DeleteOutlined />,
      disabled: id.includes('主界面') || id.includes('main'),
      onClick: () => {
        Modal?.info({
          title: '确定要删除此页面吗?',
          onOk() {
            onRemove(id);
          },
        });
      },
      key: '1-2',
    },
  ];

  const render = () => {
    if (isEditing) {
      return (
        <Input
          value={inputValue}
          style={{
            height: '22px',
            lineHeight: '22px',
            width: handleCalcStrLength(inputValue) * 7 + 16,
            color: '#fff',
          }}
          className={'edit-input'}
          onInput={(evt) => {
            setInputValue((evt?.target as HTMLInputElement)?.value);
          }}
          onKeyDown={(evt) => {
            if (
              evt?.keyCode === 13 ||
              evt?.key === 'Enter' ||
              evt?.code === 'Enter'
            ) {
              setIsEditing(false);
              handleChange(inputValue);
            }
          }}
          onBlur={() => {
            setIsEditing(false);
            handleChange(inputValue);
          }}
          size="small"
          bordered={false}
        />
      );
    }
    return <span>{props?.value}</span>;
  };

  return (
    <>
      {render()}
      {isShowDropdown ? (
        <Dropdown
          menu={{
            items: options,
            style: { width: 80 },
          }}
          placement="bottom"
        >
          <DashOutlined />
        </Dropdown>
      ) : null}
    </>
  );
};
