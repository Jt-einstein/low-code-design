import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';

export const ProgressBar: React.FC<ProgressProps> = (props) => {
  const { style, className } = props;
  const {
    percent,
    format,
    showInfo,
    size,
    status,
    strokeColor,
    strokeLinecap,
    success,
    trailColor,
    steps,
    strokeWidth,
    width,
    gapDegree,
    gapPosition,
  } = props;

  return (
    <Progress
      className={className}
      style={style}
      percent={percent || 30}
      format={format}
      showInfo={showInfo}
      status={status}
      strokeColor={strokeColor}
      strokeLinecap={strokeLinecap}
      success={success}
      trailColor={trailColor}
      steps={steps}
      strokeWidth={strokeWidth}
      width={width}
      gapDegree={gapDegree}
      gapPosition={gapPosition}
      size={size}
    />
  );
};
export default ProgressBar;
