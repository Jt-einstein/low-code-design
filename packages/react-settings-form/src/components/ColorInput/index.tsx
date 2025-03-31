import React, { useRef } from 'react';
import { Input, Popover } from 'antd';
import { usePrefix } from 'low-code-react';
import { SketchPicker } from 'react-color';
import './styles.less';

export interface IColorInputProps {
  value?: string;
  onChange?: (color: string) => void;
  disabled?: boolean;
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>();
  const prefix = usePrefix('color-input');
  const color = props.value as string;
  return (
    <div ref={container} className={prefix}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        disabled={props.disabled}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            getPopupContainer={() => container.current}
            content={
              <SketchPicker
                presetColors={[
                  '#8C3A47',
                  '#D0021B',
                  '#F5A623',
                  '#F8E71C',
                  '#8B572A',
                  '#7ED321',
                  '#417505',
                  '#BD10E0',
                  '#9013FE',
                  '#4A90E2',
                  '#50E3C2',
                  '#B8E986',
                  '#000000',
                  '#4A4A4A',
                  '#9B9B9B',
                  '#FFFFFF',
                ]}
                color={color}
                onChange={({ rgb }) => {
                  props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
                }}
              />
            }
          >
            <div
              className={prefix + '-color-tips'}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  );
};
