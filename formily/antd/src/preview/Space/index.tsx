import React from 'react';
import { Space as FormilySpace } from '@formily/antd';
import { useField } from '@formily/react';

export const Space: React.FC<React.ComponentProps<typeof FormilySpace>> = ({
  style,
  ...rest
}) => {
  let width;
  if (style?.width === 'inherit') {
    width = '-webkit-fill-available';
  } else {
    width = style?.width;
  }
  const field = useField();
  return (
    <FormilySpace
      {...rest}
      style={{ ...style, width }}
      className={
        field.description?.props?.children ||
        field?.description ||
        rest.className
      }
    />
  );
};
export default Space;
