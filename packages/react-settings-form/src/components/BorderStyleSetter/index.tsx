import React, { Fragment, useMemo } from 'react';
import { usePrefix } from 'low-code-react';
import { camelCase } from '@formily/shared';
import { Select } from '@formily/antd';
import { observable } from '@formily/reactive';
import { Field as FieldType } from '@formily/core';
import { useField, Field, observer } from '@formily/react';
import { FoldItem } from '../FoldItem';
import { ColorInput } from '../ColorInput';
import { SizeInput } from '../SizeInput';
import { PositionInput } from '../PositionInput';
import cls from 'classnames';
import { SelectProps } from 'antd';
import './styles.less';

const Positions = ['center', 'top', 'right', 'bottom', 'left'];

const BorderStyleOptions = [
  {
    label: '默认样式',
    value: 'default',
  },
  {
    label: '无边框',
    value: 'none',
  },
  {
    label: <span className="border-style-solid-line" />,
    value: 'solid',
  },
  {
    label: <span className="border-style-dashed-line" />,
    value: 'dashed',
  },
  {
    label: <span className="border-style-dotted-line" />,
    value: 'dotted',
  },
];

const BorderSelect: React.FC<SelectProps> = (props) => {
  return <Select {...props} value={props.value || 'default'} />;
};

const createBorderProp = (position: string, key: string) => {
  const insert = position === 'center' ? '' : `-${position}`;
  return camelCase(`border${insert}-${key}`);
};

const parseInitPosition = (field: FieldType) => {
  const basePath = field.address.parent();
  for (let i = 0; i < Positions.length; i++) {
    const position = Positions[i];
    const stylePath = `${basePath}.${createBorderProp(position, 'style')}`;
    const widthPath = `${basePath}.${createBorderProp(position, 'width')}`;
    const colorPath = `${basePath}.${createBorderProp(position, 'color')}`;
    if (
      field.query(stylePath).value() ||
      field.query(widthPath).value() ||
      field.query(colorPath).value()
    ) {
      return position;
    }
  }
  return 'center';
};

/** 首字母大写 */
function upperFirstCase(value: string) {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

function getBorderKey(position: string) {
  return position === 'center' ? '' : upperFirstCase(position);
}

export interface IBorderStyleSetterProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BorderStyleSetter: React.FC<IBorderStyleSetterProps> = observer(
  ({ className, style }) => {
    const field = useField<FieldType>();
    const currentPosition = useMemo(
      () =>
        observable({
          value: parseInitPosition(field),
        }),
      [field.value]
    );
    const prefix = usePrefix('border-style-setter');

    const setBorderStyle = (position: string, field: FieldType) => {
      const pos = getBorderKey(position);
      const borderStyle = field.query(`.border${pos}Style`).take() as FieldType;
      const borderWidth = field.query(`.border${pos}Width`).take() as FieldType;
      const borderColor = field.query(`.border${pos}Color`).take() as FieldType;

      if (!borderStyle || !borderWidth || !borderColor) {
        return;
      }

      // 如果设置为“默认样式”或者 “无边框”，则禁用“线段宽度”配置项和“颜色”配置项，并清除其属性配置内容
      const disabled = [undefined, 'default', 'none'].includes(
        borderStyle.value
      );

      borderWidth.disabled = disabled;
      borderColor.disabled = disabled;

      // 为default时，将值改为undefined，样式才不会出现在style上
      if (borderStyle.value === 'default') {
        borderStyle.value = undefined;
      }

      borderWidth.value = disabled ? undefined : borderWidth.value || '1px';
      borderColor.value = disabled
        ? undefined
        : borderColor.value || 'rgba(196,208,221,1)';
    };

    const createReaction =
      (position: string, type: 'style' | 'width' | 'color') =>
      (field: FieldType) => {
        field.display =
          currentPosition.value === position ? 'visible' : 'hidden';

        if (type === 'style') {
          setBorderStyle(position, field);
        }

        // 以下代码是实现：当切换到center边框时，清空四个边框的值。当切换到四个边框时，清空center边框的值，有bug，所以注释，产品只需要满足以下要求：
        // 单独设置四个边框和统一设置边框没问题，但组合设置会有问题。需要分别设置4个边框的样式时需先把中间设置所有边框改为默认样式
        // const styleValue = field
        //   .query(`.border${getBorderKey(position)}Style`)
        //   .value();

        // if (
        //   currentPosition.value === 'center' &&
        //   styleValue &&
        //   styleValue !== 'default'
        // ) {
        //   const list =
        //     position === 'center'
        //       ? ['top', 'right', 'bottom', 'left']
        //       : ['center'];

        //   list.forEach((item) => {
        //     const style = field
        //       .query(`.border${getBorderKey(item)}Style`)
        //       .take() as FieldType;

        //     if (style?.value) {
        //       style.value = undefined;
        //       setBorderStyle(item, field);
        //     }
        //   });
        // }
      };

    return (
      <FoldItem label={field.title}>
        <FoldItem.Extra>
          <div className={cls(prefix, className)} style={style}>
            <div className={prefix + '-position'}>
              <PositionInput
                value={currentPosition.value}
                onChange={(value) => {
                  currentPosition.value = value;
                }}
              />
            </div>
            <div className={prefix + '-input'}>
              {Positions.map((position, key) => {
                return (
                  <Fragment key={key}>
                    <Field
                      name={createBorderProp(position, 'style')}
                      basePath={field.address.parent()}
                      dataSource={BorderStyleOptions}
                      reactions={createReaction(position, 'style')}
                      component={[BorderSelect, { placeholder: '请输入' }]}
                    />
                    <Field
                      name={createBorderProp(position, 'width')}
                      basePath={field.address.parent()}
                      reactions={createReaction(position, 'width')}
                      component={[SizeInput, { exclude: ['auto'] }]}
                    />
                    <Field
                      name={createBorderProp(position, 'color')}
                      basePath={field.address.parent()}
                      reactions={createReaction(position, 'color')}
                      component={[ColorInput]}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </FoldItem.Extra>
      </FoldItem>
    );
  }
);
