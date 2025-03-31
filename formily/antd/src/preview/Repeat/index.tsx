import React from 'react';
import { RecursionField, useFieldSchema } from '@formily/react';

export const Repeat: React.FunctionComponent<{
  style: any;
  value: any;
  className: any;
}> & {
  RepeatChild: React.FunctionComponent<{
    style: any;
    value: any;
    className: any;
  }>;
} = (props) => {
  const { style, className, value } = props;
  const schema = useFieldSchema();
  const childSchema = Object.values(schema?.properties)?.[0];

  return (
    <div className={className} style={style}>
      {(value ?? [])?.map?.((item, i) => {
        return (
          <RecursionField
            key={item}
            schema={{ ...childSchema, ['x-data']: item }}
            name={i}
          />
        );
      })}
    </div>
  );
};

Repeat.RepeatChild = (props) => {
  const { style, className } = props;
  const schema = useFieldSchema();
  const contentSchemas = Object.entries(schema?.properties);

  return (
    <div className={className} style={style}>
      {(contentSchemas ?? []).map(([key, itemSchema]) => {
        return <RecursionField name={key} schema={itemSchema} />;
      })}
    </div>
  );
};

export default Repeat;
