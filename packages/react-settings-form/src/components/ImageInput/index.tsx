import React, { useContext } from 'react';
import { Input, Upload, InputProps } from 'antd';
import { usePrefix, IconWidget } from 'low-code-react';
import cls from 'classnames';
import './styles.less';

export interface ImageInputProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  className,
  style,
  ...props
}) => {
  const prefix = usePrefix('image-input');
  return (
    <div className={cls(prefix, className)} style={style}>
      <Input
        {...props}
        style={{ width: '100%' }}
        onChange={(e) => {
          props.onChange?.(e?.target?.['value']);
        }}
        prefix={
          <Upload
            // action={context.uploadAction}
            customRequest={async (options) => {
              // const url = await context.customRequest(options);
              // props.onChange?.(url);
            }}
            itemRender={() => null}
            maxCount={1}
          >
            <IconWidget infer="CloudUpload" style={{ cursor: 'pointer' }} />
          </Upload>
        }
      />
    </div>
  );
};

export const BackgroundImageInput: React.FC<ImageInputProps> = (props) => {
  const addBgValue = (value: any) => {
    if (/url\([^)]+\)/.test(value)) {
      return value;
    }
    return `url(${value})`;
  };
  const removeBgValue = (value: any) => {
    const matched = String(value).match(/url\(\s*([^)]+)\s*\)/);
    if (matched?.[1]) {
      return matched?.[1];
    }
    return value;
  };
  return (
    <ImageInput
      value={removeBgValue(props.value)}
      onChange={(url) => {
        props.onChange?.(addBgValue(url));
      }}
    />
  );
};
