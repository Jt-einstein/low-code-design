import React, { FC } from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { observer } from '@formily/reactive-react';
import { useField } from '@formily/react';

export const Tooltip: FC<React.ComponentProps<typeof AntdTooltip>> = observer(
  (props) => {
    const { title = '提示语', ...restProps } = props;
    const field = useField();

    return (
      <AntdTooltip
        title={title}
        {...restProps}
        className={
          field.description?.props?.children ||
          field?.description ||
          props.className
        }
      >
        {props.children}
      </AntdTooltip>
    );
  }
);
