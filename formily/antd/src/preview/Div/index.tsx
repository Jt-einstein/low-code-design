import React from 'react';

export const Div: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const { style, className, ...otherProps } = props;
  return (
    <div className={className} style={style} {...otherProps}>
      {props.children}
    </div>
  );
};

export default Div;
