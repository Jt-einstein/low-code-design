import React, { useRef } from 'react';
import { usePrefix } from 'low-code-react';
import { Select } from '@formily/antd';

const BorderStyleOptions = [
  {
    label: 'None',
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

export interface IBorderSelectProps {
  value?: string;
  onChange?: (color: string) => void;
}

export const BorderSelect: React.FC<IBorderSelectProps> = (props) => {
  return (
    <Select
      options={BorderStyleOptions}
      placeholder="PleaseSelect"
      value={props?.value || ''}
      onChange={(val) => props?.onChange(val)}
    />
  );
};
